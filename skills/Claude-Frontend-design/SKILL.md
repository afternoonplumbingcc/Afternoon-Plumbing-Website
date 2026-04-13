---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- Purpose: What problem does this interface solve? Who uses it?
- Tone: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- Constraints: Technical requirements (framework, performance, accessibility).
- Differentiation: What makes this UNFORGETTABLE? What's the one thing someone will remember?

CRITICAL: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- Spatial Composition: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- Backgrounds & Visual Details: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

## Implementation Fidelity Rule (Critical)

IMPORTANT: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.

## Afternoon Plumbing Website Rules (Critical)

When working on the Afternoon Plumbing website, obey these rules unless the user explicitly overrides them.

### 1. Mobile-first by default
- Start design decisions from phone layout first, then scale up to tablet and desktop.
- Prioritize thumb-friendly spacing, fast scanning, clear call buttons, and easy navigation on small screens.
- Do not design desktop-first and compress it afterward.

### 2. Homepage is the visual source of truth
- Treat the homepage as the primary visual reference for the rest of the site.
- Borrow its visual language: color palette, spacing rhythm, card feel, hover behavior, CTA tone, nav feel, and overall polish.
- Do NOT casually redesign the homepage when the user asks for edits to other pages.
- For non-home pages, rebuild the feel in clean HTML/CSS instead of forcing the compiled homepage bundle patterns everywhere.

### 3. Shared nav consistency is mandatory
- Use one nav style across the whole website unless the user explicitly asks for a page-specific exception.
- Keep logo placement, spacing, text sizing, hover behavior, mobile behavior, and call button style consistent.
- Do not invent a new nav treatment page by page.
- Before shipping edits, compare the target page nav to the current site standard and normalize if needed.

### 4. Keep service pages focused
- Service pages should behave like service hubs, not cluttered mixed-purpose landing pages.
- Avoid mixing too many competing sections like service cards, blog feeds, project galleries, and FAQ blocks at equal visual weight unless strategically justified.
- Prefer clear hierarchy: hero → core services → specialty/supporting section → service area → FAQ → CTA.
- When creating or heavily revising a service page, check whether that service already has a relevant FAQ block on the page.
- If the service page does not have a strong, service-specific FAQ section, ask the user targeted questions and answers first instead of inventing the FAQ content.
- Build the FAQ from the user's real answers when possible, then add it to the service page.
- After creating or improving the FAQ on a service page, add or verify an internal link to the matching section on `/faq.html` when relevant.

### 5. Image handling and focal-point control are mandatory
- Never assume `object-fit: cover` alone is good enough.
- Check whether the actual subject is cut off, especially for tall water heaters, faucets, fixtures, and utility-room equipment.
- Use `object-position`, alternate aspect ratios, or purpose-specific image containers when needed.
- If the image still fails compositionally, flag it for a manually cropped or alternate version instead of pretending it looks fine.
- Prioritize showing the real subject cleanly over forcing every image into the same card crop.

### 6. Accuracy over convenience
- Match image, heading, and copy correctly.
- Do not label filtration imagery as softener work unless it is truly accurate.
- Do not use unrelated images that weaken trust.
- For authentic business credibility, visual correctness matters.

### 7. Authentic content only
- Never invent fake jobs, fake project pages, fake customer stories, fake reviews, or fake daily updates.
- Only create content from real services, real jobs, real locations, real photos, or clearly user-approved marketing copy.
- Website freshness should come from meaningful improvements and real project publishing, not filler content.

### 8. SEO should support trust, not clutter
- Improve headings, internal linking, service clarity, metadata, and service-area relevance.
- Do not add sections just because they might sound SEO-friendly if they make the page weaker or less professional.
- A cleaner, clearer page is often better for both users and SEO.

### 9. Reuse systems, not improvisation
- Prefer shared page shells, shared cards, shared CTA patterns, and shared FAQ patterns.
- Reduce one-off page-level inventions unless there is a strong reason.
- The goal is a site that feels like one business with one design system.

### 10. Preview before push when design changes are significant
- For meaningful visual changes, generate a preview/screenshot before pushing whenever practical.
- Use the preview to catch spacing problems, nav drift, image cropping issues, and mobile layout problems before they go live.

### 11. Update sitemap and LLM index files when relevant
- Whenever a website change adds, removes, renames, or meaningfully changes a crawlable page, evaluate whether `sitemap.xml` should be updated.
- Whenever a website change meaningfully affects site structure, service positioning, FAQ coverage, or AI-readable business information, evaluate whether `llm.txt` and `llms.txt` should be updated.
- Do not treat these files as one-time setup artifacts. Keep them current when relevant changes are made.
- If no update is needed, make that a conscious check rather than ignoring the files.

## Afternoon Plumbing Default Implementation Checklist

Before finalizing website changes, check:
- Is the result mobile-first?
- Does the nav match the site standard?
- Does it feel visually aligned with the homepage?
- Are images showing the real subject properly?
- Is the page cleaner and more conversion-friendly than before?
- Is the content authentic and accurate?
- Did SEO improvements avoid making the design feel cluttered?
- Should `sitemap.xml` be updated?
- Should `llm.txt` / `llms.txt` be updated?
