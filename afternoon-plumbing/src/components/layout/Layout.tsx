import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ rotate: 10 }} className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AP</span>
            </motion.div>
            <span className="font-heading font-bold text-xl md:text-2xl text-gray-900">Afternoon Plumbing</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative font-medium transition-colors duration-200 ${
                  isActive(item.href) ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div layoutId="navbar-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600" />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="tel:4105551234" className="btn-primary flex items-center space-x-2">
              <Phone size={18} />
              <span>Call Now</span>
            </a>
          </div>

          <button className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href} className={`px-2 py-2 rounded-lg transition-colors ${isActive(item.href) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-50'}`} onClick={() => setIsMenuOpen(false)}>
                    {item.name}
                  </Link>
                ))}
                <a href="tel:4105551234" className="btn-primary flex items-center justify-center space-x-2 mt-4">
                  <Phone size={18} />
                  <span>Call Now</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Water Heater Installation', href: '/services/water-heaters' },
      { name: 'Well Pump Replacement', href: '/services/well-pumps' },
      { name: 'Water Softeners', href: '/services/water-softeners' },
      { name: 'Acid Neutralizers', href: '/services/acid-neutralizers' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center"><span className="text-white font-bold text-xl">AP</span></div>
              <span className="font-heading font-bold text-xl">Afternoon Plumbing</span>
            </div>
            <p className="text-gray-400 mb-4">Professional plumbing services in Westminster, MD.</p>
            <div className="space-y-2 text-sm">
              <a href="tel:4105551234" className="flex items-center space-x-2 text-gray-300 hover:text-white"><Phone size={14} /><span>(410) 555-1234</span></a>
              <a href="mailto:info@afternoonplumbing.com" className="flex items-center space-x-2 text-gray-300 hover:text-white"><Mail size={14} /><span>info@afternoonplumbing.com</span></a>
              <div className="flex items-start space-x-2 text-gray-300"><MapPin size={14} className="mt-1" /><span>123 Main St, Westminster, MD 21157</span></div>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}><Link to={link.href} className="text-gray-400 hover:text-white text-sm">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}><Link to={link.href} className="text-gray-400 hover:text-white text-sm">{link.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Hours</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <p>Mon-Fri: 7:00 AM - 7:00 PM</p>
              <p>Sat: 8:00 AM - 5:00 PM</p>
              <p>Sun: Emergency Only</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          © {currentYear} Afternoon Plumbing. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-grow">{children}</main>
    <Footer />
  </div>
);

export default Layout;
