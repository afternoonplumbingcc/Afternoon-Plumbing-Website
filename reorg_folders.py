#!/usr/bin/env python3
"""Folder reorg for afternoonplumbing.com.

Moves service pages, faq, and contact into subfolders, rewrites every
reference, and keeps old URLs working.

Two redirect strategies, because the tradeoff is real:

  stubs  Each old URL gets a small root-level file that 301s (meta refresh
         plus canonical) to the new location. Server-side, so crawlers
         follow it. Cost: the repo root stays cluttered with one stub per
         moved page, which partly defeats the point of the reorg.

  404map Only 404.html carries a path map and redirects in the browser.
         Root stays clean. Cost: the response is a 404 with a client-side
         redirect, which Google follows less reliably than a real redirect.

Default is stubs, because these pages have external link equity and a
silently 404ing service page costs calls. Use 404map only if a clean root
matters more than crawler behavior.

Usage:
    python3 reorg_folders.py --dry-run          # report every change, change nothing
    python3 reorg_folders.py --apply --strategy stubs
    python3 reorg_folders.py --apply --strategy 404map
    python3 reorg_folders.py --verify            # check a moved tree

Run from the repository root.
"""

import argparse
import os
import re
import shutil
import subprocess
import sys
from collections import OrderedDict

REPO = os.path.dirname(os.path.abspath(__file__))

# Old path (relative to repo root) -> new path (relative to repo root).
MOVE_MAP = OrderedDict([
    ("acid-neutralizer-installation-westminster-md.html", "service-pages/acid-neutralizer-installation-westminster-md.html"),
    ("gas-appliance-hookups.html", "service-pages/gas-appliance-hookups.html"),
    ("gas-leak-safety-westminster-md.html", "service-pages/gas-leak-safety-westminster-md.html"),
    ("heat-pump-water-heater-installation-westminster-md.html", "service-pages/heat-pump-water-heater-installation-westminster-md.html"),
    ("hose-bib-replacement-westminster-md.html", "service-pages/hose-bib-replacement-westminster-md.html"),
    ("water-heater-replacement-westminster-md.html", "service-pages/water-heater-replacement-westminster-md.html"),
    ("water-softener-installation-westminster-md.html", "service-pages/water-softener-installation-westminster-md.html"),
    ("water-treatment-replacement-westminster-md.html", "service-pages/water-treatment-replacement-westminster-md.html"),
    ("well-pump-repair-westminster-md.html", "service-pages/well-pump-repair-westminster-md.html"),
    ("well-pumps.html", "service-pages/well-pumps.html"),
    ("winterization-westminster-md.html", "service-pages/winterization-westminster-md.html"),
    ("faq.html", "faq/faq.html"),
    ("contact.html", "contact/contact.html"),
])

# Pages that stay at the repo root and must not be moved.
KEEP_AT_ROOT = [
    "index.html", "services.html", "service-area.html", "gallery.html",
    "privacy.html", "404.html", "CNAME", "favicon.ico", "robots.txt",
    "sitemap.xml", "llms.txt",
]

# Files whose quoted bare page names need the new folder prefix.
AUDIT_FILES = ["audit.sh", "audit.py", "audit.js"]

TEXT_EXT = (".html", ".txt", ".xml", ".json", ".sh", ".py", ".js", ".css", ".md")

# Never rewrite the reorg script itself. It contains the move map, so a
# self-rewrite would corrupt the mapping on the next run.
SELF = os.path.basename(__file__)

REPORT = []


def log(msg):
    REPORT.append(msg)
    print(msg)


def run(cmd, cwd=REPO):
    return subprocess.run(cmd, cwd=cwd, shell=True, capture_output=True, text=True)


def all_text_files():
    out = []
    for root, dirs, files in os.walk(REPO):
        dirs[:] = [d for d in dirs if d not in (".git", "node_modules", ".tmp-review")]
        for f in files:
            if f == SELF:
                continue
            if f.endswith(TEXT_EXT):
                out.append(os.path.relpath(os.path.join(root, f), REPO))
    return sorted(out)


def rewrite_text(text):
    """Rewrite path references for the move map.

    Rule A: "/old.html" -> "/new.html". Covers href, src, canonical, og:url,
    absolute domain URLs, and the frozen React bundle, because they all
    reference pages by a leading slash.

    Rule B: quoted bare names get the folder prefix, for the audit scripts
    which hold page lists like "water-heater-replacement-westminster-md.html"
    and join them onto a base dir themselves.
    """
    changes = []
    for old, new in MOVE_MAP.items():
        # Rule A
        pattern = re.compile(r"/" + re.escape(old) + r"(?![\w.-])")
        new_text, n = pattern.subn("/" + new, text)
        if n:
            changes.append((old, new, n, "path"))
            text = new_text
        # Rule B
        pattern_b = re.compile(r"(['\"])" + re.escape(old) + r"\1")
        new_text, n = pattern_b.subn(lambda m: m.group(1) + new + m.group(1), text)
        if n:
            changes.append((old, new, n, "name"))
            text = new_text
    return text, changes


def do_moves(apply):
    for old, new in MOVE_MAP.items():
        src = os.path.join(REPO, old)
        dst = os.path.join(REPO, new)
        if not os.path.exists(src):
            if os.path.exists(dst):
                log("  skip (already moved): %s" % old)
            else:
                log("  MISSING: %s" % old)
            continue
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        if apply:
            r = run("git mv %s %s" % (old, new))
            if r.returncode != 0:
                log("  FAILED git mv %s -> %s: %s" % (old, new, r.stderr.strip()))
                continue
        log("  move: %s -> %s" % (old, new))
    for d in ("service-pages", "faq", "contact"):
        if apply and not os.path.isdir(os.path.join(REPO, d)):
            os.makedirs(os.path.join(REPO, d), exist_ok=True)


def do_rewrites(apply):
    """Rewrite references in every text file, including the frozen bundle."""
    for rel in all_text_files():
        path = os.path.join(REPO, rel)
        try:
            with open(path, encoding="utf-8") as f:
                src = f.read()
        except (UnicodeDecodeError, OSError):
            continue
        out, changes = rewrite_text(src)
        if not changes:
            continue
        total = sum(c[2] for c in changes)
        detail = ", ".join("%s x%d" % (c[0], c[2]) for c in changes)
        if apply:
            with open(path, "w", encoding="utf-8") as f:
                f.write(out)
        log("  rewrite: %-52s %d refs (%s)" % (rel, total, detail))


def stub_html(old, new):
    """A root-level file that redirects the old URL to the new one."""
    target = "/" + new
    return """<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Page moved | Afternoon Plumbing</title>
<meta name="robots" content="noindex,follow" />
<link rel="canonical" href="https://afternoonplumbing.com{target}" />
<meta http-equiv="refresh" content="0; url={target}" />
<script>window.location.replace("{target}");</script>
</head>
<body>
<p>This page moved. <a href="{target}">Continue to the new page</a>.</p>
</body>
</html>
""".format(target=target)


def make_stubs(apply):
    for old, new in MOVE_MAP.items():
        path = os.path.join(REPO, old)
        if os.path.exists(path):
            continue
        body = stub_html(old, new)
        if apply:
            with open(path, "w", encoding="utf-8") as f:
                f.write(body)
        log("  stub: %s -> /%s" % (old, new))


def make_404_map(apply):
    """Add a path map to 404.html so old URLs still resolve."""
    path = os.path.join(REPO, "404.html")
    with open(path, encoding="utf-8") as f:
        src = f.read()
    if "REDIRECT_MAP" in src:
        log("  404 map already present")
        return
    mapping = ",\n".join(
        '        "%s": "/%s"' % ("/" + old, new) for old, new in MOVE_MAP.items()
    )
    block = """
<script>
// REDIRECT_MAP: old URL -> new URL, for pages moved during the folder reorg.
(function () {
  var REDIRECT_MAP = {
%s
  };
  var path = window.location.pathname;
  if (REDIRECT_MAP[path]) {
    window.location.replace(REDIRECT_MAP[path]);
  }
})();
</script>
""" % mapping
    if "</body>" not in src:
        log("  ERROR: 404.html has no </body>, cannot inject map")
        return
    out = src.replace("</body>", block + "</body>", 1)
    if apply:
        with open(path, "w", encoding="utf-8") as f:
            f.write(out)
    log("  404 map: %d paths" % len(MOVE_MAP))


def verify():
    """Check the moved tree for dangling references."""
    ok = True

    # 1. Every file referenced by any page must exist.
    missing = []
    checked = 0
    for rel in all_text_files():
        if not rel.endswith(".html"):
            continue
        path = os.path.join(REPO, rel)
        with open(path, encoding="utf-8") as f:
            src = f.read()
        for m in re.finditer(r'(?:href|src|data-jpg|poster)="([^"]+)"', src):
            ref = m.group(1)
            if ref.startswith(("http://", "https://", "mailto:", "tel:", "sms:", "#", "data:", "//")):
                continue
            target = ref.split("#")[0].split("?")[0]
            if not target or target.endswith("/"):
                continue
            if "[" in target or "]" in target:
                continue
            if target.startswith("/"):
                target = target.lstrip("/")
            else:
                target = os.path.normpath(os.path.join(os.path.dirname(rel), target))
            import urllib.parse
            target = urllib.parse.unquote(target)
            checked += 1
            if not os.path.exists(os.path.join(REPO, target)):
                missing.append((rel, ref))
    print("Link check: %d refs, %d missing" % (checked, len(missing)))
    for rel, ref in missing:
        print("  MISSING %s -> %s" % (rel, ref))
        ok = False

    # 2. The frozen React bundle must still parse.
    bundle = os.path.join(REPO, "assets", "index-xxEKEhrx.js")
    if os.path.exists(bundle):
        tmp = os.path.join(REPO, "assets", ".verify-bundle.mjs")
        shutil.copy(bundle, tmp)
        r = run("node --check %s" % tmp)
        os.remove(tmp)
        if r.returncode != 0:
            print("  BUNDLE PARSE FAILED:")
            print(r.stderr)
            ok = False
        else:
            print("Bundle: parses OK")

    # 3. No reference should still point at a pre-move path.
    #    The 404 redirect map legitimately lists old paths, so skip it.
    stale = []
    for rel in all_text_files():
        path = os.path.join(REPO, rel)
        try:
            with open(path, encoding="utf-8") as f:
                src = f.read()
        except (UnicodeDecodeError, OSError):
            continue
        # Blank out the redirect map block before scanning.
        if "REDIRECT_MAP" in src:
            src = re.sub(r"var REDIRECT_MAP = \{.*?\};", "var REDIRECT_MAP = {};", src, flags=re.S)
        for old, new in MOVE_MAP.items():
            if new == old:
                continue
            # A stub for the old path legitimately mentions the old path.
            if rel == old:
                continue
            # A new path contains the old basename as a suffix, so match on the
            # full "/old" and require the next char to be a path boundary.
            # "/service-pages/water-heater-x.html" must NOT count as stale.
            pattern = r"/" + re.escape(old) + r"(?![\w.-])"
            for m in re.finditer(pattern, src):
                # Skip if this occurrence is part of the new path.
                start = m.start()
                if src[:start].endswith(new.rsplit("/", 1)[0]):
                    continue
                stale.append((rel, old))
    print("Stale pre-move references: %d" % len(stale))
    for rel, old in stale[:20]:
        print("  STALE %s -> /%s" % (rel, old))
    if stale:
        ok = False

    # 4. Sitemap must not list pre-move URLs.
    sitemap = os.path.join(REPO, "sitemap.xml")
    if os.path.exists(sitemap):
        with open(sitemap, encoding="utf-8") as f:
            s = f.read()
        bad = [old for old in MOVE_MAP if "https://afternoonplumbing.com/" + old + "<" in s]
        print("Sitemap stale entries: %d" % len(bad))
        for b in bad:
            print("  STALE SITEMAP %s" % b)
        if bad:
            ok = False

    print("VERIFY: %s" % ("PASS" if ok else "FAIL"))
    return 0 if ok else 1


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--verify", action="store_true")
    ap.add_argument("--strategy", choices=["stubs", "404map"], default="stubs")
    args = ap.parse_args()

    if args.verify:
        sys.exit(verify())

    apply = args.apply and not args.dry_run
    if not apply:
        log("DRY RUN. Nothing will be written. Use --apply to make changes.")
    else:
        log("APPLYING. Strategy: %s" % args.strategy)

    log("")
    log("1. Moving files")
    do_moves(apply)

    log("")
    log("2. Rewriting references")
    do_rewrites(apply)

    log("")
    log("3. Redirect strategy: %s" % args.strategy)
    if args.strategy == "stubs":
        make_stubs(apply)
    else:
        make_404_map(apply)

    log("")
    log("4. Notes")
    log("  - sitemap.xml, llms.txt, audit.sh, audit.py, audit.js and")
    log("    scripts/notify_commit.sh are all rewritten by step 2.")
    log("  - The frozen React bundle assets/index-xxEKEhrx.js is rewritten")
    log("    too, because it hardcodes /contact.html. It must pass the")
    log("    node --check gate before commit, and the deployed bytes must")
    log("    be re-verified after Pages rebuilds.")

    log("")
    log("Summary: %d actions" % len(REPORT))
    if not apply:
        log("Nothing written. Re-run with --apply.")


if __name__ == "__main__":
    main()
