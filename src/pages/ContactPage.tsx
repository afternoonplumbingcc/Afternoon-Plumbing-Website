import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, this would send to a backend
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
  }

  const contactInfo = [
    {
      icon: Phone,
      label: 'Phone',
      value: '(440) 555-1234',
      href: 'tel:+14405551234',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@afternoonplumbing.com',
      href: 'mailto:info@afternoonplumbing.com',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: 'Westminster, MD 21157',
      href: null,
    },
    {
      icon: Clock,
      label: 'Hours',
      value: '24/7 Emergency Service',
      href: null,
    },
  ]

  const services = [
    'Water Heater Installation/Repair',
    'Water Softener/Filtration',
    'Well Pump Services',
    'General Plumbing Repairs',
    'Emergency Plumbing',
    'Other - Please describe',
  ]

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
              Get in Touch
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              Need plumbing service? Have questions? We're here to help.
              Reach out today for a free consultation or emergency assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <h2 className="text-2xl font-heading font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 font-medium mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-lg text-gray-900 hover:text-primary-600 transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-lg text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Service Area</h3>
                <p className="text-gray-600 mb-4">
                  We proudly serve Westminster and the surrounding areas within a 20-mile radius.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Westminster', 'Manchester', 'Hampstead', 'Finksburg', 'Sykesville', 'Mount Airy'].map((town) => (
                    <span
                      key={town}
                      className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                    >
                      {town}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                      Thank You!
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      We've received your message and will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="btn-primary"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                      Request a Quote
                    </h2>
                    <p className="text-gray-600 mb-8">
                      Fill out the form below and we'll contact you shortly.
                      For emergencies, please call us directly.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            placeholder="John Smith"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            placeholder="john@example.com"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                            placeholder="(443) 555-0123"
                          />
                        </div>
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                            Service Needed *
                          </label>
                          <select
                            name="service"
                            id="service"
                            required
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                          >
                            <option value="">Select a service...</option>
                            {services.map((service) => (
                              <option key={service} value={service}>
                                {service}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Message / Details *
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
                          placeholder="Describe your plumbing issue or project..."
                        />
                      </div>
                      <div className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id="emergency"
                          className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="emergency" className="text-sm text-gray-700">
                          This is an emergency. Please call me as soon as possible.
                        </label>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button
                          type="submit"
                          className="btn-primary flex items-center justify-center space-x-2"
                        >
                          <span>Send Message</span>
                        </button>
                        <a
                          href="tel:+14405551234"
                          className="btn-secondary flex items-center justify-center"
                        >
                          <Phone className="h-5 w-5 mr-2" />
                          <span>Call Now</span>
                        </a>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Location</h2>
            <p className="section-subtitle">
              Based in Westminster, MD and serving all surrounding communities.
            </p>
          </div>
          <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                Westminster, MD 21157
              </p>
              <p className="text-gray-500 mt-2">
                (Interactive map placeholder)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}