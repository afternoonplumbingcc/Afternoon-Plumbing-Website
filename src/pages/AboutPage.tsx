import { Link } from 'react-router-dom'
import { Users, Award, Clock, Shield, CheckCircle, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'

const values = [
  {
    icon: Shield,
    title: 'Integrity First',
    description: 'Honest pricing, no hidden fees. We tell it like it is and stand by our word.',
  },
  {
    icon: Users,
    title: 'Customer Focused',
    description: 'Your satisfaction is our top priority. We listen, educate, and deliver exceptional service.',
  },
  {
    icon: Clock,
    title: 'Reliable',
    description: 'On-time arrivals, same-day service when possible, and we keep you updated every step.',
  },
  {
    icon: Award,
    title: 'Professional',
    description: 'Licensed, insured, and continuously trained to exceed industry standards.',
  },
]

const team = [
  {
    name: 'Chris Anderson',
    role: 'Master Plumber & Owner',
    description: 'With over 15 years of experience, Chris leads our team with expertise and a commitment to quality craftsmanship.',
  },
  {
    name: 'Mike Johnson',
    role: 'Senior Technician',
    description: 'Mike specializes in complex installations and water treatment systems with 10+ years in the trade.',
  },
]

const stats = [
  { value: '15+', label: 'Years Experience' },
  { value: '1000+', label: 'Jobs Completed' },
  { value: '5.0', label: 'Google Rating' },
  { value: '24/7', label: 'Emergency Service' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              About Afternoon Plumbing
            </h1>
            <p className="text-xl text-primary-100">
              We're a family-owned plumbing company serving Westminster and the surrounding communities
              with integrity, expertise, and a commitment to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="text-4xl font-heading font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  Afternoon Plumbing was founded with a simple mission: provide honest, reliable
                  plumbing services at fair prices. What started as a one-person operation has
                  grown into a trusted team of licensed professionals serving all of Westminster
                  and the surrounding areas.
                </p>
                <p>
                  We understand that plumbing issues can be stressful and disruptive. That's why
                  we prioritize clear communication, punctual arrivals, and clean work sites.
                  Our goal is to make every service call as smooth and worry-free as possible.
                </p>
                <p>
                  When you choose Afternoon Plumbing, you're choosing a partner who cares about
                  your home and your peace of mind. We're not satisfied until you're completely
                  happy with our work.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="w-64 h-64 bg-primary-100 rounded-full flex items-center justify-center">
                <Wrench className="h-32 w-32 text-primary-600" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">What We Stand For</h2>
            <p className="section-subtitle">
              Our core values guide every job we do and every customer we serve.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">
              Experienced professionals you can trust.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="card"
              >
                <div className="w-24 h-24 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-12 w-12 text-primary-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold text-center mb-4">
                  {member.role}
                </p>
                <p className="text-gray-600 text-center">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Experience the Afternoon Plumbing difference. Contact us today for a free consultation
            and see why our customers trust us for all their plumbing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Get in Touch
            </Link>
            <a
              href="tel:+14405551234"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-700 transition-all"
            >
              Call (440) 555-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}