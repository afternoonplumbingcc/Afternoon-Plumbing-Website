# Visual evidence: example page polish pass (sandbox only)

Captured 2026-10-31 with a headless Chromium.

This is a polish pass on the sandbox page `new-design/water-heater-home.html`,
stacked on `feature/option-c-flat-stat-hero` (commit `f3e1bc4`). Nothing here is
published. The page stays `noindex, nofollow`, stays `Disallow`ed in
`robots.txt`, and stays out of `sitemap.xml` and the site nav.

- `before-q*.png` comes from the base commit `f3e1bc4`, served from a clean
  checkout of that tree.
- `after-q*.png` comes from this branch.

Each pair shows the same region at the same width, so the difference is the fix
and nothing else.

## What changed

| Item | Before | After | What changed |
| --- | --- | --- | --- |
| Q1 eyebrow consistency at 1440 | `before-q1-eyebrow-consistency-1440.png` | `after-q1-eyebrow-consistency-1440.png` | Three of the six section eyebrows rendered as large grey body copy instead of a small orange label. The `.nd-hm-head p` and map rules outranked the plain `.nd-hm-eyebrow` rule. The eyebrow selector now carries the body class so it wins the cascade, and all six read as 14px uppercase orange labels. The town card names also drop to a consistent 20px with a reserved two line height, so all four notes start on the same line. |
| Q2 CTA heading invisible at 1440 | `before-q2-cta-heading-visible-1440.png` | `after-q2-cta-heading-visible-1440.png` | The closing band heading was navy text on a navy background and was completely invisible. The body heading rule carries the body class and outranked the plain `.nd-hm-section-dark h2` rule. The white rule now matches the body class so it wins. The band is also centered, like the homepage "Ready to Get Started" block. |
| Q3 CTA heading invisible at 390 | `before-q3-cta-heading-visible-390.png` | `after-q3-cta-heading-visible-390.png` | Same fix at phone width. |
| Q4 hero heading balance at 1440 | `before-q4-hero-heading-balance-1440.png` | `after-q4-hero-heading-balance-1440.png` | The h1 ran 710px wide in a 710px column at 60px, so the line breaks were set by the column edge and the second line was close to a single word. The size cap dropped to 54px and the heading now carries a 12.5em measure, so it always breaks after "neighborhood" into two even lines. The lede measure tightened from 34rem to 32rem so the heading stays the widest element in the column. |
| Q4 hero heading balance at 768 | `before-q4-hero-heading-balance-768.png` | `after-q4-hero-heading-balance-768.png` | Same fix at 768. |
| Q4 hero heading balance at 390 | `before-q4-hero-heading-balance-390.png` | `after-q4-hero-heading-balance-390.png` | Same fix at 390. The lede also stopped orphaning "invoice." onto its own line, because body paragraphs now use `text-wrap:pretty` instead of `balance`. |
| Q5 hero trust rows at 390 | `before-q5-hero-trust-rows-390.png` | `after-q5-hero-trust-rows-390.png` | The checks row sat flush against the buttons with no space, and the two rows used different gap rhythms. Both rows now use the homepage step down from the buttons and a tighter step between the rows. |
| Q6 trust band even at 1440 | `before-q6-trust-band-even-1440.png` | `after-q6-trust-band-even-1440.png` | All five items are uniform two line blocks. |
| Q6 trust band even at 1200 | `before-q6-trust-band-even-1200.png` | `after-q6-trust-band-even-1200.png` | At 1200px the five column track was only 211px wide, so "Family owned and operated" wrapped to a third line and made the band uneven. The switch to the six track layout moved up from 1100px to 1220px, which gives every item room for one line per label. |
| Q6 trust band even at 1024 | `before-q6-trust-band-even-1024.png` | `after-q6-trust-band-even-1024.png` | Same fix at 1024. |
| Q6 trust band even at 768 | `before-q6-trust-band-even-768.png` | `after-q6-trust-band-even-768.png` | Same fix at 768. Both rows are completely filled. |
| Q7 town grid aligned at 1440 | `before-q7-town-grid-align-1440.png` | `after-q7-town-grid-align-1440.png` | "Taneytown and nearby" wrapped to two lines at 22px and pushed that card's note 27px lower than the other three. All four names now reserve the same height and all four notes and links line up. |
| Q7 town grid aligned at 480 | `before-q7-town-grid-align-480.png` | `after-q7-town-grid-align-480.png` | Same fix at 480, where the two column layout leaves about 156px of text room. The fix reserves a height rather than forcing `nowrap`, so the page does not push sideways. |
| Q8 reviews head centered at 1440 | `before-q8-reviews-head-centered-1440.png` | `after-q8-reviews-head-centered-1440.png` | The head was a left aligned block with the "Read all reviews on Google" button hanging off the bottom right corner, which read as an afterthought next to a centered heading on every other section. The head is now centered with the button under the copy, like the homepage reviews block. The inline style on the lede moved into a class so it is sized consistently with the other section ledes. |
| Q8 reviews head centered at 768 | `before-q8-reviews-head-centered-768.png` | `after-q8-reviews-head-centered-768.png` | Same fix at 768. |
| Q9 FAQ glyph aligned at 1440 | `before-q9-faq-glyph-align-1440.png` | `after-q9-faq-glyph-align-1440.png` | The plus and the minus sat in slightly different columns and the open and closed rows did not line up. The glyph span now has an explicit width and the `::before` rule is a block, so both glyphs sit in the same column at every width. |
| Q10 service rows at 1440 | `before-q10-service-rows-1440.png` | `after-q10-service-rows-1440.png` | The service rows are unchanged. The arrow was already inline at the end of the title line and the descriptions already share a 60ch measure, so the rows needed no work. This pair is the before and after for the record. |

## Checks behind these shots

- No horizontal overflow at 320, 360, 390, 480, 640, 768, 900, 1024, 1200, and 1440, with the
  page's `overflow-x` clamp lifted so real overflow would show. The 480px case caught a real
  overflow during the pass: a `white-space:nowrap` on the town card names pushed the document
  to 525px in a 480px viewport. That rule was replaced with a reserved height.
- Exactly one H1 at every width.
- No broken images at every width.
- No console errors from local resources at every width. The only failed requests are the
  third party Google Fonts stylesheet, the Google Maps embed, Google Analytics, and the
  Facebook pixel, all of which are outside the page's own resources.
- The sticky mobile call bar is clear of the page content at full scroll at 320, 360, 390,
  480, 640, and 768. The footer clears the bar by 52 to 56px.
- Grep gates: `backdrop-filter` count in `new-design/styles/water-heater-home.css` is 0.
  Em dash, en dash, and dollar counts on the page are all 0. H1 count is exactly 1.
- `sweep_refs.py --repo /tmp/ap-example-polish` reports zero unresolved targets
  out of 3380 references checked.
- The page still carries `noindex, nofollow` and `robots.txt` still has
  `Disallow: /new-design/`. `sitemap.xml` has no `new-design` entry.
