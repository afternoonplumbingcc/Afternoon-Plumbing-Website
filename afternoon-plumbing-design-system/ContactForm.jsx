import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  Home,
  MessageSquare,
  CheckCircle,
  AlertCircle,
  Send,
  Wrench
} from 'lucide-react';

const services = [
  'Water Softener Installation',
  'Well Pump Repair/Replacement',
  'Water Heater Installation',
  'Acid Neutralizer System',
  'General Plumbing Repair',
  'Emergency Service',
  'Other'
];

const formFields = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith', icon: User, required: true },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com', icon: Mail, required: true },
  { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '(410) 555-0123', icon: Phone, required: true },
  { name: 'address', label: 'Service Address', type: 'text', placeholder: '123 Main St, Westminster, MD', icon: Home, required: true },
  { name: 'service', label: 'Service Needed', type: 'select', options: services, icon: Wrench, required: true },
  { name: 'message', label: 'Message', type: 'textarea', placeholder: 'Describe your plumbing issue...', icon: MessageSquare, required: false },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    service: services[0],
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return value && !emailRegex.test(value) ? 'Please enter a valid email' : '';
      case 'phone':
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        return value && !phoneRegex.test(value) ? 'Please enter a valid phone number' : '';
      case 'address':
        return value.trim() ? '' : 'Service address is required';
      case 'service':
        return value ? '' : 'Please select a service';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    formFields.forEach(field => {
      if (field.required) {
        const error = validateField(field.name, formData[field.name]);
        if (error) newErrors[field.name] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        service: services[0],
        message: ''
      });
      setSubmitSuccess(false);
    }, 5000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const inputGroupVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.4, ease: 'easeOut' }
    })
  };

  return (
    <section className="w-full max-w-4xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden border"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderColor: 'var(--border-light)',
          boxShadow: 'var(--shadow-xl)'
        }}
      >
        <div className="grid lg:grid-cols-5">
          {/* Left Side - Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2 bg-gradient-to-br from-primary-500 to-primary-700 p-8 lg:p-10 text-white relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg className="absolute top-0 right-0 w-64 h-64" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="40" />
              </svg>
              <svg className="absolute bottom-0 left-0 w-48 h-48" viewBox="0 0 100 100" fill="currentColor">
                <rect x="20" y="20" width="60" height="60" rx="10" />
              </svg>
            </div>

            <div className="relative z-10">
              <motion.h2
                className="font-display text-3xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Get In Touch
              </motion.h2>
              <p className="font-body text-lg mb-8 leading-relaxed opacity-90">
                Ready to solve your plumbing issues? Fill out the form and our team will get back to you within 24 hours.
              </p>

              <div className="space-y-6">
                {[
                  { icon: Phone, text: '(410) 995-0882', href: 'tel:4109950882' },
                  { icon: Mail, text: 'info@afternoonplumbing.com', href: 'mailto:info@afternoonplumbing.com' },
                  { icon: MapPin, text: 'Westminster, MD 21157', href: null },
                  { icon: Clock, text: 'Mon-Sat: 8am-7pm', href: null }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-body text-base hover:underline"
                          style={{ color: 'var(--text-inverse)' }}
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="font-body text-base" style={{ color: 'var(--text-inverse)' }}>
                          {item.text}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust Badges */}
              <motion.div
                className="mt-10 pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <p className="font-body text-sm font-semibold uppercase tracking-wider mb-4">
                  Why Choose Us?
                </p>
                <div className="flex flex-wrap gap-3">
                  {['Licensed', 'Insured', '24/7 Emergency', 'Free Estimates'].map((badge) => (
                    <span
                      key={badge}
                      className="px-4 py-2 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3 p-8 lg:p-10 bg-white">
            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <CheckCircle className="w-20 h-20 mb-6" style={{ color: 'var(--color-success)' }} />
                  </motion.div>
                  <h3
                    className="font-display text-2xl font-bold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    className="font-body max-w-md"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Thank you for reaching out. We&apos;ve received your message and will contact you shortly to schedule your service.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formFields.slice(0, 4).map((field, i) => (
                      <motion.div
                        key={field.name}
                        custom={i}
                        variants={inputGroupVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-2"
                      >
                        <label
                          className="flex items-center gap-2 text-sm font-semibold"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          <field.icon className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                          {field.label}
                          {field.required && <span className="text-error">*</span>}
                        </label>
                        {field.type === 'select' ? (
                          <select
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            style={{
                              backgroundColor: 'var(--bg-secondary)',
                              borderColor: errors[field.name]
                                ? 'var(--color-error)'
                                : 'var(--border-default)',
                              color: 'var(--text-primary)'
                            }}
                          >
                            {field.options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={4}
                            className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                            style={{
                              backgroundColor: 'var(--bg-secondary)',
                              borderColor: errors[field.name]
                                ? 'var(--color-error)'
                                : 'var(--border-default)',
                              color: 'var(--text-primary)'
                            }}
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            style={{
                              backgroundColor: 'var(--bg-secondary)',
                              borderColor: errors[field.name]
                                ? 'var(--color-error)'
                                : 'var(--border-default)',
                              color: 'var(--text-primary)'
                            }}
                            placeholder={field.placeholder}
                          />
                        )}
                        <AnimatePresence>
                          {errors[field.name] && (
                            <motion.p
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="flex items-center gap-2 text-sm"
                              style={{ color: 'var(--color-error)' }}
                            >
                              <AlertCircle className="w-4 h-4" />
                              {errors[field.name]}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </div>

                  {/* Message Field (Full Width) */}
                  <motion.div
                    custom={4}
                    variants={inputGroupVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <label
                      className="flex items-center gap-2 text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      <MessageSquare className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                      Additional Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        borderColor: 'var(--border-default)',
                        color: 'var(--text-primary)'
                      }}
                      placeholder="Please describe your plumbing issue, any specific concerns, and preferred contact times..."
                    />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-primary-500 text-white font-body font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-primary-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-3"
                    whileHover={isSubmitting ? {} : { scale: 1.01 }}
                    whileTap={isSubmitting ? {} : { scale: 0.99 }}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>

                  <p
                    className="text-xs text-center font-body"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    By submitting, you agree to our privacy policy. We never share your information.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}