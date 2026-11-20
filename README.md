# Afternoon Plumbing Website

Static website for **Afternoon Plumbing LLC**, serving [afternoonplumbing.com](https://afternoonplumbing.com).

Residential plumbing in Westminster, MD and the surrounding Carroll, Baltimore, Frederick, and Howard County service area.

- **Phone:** 443-789-2897
- **Email:** afternoonplumbingcc@gmail.com
- **Type:** Static HTML, hosted on GitHub Pages
- **No build step.** There is no bundler, package manager, or dev server required to publish a change.

## How publishing works

Pushes to `main` are published automatically by GitHub Pages. There is no CI pipeline, no build
step, and no deployment job. What is in the repository is what is served.

```
git push origin main   →   GitHub Pages builds   →   afternoonplumbing.com
```

A page is live once it is on `main` and listed in `sitemap.xml`.

## Repository layout

```
├── index.html                 Home (React bundle, see below)
├── services.html              Service hub
├── service-area/              Service area hub and town pages (moved 2026-10-28)
│   ├── index.html             Service area hub, served at /service-area/
│   └── <town>-plumber.html    Town landing pages (11 towns)
├── privacy.html               Privacy policy
├── 404.html                   Not found
├── gallery.html               Job photo gallery
│
├── contact/
│   ├── contact.html           Contact
│   └── index.html             Canonical alias of contact.html, serves /contact/
├── faq/
│   ├── faq.html               General FAQ
│   └── index.html             Canonical alias of faq.html, serves /faq/
├── services/                  Service pages (14 files)
│   ├── <service>-<town>-md.html  Service and location landing pages
│   ├── well-pumps.html        Well pump hub
│   ├── gas-appliance-hookups.html  Gas appliance hub
│   └── index.html             Canonical alias of services.html, serves /services/
├── jobs/                      Individual job write-ups
│   └── index.html             Canonical alias of gallery.html, serves /jobs/
│
├── partials/
│   └── footer.part            Canonical shared footer markup (source of truth)
│
├── styles/
│   ├── glass-site.css         Shared site styling
│   ├── service-pages.css      Service page styling
│   └── mobile-call-bar.css    Sticky mobile call bar
├── scripts/
│   └── glass-site.js          Shared site behaviour
├── images/                    Job photos and product images
└── assets/                    Compiled homepage bundle (see below)
```

## Adding a page

A new service or location page needs four touch points beyond the page file itself, or it stays
orphaned:

1. The desktop Services dropdown
2. The mobile nav drawer services subpanel
3. An entry in `sitemap.xml`
4. A card on `services.html`

The nav dropdown and drawer markup is duplicated in every HTML page, so adding a link means editing
every page's copy of that block. `index.html` is the exception: its nav is plain HTML outside the
React bundle, so it is safe to edit.

## The homepage is a frozen React bundle

`index.html` loads a prebuilt Vite/React bundle from `assets/index-*.js`. There is no build tooling
in this repository, so bundle changes are **surgical string edits** to that file.

Two consequences:

- **Before committing any bundle change**, copy it to a `.mjs` file and run `node --check` on the
  copy. A plain `node --check file.js` misreads the ES-module `import` as CommonJS and false-fails.
- **When deleting a badge or text element**, remove the whole `o.jsx(...)` / `o.jsxs(...)` call
  along with its preceding comma. Removing only the string payload leaves orphaned openers that
  break the entire bundle and serve a blank page.

A corrupt bundle still returns HTTP 200, because the page ships an empty `<div id="root">` that
React fills at runtime. Verify the deployed bundle by fetching its bytes, running the same
`node --check` gate, and comparing the checksum against the local file.

## Cache busting

When `styles/glass-site.css` or `scripts/glass-site.js` change, bump the `?v=N` query on **every**
page that references it. Read the current version numbers first and never reuse a number that has
already been published.

## Shared footer

`partials/footer.part` is the canonical source of the shared site footer. The site has no build
step, so the markup is still copied into every static page; the copy is byte identical across all
36 footered pages and can be regenerated from the partial.

To change the footer:

1. Edit the markup between the `BEGIN FOOTER MARKUP` and `END FOOTER MARKUP` markers in
   `partials/footer.part`.
2. Regenerate the per-page copies with the one-liner below.
3. Commit both the partial and the regenerated pages, so the repo stays self-contained.

The regeneration is a single inline Python command, run from the repo root. It rewrites every
page that carries the shared footer, so the copy stays byte identical to the partial:

```bash
python3 - <<'PY'
import pathlib, re
root = pathlib.Path('.')
part = (root / 'partials' / 'footer.part').read_text(encoding='utf-8')
footer = re.sub(r'<!--.*?-->', '', part, flags=re.S).strip()
block = re.compile(r'<footer class="site-footer site-footer-shared".*?</footer>', re.S)
for page in sorted(root.rglob('*.html')):
    if 'new-design' in page.parts:
        continue
    html = page.read_text(encoding='utf-8')
    if 'site-footer-shared' not in html:
        continue
    new, n = block.subn(lambda m: footer, html)
    if n != 1:
        raise SystemExit('%s: expected one shared footer, found %d' % (page, n))
    if new != html:
        page.write_text(new, encoding='utf-8')
        print('updated', page)
PY
```

The command lives in the README rather than in a tracked script on purpose: GitHub Pages publishes
every tracked file as a public URL, so a tracked helper script would become a live endpoint. It
skips `new-design/`, which keeps the legacy footer markup, and it fails loudly if a page ends up
with more than one shared footer instead of silently mangling it.

The homepage (`index.html`) is the exception: it is the React bundle, and its footer lives inside
`assets/index-*.js`, which is frozen.

The service area sentence lives in one element with the class `footer-service-area-note`, so a
later consolidation of the town pages is a single find and replace in `partials/footer.part`.

## Content rules

- No em dashes or en dashes in customer-facing copy
- No fixed dollar prices (material costs and labor rates change)
- No invented trust claims, review counts, or ratings
- Emphasize free estimates, upfront quotes, and no hidden fees
- Schema.org provider markup references the homepage `#plumber` entity by `@id`
- No `Review` or `aggregateRating` markup

## Auditing

The audit scripts and the site consistency log are kept outside this public
repository. GitHub Pages publishes the repository directly with no build step,
so anything tracked here becomes a public URL. The repository is intended to
contain only the website itself.

## Local preview

```bash
python3 -m http.server 8123
```

Then open `http://localhost:8123`. There is no build step to run first.

## Notes

- `main` is the only published branch. Feature branches are short-lived and merged into `main`.
- Historical work is preserved in the private `afternoon-plumbing-legacy-archive` repository.
- The `pre-wipe-2025-08-10` tag marks the original small static site, before the current design.

## Redirect stubs (removed 2026-10-24)

Root-level redirect stubs were removed; old root URLs now 404 instead of forwarding.
Search engines should drop them over time. Internal links already point to folder URLs.

## Town pages (consolidated 2026-10-24)

The site carries 11 full town landing pages: Westminster, Manchester, Hampstead,
Finksburg, New Windsor, Union Bridge, Sykesville, Eldersburg, Upperco, Owings Mills,
and Ellicott City. Each carries genuinely local content: water type, freeze risk,
well vs sewer, permit handling, and arrival windows.

The other 25 former town pages (Taneytown, Reisterstown, Frederick, Columbia, etc.)
were consolidated out: first converted to redirect stubs, then the stub files were
removed entirely on 2026-10-24. Old town URLs now 404, and search engines should
drop them over time. `sitemap.xml` lists only the 11 keep-list pages, and internal
links point only at keep-list towns. If historic town URLs ever need to resolve
again, real 301 redirects at the hosting/CDN layer are the right place, not stub
files in this repo.

The homepage React bundle's coverage-area text still names all 35 towns. It is
plain text with no links, so nothing 404s; editing the frozen bundle is a separate
decision.

## License

Proprietary. Copyright Afternoon Plumbing LLC. All rights reserved.

## Service-area reorg (2026-10-28)

The service area hub and all 11 town pages moved under `/service-area/`:

- `service-area.html` -> `service-area/index.html`, served at `/service-area/`
- `towns/<town>-plumber.html` -> `service-area/<town>-plumber.html`
- Old paths were removed entirely, so the old URLs 404. This follows the same
  no-redirect policy as the 2026-10-24 root stub cleanup: search engines drop
  dead URLs over time, and hosting-layer 301 redirects are the right tool if
  historic URLs ever need to resolve again. No stub files were kept.
- Internal links, canonicals, og:urls, breadcrumb JSON-LD, `llms.txt`, `README.md`,
  and `sitemap.xml` all point at the new `/service-area/` URLs. No old-path URLs
  are listed in the sitemap.

## Gas service sub-pages reorg (2026-10-28)

The two gas appliance hookup sub-pages moved out of their own top-level folder
and into `services/`, joining the other full service pages:

- `gas-appliance-hookups/gas-water-heater-installation-westminster-md.html` ->
  `services/gas-water-heater-installation-westminster-md.html`
- `gas-appliance-hookups/regulator-replacement-westminster-md.html` ->
  `services/regulator-replacement-westminster-md.html`
- The old sub-page URLs were removed entirely (no redirect stubs), so they 404 on
  purpose under the same no-redirect policy: search engines drop dead URLs over
  time, and hosting-layer 301 redirects are the right tool if historic URLs ever
  need to resolve again.
- The gas appliance hub remains at `services/gas-appliance-hookups.html`; nav,
  `sitemap.xml`, and internal links point at the `services/` URLs. No old-path
  URLs are listed in the sitemap.

## Directory index aliases (2026-11-19)

The host serves `<dir>/index.html` at `<dir>/` and redirects `<dir>` to `<dir>/`.
Four folders had no index file, so the bare directory URLs returned 404:

- `/contact/` -> 404, and `/contact` redirected into that 404
- `/faq/` -> 404, and `/faq` redirected into that 404
- `/jobs/` -> 404, and `/jobs` redirected into that 404
- `/services/` -> 404 (`/services` itself resolves to `services.html`)

Search Console reported these as "Page with redirect" and "Not found (404)". Each folder now has
an `index.html` that is a byte identical copy of the page that folder is about:

| Directory index | Copy of | Canonical tag points at |
| --- | --- | --- |
| `contact/index.html` | `contact/contact.html` | `/contact/contact.html` |
| `faq/index.html` | `faq/faq.html` | `/faq/faq.html` |
| `services/index.html` | `services.html` | `/services.html` |
| `jobs/index.html` | `gallery.html` | `/gallery.html` |

These are not redirect stubs. They return 200, they are not listed in `sitemap.xml` or `llms.txt`,
and their `rel="canonical"` still points at the real page, so search engines consolidate them onto
the canonical URL instead of indexing a duplicate.

Keep the copies in sync with their source whenever the source changes. The regeneration is a
single inline Python command, run from the repo root:

```bash
python3 - <<'PY'
import pathlib, shutil
root = pathlib.Path('.')
for source, alias in [
    ('contact/contact.html', 'contact/index.html'),
    ('faq/faq.html', 'faq/index.html'),
    ('services.html', 'services/index.html'),
    ('gallery.html', 'jobs/index.html'),
]:
    shutil.copyfile(root / source, root / alias)
    print('refreshed', alias)
PY
```

Commit the refreshed aliases with the page change, so the repo stays self-contained.

## Sitemap maintenance (2026-11-19)

- `sitemap.xml` lists only canonical, indexable URLs. `404.html` was removed: it is the not found
  handler, it carries `noindex,follow`, and listing a noindex URL in the sitemap asks for a page
  and then forbids it at the same time.
- `lastmod` values now match the real production modification date of each file instead of the
  date a page was created. Unchanged pages carry the deploy date of the current build, and a page
  that is edited in the same change as the sitemap gets that edit date.

## Request Indexing shortlist (2026-11-19)

Search Console reported pages as "Discovered, currently not indexed". After the internal linking
and sitemap work above, the five URLs worth pushing first with URL Inspection, Request Indexing:

1. `https://afternoonplumbing.com/services/water-heater-replacement-westminster-md.html`
2. `https://afternoonplumbing.com/services/well-pump-repair-westminster-md.html`
3. `https://afternoonplumbing.com/services/water-softener-installation-westminster-md.html`
4. `https://afternoonplumbing.com/services/heat-pump-water-heater-installation-westminster-md.html`
5. `https://afternoonplumbing.com/faq/faq.html`

Requesting indexing is done by hand in the Search Console UI, so this list is documentation only.
