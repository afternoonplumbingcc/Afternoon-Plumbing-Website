# PERF-CACHE-FINDINGS.md

**Research only. No code change in this document.**
Branch: `ap-lighthouse-perf-2026-11-02`
Investigated: 2026-11-03 (UTC)
Live host: `afternoonplumbing.com` (GitHub Pages, custom domain via `CNAME`)

---

## 1. Observed response headers (verbatim)

### `https://afternoonplumbing.com/images/logo.png`

```
HTTP/1.1 200 Connection Established

HTTP/1.1 200 OK
connection: keep-alive
content-length: 14165
server: GitHub.com
content-type: image/png
last-modified: Mon, 02 Nov 2026 01:37:57 GMT
access-control-allow-origin: *
etag: "6ae7e975-3755"
expires: Tue, 03 Nov 2026 01:28:17 GMT
cache-control: max-age=600
x-proxy-cache: MISS
x-github-request-id: 21B2:163C4E:210912C:2404BBB:6AE93658
x-github-edge-region: iad
accept-ranges: bytes
age: 0
date: Tue, 03 Nov 2026 01:18:17 GMT
via: 1.1 varnish
x-served-by: cache-bos-kbos510053-BOS
x-cache: MISS
x-cache-hits: 0
x-timer: S1793668697.065890,VS0,VE47
vary: Accept-Encoding
x-fastly-request-id: e7c4edf3b6b5d9b8b4b603ca517d9a748968be7d
```

### `https://afternoonplumbing.com/assets/index-xxEKEhrx.js`

```
HTTP/1.1 200 Connection Established

HTTP/1.1 200 OK
connection: keep-alive
content-length: 279552
server: GitHub.com
content-type: application/javascript; charset=utf-8
last-modified: Mon, 02 Nov 2026 01:37:57 GMT
access-control-allow-origin: *
etag: "6ae7e975-44400"
expires: Tue, 03 Nov 2026 01:28:17 GMT
cache-control: max-age=600
x-proxy-cache: MISS
x-github-request-id: FAD2:15AFD4:2130445:242BFF8:6AE93659
x-github-edge-region: iad
accept-ranges: bytes
age: 0
date: Tue, 03 Nov 2026 01:18:17 GMT
via: 1.1 varnish
x-served-by: cache-bos-kbos510053-BOS
x-cache: MISS
x-cache-hits: 0
x-timer: S1793668697.147089,VS0,VE84
vary: Accept-Encoding
x-fastly-request-id: b7466dac13ecd860765fd32c85189ce599a207e8
```

### Supporting samples (same host, same headers)

| URL | `cache-control` | `etag` | `last-modified` | `content-length` |
|---|---|---|---|---|
| `/images/logo.png` | `max-age=600` | `"6ae7e975-3755"` | `Mon, 02 Nov 2026 01:37:57 GMT` | 14165 |
| `/assets/index-xxEKEhrx.js` | `max-age=600` | `"6ae7e975-44400"` | `Mon, 02 Nov 2026 01:37:57 GMT` | 279552 |
| `/assets/index-CDFYR2ld.css` | `max-age=600` | `"6ae7e975-160c6"` | `Mon, 02 Nov 2026 01:37:57 GMT` | 90310 |
| `/styles/glass-site.css?v=8` | `max-age=600` | `"6ae7e975-98ed"` | `Mon, 02 Nov 2026 01:37:57 GMT` | 39149 |
| `/styles/service-pages.css?v=3` | `max-age=600` | (same pattern) | `Mon, 02 Nov 2026 01:37:57 GMT` | 5409 |
| `/styles/mobile-call-bar.css` | `max-age=600` | `"6ae7e975-353"` | `Mon, 02 Nov 2026 01:37:57 GMT` | 851 |
| `/` (index.html) | `max-age=600` | `"6ae7e975-13b83"` | `Mon, 02 Nov 2026 01:37:57 GMT` | (html) |

**Every** resource on this host, static asset or HTML, is served with the same
`cache-control: max-age=600` (10 minutes) and an `expires` exactly 10 minutes
out. There is no differentiation between fingerprinted bundles, plain images,
and HTML documents.

---

## 2. Can GitHub Pages set custom `Cache-Control` from repo config?

**No. GitHub Pages does not support custom response headers from repository
configuration.** There is no header-injection mechanism in the Pages build.

Concretely, on this repository:

- There is **no** `_headers` file (the Netlify/Cloudflare Pages convention).
- There is **no** `headers.config`, no `.htaccess` (not applicable to Pages),
  no `_config.yml` setting, no `CNAME`-adjacent edge rule file.
- The only repo-level routing/config file present is `CNAME`, which just points
  the custom domain at the Pages site.
- GitHub Pages serves the published tree through its own CDN (Fastly, visible
  above via `via: 1.1 varnish`, `x-served-by: cache-bos-kbos510053-BOS`,
  `x-fastly-request-id`). Its `cache-control: max-age=600` is a **fixed
  platform default**, not something the repo can change.

`max-age=600` is what GitHub Pages applies universally. It is not
configurable per-file, per-directory, or per-repo. The `etag` and
`last-modified` headers that Pages does emit do allow conditional requests
(`If-None-Match` / `If-Modified-Since`), so a revalidation round trip is cheap,
but the initial `max-age` window cannot be widened from the repo.

**Implication:** any cache-lifetime improvement has to come from *how the site
names its assets*, not from a server config. The only levers available are:

1. Move assets behind a CDN/proxy the site owner controls (Cloudflare, a
   worker, an external static host) and set `Cache-Control` there.
2. Keep the filenames immutable and rely on the fingerprint, so a
   `max-age=600` revalidation is harmless: the browser revalidates, gets a
   `304`, and the transfer cost is a single small round trip.

Given the `?v=N` token convention already in use on this site, option 2 is
the low-risk path, and option 1 is the only way to get a long immutable TTL.

---

## 3. Recommendation: immutable fingerprinting discipline

The site already uses version-query tokens on its hand-written CSS and JS.
Current token inventory on this branch:

```
102  href="/styles/glass-site.css?v=8"
 51  src="/scripts/glass-site.js?v=9"
 26  href="/styles/service-pages.css?v=3"
 12  href="/new-design/styles/new-design-base.css?v=4"
  1  src="/new-design/scripts/new-design-v3.js?v=1"
  1  src="/new-design/scripts/new-design-reviews-carousel.js?v=2"
  1  href="/new-design/styles/water-heater-v1.css?v=2"
 ... (per-variant sheets, each with its own token)
  3  href="/assets/index-CDFYR2ld.css"      <-- build output, already content-hashed
```

and the Vite build output in `assets/` is already content-hashed:

```
assets/index-CDFYR2ld.css
assets/index-xxEKEhrx.js
```

### Rules to adopt

1. **Every** local asset URL carries a version token or a content hash. Today
   `/assets/index-CDFYR2ld.css` is content-hashed (good) but is referenced
   three times *without* a token, and `/styles/mobile-call-bar.css` was
   referenced with no token at all. No unversioned local asset reference
   should remain.

2. **Bump the token whenever the file's bytes change.** The `?v=N` token is
   the cache-buster; a stale token means visitors keep a stale file for up to
   10 minutes plus whatever the shared CDN holds. Note that `glass-site.css`
   is now referenced as `?v=8` in 102 places, so a future edit to that file
   means a single find-and-replace plus a token bump, not 102 hand edits.
   Prefer bumping the token and doing a scripted replace over editing 102
   call sites by hand.

3. **Treat a content-hashed filename as immutable forever.** If
   `assets/index-xxEKEhrx.js` is ever rebuilt with different content, it must
   get a *new* filename (`index-<newhash>.js`), never be overwritten in place.
   The current hash looks like a Vite content hash, so the build already
   follows this rule. Keep it.

4. **Never reuse a token for different content.** A token is a promise: "these
   bytes will not change while this token is live." A token that gets reused
   after the bytes changed breaks every cached copy in the wild.

5. **HTML documents are the exception and stay short-lived.** `index.html` and
   the other `.html` pages must never be given a long TTL, because they are
   what points at the next version of the assets. `max-age=600` for HTML is
   acceptable; if a CDN is later introduced, HTML should stay at
   `no-cache` or a very short `max-age` with revalidation, while
   fingerprinted assets get `max-age=31536000, immutable`.

### Expected effect

- On the current Pages default (`max-age=600`), fingerprinted assets are
  revalidated once per 10 minutes per browser. A `304` costs one small
  round trip and no body. That is already the important win, and it is
  available today with no server change.
- The real gain is if a CDN is introduced: hashed names can then be served
  `immutable` for a year, removing repeat asset transfers entirely for
  returning visitors.

### Concrete gaps found on this branch

| Asset | Reference | Token present | Note |
|---|---|---|---|
| `/styles/mobile-call-bar.css` | was 37 pages | **no** | fixed on this branch: the file is now inlined into each page, so no request is made at all |
| `/assets/index-CDFYR2ld.css` | 3 refs | **no** | content-hashed filename, but a token would make the intent explicit and keep the reference consistent with the rest of the site |
| `/styles/glass-site.css` | 102 refs | yes (`?v=8`) | must be bumped to `?v=9` whenever the file's bytes change |
| `/scripts/glass-site.js` | 51 refs | yes (`?v=9`) | already bumped in the base commit `f40fff9` |
| `/new-design/styles/*.css` | 17 refs | yes (per-file tokens) | fine |
| `/new-design/scripts/*.js` | 2 refs | yes | fine |

---

## 4. Scope note

This document is **research only**. It contains no code changes. Per the task
brief it is a top-level file on the `ap-lighthouse-perf-2026-11-02` branch and
**must be removed by the parent agent before merge**. The only other files
touched by this branch are `.html` files (Batch 1 font audit, Batch 2a inline
`mobile-call-bar.css`, Batch 2b deferred `glass-site.css`).

Nothing under `assets/`, `images/`, `scripts/`, or `styles/` was modified by
this branch, and the React bundle reference in `index.html`
(`assets/index-xxEKEhrx.js`) was left untouched.
