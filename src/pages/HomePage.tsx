import { Link } from 'react-router-dom'
import { Wrench, Droplets, Shield, Clock, Star, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

const services = [
  {
    icon: Droplets,
    title: 'Water Heaters',
    description: 'Professional installation, repair, and replacement of all water heater types. Tankless and traditional systems.',
  },
  {
    icon: Shield,
    title: 'Water Softeners',
    description: 'Improve water quality with our premium water softening solutions. Eliminate hard water damage.',
  },
  {
    icon: Wrench,
    title: 'Well Pumps',
    description: 'Expert well pump installation, repair, and maintenance. Keep your water flowing reliably.',
  },
  {
    icon: Droplets,
    title: 'Acid Neutralizers',
    description: 'Protect your plumbing and fixtures with professional acid neutralizer installation.',
  },
]

const testimonials = [
  {
    name: 'John D.',
    text: 'Fast, professional service. Fixed our water heater in no time. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Sarah M.',
    text: 'Afternoon Plumbing is our go-to for all plumbing needs. Reliable and affordable.',
    rating: 5,
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Westminster's Trusted Plumbing Experts
              </h1>
              <p className="text-xl text-primary-100 mb-8">
                Professional plumbing services for homeowners. Fast, reliable, and affordable.
                24/7 emergency service available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="btn-primary flex items-center justify-center space-x-2">
                  <Phone className="h-5 w-5" />
                  <span>Schedule Service</span>
                </Link>
                <Link to="/services" className="btn-secondary border-white text-white hover:bg-white hover:text-primary-700 flex items-center justify-center">
                  View Services
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative">
                <Wrench className="h-48 w-48 text-white opacity-20 absolute top-0 right-0" />
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold mb-4">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-primary-200" />
                      <span>Same-day service available</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-primary-200" />
                      <span>Licensed & insured</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <Star className="h-5 w-5 text-primary-200" />
                      <span>5-star rated by customers</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Services</h2>
            <p className="section-subtitle">
              Comprehensive plumbing solutions for residential homes in Westminster and surrounding areas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                  <service.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link
                  to="/services"
                  className="text-primary-600 font-semibold hover:text-primary-700 inline-flex items-center space-x-1"
                >
                  <span>Learn More</span>
                  <span>→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-water-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Need Plumbing Help Now?
          </h2>
          <p className="text-xl text-water-100 mb-8">
            We're available 24/7 for emergency plumbing services. Call us anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+14405551234"
              className="bg-white text-water-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1"
            >
              Call (440) 555-1234
            </a>
            <Link
              to="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-water-700 transition-all"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="card">
                <div className="flex mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}