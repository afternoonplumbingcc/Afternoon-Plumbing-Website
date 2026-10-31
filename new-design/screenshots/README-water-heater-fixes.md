# Visual evidence: Option C water heater page fixes

Captured 2026-10-31 with a headless Chromium.

- `before-*.png` comes from the live site (`https://afternoonplumbing.com/new-design/water-heater-home.html`),
  which was still serving the pre-fix CSS at `?v=3`.
- `after-*.png` comes from the local preview of the fixed tree.

Each pair shows the same section at the same width, so the difference is the fix and nothing else.

## Blockers

| Item | Before | After | What changed |
| --- | --- | --- | --- |
| B1 doubled FAQ glyph | `before-b1-faq-doubled-glyph-1440.png` | `after-b1-faq-single-glyph-1440.png` | The span carried a literal `+` and the CSS added a second one. The span is now empty and the `::before` rule owns the glyph. Open state flips it to a single minus. |
| B1 closed state | `before-b1-faq-doubled-glyph-closed-1440.png` | `after-b1-faq-single-glyph-closed-1440.png` | Same fix, closed accordion. |
| B2 reviews head misaligned | `before-b2-reviews-head-misaligned-1440.png` | `after-b2-reviews-head-aligned-1440.png` | The header had its own `72rem` max-width with `margin:auto`, putting it 40px right of the carousel track. It now shares the content column. |
| B3 town grid orphan at 1024 | `before-b3-town-grid-orphan-1024.png` | `after-b3-town-grid-1024.png` | `auto-fit` landed on 3 columns and stranded the fourth card. Now an explicit 4 across, then 2 by 2. |
| B3 town grid orphan at 900 | `before-b3-town-grid-orphan-900.png` | `after-b3-town-grid-900.png` | Same fix at 900. |
| B3 town grid orphan at 768 | `before-b3-town-grid-orphan-768.png` | `after-b3-town-grid-768.png` | Same fix at 768. |
| B3 town grid orphan at 480 | `before-b3-town-grid-orphan-480.png` | `after-b3-town-grid-480.png` | Same fix at 480. |

## Polish

| Item | Before | After | What changed |
| --- | --- | --- | --- |
| P4 FAQ answer no padding | `before-p4-faq-answer-no-padding-1440.png` | `after-p4-faq-answer-padding-1440.png` | The open answer had `0` top padding and no rule, so it butted against the summary. Now 20px top padding plus a hairline, and the panel reads as one card. |
| P5 trust band hole at 768 | `before-p5-trust-band-hole-768.png` | `after-p5-trust-band-768.png` | Five items in two columns left the fifth alone in the left half. Now a six track layout that fills both rows. |
| P5 trust band cramped at 1024 | `before-p5-trust-band-cramped-1024.png` | `after-p5-trust-band-1024.png` | Five across at 1024 made every second item wrap. The switch moved up to 1100px. |
| P6 Inter never loaded | `before-p6-inter-not-loaded-1440.png` | `after-p6-inter-loaded-1440.png` | The page declared Inter but never requested it, so body copy fell back to the system sans. Inter is now requested from Google Fonts and resolves as a distinct face. |
| P7 orange contrast | `before-p7-orange-contrast-1440.png` | `after-p7-orange-contrast-1440.png` | The brand orange read 2.61 to 2.85 against light backgrounds. Orange text now uses a darker step that clears 4.5:1. The fill orange was darkened so the white button label still passes. |
| P8 hero crop cut at 1440 | `before-p8-hero-crop-cut-1440.png` | `after-p8-hero-crop-1440.png` | A 591x1280 portrait photo was forced into a landscape slice that cut the tank in half. The frame is now 3:4 on desktop and 4:5 below 900px, with the crop anchored. |
| P8 hero crop cut at 390 | `before-p8-hero-crop-cut-390.png` | `after-p8-hero-crop-390.png` | Same fix at 390. |
| P8 hero crop cut at 320 | `before-p8-hero-crop-cut-320.png` | `after-p8-hero-crop-320.png` | Same fix at 320. |
| P9 service arrow orphan at 768 | `before-p9-service-arrow-orphan-768.png` | `after-p9-service-arrow-inline-768.png` | Below 900 the row collapsed to one column and the arrow fell under the description. The arrow now sits at the end of the title line at every width. |
| P9 service arrow orphan at 320 | `before-p9-service-arrow-orphan-320.png` | `after-p9-service-arrow-inline-320.png` | Same fix at 320. |
| P10 sticky bar at 320 | `before-p10-sticky-bar-320.png` | `after-p10-sticky-bar-320.png` | "Free estimate" wrapped to two lines while "Call us" stayed on one, so the buttons had different heights. Both now fit on one line at equal height, and the page has real clearance under the bar. |
| P10 sticky bar at 390 | `before-p10-sticky-bar-390.png` | `after-p10-sticky-bar-390.png` | Same fix at 390. |
| P11 heading orphan at 320 | `before-p11-heading-orphan-320.png` | `after-p11-heading-no-orphan-320.png` | The h1 stranded "crew" on its own line. The hero type is now fluid and balanced, so no single word is left alone at 320. |
| P11 heading orphan at 390 | `before-p11-heading-orphan-390.png` | `after-p11-heading-no-orphan-390.png` | Same fix at 390. |

## Checks behind these shots

- No horizontal overflow at 320, 360, 375, 390, 400, 480, 640, 768, 900, 1024, 1025, 1100, 1200, 1440, with the
  page's `overflow-x` clamp lifted so real overflow would show.
- No broken images and no page JavaScript errors at any of those widths.
- Static sweep: one H1, no em or en dashes, no dollar amounts, no phone numbers in body copy,
  JSON-LD parses as Service plus FAQPage plus BreadcrumbList, all seven FAQ questions and answers still
  match the schema word for word, meta title 60 characters, meta description 145 characters,
  `noindex` intact, robots.txt `Disallow: /new-design/` intact.
- Reviews carousel assertions unchanged and still green, covering the hover reveal, the pause button,
  the keyboard support, the reduced motion path, and the no-JS grid fallback.
