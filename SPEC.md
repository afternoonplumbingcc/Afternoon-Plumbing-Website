# Afternoon Plumbing Website - Complete Structure & Integration Specification

## 1. SITEMAP

```
/                    → Home
/services            → Services (overview page linking to 4 services)
/service/water-softeners
/service/water-heaters
/service/well-pumps
/service/acid-neutralizers
/about               → About
/contact             → Contact
```

---

## 2. ROUTING CONFIGURATION (React Router v6)

### File: `src/App.jsx` or `src/App.js`

```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import WaterSoftener from './pages/service/WaterSoftener';
import WaterHeater from './pages/service/WaterHeater';
import WellPump from './pages/service/WellPump';
import AcidNeutralizer from './pages/service/AcidNeutralizer';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<Services />} />
          <Route path="service/water-softeners" element={<WaterSoftener />} />
          <Route path="service/water-heaters" element={<WaterHeater />} />
          <Route path="service/well-pumps" element={<WellPump />} />
          <Route path="service/acid-neutralizers" element={<AcidNeutralizer />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
```

### Layout Component (`src/components/layout/Layout.jsx`)

```jsx
import Header from './Header';
import Footer from './Footer';
import EmergencyCTA from '../common/EmergencyCTA';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <EmergencyCTA />
      <Footer />
    </>
  );
}

export default Layout;
```

**Layout Usage:** All pages (except possibly modal/standalone pages) should use the Layout wrapper to maintain consistent header, footer, and emergency CTA across the site.

**ContactForm Component Usage:**
- `/contact` → Full ContactForm page (primary lead capture)
- `/about` → Optional ContactForm section (secondary lead capture)
- All service-specific pages (`/service/*`) → ContactForm section (service-specific lead capture)

---

## 3. INTEGRATION INSTRUCTIONS

### Component Library: `afternoon-plumbing-design-system`

**Installation:**
```bash
npm install afternoon-plumbing-design-system
# or if using a local package:
npm install ../afternoon-plumbing-design-system
```

**Import Pattern:**
```jsx
// Example for service page
import {
  Header,
  Footer,
  EmergencyCTA,
  ContactForm,
  ServiceHero,
  ServiceFeatures,
  SocialContact,
  Breadcrumbs
} from 'afternoon-plumbing-design-system';
```

### Mapping Existing Service Page Content to React Components

For each service page (`/service/water-softeners`, etc.), use this structure:

```jsx
// src/pages/service/WaterSoftener.jsx
import {
  ServiceHero,
  ServiceFeatures,
  ServiceBenefits,
  Testimonials,
  ContactForm,
  Breadcrumbs,
  SocialContact
} from 'afternoon-plumbing-design-system';

const WaterSoftener = () => {
  const serviceData = {
    title: 'Water Softener Installation & Repair',
    slug: 'water-softeners',
    heroImage: '/images/water-softener-hero.jpg', // replace with actual images
    features: [
      {
        title: 'Whole-House Softening',
        description: 'Eliminate hard water throughout your home with our premium systems.',
        icon: 'droplets'
      },
      // ... more features
    ],
    benefits: [
      'Extend appliance lifespan',
      'Softer skin and hair',
      'Less soap/detergent needed',
      'No scale buildup in pipes'
    ],
    // ... more content
  };

  return (
    <>
      <Breadcrumbs />
      <ServiceHero {...serviceData} />
      <section className="container mx-auto px-4 py-12">
        <ServiceFeatures features={serviceData.features} />
        <ServiceBenefits benefits={serviceData.benefits} />
        <Testimonials service="water-softeners" limit={3} />
        <SocialContact />
        <ContactForm 
          service="Water Softener Installation" 
          showScheduleButton={true}
        />
      </section>
    </>
  );
};

export default WaterSoftener;
```

**Repeat identical structure for:**
- `WaterHeater.jsx`
- `WellPump.jsx`
- `AcidNeutralizer.jsx`

### Lead Capture Components Placement

| Page | Lead Capture Components | Notes |
|------|------------------------|-------|
| `/` (Home) | ContactForm (primary), SocialContact (sticky/footer) | Position ContactForm below hero or in CTA section |
| `/services` | ContactForm (service selection), SocialContact | ContactForm with dropdown to choose service |
| `/service/*` | ContactForm (pre-filled service), SocialContact | Primary conversion point per service |
| `/about` | ContactForm (trust CTA), SocialContact | Secondary conversion point |
| `/contact` | ContactForm (full page), SocialContact | Main contact hub |

**ContactForm Props to Use:**
- `service` (string) - pre-fills service type
- `showScheduleButton` (boolean) - shows "Schedule Now" vs "Contact Us"
- `compact` (boolean) - smaller variant for sidebars/inline
- `onSuccess` (function) - redirect or show success message

### EmergencyCTA & SocialContact Placement

**EmergencyCTA:** Placed in `Layout.jsx` (above Footer). This renders as a sticky floating button or banner: "Emergency Plumbing? Call Now: [phone]"

**SocialContact:** Render on every page (per table above). Place:
- In `Footer.jsx` (icons linking to FB, Google Business, etc.)
- Sticky sidebar or bottom bar on service pages (optional)
- As a dedicated section near ContactForm on key pages

---

## 4. FINAL ASSEMBLY CHECKLIST

### Required Files & Locations

```
afternoon-plumbing-website/
├── package.json
├── vite.config.js (or CRA config if using Create React App)
├── public/
│   ├── index.html
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-plumber.jpg
│   │   ├── water-softener-hero.jpg
│   │   ├── water-heater-hero.jpg
│   │   ├── well-pump-hero.jpg
│   │   ├── acid-neutralizer-hero.jpg
│   │   ├── about-team.jpg
│   │   └── favicon.ico
│   └── robots.txt
├── src/
│   ├── index.js
│   ├── App.js
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── common/
│   │       ├── ContactForm.jsx
│   │       ├── EmergencyCTA.jsx
│   │       └── SocialContact.jsx
│   └── pages/
│       ├── Home.jsx
│       ├── Services.jsx
│       ├── About.jsx
│       ├── Contact.jsx
│       └── service/
│           ├── WaterSoftener.jsx
│           ├── WaterHeater.jsx
│           ├── WellPump.jsx
│           └── AcidNeutralizer.jsx
├── src/styles/ (optional custom overrides)
├── .env (for API keys if ContactForm needs them)
└── README.md
```

### Build & Deploy Steps

1. **Initialize project** (if not already):
   ```bash
   npm create vite@latest afternoon-plumbing-website -- --template react
   cd afternoon-plumbing-website
   npm install
   npm install afternoon-plumbing-design-system react-router-dom
   ```

2. **Create file structure** as above.

3. **Copy route config** from Section 2 into `src/App.js`.

4. **Create Layout and common components** using the design system imports.

5. **Create each page** using the template from Section 3 (adjust content per service).

6. **Add custom styles** (if needed) in `src/styles/` and import in `index.js` or `App.js`.

7. **Test locally:**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` and verify all routes render correctly.

8. **Build for production:**
   ```bash
   npm run build
   ```
   Output goes to `dist/` (Vite) or `build/` (CRA).

9. **Deploy:**
   - Option A: Upload `dist/` contents to any static host (Netlify, Vercel, cPanel, etc.)
   - Option B: Point domain DNS to Netlify/Vercel and link repo for auto-deploys

10. **Configure domain:**
    - Set custom domain (e.g., afternoonplumbing.com)
    - Ensure HTTPS
    - Add Google Business link, schema markup if design system doesn't handle it

---

### Replace These Items Before Launch

| Item | Find | Replace With |
|------|------|--------------|
| Phone number | `(XXX) XXX-XXXX` or `555-555-5555` | Actual business phone (Chris's number) |
| Business name | "Afternoon Plumbing" | Ensure consistent branding |
| City/location | "Westminster, MD" or generic "Your City" | "Westminster, MD 21157" and service area text |
| Email address | `info@example.com` | Actual contact email (if used) |
| Images | placeholder files (`hero-plumber.jpg`, etc.) | Real photos of Chris, work trucks, job sites, equipment |
| Google Business link | placeholder URL | Actual Google Business Profile link |
| Facebook/social links | placeholder URLs | Real social media URLs |
| Service descriptions | generic marketing copy | Accurate, benefit-focused descriptions based on actual services offered |
| Pricing/CTA text | "Schedule Now" | Preferred action wording (if different) |
| Hours | generic "Mon-Fri 8am-5pm" | Actual hours (Chris may be flexible) |
| Service area zip codes | generic list | Emphasize 21157 and ~20-mile radius |

**Schema.org / SEO:** Ensure JSON-LD markup (usually in Layout or index.html) contains correct:
- Business name
- Address (Westminster, MD 21157)
- Phone number
- Service areas
- Opening hours

---

## QUICK START SUMMARY

1. Scaffold React app (Vite recommended)
2. Install `afternoon-plumbing-design-system` + `react-router-dom`
3. Create file structure exactly as above
4. Copy route definitions into `App.js`
5. Build `Layout.jsx` to wrap all pages
6. Create 8 pages using service page template pattern
7. Add ContactForm to Contact page and inline on others
8. Replace all placeholder business info + images
9. Test all routes locally
10. Build (`npm run build`) and deploy `dist/` to static host

That’s the complete spec. Follow checklist in order for fastest results.
