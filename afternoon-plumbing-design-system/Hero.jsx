import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Phone,
  MapPin,
  Clock,
  Shield,
  Star,
  Wrench,
  Droplets,
  Zap,
  Award,
  CheckCircle,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

const features = [
  { icon: Shield, text: 'Licensed & Insured' },
  { icon: Clock, text: '24/7 Emergency' },
  { icon: Award, text: '5-Star Rated' },
  { icon: CheckCircle, text: 'Satisfaction Guaranteed' }
];

const serviceHighlights = [
  { icon: Droplets, title: 'Water Softeners', desc: 'Clean water, healthier home' },
  { icon: Zap, title: 'Well Pumps', desc: 'Reliable water pressure' },
  { icon: Wrench, title: 'Water Heaters', desc: 'Hot water when you need it' },
  { icon: Shield, title: 'Acid Neutralizers', desc: 'Protect your plumbing' }
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  const floatAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  const rotateAnimation = {
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut'
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large decorative blobs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-5 blur-3xl"
          style={{ backgroundColor: 'var(--color-primary-500)' }}
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-5 blur-3xl"
          style={{ backgroundColor: 'var(--color-secondary-500)' }}
        />

        {/* Grid pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" style={{ color: 'var(--text-primary)' }} />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-6 shadow-lg"
              style={{
                backgroundColor: 'var(--color-primary-50)',
                color: 'var(--color-primary-700)'
              }}
            >
              <MapPin className="w-4 h-4" />
              <span className="font-body text-sm font-semibold">Proudly Serving Westminster, MD</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)',
                lineHeight: 'var(--leading-tight)'
              }}
            >
              Plumbing Problems?
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, var(--color-primary-500), var(--color-secondary-500))'
                }}
              >
                We&apos;ve Got You Covered
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              className="font-body text-xl lg:text-2xl leading-relaxed mb-8 max-w-2xl"
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-secondary)'
              }}
            >
              Fast, reliable, and honest plumbing services for homeowners in Westminster and the surrounding areas. Available 24/7 for emergencies.
            </motion.p>

            {/* Features */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap gap-4 mb-10"
            >
              {features.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-full shadow-sm border"
                  style={{
                    borderColor: 'var(--border-light)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: 'var(--color-primary-500)' }} />
                  <span className="font-body text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="tel:4109950882"
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-primary-500 text-white font-body font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-primary-600 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                style={{ fontSize: 'var(--text-lg)' }}
              >
                <Phone className="w-6 h-6" />
                <span>Call Now - 24/7</span>
              </motion.a>
              <motion.button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-primary-600 font-body font-semibold rounded-full shadow-lg border-2 hover:shadow-xl hover:bg-neutral-50 transition-all duration-200"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  borderColor: 'var(--color-primary-500)',
                  fontSize: 'var(--text-lg)'
                }}
              >
                <span>Get Free Quote</span>
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeUp}
              className="mt-12 flex items-center gap-8"
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5" fill="#fbbf24" strokeWidth={2} />
                ))}
                <span className="ml-2 font-body font-semibold" style={{ color: 'var(--text-primary)' }}>
                  5.0 (10+ reviews)
                </span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-tertiary)' }}>
                <Award className="w-5 h-5" style={{ color: 'var(--color-primary-500)' }} />
                <span className="font-body text-sm">Licensed & Insured</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual - Floating Service Cards */}
          <motion.div
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className="order-1 lg:order-2 relative"
            style={{ perspective: 1000 }}
          >
            {/* Main feature card */}
            <motion.div
              variants={fadeUp}
              animate={floatAnimation}
              className="relative z-10 bg-white rounded-3xl shadow-2xl p-8 border max-w-md mx-auto"
              style={{
                borderColor: 'var(--border-light)',
                boxShadow: 'var(--shadow-2xl)'
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                  <Droplets className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                    Water Softeners
                  </h3>
                  <p className="font-body" style={{ color: 'var(--text-tertiary)' }}>
                    Our #1 requested service
                  </p>
                </div>
              </div>
              <p className="font-body leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                Say goodbye to hard water stains, dry skin, and appliance buildup. Professional installation with lifetime support.
              </p>
              <div className="space-y-3">
                {['Free water test', 'Professional installation', 'Lifetime support'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--color-success)' }} />
                    <span className="font-body text-sm" style={{ color: 'var(--text-primary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Floating accent cards */}
            <motion.div
              animate={rotateAnimation}
              className="absolute -top-8 -left-8 w-32 h-32 rounded-3xl bg-gradient-to-br from-secondary-400 to-secondary-500 shadow-xl flex items-center justify-center z-20 hidden lg:flex"
              style={{ boxShadow: 'var(--shadow-xl)' }}
            >
              <Zap className="w-12 h-12 text-white" />
            </motion.div>

            <motion.div
              animate={{ ...floatAnimation, y: floatAnimation.y.map(y => y + 5) }}
              className="absolute -bottom-6 -right-6 w-36 h-36 rounded-3xl bg-gradient-to-br from-primary-400 to-primary-500 shadow-xl flex items-center justify-center z-20 hidden lg:flex"
              style={{ boxShadow: 'var(--shadow-xl)' }}
            >
              <Wrench className="w-14 h-14 text-white" />
            </motion.div>

            {/* Service highlight labels */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute top-1/2 -right-12 transform -translate-y-1/2 hidden lg:block"
            >
              <div className="bg-white rounded-2xl shadow-lg p-4 border" style={{ borderColor: 'var(--border-light)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5" style={{ color: 'var(--color-primary-500)' }} />
                  <span className="font-body text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Insured</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5" style={{ color: 'var(--color-primary-500)' }} />
                  <span className="font-body text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Award-Winning</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-xs uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 rounded-full flex items-start justify-center p-1"
          style={{ borderColor: 'var(--border-default)' }}
        >
          <div className="w-1.5 h-2 rounded-full bg-primary-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}