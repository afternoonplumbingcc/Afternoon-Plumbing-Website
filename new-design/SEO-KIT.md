# Afternoon Plumbing SEO Kit

The reusable spec for a service page that ranks, reads like a neighbor wrote it, and
survives a Google rich-result check. The reference implementation is
[`seo-kit-exemplar.html`](./seo-kit-exemplar.html) with
[`styles/seo-kit-exemplar.css`](./styles/seo-kit-exemplar.css).

Status: **spec only**. The exemplar is a sandbox page under `/new-design/`, which is
`noindex, nofollow` and `Disallow`ed in `robots.txt`. Nothing here is published to a
production URL until Chris approves the rollout.

---

## 1. Why a kit

There are 14 production service pages. Rewriting each one from scratch produces 14
different page shapes, 14 different schema dialects, and 14 different FAQ treatments.
Google rewards consistency and punishes drift. The kit fixes the **block order**, the
**schema shape**, and the **house rules** so every service page is structurally the same
page with different words in it.

The kit is a template, not a word bank. Every string on every service page is written
for that service. The only things that repeat across pages are the trust facts and the
process shape, and those repeat because they are true for the whole business.

---

## 2. Block order

The page is a fixed sequence of sections. Do not reorder, do not skip, do not add a
section in the middle. A reviewer can check the kit by reading the page top to bottom
and confirming each block is present once, in this order.

| # | Block | Class | What it must contain |
|---|---|---|---|
| 1 | Breadcrumb nav | `.sk-crumbs` | Home / Services / current service. Mirrors the `BreadcrumbList` schema exactly. |
| 2 | H1 | `.sk-h1` | Exactly one. `<service> in <town>, <ST>` format. Never the company name. |
| 3 | Problem-first intro | `.sk-intro` | 40 to 60 words that answer the query in the first sentence. |
| 4 | Hero CTAs | `.sk-btn-row` | "Request a free estimate" plus one phone CTA. |
| 5 | Trust band | `.sk-trust` | The five house facts, always the same five, plus a "Reviewed by" line with a date. |
| 6 | Symptom to cause to fix grid | `.sk-scf` | 4 to 6 rows, three columns: what you notice, what usually causes it, what we do. |
| 7 | Repair vs replace fork | `.sk-fork` | Two panels, each with its own CTA. |
| 8 | Numbered process | `.sk-steps` | 4 to 6 steps, each with a number, title, and one or two sentences. |
| 9 | Service area | `.sk-towns` | The 11 towns as visible text, each linking to its service-area page. |
| 10 | FAQ accordion | `.sk-faq` | 8 to 12 `<details>` items, service specific. |
| 11 | Service area map | `.sk-map-grid` | The real Google Maps embed, the same one the homepage uses. |
| 12 | Real job photos | `.sk-photos` | 2 or 3 real Afternoon Plumbing job photos with honest alt text. |
| 13 | Final CTA | `.sk-cta-inner` | Close plus a link into `/faq/faq.html`. |

The order is deliberate:

- **Problem first.** A homeowner searching "water heater replacement Westminster MD"
  wants to know if this page is for them before they want a phone number.
- **Trust before the sales content.** The five facts answer "should I trust this
  company" before the page starts arguing for a repair decision.
- **Decision support before the ask.** The fork and the symptom grid do the
  persuading. The final CTA only collects the lead that the earlier blocks earned.
- **FAQ after the body.** The FAQ answers the questions a reader has after reading
  the page, and it feeds the rich result. Putting it above the body reads like a
  keyword dump.

---

## 3. The JSON-LD pattern

One `<script type="application/ld+json">` block per page, one `@graph` with three
nodes. Do not split it into three separate script tags.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Service",     "@id": "<PAGE_URL>#service" },
    { "@type": "FAQPage",     "@id": "<PAGE_URL>#faq" },
    { "@type": "BreadcrumbList", "@id": "<PAGE_URL>#breadcrumbs" }
  ]
}
```

### 3.1 Service node

Required keys, in this order:

```json
{
  "@type": "Service",
  "@id": "https://afternoonplumbing.com/<PAGE_PATH>#service",
  "name": "<Service> in <Town>, <ST>",
  "description": "<2 sentence description of the service and where it runs>",
  "url": "https://afternoonplumbing.com/<PAGE_PATH>",
  "serviceType": "<Service>",
  "provider": { "@id": "https://afternoonplumbing.com/#plumber" },
  "areaServed": [ { "@type": "City", "name": "<Town>" }, ... ],
  "offers": { "@type": "Offer", "priceRange": "<no dollar amount>" },
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "44" },
  "dateModified": "YYYY-MM-DD"
}
```

Rules:

- **`areaServed` is an array of `City` objects**, not a string. One entry per town the
  page actually serves. A single comma-joined string loses the city granularity.
- **`offers.priceRange` carries no dollar amount.** Use a phrase like
  `"Free estimate, varies by job, quoted upfront"`. Never `"$"`, `"$$"`, or a number.
- **`provider` is a reference to the site-level `#plumber` node**, not a duplicate
  inline `LocalBusiness`. The business node lives once, on the homepage.
- **`aggregateRating` uses the real numbers**: 5.0 stars across 44 Google reviews.
  Only include this if the business has real reviews. It does.
- **`dateModified` is the date the copy was last reviewed**, ISO `YYYY-MM-DD`. It must
  match the visible "Reviewed by" line. If the visible line says a different date than
  the schema, the page is wrong.

### 3.2 FAQPage node

```json
{
  "@type": "FAQPage",
  "@id": "https://afternoonplumbing.com/<PAGE_PATH>#faq",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "<question text, identical to the visible summary>",
      "acceptedAnswer": { "@type": "Answer", "text": "<answer text, identical to the visible paragraph>" }
    }
  ]
}
```

The question and answer strings must be **byte for byte identical** to the visible
accordion. Not paraphrased, not stripped of punctuation, not a different casing of the
same sentence. Google compares the rendered page to the schema. When they disagree,
the rich result is dropped and it looks like cheating. Copy-paste is the correct
method: write the visible answer first, then paste it into the JSON.

### 3.3 BreadcrumbList node

```json
{
  "@type": "BreadcrumbList",
  "@id": "https://afternoonplumbing.com/<PAGE_PATH>#breadcrumbs",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home",        "item": "https://afternoonplumbing.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services",    "item": "https://afternoonplumbing.com/services.html" },
    { "@type": "ListItem", "position": 3, "name": "<Service>",   "item": "https://afternoonplumbing.com/<PAGE_PATH>" }
  ]
}
```

Three levels on every service page. The visible `.sk-crumbs` nav mirrors it.

### 3.4 The "Reviewed by" line

The trust band ends with a visible line like:

```
Reviewed by Afternoon Plumbing on October 31, 2026.
```

This is the trust signal that the copy is not generated filler, and it is the anchor
for `dateModified`. The two must agree. Same page, same date, every time.

---

## 4. House rules (hard constraints)

These are not style preferences. They are the constraints that protect the site's
search standing and its credibility.

1. **No dollar amounts in customer-facing copy.** No `$`, no "$299", no "from $99".
   The estimate is quoted per job. Pricing lives in the pricing sheet, not on the
   page. This also applies to `priceRange` in the schema.
2. **No em dashes and no en dashes.** Hyphens and commas only. Google renders the
   em dash as a mojibake in some snippets, and it reads as machine written. This
   includes the schema strings, not just the visible copy.
3. **No phone numbers in body copy.** Phone numbers appear in the nav, the drawer,
   the footer, and the buttons, the same way they do on every other page. Never
   inside a paragraph, a list item, or an FAQ answer.
4. **Real photos only.** Every job photo is an actual Afternoon Plumbing job in
   `/images/`. No stock, no placeholders, no AI-generated plumbing. If a service has
   no real photo yet, use fewer photos, not fake ones.
5. **No invented reviews and no invented job claims.** The rating numbers are the real
   Google numbers. Do not fabricate a customer, a quote, a job date, or a job detail
   that a photo does not show.
6. **Exactly one H1.** The H1 is `<service> in <town>, <ST>`. Every other heading is
   H2 or H3.
7. **Every image has `alt`, `width`, `height`, and `loading="lazy"`** (except the
   hero image, which is `loading="eager"` because it is above the fold). Alt text
   describes what is actually in the frame, not a keyword.

---

## 5. The trust band, fixed

Same five facts, same wording, on every service page. They are business facts, not
page copy, so they do not need to vary.

| Fact | Sub line |
|---|---|
| Licensed Master Plumber #17734 | Maryland state licensed |
| Family owned since 2003 | Bryant and Christopher |
| Fully insured | On every job we take |
| 5.0 stars, 44 Google reviews | Rated by homeowners |
| 1 year labor warranty | On the work we do |

Plus the "Reviewed by" line with the review date.

If any of these facts changes, change them on every service page in the same pass.
A trust band that says 42 reviews on one page and 44 on another is a credibility leak.

---

## 6. The 11 towns

The service area block lists all 11 towns as visible linked text, in this order:

Westminster, Manchester, Hampstead, Finksburg, New Windsor, Union Bridge, Sykesville,
Eldersburg, Upperco, Owings Mills, Ellicott City

Each links to its own service-area page:

| Town | Link |
|---|---|
| Westminster | `/service-area/westminster-plumber.html` |
| Manchester | `/service-area/manchester-plumber.html` |
| Hampstead | `/service-area/hampstead-plumber.html` |
| Finksburg | `/service-area/finksburg-plumber.html` |
| New Windsor | `/service-area/new-windsor-plumber.html` |
| Union Bridge | `/service-area/union-bridge-plumber.html` |
| Sykesville | `/service-area/sykesville-plumber.html` |
| Eldersburg | `/service-area/eldersburg-plumber.html` |
| Upperco | `/service-area/upperco-plumber.html` |
| Owings Mills | `/service-area/owings-mills-plumber.html` |
| Ellicott City | `/service-area/ellicott-city-plumber.html` |

The same 11 towns appear in the `areaServed` array in the schema, in the same order.

---

## 7. The FAQ, service specific

8 to 12 questions per service page. They must be questions a homeowner in that
service would actually ask, and the answers must be specific enough to be useful.
A generic FAQ block that could sit on any service page is a content liability.

The exemplar covers, in order:

1. Repair or replace
2. Same-day replacement availability
3. Tank versus tankless
4. Heat pump water heaters in Maryland
5. Permit requirements
6. What the free estimate covers
7. Water heater lifespan
8. Flushing and maintenance
9. Anode rod replacement
10. Sizing a tank
11. Warranty coverage
12. Emergency availability

For other services, keep the shape and swap the content. A well pump page gets well
water pressure, dry running, and pit pump questions. A water softener page gets resin
replacement, brine line, and sizing questions. The rule is that each answer names the
specific part, tool, or symptom of that system.

---

## 8. Reviewer checklist

Run this against any service page. Every line must pass. A page that fails any line
is not kit-compliant.

### Structure

- [ ] Exactly one `<h1>`, and it reads `<service> in <town>, <ST>`.
- [ ] Blocks appear in the order in section 2, each exactly once.
- [ ] No `h2` is skipped. Heading levels go h1, h2, h3 with nothing skipped.
- [ ] The breadcrumb nav is visible and matches the `BreadcrumbList` schema.

### Schema

- [ ] Exactly one `application/ld+json` script, and it parses as valid JSON.
- [ ] It has a single `@graph` with exactly three nodes: `Service`, `FAQPage`,
      `BreadcrumbList`.
- [ ] `Service.areaServed` is an array of `City` objects, one per served town.
- [ ] `Service.offers.priceRange` contains no dollar sign and no digits.
- [ ] `Service.provider` references `https://afternoonplumbing.com/#plumber`.
- [ ] `Service.aggregateRating` matches the real current rating and review count.
- [ ] `Service.dateModified` is ISO `YYYY-MM-DD` and matches the visible
      "Reviewed by" date.
- [ ] `FAQPage.mainEntity` has one entry per visible `<details>`.
- [ ] Every FAQ question and answer string is byte for byte identical to the visible
      accordion text.
- [ ] `BreadcrumbList` has three `ListItem` entries with `position` 1, 2, 3.

### Content

- [ ] The intro answers the query in its first 60 words.
- [ ] The symptom grid has 4 to 6 rows and three columns.
- [ ] The fork has two panels and two distinct CTAs.
- [ ] The process has 4 to 6 numbered steps.
- [ ] All 11 towns are visible text and each links to its service-area page.
- [ ] The FAQ has 8 to 12 items.
- [ ] The map block uses the real Google Maps embed from the homepage.
- [ ] The final CTA links to `/faq/faq.html`.

### Trust and photos

- [ ] The trust band carries exactly the five facts from section 5.
- [ ] The "Reviewed by" line and `dateModified` agree.
- [ ] 2 or 3 job photos, all real AP jobs, all with descriptive alt text.
- [ ] Every photo has `loading="lazy"` and `width` and `height`.
- [ ] The hero image has `loading="eager"` and `width` and `height`.

### House rules

- [ ] No `$` anywhere in the page.
- [ ] No em dash and no en dash anywhere in the page.
- [ ] No phone number in body copy, list items, or FAQ answers.
- [ ] No invented reviews, ratings, or job claims.

### Technical

- [ ] Meta title is under 70 characters.
- [ ] Meta description is under 160 characters.
- [ ] Every image target resolves (no 404).
- [ ] Every internal link resolves.
- [ ] No horizontal overflow at 320, 375, 768, 1024, or 1440 pixels wide.
- [ ] No JavaScript console errors.
- [ ] If the page lives under `/new-design/`, it has `<meta name="robots"
      content="noindex, nofollow">` and `/new-design/` stays `Disallow` in
      `robots.txt`.

---

## 9. Rolling the kit out to the 14 production service pages

The kit is designed to be applied one page at a time, in this order:

1. Copy `styles/seo-kit-exemplar.css` to a shared page stylesheet once, so all 14
   pages share one file rather than 14 copies.
2. For each service page, rebuild the blocks in kit order and pull the house facts
   from section 5.
3. Write the FAQ answers first, paste them into both the visible accordion and the
   schema.
4. Run the section 8 checklist against the page.
5. Ship one page, watch the Search Console rich result for a week, then move on.

Do not batch all 14 at once. One page at a time means a mistake costs one page
instead of fourteen.

---

## 10. Known rough edges

Things that were awkward while building the exemplar, written down so the next person
does not rediscover them:

- **The FAQ answer wrapper name.** The HTML uses `.sk-faq-answer`, the CSS originally
  used `.sk-faq-body`. Both are styled. Pick one name and drop the alias before the
  kit rolls out to production.
- **The symptom grid needs a modifier per column.** The three cells share a base
  `.sk-scf-cell` class and each also carries `.sk-scf-symptom`, `.sk-scf-cause`, or
  `.sk-scf-fix`. On mobile the base class is hidden and the inline `.sk-scf-label`
  span takes over as the visible column label, so the stacked rows still read as
  three labeled fields rather than a wall of text.
- **`offers.priceRange` without a dollar amount is unusual.** It is deliberate here,
  because the house rule bans dollar amounts in customer-facing copy and the schema
  string is customer-facing in the sense that Google can display it. If Google ever
  complains about the missing price, the fix is a single keyword range, not a dollar
  amount.
- **`aggregateRating` is a liability if the review count goes stale.** It says 44
  right now. Every service page has to be updated when the real count changes, or the
  structured data starts contradicting the live profile.
