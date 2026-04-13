# Afternoon Plumbing - Lead Capture & Conversion System

A complete lead capture and conversion system built with React, Tailwind CSS, and Framer Motion for Afternoon Plumbing.

## 🎯 Features Implemented

### 1. Contact Form with Phone Capture (Primary Conversion)
- Location: `src/components/forms/ContactForm.tsx`
- Simple, accessible contact form with phone number as primary field
- Fields: Name, Phone (required), Email (optional), Service dropdown, Message
- Form validation with clear error messages
- Netlify Forms ready for backend handling
- Integration: Add to any page with `<ContactForm />`

### 2. Multi-Step "Get Free Quote" Form
- Location: `src/components/forms/QuoteForm.tsx`
- 4-step interactive form with progress indicator
- Steps: Service Selection → Address → Contact Info → Project Details
- Service categories: Water Treatment, Water Heating, Well Systems, General Plumbing
- Address pre-filled with Westminster, MD
- Validation on each step before proceeding
- Smooth animations between steps
- Netlify Forms backend integration

### 3. WhatsApp & Telegram Click-to-Contact Buttons
- Location: `src/components/layout/SocialContact.tsx`
- Three variants: WhatsApp, Telegram, Phone Call
- Multiple layout options: horizontal, vertical, icon-only, compact
- Floating mobile contact bar at bottom of mobile screens
- Dynamic links generated from phone number
- Easy to integrate anywhere: `<SocialContact phoneNumber="(443) 555-1234" />`

### 4. Emergency Call CTA with Prominent Placement
- Location: `src/components/layout/EmergencyCTA.tsx`
- Features:
  - Fixed top banner with pulsing emergency badge
  - "Emergency Service 24/7" messaging
  - Direct Call and WhatsApp buttons
  - Auto-hides when dismissed; floating phone button remains
  - Appears on scroll after 300px or always visible
  - Red gradient styling for urgency
- Usage: `<EmergencyCTA phoneNumber="(443) 555-1234" />`

### 5. Google Business Profile Integration
- Location: `src/components/seo/GBPSchema.tsx`
- Complete LocalBusiness JSON-LD schema
- Includes:
  - Business name, address, phone, service area
  - Opening hours (Mon-Fri 8AM-6PM, Sat 9AM-2PM)
  - Service catalog with offer details
  - Google Maps link integration
  - SameAs links for social profiles
- Automatically renders in `<head>` ofpages where used

### 6. Review Schema (Google Rich Snippets)
- Location: `src/components/seo/ReviewSchema.tsx`
- Aggregate rating schema for display in search results
- Sample 5-star reviews included
- JSON-LD structured data
- Supports up to 5 individual review entries

### 7. Form Validation & Error Handling
- Built into each form component
- Required field validation
- Phone number format validation (10+ digits)
- Email format validation (if provided)
- Real-time error display with clear messages
- Success confirmation states

### 8. Netlify Forms Backend Integration
- Forms include `data-netlify="true"` attribute
- Hidden `form-name` inputs for form identification
- Spam protection via honeypot field (`bot-field`)
- Form submission via fetch API with proper FormData
- Automatic handling on Netlify's side

## 🛠️ Call Tracking (Simple Solution)

- Location: `src/utils/callTracking.ts`
- Basic call tracking implementation using Google Analytics events
- Tracks phone link clicks with session ID
- Simulates call duration tracking via page visibility
- Ready to integrate with CallRail/CallTrackingMetrics if upgraded

## 📦 Project Structure

```
src/
├── components/
│   ├── forms/
│   │   ├── ContactForm.tsx    # Simple contact form
│   │   ├── QuoteForm.tsx      # Multi-step quote form
│   │   └── index.ts
│   ├── layout/
│   │   ├── EmergencyCTA.tsx   # Emergency banner
│   │   ├── SocialContact.tsx  # WhatsApp/Telegram buttons
│   │   ├── MobileContactBar.tsx
│   │   └── index.ts
│   ├── seo/
│   │   ├── GBPSchema.tsx      # Google Business Profile schema
│   │   ├── ReviewSchema.tsx   # Review schema for rich snippets
│   │   └── index.ts
│   └── index.ts               # Main component exports
├── utils/
│   ├── netlify.ts             # Netlify form utilities
│   ├── callTracking.ts        # Call tracking implementation
│   └── index.ts
├── App.tsx                    # Main application component
├── App.css                    # Custom styles (Tailwind utilities)
└── index.css                  # Tailwind imports + base styles
```

## 🚀 Deployment to Netlify

### Automatic Deployment

1. **Push to GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Add lead capture forms"
   git push origin main
   ```

2. **Connect Netlify**
   - Go to [Netlify](https://netlify.com) and create new site from Git
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add environment variable for reCAPTCHA if needed (optional)

3. **Configure Forms**
   - After first form submission, Netlify will auto-detect the forms
   - Go to Site settings → Forms → Configure notifications (email/Slack)
   - Enable reCAPTCHA protection if desired

### Manual/TEST Deployment

```bash
# Build the project
npm run build

# Preview locally
npm run preview

# Deploy manually to Netlify
netlify deploy --prod --dir=dist
```

## 📝 Adding New Service Pages

To add a new service page (e.g., water-softeners):

1. Add service to `SERVICES` array in `App.tsx`
2. Add service to `serviceCategories` in `QuoteForm.tsx`
3. Update sitemap.xml if needed

## 🔧 Configuration

### Business Info

Update the `BUSINESS_INFO` object in `App.tsx`:

```typescript
const BUSINESS_INFO = {
  name: 'Afternoon Plumbing',
  phone: '(443) 555-1234',  // Change to actual phone
  city: 'Westminster',
  state: 'MD',
  zip: '21157',
  latitude: 39.5543,
  longitude: -76.9863,
  serviceArea: ['Westminster', 'Finksburg', ...],
  yearsInBusiness: 12
};
```

### Phone Number

The phone number appears in multiple places:
- EmergencyCTA
- SocialContact buttons
- Call tracking
- Footer
- Header

All use the `BUSINESS_INFO.phone` reference, so update in one place.

## 📊 Analytics & Tracking

### Google Analytics 4 (GA4)

Add your GA4 measurement ID to `App.tsx`:

```typescript
useEffect(() => {
  // GA4 event on form submit
  if (window.gtag) {
    window.gtag('event', 'generate_lead', {
      event_category: 'Form',
      // ... additional data
    });
  }
}, []);
```

### CallRail / CallTrackingMetrics

For dynamic number replacement, update `src/utils/callTracking.ts`:

```typescript
export const createCallTracker = (phoneNumber: string): CallTracker => {
  // In production, fetch dynamic tracking number from API
  const trackingNumber = getDynamicNumberFromCallRail(); // implement this
  // ...
};
```

## 🎨 Styling

The project uses Tailwind CSS v4 with custom amber/red color scheme:
- Primary: Amber (CTA buttons, highlights)
- Emergency: Red (EmergencyCTA)
- Neutrals: Gray scale

Custom utilities defined in `App.css` for convenience.

## ✅ Checklist Before Launch

- [ ] Update `BUSINESS_INFO` with correct details
- [ ] Replace sample reviews with actual customer reviews
- [ ] Add Google Analytics tracking code (GTM/GA4)
- [ ] Test form submissions on Netlify staging
- [ ] Configure form notification emails in Netlify
- [ ] Add reCAPTCHA protection to forms (optional but recommended)
- [ ] Update meta tags and page titles in `index.html`
- [ ] Verify structured data with Google Rich Results Test
- [ ] Set up email forwarding for `info@afternoonplumbing.com`
- [ ] Test on mobile devices (responsive)
- [ ] Add privacy policy and terms pages
- [ ] Set up domain DNS (afternoonplumbing.com)

## 📞 Support

For questions or issues, contact the development team.

---

Built with ❤️ for Afternoon Plumbing
