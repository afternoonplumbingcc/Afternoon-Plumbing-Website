# Afternoon Plumbing Website Audit
**Date:** April 7, 2026
**Site:** https://afternoonplumbing.com
**Focus Areas:** Technical SEO, Content, Performance, Mobile, Accessibility, Local SEO

---

## Executive Summary

The Afternoon Plumbing website is a well-structured, modern site built with React/Vite. It has solid foundations with responsive design, good schema markup, and clear service pages. However, there are several critical issues that need attention — particularly around image optimization, SEO consistency, and some technical debt.

**Priority Issues:**
1. Mixed HTML implementations (some React-built, some raw HTML) → inconsistent SEO
2. Large unoptimized images (some >1MB) → slow page speed
3. Multiple navigation systems → confusing UX
4. Missing structured data on service pages
5. Duplicate/barely-different service page content

---

## 1. Technical SEO

### ✅ Good
- All pages have unique titles and meta descriptions (mostly)
- Canonical URLs are present
- Mobile viewport meta tag is correct
- HTML5 doctype
- Schema.org LocalBusiness markup on homepage
- Google Tag Manager / GA4 tracking present
- SSL certificate (HTTPS)

### ⚠️ Issues

#### 1.1 Mixed Site Architecture
- **Homepage and some pages** are built with React/Vite (index.html, services.html, contact.html) using JavaScript rendering
- **Service pages** (hose-bib-replacement-westminster-md.html, water-softener-installation-westminster-md.html, etc.) are static HTML
- **Impact:** Search engines may not properly index React-rendered content without proper SSR. The static HTML pages are safer for SEO.

**Recommendation:** Consider moving all pages to static HTML for consistency and SEO reliability, or implement Server-Side Rendering (SSR) for React pages.

#### 1.2 Duplicate Navigation Systems
**File:** index.html (and others)
- There are at least 3 different navigation implementations:
  - `.home-mobile-menu` (mobile only)
  - `.unav` (unified nav)
  - `.site-nav` (final-shared-nav)
- Scripts: `addMobileMenu()`, `remapCenterNavLinks()`
- **Impact:** Code bloat, potential conflicts, inconsistent UX

**Recommendation:** Choose one navigation system and apply it consistently across all pages.

#### 1.3 Broken/Incomplete Scripts
In `index.html`:
- `initBeforeAfterFix()` references `.cursor-ew-resize` but no such element exists on homepage
- `fixBeforeImage()` looks for `before - old kitchen faucet` alt text — doesn't match actual before/after content on the site
- These scripts run on every page view unnecessarily → wasted resources

**Recommendation:** Remove unused scripts or scope them to pages where needed (like the hose bib page only).

#### 1.4 Sitemap
- ✅ Exists and includes all service pages
- ⚠️ Check that sitemap.xml is properly formed (truncated in file view)
- **Recommendation:** Validate sitemap at Google Search Console. Ensure all pages are listed and there are no errors.

#### 1.5 Robots.txt
- ✅ Basic robots.txt exists and allows all
- ⚠️ Consider adding a sitemap directive: `Sitemap: https://afternoonplumbing.com/sitemap.xml`
- **Recommendation:** Update robots.txt to include sitemap reference.

---

## 2. Content Quality

### ✅ Good
- Clear service descriptions
- Phone number prominently displayed
- Service area zip codes listed
- Local phone number (443-789-2897) consistent

### ⚠️ Issues

#### 2.1 Duplicate Content Across Service Pages
Many service pages (water-heater, well-pump, water-softener, acid-neutralizer, hose-bib) follow identical structure:
- Same paragraphs about "clean replacement work" and "testing"
- Same service area list
- Identical CTA buttons
- **Impact:** Thin content, low uniqueness signals to Google

**Recommendation:** Add service-specific details:
- Specific brands/models you install
- Unique benefits for each service
- Case studies or job examples
- FAQs tailored to each service

#### 2.2 Missing H1 on Service Pages??
Static HTML service pages (hose-bib, water-softener, etc.) use `<h1>Frost-Free Hose Bib Replacement in Westminster, MD</h1>` — ✅ they have H1.

React pages: Need to verify H1 exists and is unique. Check `index.html` and `services.html` for proper H1 structure.

**Recommendation:** Ensure every page has exactly one `<h1>` with primary keyword + location.

#### 2.3 Thin Content on Some Pages
- `contact.html` is minimal — no directions, hours, or additional trust signals
- Service pages could be 2-3x longer with helpful content

**Recommendation:** Expand content with:
- What to expect during service
- Preparation steps for customers
- Warranty information
- Before/after photos (you're adding these!)
- Customer testimonials specific to that service

---

## 3. Performance & Images

### ❌ Critical Issues

#### 3.1 Images Are Huge
```
-rw-r--r-- 1 root root 1010K Mar 22 18:45 ADA Bathroom showing off bathroom fau
-rw-r--r-- 1 root root  989K Mar 22 18:45 Home Improve...
-rw-r--r-- 1 root root  943K Mar 22 18:45 Room Addition
... many images >500KB
```

Some images are >1MB. This is a **major performance issue** for mobile users.

**Recommendations:**
1. **Compress all images immediately** using ImageOptim, TinyPNG, or similar
2. Convert to WebP format with fallback
3. Add `loading="lazy"` to non-above-the-fold images (you have this on some)
4. Use responsive images (`srcset` attribute) so mobile downloads smaller versions
5. Target: keep images under 150KB each, preferably under 100KB

#### 3.2 Missing Image Alt Attributes?
- Quick check: images in static HTML pages have `alt` attributes ✅
- React pages: need to check dynamically rendered images

**Recommendation:** Audit all images for:
- Meaningful alt text (no "image1", "IMG_1234")
- Service-specific descriptions
- Include location: "Hose bib replacement before and after in Westminster MD"

---

## 4. Mobile Responsiveness

### ✅ Good
- Mobile navigation exists
- Viewport meta tag is correct
- CSS Grid/Flexbox used for layouts

### ⚠️ Issues

#### 4.1 Multiple Mobile Navs
- Same issue as above: 3 different nav implementations could conflict
- Mobile menu toggle (`.home-mobile-menu`) may not be accessible (missing ARIA)

**Recommendation:** Standardize on one nav, ensure keyboard accessible, add proper ARIA attributes (`aria-expanded`, `aria-controls`).

#### 4.2 Touch Targets
- Handle buttons on sliders are 48x48px ✅ (meets 44px minimum)
- Call buttons appear appropriately sized

---

## 5. Accessibility

### ✅ Good
- Some ARIA attributes on slider (role="slider", aria-valuenow)
- Semantic HTML structure
- Focus styles present on some elements

### ⚠️ Issues

#### 5.1 Missing Skip Links
No "Skip to content" link for keyboard users.

**Recommendation:** Add `<a href="#main" class="skip-link">Skip to main content</a>` at top of body.

#### 5.2 Color Contrast
- Some text colors on backgrounds may not meet AA 4.5:1 ratio
- Example: grey text `#667a8f` on white might be borderline (verify with tool)

**Recommendation:** Run full WCAG contrast audit. Use tools like axe or Lighthouse.

#### 5.3 Form Labels
- Contact form likely has labels, but need verification
- Ensure all inputs have associated `<label>` or `aria-label`

#### 5.4 Heading Structure
- Verify H1 → H2 → H3 hierarchy is logical on all pages
- No skipped levels

---

## 6. Local SEO

### ✅ Excellent

#### 6.1 LocalBusiness Schema
Homepage has excellent structured data:
```json
{
  "@type": "Plumber",
  "name": "Afternoon Plumbing",
  "telephone": "+1-443-789-2897",
  "address": { ... Westminster MD 21157 ... },
  "geo": { latitude, longitude },
  "sameAs": [ Google Maps link ]
}
```
✅ This is perfect. Keep it.

#### 6.2 Service Area Pages
- Dedicated pages for each service + location: `hose-bib-replacement-westminster-md.html`
- Good geo-targeting signals
- Include zip codes in content ✅

#### 6.3 Google Business Profile
- 10 reviews, all 5-star ✅
- Need to ensure NAP (Name, Address, Phone) consistency across site
- GBP linked in schema ✅

### ⚠️ Issues

#### 6.4 Missing City/Service Combo Pages
Current service pages are good, but consider expanding:
- Water softener installation Westminster MD (exists ✅)
- Water softener installation Taneytown MD (doesn't exist)
- Well pump replacement Manchester MD (doesn't exist)
- Serve nearby towns: Hampstead, Finksburg, New Windsor, Union Bridge, Sykesville, Keymar, Marriottsville

**Recommendation:** Create location-specific pages for each target town (2-3 pages per service) to capture long-tail local traffic.

---

## 7. Security

### ✅ Good
- HTTPS enforced (site loads on https://afternoonplumbing.com)
- No mixed content warnings likely
- No external script issues observed

### ⚠️ Considerations

#### 7.1 Security Headers
Missing recommended headers:
- `Content-Security-Policy`
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`

**Recommendation:** Add these via `.htaccess` or hosting config. Improves security posture.

#### 7.2 Third-Party Scripts
- Google Analytics (gtag.js)
- Meta Pixel (Facebook)
- Both are fine, but ensure they load async and don't block rendering
- Consider Google Tag Manager to consolidate

---

## 8. Conversion Rate Optimization

### ✅ Good
- Phone numbers are clickable (`tel:`) ✅
- CTA buttons prominent
- Contact form on contact.html

### ⚠️ Issues

#### 8.1 Call Tracking
- No call tracking (e.g., CallRail, CallTrackingMetrics)
- Can't attribute leads to source

**Recommendation:** Implement dynamic number insertion to track calls from website.

#### 8.2 Form Submissions
- Contact form likely sends email, but no confirmation shown
- Consider adding "Thank you" page after submission for tracking

#### 8.3 Urgency/Scarcity Elements
- "24/7 service" mentioned but not visually emphasized
- No trust badges (licensed, insured, bonded)
- No guarantees/warranty highlights

**Recommendation:** Add trust signals:
- "Licensed & Insured" badge
- Warranty information
- Response time guarantees ("We'll call back within 30 minutes")
- Testimonials with photos

---

## 9. Specific Page Audits

### 9.1 Homepage (index.html)
- ✅ Fast loading (mostly)
- ❌ Too many redundant scripts
- ❌ Large hero images (compress!)
- ✅ Good value prop
- ⚠️ Gallery section: ensure images are relevant to plumbing

**Recommendation:** Simplify scripts, compress images, add plumbing-specific portfolio images.

### 9.2 Service Pages (Static)
- ✅ Clear headings
- ✅ Phone CTA
- ❌ Thin content (expand each to 800-1000 words with unique info)
- ❌ No internal links between related services
- ❌ No FAQ section on each page (missed schema opportunity)

**Recommendation:** Add:
- "Related Services" section linking to other pages
- Service-specific FAQ with FAQPage schema
- More detailed process explanation

### 9.3 Contact Page (contact.html)
- ✅ Simple, clean
- ❌ No map embed (Google Maps iframe)
- ❌ No business hours listed
- ❌ No physical address displayed (only phone/email)
- ❌ No service area map or list of towns

**Recommendation:**
- Add embedded Google Map
- Show full address: 1315 Conquistador Dr, Westminster, MD 21157
- List hours: 24/7 for emergencies, regular hours M-F 8am-6pm
- Add list of all service area towns

---

## 10. Competitor Opportunities

Based on competitor analysis of top-ranking plumbers in Westminster MD:

### What Competitors Have (You May Lack):
- More content depth (2000+ words on service pages)
- Video content (explainer videos, truck shots)
- Online booking widget (Calendly/JoinMy)
- Live chat widget
- More customer reviews with photos
- Project galleries with detailed case studies
- Payment options displayed (financing, credit cards)
- Emergency response time promises
- Blog/Resources section with tips

### Your Advantages:
- Clean site design
- Good local schema
- 5-star reviews (quality over quantity)
- Before/after photos (in progress)

---

## Action Plan (Prioritized)

### Week 1: Critical fixes
1. **Compress all images** — immediate speed boost
2. **Remove unused scripts** from index.html (initBeforeAfterFix, fixBeforeImage — these belong on hose bib page only)
3. **Fix navigation inconsistency** — choose one nav system and stick with it
4. **Add sitemap directive** to robots.txt

### Week 2: SEO & Content
1. **Expand service page content** — add 300-500 unique words per page
2. **Add service-specific FAQ** with schema markup
3. **Create location pages** for Taneytown, Hampstead, Finksburg, etc.
4. **Add missing structured data** on non-homepage pages (Service, FAQ, LocalBusiness)

### Week 3: Performance & UX
1. **Implement lazy loading** for all below-fold images
2. **Add srcset responsive images** (or use a CDN that auto-generates)
3. **Convert images to WebP**
4. **Add skip navigation link**
5. **Verify mobile menu accessibility** (ARIA, keyboard nav)

### Month 2: Advanced
1. Set up **call tracking**
2. Add **Google Map embed** to contact page
3. Create **blog/resources section** with DIY tips
4. Add **trust badges** (licensed, insured, bonded, background-checked)
5. Implement **live chat** (outside of business hours: show response time promise)
6. Consider **SSR** for React pages or convert all to static HTML

---

## Tools to Use

- **Image Optimization:** TinyPNG, ImageOptim, Squoosh
- **SEO Audits:** Google Search Console, Ahrefs, SEMrush, Screaming Frog (free for 500 URLs)
- **Performance:** PageSpeed Insights, WebPageTest, Lighthouse
- **Accessibility:** axe DevTools, WAVE
- **Schema Testing:** Google Rich Results Test

---

## Appendix: Current Stats

- **Total HTML Pages:** 11
- **Total Images:** ~50+ (many >500KB)
- **Service Pages:** 6 core services (hose bib, water heater, water softener, well pump, acid neutralizer, laundry faucet)
- **Location Pages:** None currently beyond Westminster MD (all service pages target Westminster only)
- **Blog:** None
- **Reviews:** 10 Google reviews (all 5-star)
- **Schema:** LocalBusiness on homepage only

---

**Next Steps:** Would you like me to:
1. Compress all site images now?
2. Remove the unused scripts from index.html?
3. Start expanding one service page with unique content?
4. Add structured data to service pages?
5. Fix the navigation inconsistency?

Let me know where you'd like to begin.
