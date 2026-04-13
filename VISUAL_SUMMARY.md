# Afternoon Plumbing Website - Visual Overview

## 1. Color Palette

```
┌─────────────────────────────────────────────────────────────┐
│  Primary Blue    #0066e6  ████████████████████████████     │
│  Secondary Copper #dea352  ████████████████                │
│  White           #ffffff  ████████████████████████████████│
│  Light Gray      #f8f9fa  ████████████████████████        │
│  Dark Gray       #333333  ████████████████████████████    │
│  Emergency Red   #e74c3c  ████████████████████████        │
└─────────────────────────────────────────────────────────────┘
```

## 2. Typography

```
HEADINGS: Playfair Display (serif, elegant)
  H1: 2.5rem (40px)   - "Professional Water Softener Installation..."
  H2: 1.8rem (29px)   - Section headers
  H3: 1.4rem (22px)   - Subsection headers

BODY: Lato (sans-serif, clean)
  Body: 1rem (16px)
  Small: 0.875rem (14px)
```

## 3. Component Library

### Header / Navigation
```
┌─────────────────────────────────────────────────────────────┐
│ 🦾 Afternoon Plumbing          Westminster, MD            │
│ Home  Services  About  Contact          [ Call Now ]      │
└─────────────────────────────────────────────────────────────┘
```

### Hero Section
```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│         AFTERNOON PLUMBING                                  │
│         Westminster, MD 21157                               │
│                                                              │
│   Expert Water Treatment & Plumbing Services               │
│                                                              │
│   [ Get Free Quote ]     [ Call (443) 555-1234 ]           │
│                                                              │
│   ✓ Licensed & Insured  ✓ 24/7 Emergency  ✓ Free Estimates│
└─────────────────────────────────────────────────────────────┘
```

### Service Cards (Grid Layout)
```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ 💧       │ │ 🔥       │ │ ⛲       │ │ ⚗️       │
│ Water    │ │ Water    │ │ Well     │ │ Acid     │
│ Softener │ │ Heater   │ │ Pump     │ │ Neutral. │
│          │ │          │ │          │ │          │
│ • Free   │ │ • Tank   │ │ • Submers│ │ • pH     │
│   water  │ │ • Tankless│ │ • Jet    │ │   correction│
│   testing│ │ • Heat   │ │ • VFD    │ │ • Calcite │
│ • Expert │ │   pump   │ │ • 24/7   │ │ • Local  │
│   install│ │ • Emerg. │ │   emerg. │ │   expertise│
│          │ │          │ │          │ │          │
│ [ Learn  │ │ [ Learn  │ │ [ Learn  │ │ [ Learn  │
│   More ] │ │   More ] │ │   More ] │ │   More ] │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
```

### Contact Form
```
┌─────────────────────────────────────────────────────────────┐
│  Request a Callback                                        │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Name *                                             │  │
│  │ ┌─────────────────────────────────────────────────┐│  │
│  │ │                                                ││  │
│  │ └─────────────────────────────────────────────────┘│  │
│  │                                                     │  │
│  │ Phone Number *                                     │  │
│  │ ┌─────────────────────────────────────────────────┐│  │
│  │ │                                                ││  │
│  │ └─────────────────────────────────────────────────┘│  │
│  │                                                     │  │
│  │ Service Needed                                     │  │
│  │ ┌─────────────────────────────────────────────────┐│  │
│  │ │ Water Softener ▼                                ││  │
│  │ └─────────────────────────────────────────────────┘│  │
│  │                                                     │  │
│  │ Message                                            │  │
│  │ ┌─────────────────────────────────────────────────┐│  │
│  │ │                                                ││  │
│  │ │                                                ││  │
│  │ └─────────────────────────────────────────────────┘│  │
│  │                                                     │  │
│  │ [ Request Callback ]                               │  │
│  └─────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Emergency CTA Banner
```
┌─────────────────────────────────────────────────────────────┐
│  🚨 24/7 EMERGENCY SERVICE - AVAILABLE NOW               │
│  Call Now: (443) 555-1234  │  [ Call Now ]  │  [ WhatsApp ]│
└─────────────────────────────────────────────────────────────┘
```

### Testimonial Carousel
```
┌─────────────────────────────────────────────────────────────┐
│  ⭐⭐⭐⭐⭐                                                    │
│                                                              │
│  "Afternoon Plumbing installed our water softener and     │
│   the difference is night and day. Highly recommend!"    │
│                                                              │
│  — John D., Westminster MD                                 │
│  [‹]  ●  ○  ○  [›]                                         │
└─────────────────────────────────────────────────────────────┘
```

### Footer
```
┌─────────────────────────────────────────────────────────────┐
│  SERVICES      CONTACT           HOURS       SERVICE AREA  │
│  Water Softeners (443) 555-1234 Mon-Fri 7am-7pm Westminster│
│  Water Heaters Westminster, MD 21157 Sat 8am-5pm Hampstead │
│  Well Pumps Carroll County Sun: Emergency Only Manchester │
│  Acid Neutralizers                         Sykesville      │
│                                           Eldersburg      │
│  © 2025 Afternoon Plumbing. Licensed MD Plumber.          │
└─────────────────────────────────────────────────────────────┘
```

## 4. Website Structure

```
afternoon-plumbing-website/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navbar.tsx
│   │   │   └── EmergencyCTA.tsx
│   │   ├── forms/
│   │   │   ├── ContactForm.tsx
│   │   │   └── QuoteForm.tsx
│   │   ├── seo/
│   │   │   ├── GBPSchema.tsx
│   │   │   └── ReviewSchema.tsx
│   │   └── ui/
│   │       └── Button.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ServicesPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── WaterSoftenersPage.tsx
│   │   ├── WaterHeatersPage.tsx
│   │   ├── WellPumpsPage.tsx
│   │   └── AcidNeutralizersPage.tsx
│   ├── hooks/
│   ├── utils/
│   │   ├── callTracking.ts
│   │   └── netlify.ts
│   ├── assets/
│   │   └── images/ (service photos, team, vehicles)
│   ├── main.tsx
│   ├── App.tsx (router setup)
│   └── index.css (Tailwind + custom)
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
└── README.md
```

## 5. Routing Structure

```
/                        → HomePage
/services               → ServicesPage (overview grid)
/service/water-softeners → WaterSoftenersPage
/service/water-heaters  → WaterHeatersPage
/service/well-pumps     → WellPumpsPage
/service/acid-neutralizers → AcidNeutralizersPage
/about                  → AboutPage
/contact                → ContactPage (with forms)
```

## 6. Mobile Responsive Breakpoints

```
Mobile (< 640px):   Single column, hamburger menu, stacked buttons
Tablet (640-1024px): 2-column grid, expanded nav
Desktop (≥1024px):   Full 4-column service grid, horizontal nav
```

## 7. Performance Targets

```
First Contentful Paint: < 1.5s
Largest Contentful Paint: < 2.5s
Cumulative Layout Shift: < 0.1
Total JS Bundle: < 400KB (gzipped)
Total CSS: < 50KB (gzipped)
```

## 8. SEO Features

```
✓ Meta descriptions on all pages
✓ Title tags with location (Westminster MD 21157)
✓ Schema.org LocalBusiness markup
✓ Service schema on individual pages
✓ Review schema with aggregate rating
✓ FAQ schema markup (AEO optimized)
✓ Semantic HTML structure (H1→H2→H3)
✓ Alt text on all images
✓ XML sitemap ready
✓ robots.txt configured
```

## 9. Conversion Optimization

```
Primary CTA: Phone (443) 555-1234 (sticky on mobile)
Secondary CTA: "Get Free Quote" form
Emergency CTA: Pulsing red banner (24/7 visible)
Trust signals: Licensed, insured, 5-star reviews
Social proof: Testimonial carousel (auto-play)
Urgency: "Limited slots available" on forms
Low friction: Phone-first contact, minimal fields
```

## 10. File Locations (Completed)

```
/root/.openclaw/workspace/
├── afternoon-plumbing/           (Lead capture system built)
│   ├── src/components/forms/
│   ├── src/components/layout/
│   ├── src/components/seo/
│   ├── dist/ (built, ready to deploy)
│   └── README.md
│
├── afternoon-plumbing-design-system/  (Visual components)
│   ├── Header.jsx, Footer.jsx, Hero.jsx
│   ├── ServiceCard.jsx, ContactForm.jsx
│   ├── Testimonials.jsx, App.jsx
│   ├── tokens.css (design tokens)
│   └── README.md, DESIGN_SYSTEM.md
│
├── src/ (Vite/React/TS project foundation)
│   ├── components/ (Navbar, Footer)
│   ├── pages/ (Home, Services, About, Contact)
│   ├── main.tsx, App.tsx
│   └── index.css
│
├── water-heaters-page.jsx (React component)
│
├── WEBSITE_PROGRESS.md (this summary)
├── design-system-preview.html (interactive mockup)
└── VISUAL_SUMMARY.md (this file)
```

---

## What You'll See When You Open design-system-preview.html

1. **Color swatches** - exact brand colors
2. **Button styles** - primary, secondary, emergency
3. **Service cards** - 4 card grid with features
4. **Contact form** - input fields with focus states
5. **Testimonial** - styled review box
6. **Emergency CTA** - pulsing red banner
7. **Footer** - multi-column layout

Open `design-system-preview.html` in your browser to see the visual design in action.
