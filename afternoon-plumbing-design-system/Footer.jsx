import React from 'react';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Wrench,
  Droplets,
  Zap,
  Shield,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin
} from 'lucide-react';

const services = [
  { name: 'Water Softeners', icon: Droplets, href: '/services/water-softeners' },
  { name: 'Well Pumps', icon: Zap, href: '/services/well-pumps' },
  { name: 'Water Heaters', icon: Zap, href: '/services/water-heaters' },
  { name: 'Acid Neutralizers', icon: Shield, href: '/services/acid-neutralizers' },
];

const companyLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services' },
  { name: 'Reviews', href: '/reviews' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

const contactInfo = [
  { icon: Phone, text: '(410) 995-0882', href: 'tel:4109950882' },
  { icon: Mail, text: 'info@afternoonplumbing.com', href: 'mailto:info@afternoonplumbing.com' },
  { icon: MapPin, text: 'Westminster, MD 21157', href: 'https://maps.google.com' },
  { icon: Clock, text: 'Mon-Sat: 8am-7pm', href: null },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const hoverIcon = {
    scale: 1.1,
    transition: { duration: 0.2, ease: 'easeOut' }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{
        backgroundColor: 'var(--color-neutral-900)',
        color: 'var(--color-neutral-200)'
      }}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-transparent to-secondary-500" />
        <svg className="absolute bottom-0 left-0 w-full h-64" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path
            d="M0,120 L0,60 C300,100 600,0 900,60 C1050,80 1200,40 1200,40 L1200,120 Z"
            fill="currentColor"
            style={{ color: 'var(--color-primary-500)' }}
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-6 gap-12 lg:gap-16"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <a href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Wrench className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col">
                <span
                  className="font-display font-bold text-xl"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--color-neutral-50)' }}
                >
                  Afternoon Plumbing
                </span>
                <span
                  className="text-sm font-medium"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--color-neutral-400)'
                  }}
                >
                  Westminster, MD
                </span>
              </div>
            </a>
            <p
              className="font-body leading-relaxed mb-6"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--color-neutral-400)'
              }}
            >
              Trusted local plumbers serving Westminster and surrounding areas. Quality service,
              honest pricing, and guaranteed satisfaction for over 15 years.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={hoverIcon}
                  className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                  style={{ backgroundColor: 'var(--color-neutral-800)' }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" style={{ color: 'var(--color-neutral-300)' }} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3
              className="font-display font-bold text-lg mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-neutral-50)'
              }}
            >
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <a
                    href={service.href}
                    className="flex items-center gap-3 group hover:text-primary-400 transition-colors duration-200"
                    style={{ color: 'var(--color-neutral-300)' }}
                  >
                    <service.icon className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-body text-sm">{service.name}</span>
                    <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3
              className="font-display font-bold text-lg mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-neutral-50)'
              }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="font-body text-sm hover:text-primary-400 transition-colors duration-200"
                    style={{ color: 'var(--color-neutral-300)' }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3
              className="font-display font-bold text-lg mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-neutral-50)'
              }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4">
              {contactInfo.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <item.icon className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary-400)' }} />
                  {item.href ? (
                    <a
                      href={item.href}
                      className="font-body text-sm hover:text-primary-400 transition-colors duration-200"
                      style={{ color: 'var(--color-neutral-300)' }}
                    >
                      {item.text}
                    </a>
                  ) : (
                    <span className="font-body text-sm" style={{ color: 'var(--color-neutral-300)' }}>
                      {item.text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* CTA Column */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3
              className="font-display font-bold text-lg mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--color-neutral-50)'
              }}
            >
              Need Help Now?
            </h3>
            <motion.a
              href="tel:4109950882"
              className="flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary-500 text-white font-body font-semibold rounded-full shadow-lg hover:shadow-xl hover:bg-primary-600 transition-all duration-200 mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call 24/7</span>
            </motion.a>
            <p
              className="font-body text-xs text-center"
              style={{ color: 'var(--color-neutral-500)' }}
            >
              Emergency service available. Real person, always.
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            borderColor: 'var(--color-neutral-800)',
            color: 'var(--color-neutral-500)'
          }}
        >
          <p className="font-body text-sm">
            © {new Date().getFullYear()} Afternoon Plumbing. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}