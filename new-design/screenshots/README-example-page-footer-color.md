# Visual evidence: shared footer ink on the sandbox example pages

Captured 2026-10-31 with a headless Chromium, served locally from the
`/tmp/ap-example-footer-color` worktree.

This is a sandbox only change on `feature/example-page-footer-color`, stacked
on `feature/integrate-footer-prerender` (`2ef5923`). Nothing here is
published. The pages stay `noindex, nofollow`, stay `Disallow`ed in
`robots.txt`, and stay out of `sitemap.xml` and the site nav.

- `after-q13-footer-example-water-heater-*.png` is the footer region on
  `new-design/water-heater-home.html`.
- `after-q13-footer-example-seo-kit-*.png` is the footer region on
  `new-design/seo-kit-exemplar.html`.
- `after-q13-footer-production-well-pumps-*.png` is the footer region on
  `services/well-pumps.html`, a production page, for side by side comparison
  at the same width.

## What changed

The previous task moved the sandbox page content font off the body element
onto the page content element, so the shared footer inherited the site
chrome font. The same bleed still happened for colour: the sandbox
stylesheets set the page ink on the body element, so the shared footer
headings and body text inherited the sandbox ink `rgb(41, 51, 61)` instead
of the site ink `rgb(23, 50, 79)`.

The page ink moves from the body element onto the page content element in
the same three sandbox stylesheets. The shared footer now inherits the site
ink from `styles/glass-site.css`, exactly like production.

| Item | Before | After | What changed |
| --- | --- | --- | --- |
| Footer ink on `new-design/water-heater-home.html` | 19 of the 73 text bearing nodes rendered in the sandbox ink `rgb(41, 51, 61)` | 0 | The footer headings and the body text under them now render in the site ink `rgb(23, 50, 79)`, the same value the production pages use. |
| Footer ink on `new-design/seo-kit-exemplar.html` | 19 of the 73 text bearing nodes rendered in the sandbox ink `rgb(41, 51, 61)` | 0 | Same fix, same result. |
| Production comparison at 1440 | n/a | `after-q13-footer-production-well-pumps-1440.png` | The example footer and the production footer now render the same text in the same ink. The remaining pixel difference is the frosted panel backdrop, which the sandbox pages flatten on purpose, not the text. |
| Production comparison at 768 | n/a | `after-q13-footer-production-well-pumps-768.png` | Same at tablet width. |
| Production comparison at 390 | n/a | `after-q13-footer-production-well-pumps-390.png` | Same at phone width. |

## Checks behind these shots

- Colour parity at 1440 across all 73 text bearing nodes inside the footer,
  comparing each sandbox page against `services/well-pumps.html`:
  text content differences 0, font and size differences 0, colour
  differences 0. Before the fix the colour difference count was 19 on both
  sandbox pages.
- Page content is unchanged. Every text bearing node inside the page content
  element on both sandbox pages has the same computed colour, size, font and
  weight before and after, 99 nodes on the water heater page and 152 on the
  exemplar, 0 differences.
- The explicitly coloured footer elements are unchanged:
  `.footer-panel ul a` computes `rgb(26, 58, 92)`, `.footer-service-area-note`
  computes `rgb(101, 110, 124)`. The shared footer has no `.footer-note`
  element on any page, so that rule is not exercised.
- The footer block on both sandbox pages and on `services/well-pumps.html`
  still hashes to `c37e0a321a05da5079205036947a37faa1634aa95057651f3f4b127b15bc74e1`.
- The footer paragraph still computes Manrope 15px. The Call and Send a text
  buttons are still side by side at 1440 with widths 191px and 135px, and
  still stacked at 390 and 768 with the same widths.
- Both sandbox pages at 390, 768 and 1440: no horizontal overflow, exactly
  one H1, zero broken images once scrolled into view, no console errors from
  local resources.
- The dark ink histogram of the example footer at 1440 matches the
  production footer: the same leading ink `rgb(26, 58, 92)`, the same
  `rgb(66, 97, 127)` body text, the same `rgb(101, 110, 124)` service area
  note.
- Em dash, en dash and dollar counts on every changed file are 0.
- `sweep_refs.py --repo /tmp/ap-example-footer-color` reports zero
  unresolved targets out of 3820 references checked.
