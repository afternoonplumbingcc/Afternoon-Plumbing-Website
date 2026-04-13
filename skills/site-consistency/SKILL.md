# Site Consistency & Code Review Skill

Maintain high-quality, consistent web projects through automated pre-commit review. This skill validates HTML, CSS, JavaScript, and content changes against your project's standards.

## Use When

- Before pushing changes to production
- After completing a feature or fix
- Periodically to audit the entire codebase
- When onboarding new contributors
- To enforce design system compliance

## What It Does

1. **Validates** HTML structure, semantic elements, and accessibility
2. **Checks** CSS for consistency, responsiveness, and design token adherence
3. **Audits** SEO elements (titles, meta descriptions, headings, alt text)
4. **Reviews** content quality and tone guidelines
5. **Verifies** performance considerations (image sizes, script loading)
6. **Logs** all reviews for tracking and improvement
7. **Asks** clarifying questions when requirements are ambiguous

## Usage

```
# Run a review on changed files
site-consistency review --files "index.html styles.css js/main.js"

# Review entire project
site-consistency audit

# Check specific commit
site-consistency review --commit HEAD~1

# Interactive mode (asks questions)
site-consistency review --interactive
```

## Configuration

Create a `.site-consistency.json` in your project root:

```json
{
  "project": "Afternoon Plumbing",
  "designSystem": {
    "primaryColor": "#0f4c81",
    "fontFamily": "Inter, system-ui, sans-serif",
    "maxWidth": "1200px",
    "borderRadius": "12px"
  },
  "seo": {
    "requiredMeta": ["title", "description", "viewport"],
    "maxTitleLength": 70,
    "maxDescriptionLength": 160
  },
  "accessibility": {
    "requireAltText": true,
    "minContrastRatio": 4.5,
    "requireAria": false
  },
  "performance": {
    "maxImageSizeKB": 150,
    "requireLazyLoading": true,
    "allowedFormats": ["jpg", "png", "webp", "svg"]
  },
  "content": {
    "tone": "professional, friendly, trustworthy",
    "avoid": ["guaranteed", "best", "#1"],
    "phoneNumber": "443-789-2897"
  }
}
```

## Reports

Reviews generate a structured report:

```
VERDICT: APPROVED | NEEDS REVISION | REJECTED

Summary:
- ✓ HTML structure valid
- ⚠ Missing alt text on 2 images
- ✗ Title exceeds 70 characters (78)

Details:
  line 45: <img> missing alt attribute
  line 12: <title> too long (78 chars)

Recommendations:
1. Add descriptive alt text to all images
2. Shorten title to include primary keyword first
```

Logs are saved to `memory/consistency-reviews.log` with timestamps.

## Integration

Add to your workflow:

**Pre-commit hook:**
```bash
#!/bin/bash
site-consistency review --files "$(git diff --cached --name-only)"
if [ $? -ne 0 ]; then
  echo "Review failed. Fix issues before committing."
  exit 1
fi
```

**CI/CD:**
```yaml
- name: Consistency Check
  run: site-consistency review --all
```

## Customization

Extend the review criteria by editing `scripts/review.js` or adding custom rules in `config/rules/`.

Common custom rules:
- Enforce brand voice guidelines
- Validate phone number format
- Check for outdated content
- Verify link hierarchy
- Ensure service area consistency

## Benefits

- **Consistency:** Every change meets your standards
- **Quality:** Catch regressions before they go live
- **Efficiency:** Automated checks save manual review time
- **Learning:** Logs help team understand expectations
- **Scalability:** Works across any number of pages

---

Start using it today: `site-consistency review --files <changed-files>`
