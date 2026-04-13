import { useEffect } from 'react';
import {
  ContactForm,
  QuoteForm,
  EmergencyCTA,
  SocialContact,
  MobileContactBar,
  GBPSchema,
  ReviewSchema
} from './components';
import { initCallTracker } from './utils';
import {
  Phone,
  MapPin,
  Clock,
  Star,
  Shield,
  Award,
  Wrench,
  Droplets,
  Bath,
  CheckCircle
} from 'lucide-react';
import './App.css';

const BUSINESS_INFO = {
  name: 'Afternoon Plumbing',
  phone: '(443) 555-1234',
  email: 'info@afternoonplumbing.com',
  address: '123 Main St',
  city: 'Westminster',
  state: 'MD',
  zip: '21157',
  latitude: 39.5543,
  longitude: -76.9863,
  serviceArea: [
    'Westminster', 'Finksburg', 'Hampstead', 'Manchester',
    'Sykesville', 'Eldersburg', 'Mount Airy', 'Carroll County'
  ],
  yearsInBusiness: 12,
  website: 'https://afternoonplumbing.com'
};

const SERVICES = [
  {
    name: 'Water Heater Installation & Repair',
    description: 'Professional water heater installation, repair, and replacement for tank and tankless units. Serving Westminster and Carroll County, MD with upfront pricing and 24/7 emergency service.',
    icon: Bath,
    slug: 'water-heaters',
    serviceType: 'WaterHeaterInstallation'
  },
  {
    name: 'Well Pump Systems',
    description: 'Complete well pump repair, replacement, and pressure tank installation for homes in Westminster, MD and surrounding areas. Licensed & insured.',
    icon: Wrench,
    slug: 'well-pumps',
    serviceType: 'WellPumpRepair'
  },
  {
    name: 'Water Treatment Systems',
    description: 'Water softeners, acid neutralizers, and whole-house filtration systems for cleaner, healthier water in your Westminster home. Free water quality consultations.',
    icon: Droplets,
    slug: 'water-treatment',
    serviceType: 'WaterTreatment'
  },
  {
    name: 'General Plumbing Repairs',
    description: 'Reliable plumbing repairs including leak fixes, drain cleaning, fixture installation, and pipe replacement. Trusted by homeowners in Carroll County.',
    icon: Wrench,
    slug: 'general-plumbing',
    serviceType: 'PlumbingRepair'
  }
];

interface Review {
  author: string;
  datePublished: string;
  reviewBody: string;
  rating: number;
}

const REVIEWS: Review[] = [
  {
    author: 'Mike S.',
    datePublished: '2025-12-15',
    reviewBody: 'Afternoon Plumbing replaced my water heater quickly and professionally. Highly recommend!',
    rating: 5
  },
  {
    author: 'Sarah L.',
    datePublished: '2025-11-20',
    reviewBody: 'Had a well pump emergency on a Sunday. They responded within an hour. Great service!',
    rating: 5
  },
  {
    author: 'Tom & Jenny M.',
    datePublished: '2025-10-08',
    reviewBody: 'Installed a new water softener and acid neutralizer. Very knowledgeable and clean work.',
    rating: 5
  }
];

const WhyChooseUs = [
  { icon: Clock, title: '24/7 Emergency Service', desc: 'Major emergencies responded within 60 minutes' },
  { icon: Shield, title: 'Licensed & Insured', desc: 'Fully certified master plumbers you can trust' },
  { icon: Award, title: '5-Star Rated', desc: 'Consistently rated 5 stars' },
  { icon: CheckCircle, title: 'Upfront Pricing', desc: 'No surprise fees. You approve before we start.' }
];

function App() {
  useEffect(() => {
    initCallTracker(BUSINESS_INFO.phone);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToForm = () => {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <GBPSchema
        businessInfo={BUSINESS_INFO}
        services={SERVICES.map(s => ({ name: s.name, description: s.description, serviceType: s.serviceType }))}
      />
      <ReviewSchema
        businessInfo={BUSINESS_INFO}
        reviews={REVIEWS}
        aggregateRating={{ rating: 5.0, reviewCount: REVIEWS.length }}
      />
      <EmergencyCTA phoneNumber={BUSINESS_INFO.phone} />

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Wrench className="w-7 h-7 text-amber-700" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{BUSINESS_INFO.name}</h1>
              <p className="text-sm text-gray-500">{BUSINESS_INFO.city}, {BUSINESS_INFO.state}</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#services" className="text-gray-600 hover:text-amber-600">Services</a>
            <a href="#reviews" className="text-gray-600 hover:text-amber-600">Reviews</a>
            <a href="#contact-form" className="text-gray-600 hover:text-amber-600">Free Quote</a>
          </nav>

          <div className="flex items-center space-x-3">
            <SocialContact phoneNumber={BUSINESS_INFO.phone} variant="compact" showLabels={false} />
          </div>
        </div>
      </header>

      <section className="pt-16 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
                🏆 Trusted for {BUSINESS_INFO.yearsInBusiness}+ Years
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Plumbing Services You Can Trust
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                From water heater installations to well pump repairs, water softeners, and acid neutralizers,
                Afternoon Plumbing delivers reliable, upfront-priced service for homeowners in Westminster and surrounding areas.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button
                  onClick={scrollToContact}
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-amber-600 text-white rounded-full font-bold text-lg hover:bg-amber-700 shadow-lg shadow-amber-200"
                >
                  Get Free Quote
                </button>
                <button
                  onClick={scrollToServices}
                  className="flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-amber-600 text-amber-700 rounded-full font-bold text-lg hover:bg-amber-50"
                >
                  View Services
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-gray-700">5.0</span>
                  <span>({REVIEWS.length}+ reviews)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span>Licensed & Insured</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-amber-100">
                <QuoteForm onSuccess={() => {}} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobileContactBar phoneNumber={BUSINESS_INFO.phone} />

      <section id="services" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Water heaters, well pumps, water treatment, and everyday plumbing repairs for homes in Westminster and nearby Carroll County communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <button
                key={service.slug}
                type="button"
                onClick={scrollToForm}
                className="bg-gradient-to-b from-white to-amber-50 rounded-xl p-6 border border-amber-100 hover:shadow-lg w-full text-left focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                  <service.icon className="w-8 h-8 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <span className="text-amber-600 font-medium text-sm">Get Quote →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Afternoon Plumbing?</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WhyChooseUs.map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 shadow-sm border border-amber-100 text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-xl font-bold text-gray-700">5.0</span>
              <span className="text-gray-500">({REVIEWS.length} reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((review: Review, index: number) => (
              <div key={index} className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                <div className="flex items-center mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{review.reviewBody}"</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-900">{review.author}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.datePublished).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact-form" className="py-16 px-4 bg-amber-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get Your Free Quote Today</h2>
            <p className="text-lg text-gray-600">
              Tell us about your water heater, well pump, water treatment, or plumbing project and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <QuoteForm onSuccess={() => {}} />
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 border border-amber-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center space-x-3 p-3 rounded-lg bg-amber-50">
                    <Phone className="w-6 h-6 text-amber-600" />
                    <div>
                      <div className="text-sm text-gray-500">Call Us</div>
                      <div className="font-bold text-gray-900">{BUSINESS_INFO.phone}</div>
                    </div>
                  </a>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                    <MapPin className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-sm text-gray-500">Service Area</div>
                      <div className="font-medium text-gray-900">{BUSINESS_INFO.city}, {BUSINESS_INFO.state}</div>
                      <div className="text-sm text-gray-600 mt-1">Serving Westminster, Finksburg, Hampstead, Manchester, Sykesville, and surrounding Carroll County communities.</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                    <Clock className="w-6 h-6 text-amber-600" />
                    <div>
                      <div className="text-sm text-gray-500">Hours</div>
                      <div className="font-medium text-gray-900">Mon-Fri: 8AM - 6PM</div>
                      <div className="font-medium text-gray-900">Sat: 9AM - 2PM</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-amber-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Chat With Us</h3>
                <SocialContact phoneNumber={BUSINESS_INFO.phone} variant="vertical" showLabels={true} />
              </div>

              <div className="bg-white rounded-xl p-6 border border-amber-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Service Area</h3>
                <div className="flex flex-wrap gap-2">
                  {BUSINESS_INFO.serviceArea.map(city => (
                    <span key={city} className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Need to Reach Us Now?</h2>
          </div>
          <div className="max-w-xl mx-auto">
            <ContactForm compact onSuccess={() => {}} />
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                  <Wrench className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{BUSINESS_INFO.name}</h3>
                  <p className="text-sm text-gray-400">{BUSINESS_INFO.city}, {BUSINESS_INFO.state}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">Water heaters, well pumps, water treatment, and honest upfront pricing for homeowners in Westminster, MD.</p>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {SERVICES.map(s => <li key={s.slug}>{s.name}</li>)}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-4">Contact</h4>
              <ul className="space-y-3 text-gray-400 text-sm">
                <li>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="flex items-center space-x-2 hover:text-white">
                    <Phone className="w-4 h-4" /><span>{BUSINESS_INFO.phone}</span>
                  </a>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" /><span>{BUSINESS_INFO.address}</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" /><span>Mon-Fri 8AM-6PM, Sat 9AM-2PM</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 mb-4">Connect</h4>
              <SocialContact phoneNumber={BUSINESS_INFO.phone} variant="vertical" showLabels={true} />
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
            <p className="mt-2"><a href="/sitemap.xml" className="hover:text-white underline">Sitemap</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
