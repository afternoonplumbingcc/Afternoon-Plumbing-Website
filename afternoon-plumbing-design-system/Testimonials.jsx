import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Mike R.',
    location: 'Westminster, MD',
    rating: 5,
    text: 'Afternoon Plumbing installed a new water softener for us and the difference is night and day. No more scale buildup on fixtures, and my skin and hair feel so much better. Highly recommend!',
    service: 'Water Softener',
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 2,
    name: 'Sarah T.',
    location: 'Hampstead, MD',
    rating: 5,
    text: 'Our well pump failed during a weekend emergency. They showed up within an hour, diagnosed the issue quickly, and had us back up and running in no time. Professional and fair pricing.',
    service: 'Well Pump',
    date: '1 month ago',
    verified: true
  },
  {
    id: 3,
    name: 'David L.',
    location: 'Manchester, MD',
    rating: 5,
    text: 'Had a water heater installation done. The team was punctual, clean, and did excellent work. They explained everything and even gave me maintenance tips. Five stars all the way.',
    service: 'Water Heater',
    date: '3 weeks ago',
    verified: true
  },
  {
    id: 4,
    name: 'Jennifer K.',
    location: 'Finksburg, MD',
    rating: 5,
    text: 'We&apos;ve used Afternoon Plumbing for multiple projects over the years. Always reliable, always professional. They installed our acid neutralizer and our water softener with no issues.',
    service: 'Multiple',
    date: '2 months ago',
    verified: true
  },
  {
    id: 5,
    name: 'Tom B.',
    location: 'Eldersburg, MD',
    rating: 5,
    text: 'Great local company! Fixed a stubborn leak that another plumber couldn&apos;t find. They took their time, found the issue, and repaired it properly. Worth every penny.',
    service: 'General Repair',
    date: '1 week ago',
    verified: true
  },
  {
    id: 6,
    name: 'Lisa M.',
    location: 'Westminster, MD',
    rating: 5,
    text: 'Emergency call on a Sunday morning when our basement flooded. They responded quickly, assessed the situation, and got everything under control. Saved us from major damage!',
    service: 'Emergency',
    date: '3 months ago',
    verified: true
  }
];

function StarRating({ rating, size = 'base' }) {
  const sizes = {
    sm: 'w-4 h-4',
    base: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: star * 0.05, duration: 0.2 }}
        >
          <Star
            className={sizes[size]}
            fill={star <= rating ? 'currentColor' : 'none'}
            strokeWidth={2}
            style={{
              color: star <= rating ? '#fbbf24' : 'var(--color-neutral-300)'
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive = false }) {
  const cardVariants = {
    inactive: { opacity: 0.7, scale: 0.95, y: 20 },
    active: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="inactive"
      animate={isActive ? 'active' : 'inactive'}
      className="flex flex-col justify-between p-6 lg:p-8 bg-white rounded-2xl shadow-lg border relative"
      style={{
        borderColor: 'var(--border-light)',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      {/* Quote Icon - Top decorative */}
      <div className="absolute -top-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
        <Quote className="w-8 h-8 text-white" strokeWidth={1.5} />
      </div>

      <div className="relative z-10 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center border-2 border-white shadow-sm">
              <span className="font-display font-bold text-lg" style={{ color: 'var(--color-primary-600)' }}>
                {testimonial.name.charAt(0)}
              </span>
            </div>
            <div>
              <h4
                className="font-display font-bold text-base"
                style={{ color: 'var(--text-primary)' }}
              >
                {testimonial.name}
              </h4>
              <p className="font-body text-sm" style={{ color: 'var(--text-tertiary)' }}>
                {testimonial.location}
                {testimonial.verified && (
                  <span className="ml-2 inline-flex items-center gap-1 text-success text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </p>
            </div>
          </div>
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-700)'
            }}
          >
            {testimonial.service}
          </span>
        </div>

        {/* Stars */}
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Quote Text */}
        <blockquote
          className="font-body text-base lg:text-lg leading-relaxed mb-6 italic"
          style={{ color: 'var(--text-primary)' }}
        >
          &ldquo;{testimonial.text}&rdquo;
        </blockquote>

        {/* Date */}
        <p className="font-body text-sm" style={{ color: 'var(--text-tertiary)' }}>
          {testimonial.date}
        </p>
      </div>

      {/* Decorative Bottom Accent */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl"
        style={{ background: 'linear-gradient(90deg, var(--color-primary-500), var(--color-secondary-500))' }}
      />
    </motion.div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerView = {
    sm: 1,
    md: 2,
    lg: 3
  };

  const [currentView, setCurrentView] = useState('lg');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setCurrentView('lg');
      else if (window.innerWidth >= 768) setCurrentView('md');
      else setCurrentView('sm');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setDirection(1);
      setActiveIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex(prev => prev === 0 ? testimonials.length - 1 : prev - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 30000);
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 30000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const getVisibleIndices = () => {
    const count = itemsPerView[currentView];
    const indices = [];
    for (let i = 0; i < count; i++) {
      indices.push((activeIndex + i) % testimonials.length);
    }
    return indices;
  };

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div
            variants={headerVariants}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6"
            style={{
              backgroundColor: 'var(--color-primary-50)',
              color: 'var(--color-primary-700)'
            }}
          >
            <Star className="w-4 h-4" fill="currentColor" />
            <span className="font-body text-sm font-semibold">Customer Reviews</span>
          </motion.div>

          <motion.h2
            variants={headerVariants}
            className="font-display text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            What Our Customers Say
          </motion.h2>

          <motion.p
            variants={headerVariants}
            className="font-body text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Real reviews from real customers. We take pride in providing exceptional service and building lasting relationships in our community.
          </motion.p>

          {/* Rating Summary */}
          <motion.div
            variants={headerVariants}
            className="flex items-center justify-center gap-6 mt-8 p-6 bg-white rounded-2xl shadow-lg mx-auto max-w-md"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <div className="text-center">
              <div className="text-4xl font-display font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
                5.0
              </div>
              <StarRating rating={5} size="lg" />
              <p className="font-body text-sm mt-1" style={{ color: 'var(--text-tertiary)' }}>
                Based on 10+ reviews
              </p>
            </div>
            <div className="h-12 w-px" style={{ backgroundColor: 'var(--border-default)' }} />
            <div className="flex flex-col justify-center gap-2">
              {['Service Quality', 'Pricing', 'Punctuality', 'Professionalism'].map((metric) => (
                <div key={metric} className="text-xs font-body flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
                  <CheckCircle className="w-3 h-3 text-success" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 100 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {getVisibleIndices().map((idx) => (
                <TestimonialCard
                  key={testimonials[idx].id}
                  testimonial={testimonials[idx]}
                  isActive={idx === activeIndex}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <motion.button
              onClick={handlePrev}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border hover:bg-primary-500 hover:text-white transition-colors duration-200"
              style={{ borderColor: 'var(--border-light)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > activeIndex ? 1 : -1);
                    setActiveIndex(idx);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 30000);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-8 bg-primary-500' : 'bg-neutral-300 hover:bg-neutral-400'
                  }`}
                  style={{
                    backgroundColor: idx === activeIndex ? 'var(--color-primary-500)' : undefined
                  }}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <motion.button
              onClick={handleNext}
              className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center border hover:bg-primary-500 hover:text-white transition-colors duration-200"
              style={{ borderColor: 'var(--border-light)' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-20 text-center p-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl shadow-2xl relative overflow-hidden"
        >
          {/* Decorative circle */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-white/5" />

          <div className="relative z-10">
            <h3
              className="font-display text-3xl lg:text-4xl font-bold mb-4 text-white"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ready to Experience the Same Quality?
            </h3>
            <p className="font-body text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied customers in Westminster and the surrounding areas. Book your appointment today!
            </p>
            <motion.a
              href="tel:4109950882"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 font-body font-bold rounded-full shadow-xl hover:shadow-2xl hover:bg-neutral-50 transition-all duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}