import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features = [],
  image,
  href = '#',
  index = 0,
  accentColor = 'primary'
}) {
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const imageHover = {
    scale: 1.05,
    transition: { duration: 0.6, ease: 'easeOut' }
  };

  const iconHover = {
    scale: 1.1,
    rotate: 5,
    transition: { duration: 0.3, ease: 'easeOut' }
  };

  const featureListVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.05
      }
    }
  };

  const featureItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  const getAccentColors = (color) => {
    const colors = {
      primary: {
        bg: 'var(--color-primary-50)',
        text: 'var(--color-primary-700)',
        border: 'var(--color-primary-200)',
        icon: 'var(--color-primary-600)',
        hover: 'var(--color-primary-600)'
      },
      secondary: {
        bg: 'var(--color-secondary-50)',
        text: 'var(--color-secondary-700)',
        border: 'var(--color-secondary-200)',
        icon: 'var(--color-secondary-600)',
        hover: 'var(--color-secondary-600)'
      },
      success: {
        bg: 'rgba(16, 185, 129, 0.1)',
        text: '#047857',
        border: 'rgba(16, 185, 129, 0.2)',
        icon: '#10b981',
        hover: '#059669'
      }
    };
    return colors[color] || colors.primary;
  };

  const accent = getAccentColors(accentColor);

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className="group relative flex flex-col bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border"
      style={{
        borderColor: 'var(--border-light)',
        boxShadow: 'var(--shadow-lg)'
      }}
    >
      {/* Image Section */}
      {image && (
        <div className="relative h-56 overflow-hidden bg-neutral-100">
          <motion.div whileHover={imageHover} className="w-full h-full">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 30%' }}
            />
          </motion.div>
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Floating Badge */}
          <motion.div
            className="absolute top-4 right-4 px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg backdrop-blur-sm"
            style={{ backgroundColor: accent.hover }}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Expert Service
          </motion.div>
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-6 lg:p-8">
        {/* Icon & Title */}
        <div className="flex items-start gap-4 mb-4">
          <motion.div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center shadow-md"
            style={{ backgroundColor: accent.bg }}
            whileHover={iconHover}
          >
            <Icon className="w-7 h-7" style={{ color: accent.icon }} strokeWidth={2} />
          </motion.div>
          <div>
            <h3
              className="font-display text-xl lg:text-2xl font-bold leading-tight mb-2 group-hover:text-primary-600 transition-colors duration-300"
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)'
              }}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p
          className="font-body text-base mb-6 leading-relaxed"
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-secondary)'
          }}
        >
          {description}
        </p>

        {/* Features List */}
        {features.length > 0 && (
          <motion.ul
            variants={featureListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-2 mb-8 flex-1"
          >
            {features.map((feature, i) => (
              <motion.li
                key={i}
                variants={featureItemVariants}
                className="flex items-center gap-3 text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                <svg
                  className="w-5 h-5 flex-shrink-0"
                  style={{ color: accent.icon }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}

        {/* CTA Button */}
        <motion.a
          href={href}
          className="group/btn inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-primary-500 text-white font-body font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-primary-600 transition-all duration-200 mt-auto"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Schedule Service</span>
          <ChevronRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
        </motion.a>
      </div>

      {/* Bottom Decorative Border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, ${accent.hover}, ${accent.icon})` }}
      />
    </motion.article>
  );
}