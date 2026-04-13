import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './tokens.css';
import Header from './Header';
import Hero from './Hero';
import ServiceCard from './ServiceCard';
import Testimonials from './Testimonials';
import ContactForm from './ContactForm';
import Footer from './Footer';
import {
  Wrench,
  Droplets,
  Zap,
  Shield,
  Clock,
  Phone,
  Award,
  CheckCircle,
  MapPin,
  Star
} from 'lucide-react';

const services = [
  {
    id: 'water-softeners',
    icon: Droplets,
    title: 'Water Softeners',
    shortDesc: 'Say goodbye to hard water',
    description: 'Experience the difference with professionally installed water softeners. Remove calcium, magnesium, and other minerals that cause scale buildup, dry skin, and appliance damage. Custom solutions for every home.',
    features: [
      'Complimentary water analysis',
      'Top-brand systems installed',
      'Salt delivery service available',
      'Maintenance plans included',
      '10-year warranties on equipment'
    ],
    image: '/images/water-softener.jpg', // Replace with actual image
    accentColor: 'primary'
  },
  {
    id: 'well-pumps',
    icon: Zap,
    title: 'Well Pumps',
    shortDesc: 'Reliable water pressure',
    description: 'Don&apos;t lose access to water when your well pump fails. We diagnose, repair, and replace all types of well pumps with rapid response times. Keep your home running with dependable water delivery systems.',
    features: [
      '24/7 emergency repair',
      'Pressure tank installation',
      'Pump sizing & optimization',
      'Submersible & jet pumps',
      'Pressure switch tuning'
    ],
    image: '/images/well-pump.jpg',
    accentColor: 'secondary'
  },
  {
    id: 'water-heaters',
    icon: Zap,
    title: 'Water Heaters',
    shortDesc: 'Hot water when you need it',
    description: 'From traditional tank units to modern tankless systems, we install and service all water heater types. Enjoy consistent hot water, improved efficiency, and expert craftsmanship.',
    features: [
      'Tank & tankless options',
      'Energy-efficient models',
      'Fast installation',
      'Flush & maintenance',
      'Emergency replacements'
    ],
    image: '/images/water-heater.jpg',
    accentColor: 'primary'
  },
  {
    id: 'acid-neutralizers',
    icon: Shield,
    title: 'Acid Neutralizers',
    shortDesc: 'Protect your plumbing & fixtures',
    description: ' acidic water can corrode pipes and damage fixtures. Our acid neutralizer systems balance pH levels to protect your entire plumbing system and extend the life of your appliances.',
    features: [
      'pH testing & consultation',
      'Calcite media tanks',
      'Automatic backwash systems',
      'Low maintenance design',
      'Extends plumbing lifespan'
    ],
    image: '/images/acid-neutralizer.jpg',
    accentColor: 'success'
  }
];

const faqItems = [
  {
    question: 'How quickly can you respond to an emergency?',
    answer: 'We offer 24/7 emergency service and typically respond within 1-2 hours for urgent situations in the Westminster area. After-hours calls go directly to our on-call technician.'
  },
  {
    question: 'Do you provide free estimates?',
    answer: 'Yes! We provide free, no-obligation estimates for all service work. For service calls, we charge a diagnostic fee that is waived if you proceed with the recommended repair.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve Westminster, MD and the surrounding areas within a 20-mile radius, including Hampstead, Manchester, Finksburg, Sykesville, Eldersburg, and neighboring communities.'
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Absolutely. Afternoon Plumbing is fully licensed, bonded, and insured. Our team consists of experienced, background-checked professionals who take pride in their work.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept cash, checks, all major credit cards, and financing options for larger projects. We also work with many insurance companies for water damage claims.'
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="font-display text-4xl lg:text-5xl font-bold mb-6"
            style={{ color: 'var(--text-primary)' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="font-body text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Quick answers to common questions about our services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors"
                style={{ backgroundColor: openIndex === index ? 'var(--bg-secondary)' : 'var(--bg-primary)' }}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span
                  className="font-body font-semibold text-lg pr-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 flex-shrink-0 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary-50)' }}
                >
                  <ChevronRight className="w-4 h-4" style={{ color: 'var(--color-primary-500)' }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="font-body leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading fonts and assets
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-500"
        />
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen"
      >
        <Header />
        <main>
          <Hero />

          {/* Services Section */}
          <section id="services" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span
                  className="inline-block px-5 py-2.5 rounded-full mb-6 text-sm font-semibold"
                  style={{
                    backgroundColor: 'var(--color-secondary-50)',
                    color: 'var(--color-secondary-700)'
                  }}
                >
                  What We Do
                </span>
                <h2
                  className="font-display text-4xl lg:text-5xl font-bold mb-6"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Expert Plumbing Services
                </h2>
                <p className="font-body text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  From routine maintenance to emergency repairs, we handle every aspect of residential plumbing with professionalism and care.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, index) => (
                  <ServiceCard
                    key={service.id}
                    icon={service.icon}
                    title={service.title}
                    description={service.shortDesc}
                    features={service.features}
                    image={service.image}
                    href={`/services/${service.id}`}
                    index={index}
                    accentColor={service.accentColor}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* About Preview Section */}
          <section id="about" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  <span
                    className="inline-block px-5 py-2.5 rounded-full mb-6 text-sm font-semibold"
                    style={{
                      backgroundColor: 'var(--color-primary-50)',
                      color: 'var(--color-primary-700)'
                    }}
                  >
                    Why Choose Us
                  </span>
                  <h2
                    className="font-display text-4xl lg:text-5xl font-bold mb-8 leading-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Local Experts Who Actually Care
                  </h2>
                  <div className="space-y-6 font-body text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    <p>
                      Afternoon Plumbing is a locally-owned, family-operated business serving Westminster and the surrounding communities. We believe in honest communication, fair pricing, and exceptional craftsmanship.
                    </p>
                    <p>
                      Our team of licensed professionals takes pride in building lasting relationships with our customers. When you call us, you&apos;ll speak with a real person—not an automated system—and we&apos;ll treat your home with the respect it deserves.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mt-10">
                    {[
                      { icon: CheckCircle, text: 'Upfront Pricing' },
                      { icon: Clock, text: 'On-Time Guarantee' },
                      { icon: Shield, text: 'Licensed & Insured' },
                      { icon: Award, text: '5-Star Service' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary-50)' }}>
                          <item.icon className="w-5 h-5" style={{ color: 'var(--color-primary-500)' }} />
                        </div>
                        <span className="font-body font-semibold" style={{ color: 'var(--text-primary)' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative bg-white rounded-3xl shadow-2xl p-8 border" style={{ borderColor: 'var(--border-light)' }}>
                    <div className="text-center mb-8">
                      <h3 className="font-display text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Service Area
                      </h3>
                      <p className="font-body" style={{ color: 'var(--text-secondary)' }}>
                        Proudly serving homeowners within 20 miles of Westminster, MD
                      </p>
                    </div>
                    <div className="aspect-square max-w-sm mx-auto relative rounded-2xl overflow-hidden bg-neutral-100">
                      {/* This would be replaced with an actual map */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50">
                        <div className="text-center">
                          <MapPin className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-primary-500)' }} />
                          <p className="font-body font-semibold" style={{ color: 'var(--text-primary)' }}>
                            Westminster, MD 21157
                          </p>
                          <p className="font-body text-sm mt-2" style={{ color: 'var(--text-tertiary)' }}>
                            20-mile service radius
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 grid grid-cols-2 gap-3">
                      {['Westminster', 'Hampstead', 'Manchester', 'Finksburg', 'Sykesville', 'Eldersburg', 'New Windsor', 'Union Bridge'].map((town) => (
                        <span
                          key={town}
                          className="px-3 py-2 bg-neutral-50 rounded-lg text-center text-sm font-medium"
                          style={{
                            backgroundColor: 'var(--bg-secondary)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {town}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <Testimonials />

          {/* Contact Section */}
          <section id="contact" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <span
                  className="inline-block px-5 py-2.5 rounded-full mb-6 text-sm font-semibold"
                  style={{
                    backgroundColor: 'var(--color-secondary-50)',
                    color: 'var(--color-secondary-700)'
                  }}
                >
                  Get Started
                </span>
                <h2
                  className="font-display text-4xl lg:text-5xl font-bold mb-6"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Let&apos;s Talk About Your Plumbing
                </h2>
                <p className="font-body text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
                  Fill out the form below or give us a call. We&apos;ll get back to you within 24 hours with a free estimate.
                </p>
              </motion.div>

              <ContactForm />
            </div>
          </section>

          {/* FAQ */}
          <FAQSection />
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default App;