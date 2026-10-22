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
├── service-area.html          Service area and towns covered
├── privacy.html               Privacy policy
├── 404.html                   Not found
├── gallery.html               Job photo gallery
│
├── contact/
│   └── contact.html           Contact
├── faq/
│   └── faq.html               General FAQ
├── service-pages/             Service pages (11 files)
│   ├── <service>-<town>-md.html  Service and location landing pages
│   ├── well-pumps.html        Well pump hub
│   └── gas-appliance-hookups.html  Gas appliance hub
├── gas-appliance-hookups/     Gas service sub-pages
├── jobs/                      Individual job write-ups
│
├── styles/
│   ├── glass-site.css         Shared site styling
│   ├── service-pages.css      Service page styling
│   └── mobile-call-bar.css    Sticky mobile call bar
├── scripts/
│   ├── glass-site.js          Shared site behaviour
│   └── notify_commit.sh       Post-push Discord notification
├── images/                    Job photos and product images
└── assets/                    Compiled homepage bundle (see below)
```

The repo root also holds 13 short HTML files such as `faq.html` and `contact.html`.
These are redirect stubs for the old root URLs: each forwards visitors and search
engines to the new folder path, so old links keep working. They are not the real
pages; the live content lives at the folder paths listed above.

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

## Content rules

- No em dashes or en dashes in customer-facing copy
- No fixed dollar prices (material costs and labor rates change)
- No invented trust claims, review counts, or ratings
- Emphasize free estimates, upfront quotes, and no hidden fees
- Schema.org provider markup references the homepage `#plumber` entity by `@id`
- No `Review` or `aggregateRating` markup

## Auditing

The QA scripts and the consistency log are kept outside the public repository, because the site is
published directly from the repo with no build step. The repository holds only the site itself.

## Local preview

```bash
python3 -m http.server 8123
```

Then open `http://localhost:8123`. There is no build step to run first.

## Notes

- `main` is the only published branch. Feature branches are short-lived and merged into `main`.
- Historical work is preserved in the private `afternoon-plumbing-legacy-archive` repository.
- The `pre-wipe-2025-08-10` tag marks the original small static site, before the current design.

## License

Proprietary. Copyright Afternoon Plumbing LLC. All rights reserved.
