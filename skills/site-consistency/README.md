# Site Consistency Skill for OpenClaw

Automated quality assurance for web projects. Validates HTML, CSS, JS, and content against your project's standards.

## Quick Start

```bash
# Navigate to your project
cd /path/to/afternoon-plumbing-website

# Run a review on staged changes (pre-commit)
site-consistency review

# Review specific files
site-consistency review --files "hose-bib-replacement-westminster-md.html,styles.css"

# Full project audit
site-consistency audit --all

# Interactive mode with questions
site-consistency review --interactive
```

## Configuration

Create `.site-consistency.json` in your project root (see `sample-config.json`).

The skill automatically loads this config and validates against your custom rules.

## Integration with OpenClaw

This skill runs as a persistent subagent when invoked. It maintains a review log in `memory/consistency-reviews.log`.

To use in your workflow:

1. **Manual review before commit:**
   ```bash
   site-consistency review --files "$(git diff --cached --name-only)"
   ```

2. **Git hook (automatic):**
   Create `.git/hooks/pre-commit`:
   ```bash
   #!/bin/bash
   site-consistency review --files "$(git diff --cached --name-only)" > /dev/null 2>&1
   if [ $? -ne 0 ]; then
     echo "Consistency check failed. Fix issues before committing."
     exit 1
   fi
   ```
   Then: `chmod +x .git/hooks/pre-commit`

3. **CI/CD:**
   ```yaml
   - name: Site Consistency Check
     run: site-consistency review --all
   ```

## What Gets Checked

- ✅ HTML validity (DOCTYPE, charset, viewport)
- ✅ Meta tags (title length, description length)
- ✅ Heading structure (H1 count, hierarchy)
- ✅ Image alt attributes
- ✅ Lazy loading on images
- ✅ CSS health (!important abuse, vendor prefixes, universal selector)
- ✅ JavaScript hygiene (console.log, eval)
- ✅ Design system compliance (colors, fonts, spacing)
- ✅ Accessibility basics
- ✅ Performance warnings

## Sample Output

```
Reviewing 3 file(s) for Afternoon Plumbing

  ✓ index.html
  ⚠ hose-bib-replacement-westminster-md.html
    45: Image missing alt attribute
    12: Title too long (78 chars, max 70)
    78: Many inline styles (15) — consider moving to CSS classes
  ✓ styles.css

Summary:
  Files reviewed: 3
  Files with issues: 1
  Total issues: 3

VERDICT: NEEDS REVISION — Review warnings and improve
```

## Logs

All reviews are logged to `memory/consistency-reviews.log` with timestamps and issue counts. Useful for tracking improvement over time.

## Extending

Add custom rules by editing `scripts/review.js`. Common extensions:

- Check for brand-specific terminology
- Validate phone number format
- Ensure service area consistency
- Verify schema markup presence
- Check for broken internal links

## Benefits

- **Consistent quality** across all pages
- **Catch regressions** before they go live
- **Speed up code reviews** by automating routine checks
- **Onboard new developers** with clear standards
- **Maintain design system** integrity as site grows

---

**Questions?** Check the example config in `sample-config.json` or modify `review.js` to add custom checks.
