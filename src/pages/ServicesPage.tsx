import { Link } from 'react-router-dom'
import { Wrench, Droplets, Shield, CheckCircle, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Droplets,
    title: 'Water Heater Installation & Repair',
    description: 'Complete water heater services including tankless, traditional, and hybrid systems. We handle everything from installation to maintenance and emergency repairs.',
    features: [
      'Tankless water heater installation',
      'Traditional tank replacement',
      'Same-day service available',
      'Energy efficiency consultation',
      'Warranty protection',
    ],
    emergency: true,
  },
  {
    icon: Shield,
    title: 'Water Softeners & Filtration',
    description: 'Improve your home\'s water quality with our premium water softening and filtration solutions. Say goodbye to hard water stains and scale buildup.',
    features: [
      'Whole-house water softeners',
      'Point-of-use filtration',
      'Acid neutralizer systems',
      'Water testing & consultation',
      'Maintenance & salt delivery',
    ],
    emergency: false,
  },
  {
    icon: Wrench,
    title: 'Well Pump Services',
    description: 'Expert well pump installation, repair, and maintenance. Ensure a reliable water supply for your home with our professional well services.',
    features: [
      'Well pump installation',
      'Pressure tank setup',
      'Pump repair & replacement',
      'Pressure switch repair',
      'Water pressure troubleshooting',
    ],
    emergency: true,
  },
  {
    icon: Droplets,
    title: 'General Plumbing Repairs',
    description: 'From leaky faucets to major pipe repairs, we handle all your plumbing needs with expertise and professionalism.',
    features: [
      'Leak detection & repair',
      'Pipe replacement',
      'Drain cleaning',
      'Fixtures installation',
      'Sump pump services',
    ],
    emergency: false,
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Our Plumbing Services
            </h1>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Comprehensive plumbing solutions tailored to your home's needs.
              Licensed technicians, upfront pricing, and satisfaction guaranteed.
            </p>
            <a
              href="tel:+14405551234"
              className="inline-flex items-center space-x-2 bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              <Phone className="h-5 w-5" />
              <span>Call for a Free Quote</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid md:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="order-2 md:order-1">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                    service.emergency
                      ? 'bg-red-100 text-red-700'
                      : 'bg-primary-100 text-primary-700'
                  }`}>
                    {service.emergency ? (
                      <>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span>24/7 Emergency Available</span>
                      </>
                    ) : (
                      <span>By Appointment</span>
                    )}
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-lg mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="tel:+14405551234"
                      className="btn-primary flex items-center justify-center space-x-2"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Schedule Service</span>
                    </a>
                    <Link
                      to="/contact"
                      className="btn-secondary flex items-center justify-center"
                    >
                      Request Quote
                    </Link>
                  </div>
                </div>
                <div className="order-1 md:order-2 flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-48 h-48 bg-primary-100 rounded-full flex items-center justify-center"
                  >
                    <service.icon className="h-24 w-24 text-primary-600" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="bg-primary-700 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-white text-lg mb-4 md:mb-0">
              Not sure which service you need? We offer free consultations.
            </p>
            <a
              href="tel:+14405551234"
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
            >
              Call (440) 555-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}