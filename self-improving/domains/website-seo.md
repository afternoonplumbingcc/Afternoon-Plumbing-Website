# Website + SEO Domain Patterns

**Domain:** Afternoon Plumbing website and local SEO growth

## Key Patterns

1. **Scheduled website review** - Run weekly on Tuesdays/Saturdays:
   - Add active nav state (`aria-current="page"`) to service pages
   - Expand page titles to include business name for SEO clarity
   - Add FAQ sections with FAQPage schema on service pages
   - Strengthen internal linking from project pages to main service pages

2. **Non-homepage consistency pass** - After major redesign decisions:
   - Standardize nav/footer shell using shared CSS (`glass-site.css`)
   - Replace plain-text email with email CTA/chip in footers
   - Ensure consistent phone CTA placement and styling
   - Fix broken image paths in service cards

3. **Privacy/security sweep** - Before pushing to public repo:
   - Confirm no `.env`, API keys, private certs in repo
   - Confirm no customer data (invoices, quotes, leads) in repo
   - Audit image paths for correctness and accessibility

---

## Lessons Learned

- **Pattern used 3+ times:** Active nav state (`aria-current="page"`) improvement → promoted to HOT rule in memory.md
- **Pattern used 3+ times:** FAQ sections with FAQPage schema → promoted to HOT rule
- **Pattern used 3+ times:** Email CTA/chip in footers → promoted to HOT rule
