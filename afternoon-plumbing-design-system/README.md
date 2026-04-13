# Afternoon Plumbing - Complete Visual Identity & Frontend Design System

A production-grade React + Tailwind CSS design system for Afternoon Plumbing's website. Built with exceptional attention to typography, color, motion, and trust-building aesthetics for a local service business.

## 🎨 Design Philosophy

**Trust Through Craftsmanship**

Every design decision prioritizes building credibility with homeowners:
- **Professional yet approachable** color palette (deep blues + warm copper accents)
- **Bold typography hierarchy** using Playfair Display (display) + Lato (body)
- **Subtle motion** that feels polished, not flashy
- **Clear information architecture** with consistent navigation
- **Mobile-first** responsive design

**No Generic AI Slop:** We use distinctive font choices, sophisticated color relationships, and intentional layouts that feel handcrafted for this specific business.

## 🎯 Core Components

### 1. Design Tokens (`tokens.css`)
Centralized CSS custom properties for consistency across the entire site.

**Colors:** 9-step scales for primary (deep blue), secondary (warm copper), and neutrals
**Typography:** Modular scale with Playfair Display (display) + Lato (body)
**Spacing:** 8px base unit with consistent increments
**Shadows:** 6-level elevation system
**Transitions:** Carefully tuned timing (150-700ms) with custom easing curves

### 2. Header (`Header.jsx`)
Fixed navigation with:
- Sticky behavior with scroll-aware padding/shadow
- Logo with gradient icon container
- Desktop nav with hover underline animation
- Mobile hamburger menu with full-screen overlay
- CTA button (phone) always visible
- Service preview on mobile

### 3. Hero (`Hero.jsx`)
Full-viewport landing section with:
- Bold typography with gradient text effect
- Floating card element with 3D motion
- Parity badges (Licensed, 24/7, 5-Star, Guaranteed)
- Dual CTAs (Call Now + Get Free Quote)
- Decorative gradient blobs moving on scroll
- Grid pattern overlay for texture
- Scroll indicator

### 4. Service Cards (`ServiceCard.jsx`)
Reusable card component featuring:
- Optional hero image with focal point control
- Floating badge (Expert Service)
- Icon + title + description
- Feature list with checkmarks
- Staggered animation on scroll
- Hover lift effect with shadow enhancement
- Bottom gradient accent line

**Accent colors:** primary, secondary, success (per-card configurable)

### 5. Testimonials (`Testimonials.jsx`)
Carousel-based review display with:
- Auto-play (5s) with pause on interaction
- Manual navigation (arrows + dots)
- 3-card grid layout (responsive)
- Star rating with staggered fill animation
- Verified customer badges
- CTA banner below carousel
- Rating summary box (5.0 average with metric breakdown)

### 6. Contact Form (`ContactForm.jsx`)
Complete lead capture with:
- Two-column layout (info sidebar + form)
- Real-time validation with error states
- Loading state with spinning indicator
- Success animation with checkmark
- Service type dropdown
- Trust badges (Licensed, Insured, 24/7, Free Estimates)
- Phone/email/address/clock contact details

### 7. Footer (`Footer.jsx`)
Multi-column footer with:
- Brand section with social icons
- Services listing
- Company links
- Contact information
- 24/7 CTA column
- Decorative gradient background pattern
- Copyright and policy links
- Staggered scroll reveal animations

### 8. FAQ Section (`FAQ.jsx` in App.jsx)
Accordion-style FAQ with:
- Smooth expand/collapse animation
- Chevron rotation indicator
- Clean card-based styling
- Common questions about emergency response, estimates, service area, licensing, and payments

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- React 18+ project

### Installation

1. **Install dependencies:**
```bash
npm install react framer-motion lucide-react
```

2. **Add fonts to your HTML `<head>`:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

3. **Copy the component files** into your React project:
   - `tokens.css` → import in your main CSS file
   - All `.jsx` components
   - `App.jsx` (or adapt into your existing app)

4. **Update image paths:** Replace placeholder image paths (`/images/...`) with actual image URLs or paths to your assets.

5. **Customize content:** Update phone number, email, service details, testimonials, and FAQ content to match Afternoon Plumbing's actual information.

## 🎨 Design Tokens Reference

### Color System
```css
--color-primary-500: #0066e6;    /* Main brand blue */
--color-secondary-500: #dea352;  /* Copper accent */
--color-neutral-900: #201f1d;    /* Dark text */
--color-neutral-50: #faf9f7;     /* Light background */
```

### Typography
```css
--font-display: 'Playfair Display', serif;
--font-body: 'Lato', sans-serif;

--text-5xl: 3rem;   /* Hero headings */
--text-2xl: 1.5rem; /* Card titles */
--text-base: 1rem;  /* Body text */
```

### Spacing Scale
```css
--space-4: 1rem;   /* Standard padding */
--space-6: 1.5rem; /* Section spacing */
--space-8: 2rem;   /* Large gaps */
--space-12: 3rem;  /* Section breaks */
```

### Shadows
```css
--shadow-md:  0 4px 6px rgba(32, 31, 29, 0.07), 0 2px 4px rgba(32, 31, 29, 0.06);
--shadow-lg:  0 10px 15px -3px rgba(32, 31, 29, 0.08), 0 4px 6px -2px rgba(32, 31, 29, 0.05);
--shadow-xl:  0 20px 25px -5px rgba(32, 31, 29, 0.1), 0 10px 10px -5px rgba(32, 31, 29, 0.04);
```

## 🎬 Animation Patterns

### Entrance Animations
```jsx
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};
```

### Hover Effects
```jsx
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ duration: 0.2, ease: 'easeOut' }}
```

### Scroll-Triggered
All section components use `whileInView` with `{ once: true }` for efficient one-time animations.

## 📱 Responsive Breakpoints

- **Mobile:** < 768px (single column, larger tap targets)
- **Tablet:** 768px - 1024px (2-column grids)
- **Desktop:** > 1024px (3-4 column layouts, wider spacing)

All components are mobile-first with progressive enhancement.

## 🧩 Component Customization

### Service Card Props
```jsx
<ServiceCard
  icon={Droplets}
  title="Water Softeners"
  description="Clean water, healthier home"
  features={['Free water test', 'Professional installation']}
  image="/path/to/image.jpg"
  href="/services/water-softeners"
  index={0}                    // For stagger animation
  accentColor="primary"        // primary | secondary | success
/>
```

### Pass `accentColor="secondary"` for copper-themed items, `"success"` for green accents.

## 🔧 Afternoon Plumbing Rules Implementation

✅ **Mobile-first** - All layouts start with mobile CSS, then `md:`/`lg:` overrides
✅ **Homepage as source** - Consistent visual language across all pages
✅ **Shared navigation** - Header reused everywhere, consistent spacing/behavior
✅ **Focused service pages** - Service cards only, no mixed sections
✅ **Image handling** - `object-position: center 30%` for vertical equipment
✅ **Authentic content** - All placeholder content should be replaced with real business info
✅ **Trust-first SEO** - Semantic HTML, proper headings, no keyword stuffing
✅ **Reusable systems** - Shared card components, consistent CTA patterns
✅ **Sitemap/llm.txt updates** - Remember to update when pages change

## 📸 Image Requirements

Replace placeholder images with real, high-quality photos:
- **Water softener:** Close-up of tank with plumbing (vertical)
- **Well pump:** Submersible pump or pressure tank
- **Water heater:** Tank or tankless unit in clean installation
- **Acid neutralizer:** Tank with valves, in neat setup

## 📄 File Structure

```
afternoon-plumbing-design-system/
├── tokens.css          # Design tokens (CSS custom properties)
├── Header.jsx          # Site header + mobile menu
├── Hero.jsx            # Landing hero section
├── ServiceCard.jsx     # Reusable service card
├── Testimonials.jsx    # Review carousel
├── ContactForm.jsx     # Lead capture form
├── Footer.jsx          # Site footer + sitemap
├── App.jsx             # Main app with page structure
└── README.md           # This file
```

## 🎯 Next Steps for Production

1. **Replace all placeholder content** with actual Afternoon Plumbing information
2. **Add real photos** (customer jobs, team, vehicles, equipment)
3. **Update contact details** (phone, email, address)
4. **Configure Tailwind** with the design system (extend theme with tokens)
5. **Add real testimonials** from actual customers
6. **Implement routing** for service pages if needed
7. **Add SEO metadata** (title, description, structured data)
8. **Set up analytics** (Google Analytics, conversion tracking)
9. **Test on real devices** (mobile, tablet, desktop)
10. **Optimize images** with responsive srcset

## 📦 Tailwind Configuration

Extend your `tailwind.config.js` to use these design tokens:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1ff',
          100: '#b3d7ff',
          200: '#80bdff',
          300: '#4da3ff',
          400: '#1a89ff',
          500: '#0066e6',
          600: '#0052b3',
          700: '#003d80',
          800: '#00294d',
          900: '#00141a'
        },
        secondary: {
          50: '#faf3eb',
          100: '#f5e3d3',
          200: '#efd3b3',
          300: '#eac393',
          400: '#e4b373',
          500: '#dea352',
          600: '#b8843e',
          700: '#93642a',
          800: '#6e441e',
          900: '#492412'
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Lato"', '"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'md': '0 4px 6px -1px rgba(32, 31, 29, 0.07), 0 2px 4px -2px rgba(32, 31, 29, 0.06)',
        'lg': '0 10px 15px -3px rgba(32, 31, 29, 0.08), 0 4px 6px -2px rgba(32, 31, 29, 0.05)',
        'xl': '0 20px 25px -5px rgba(32, 31, 29, 0.1), 0 10px 10px -5px rgba(32, 31, 29, 0.04)'
      }
    }
  }
}
```

## 📄 License

This design system is created specifically for Afternoon Plumbing. All rights reserved.

---

**Built with precision. Designed for trust.**