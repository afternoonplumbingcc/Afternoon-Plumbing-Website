import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Menu,
  X,
  Wrench,
  Droplets,
  Shield,
  Zap,
  Hammer
} from 'lucide-react';

const navLinks = [
  { name: 'Services', href: '#services', icon: Wrench },
  { name: 'About', href: '#about', icon: Shield },
  { name: 'Reviews', href: '#testimonials', icon: Zap },
  { name: 'Contact', href: '#contact', icon: Phone },
];

const servicesPreview = [
  { name: 'Water Softeners', icon: Droplets },
  { name: 'Well Pumps', icon: Zap },
  { name: 'Water Heaters', icon: Zap },
  { name: 'Acid Neutralizers', icon: Shield },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    top: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(0px)',
      boxShadow: 'none',
      padding: '1.5rem 0',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    scrolled: {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(12px)',
      boxShadow: '0 4px 6px -1px rgba(32, 31, 29, 0.06), 0 2px 4px -2px rgba(32, 31, 29, 0.04)',
      padding: '1rem 0',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const logoVariants = {
    top: { scale: 1, letterSpacing: '0.05em' },
    scrolled: { scale: 0.95, letterSpacing: '0.02em' }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.2, ease: 'easeOut' }
    })
  };

  return (
    <motion.header
      initial="top"
      animate={isScrolled ? 'scrolled' : 'top'}
      variants={headerVariants}
      className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200"
      style={{ borderColor: 'var(--border-light)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            variants={logoVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
              <Wrench className="w-5 h-5 lg:w-6 lg:h-6 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span
                className="font-display font-bold text-lg lg:text-xl"
                style={{
                  fontFamily: 'var(--font-display)',
                  color: 'var(--text-primary)',
                  letterSpacing: 'var(--tracking-tight)'
                }}
              >
                Afternoon Plumbing
              </span>
              <span
                className="text-xs lg:text-sm font-medium"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--text-secondary)',
                  letterSpacing: 'var(--tracking-wide)'
                }}
              >
                Westminster, MD
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2 }}
                className="group relative py-2"
              >
                <span
                  className="font-body text-sm font-medium transition-colors duration-200"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {link.name}
                </span>
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </motion.a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <motion.a
            href="tel:4109950882"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 bg-primary-500 text-white font-body font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-primary-600 transition-all duration-200"
            style={{
              fontFamily: 'var(--font-body)'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Phone className="w-4 h-4" strokeWidth={2.5} />
            <span>Call Now</span>
          </motion.a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" style={{ color: 'var(--text-primary)' }} strokeWidth={2} />
            ) : (
              <Menu className="w-6 h-6" style={{ color: 'var(--text-primary)' }} strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto"
            style={{ backgroundColor: 'var(--bg-primary)' }}
          >
            <div className="px-4 py-6 space-y-6">
              {/* Mobile Nav Links */}
              <nav className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.05 } }}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <link.icon className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
                    <span className="font-body font-medium">{link.name}</span>
                  </motion.a>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.a
                href="tel:4109950882"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-primary-500 text-white font-body font-semibold rounded-full shadow-md"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </motion.a>

              {/* Services Preview - Mobile */}
              <div className="pt-6 border-t" style={{ borderColor: 'var(--border-light)' }}>
                <h3
                  className="font-display text-sm font-bold uppercase tracking-wider mb-4"
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Our Services
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {servicesPreview.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center gap-2 p-3 bg-neutral-50 rounded-lg"
                      style={{ backgroundColor: 'var(--bg-tertiary)' }}
                    >
                      <service.icon className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {service.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}