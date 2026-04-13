# Deployment Checklist for Afternoon Plumbing

## Pre-Deployment

- [x] Business info updated in `App.tsx`
- [x] Phone number set: (443) 555-1234
- [x] All 8 required components implemented
- [x] Build successful (`npm run build`)
- [x] SEO meta tags in `index.html`
- [x] Structured data (GBP + Review schema)
- [x] Netlify configuration (`netlify.toml`)
- [x] Documentation complete (README.md)

## Post-Build Verification

- [ ] Run `npm run preview` and test locally
  - [ ] All pages load correctly
  - [ ] Forms submit without error
  - [ ] EmergencyCTA appears on scroll
  - [ ] WhatsApp/Telegram links work
  - [ ] Mobile responsive (resize browser)
  - [ ] All buttons clickable

## Netlify Deployment

1. [ ] Push code to GitHub repository
   ```bash
   git add .
   git commit -m "Complete lead capture system"
   git push origin main
   ```

2. [ ] Create new site in Netlify
   - Connect to GitHub repo
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node.js version: 20 (or latest LTS)

3. [ ] Configure environment variables (if needed)
   - None required for basic operation
   - Optional: `VITE_GTM_ID` for Google Tag Manager

4. [ ] Wait for initial build to complete

5. [ ] Test deployed site
   - [ ] Visit site URL
   - [ ] Submit test form (use real email)
   - [ ] Check Netlify Forms dashboard
   - [ ] Verify email notification received

## Post-Deployment Configuration

### Netlify Forms
1. Go to Site → Forms
2. Verify "contact-form" and "multi-step-quote" detected
3. Configure email notifications (add your email)
4. Optional: Set up Slack/Discord webhook notifications

### Domain Setup
1. In Netlify: Domain management → Add domain
2. Add `afternoonplumbing.com`
3. Update DNS (A records or CNAME as Netlify instructs)
4. Wait for DNS propagation (24-48 hours)
5. Enable HTTPS (auto by Netlify)

### Google Search Console
1. Add property (domain or URL prefix)
2. Verify ownership (HTML file or DNS)
3. Submit sitemap: `https://afternoonplumbing.com/sitemap.xml`
4. Monitor indexing status

### Google Analytics 4
1. Create GA4 property (or use existing)
2. Add measurement ID to `index.html`:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
3. Set up goals/conversions for form submissions
   - Event: `generate_lead`
   - Parameter: `form_name`

### Google Business Profile
1. Claim/verify listing at google.com/business
2. Update info to match website
3. Add photos (team, vehicles, completed jobs)
4. Start asking customers for reviews
5. Enable messaging (optional)

## Optimization Steps

### Speed
- Images: Use WebP format, optimize size
- Lazy load any below-the-fold images (if added later)
- Consider CDN for assets (Netlify CDN already good)

### Conversion Rate Optimization
1. A/B test:
   - Hero headline variations
   - CTA button text ("Get Free Quote" vs "Request Quote")
   - Form length (Contact vs Quote)
   - Phone number placement
2. Add trust signals:
   - License number displayed prominently
   - Insurance certificate
   - Customer testimonials with photos
   - Before/after photos
3. Reduce friction:
   - Auto-fill address with geolocation
   - SMS opt-in for appointment reminders
   - Calendar booking widget (Calendly)

### SEO
1. Create dedicated service pages:
   - `/water-heaters-westminster-md`
   - `/well-pump-repair`
   - `/water-softener-installation`
   - Add location-specific content
2. Blog content:
   - "How to choose a water heater"
   - "Signs your well pump needs replacement"
   - "Benefits of water softeners"
3. Local citations:
   - Get listed on Angi, HomeAdvisor, Yelp
   - Chamber of commerce directory
   - Carroll County business directories

## Analytics Monitoring

### Daily
- Check form submissions (Netlify dashboard)
- Phone calls (track via call tracking if upgraded)

### Weekly
- GA4 traffic overview
- Conversion rates by source
- Top landing pages
- Form abandonment points

### Monthly
- Search rankings (track target keywords)
- Review count growth
- Lead volume vs. target (+2/week)
- ROI on any paid campaigns

## Troubleshooting

### Forms not submitting
- Check Netlify Forms → Submissions
- Verify `data-netlify="true"` attribute present
- Check browser console for errors
- Test with `curl -X POST -F "name=Test" -F "form-name=contact-form" httpx://yoursite.netlify.app/`

### Phone links not working on mobile
- Verify `href="tel:XXXXX"` format correct
- Test on actual device (not just desktop)

### Schema not recognized
- Test with https://validator.schema.org/
- Check Google Rich Results Test
- Ensure correct JSON-LD format

### Build failures
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, reinstall
- Check Node.js version (>= 20)

## Success Metrics (30-Day Goals)

- [ ] 15+ form submissions (all forms combined)
- [ ] 5+ new Google reviews
- [ ] Site appears in top 10 for "plumber Westminster MD"
- [ ] Average page load < 3 seconds
- [ ] Mobile conversion rate > 10%
- [ ] Emergency CTA conversion > 25%

---

**Ready to deploy!** 🚀

All code is in the `afternoon-plumbing` directory. Push to GitHub and connect to Netlify.

Last updated: April 6, 2025
