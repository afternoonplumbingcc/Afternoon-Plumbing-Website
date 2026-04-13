import { Link } from 'react-router-dom'
import { Wrench, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-steel-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Wrench className="h-8 w-8 text-primary-400" />
              <span className="font-heading text-xl font-bold">
                Afternoon Plumbing
              </span>
            </div>
            <p className="text-gray-300 mb-4">
              Professional plumbing services for Westminster and surrounding areas.
              Licensed, insured, and committed to exceptional customer service.
            </p>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="h-5 w-5 text-primary-400" />
              <span>Westminster, MD 21157</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-5 w-5 text-primary-400" />
                <a href="tel:+14405551234" className="hover:text-white transition-colors">
                  (440) 555-1234
                </a>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Clock className="h-5 w-5 text-primary-400" />
                <span>24/7 Emergency Service</span>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-gray-300 text-sm">
                Serving a 20-mile radius around Westminster, MD
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Afternoon Plumbing. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}