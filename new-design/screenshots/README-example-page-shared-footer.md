# Visual evidence: shared footer on the sandbox example page

Captured 2026-10-31 with a headless Chromium, served locally from the
`/tmp/ap-example-footer` worktree.

This is a sandbox only change on `feature/example-page-shared-footer`
(commit `1b2d0fc`), stacked on `feature/integrate-footer-prerender`
(`c7427dc`). Nothing here is published. The page stays `noindex, nofollow`,
stays `Disallow`ed in `robots.txt`, and stays out of `sitemap.xml` and the
site nav.

- `before-q11-*.png` comes from the base commit `c7427dc`, served from a
  clean checkout of that tree.
- `after-q11-shared-footer-*.png` comes from this branch, footer region on
  `new-design/water-heater-home.html`.
- `after-q11-shared-footer-production-*.png` comes from this branch, footer
  region on `services/well-pumps.html`, a production page, for side by side
  comparison at the same width.

## What changed

The example page carried the legacy `<footer class="site-footer">` block,
33 lines of its own markup with a "Quick links" list and no "All services"
grid. Every production page already carries the unified footer generated
from `partials/footer.part`. The two sandbox pages now carry that same
markup.

| Item | Before | After | What changed |
| --- | --- | --- | --- |
| Footer at 1440 | `before-q11-shared-footer-1440.png` | `after-q11-shared-footer-1440.png` | The legacy three column footer with a short link list is replaced by the shared footer: the about block with the full service area note, the "Explore the site" plus "Legal" link groups, and the full "All services" grid in four groups. Layout, panel radius, button styling and link colour now match the production pages. |
| Footer at 768 | `before-q11-shared-footer-768.png` | `after-q11-shared-footer-768.png` | Same swap at tablet width. The shared footer keeps two columns here rather than collapsing to one long stack. |
| Footer at 390 | `before-q11-shared-footer-390.png` | `after-q11-shared-footer-390.png` | Same swap at phone width. The shared footer stacks to one column and runs longer than the legacy footer, which is the same behaviour the 36 production pages have. |
| Production comparison at 1440 | n/a | `after-q11-shared-footer-production-1440.png` | The example footer and the production footer now render identically: same column tracks (435 / 322 / 341 px inside a 1180 px shell), same headings, same link list, same orange call button, same navy link colour. |
| Production comparison at 768 | n/a | `after-q11-shared-footer-production-768.png` | Same at tablet width. |
| Production comparison at 390 | n/a | `after-q11-shared-footer-production-390.png` | Same at phone width. |

## Checks behind these shots

- The footer block on `new-design/water-heater-home.html` and
  `new-design/seo-kit-exemplar.html` is byte identical to the footer block on
  `services/well-pumps.html` and to the markup between the markers in
  `partials/footer.part`. All 38 pages hash to
  `c37e0a321a05da5079205036947a37faa1634aa95057651f3f4b127b15bc74e1`.
- The 36 production pages carry the same single hash and none of their
  footers changed in this commit.
- `new-design/water-heater-home.html` at 390, 768 and 1440: no horizontal
  overflow, exactly one H1, zero broken images, footer link computed colour
  `rgb(26, 58, 92)`, which is the brand navy the shared CSS sets.
- No console errors from local resources. The only failed requests are the
  third party Google Fonts stylesheet, the Google Maps embed, Google
  Analytics and the Facebook pixel, all outside the page's own resources.
- The sticky bar on the example page does not cover any footer link at full
  scroll at 390 or 768. Same result as the production page.
- Em dash, en dash and dollar counts on both changed pages are 0.
- `sweep_refs.py --repo /tmp/ap-example-footer` reports zero unresolved
  targets out of 3820 references checked.
- Every one of the 23 footer links resolves on the example page: 20 root
  relative paths, plus the `tel:`, `sms:` and `mailto:` actions.
