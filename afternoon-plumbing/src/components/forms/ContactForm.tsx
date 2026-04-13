import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactFormProps {
  isEmergency?: boolean;
  compact?: boolean;
  onSuccess?: () => void;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ isEmergency = false, onSuccess }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'Water Heater Installation/Replacement',
    'Well Pump Repair/Replacement', 
    'Water Softener Installation',
    'Acid Neutralizer Installation',
    'General Plumbing Repair',
    'Other'
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name');
      return false;
    }

    if (!formData.phone.trim()) {
      setErrorMessage('Please enter your phone number');
      return false;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
      setErrorMessage('Please enter a valid phone number');
      return false;
    }

    if (!formData.service) {
      setErrorMessage('Please select a service');
      return false;
    }

    if (!formData.message.trim()) {
      setErrorMessage('Please describe your plumbing needs');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('service', formData.service);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('form-name', 'contact-form');

      const response = await fetch('/', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });
        onSuccess?.();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('idle');
      setErrorMessage('Failed to submit form. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="text-center py-8 bg-green-50 rounded-xl border border-green-200">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">We'll contact you shortly.</p>
        <button
          onClick={() => {
            setSubmitStatus('idle');
            onSuccess?.();
          }}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Submit Another
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-amber-100"
    >
      <h3 className={`${isEmergency ? 'text-red-600' : 'text-amber-600'} font-bold text-lg mb-2`}>
        {isEmergency ? '🚨 Emergency Request' : 'Contact Us'}
      </h3>
      <p className="text-gray-600 text-sm mb-4">
        {isEmergency
          ? 'Fill out this form for immediate assistance.'
          : 'We\'ll get back to you within 24 hours.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4" data-netlify="true">
        <input type="hidden" name="form-name" value="contact-form" />

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
              placeholder="(XXX) XXX-XXXX"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none bg-white"
          >
            <option value="">Select a service...</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isEmergency ? 'Emergency Details *' : 'Message *'}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none resize-none"
            placeholder={isEmergency ? 'Describe the emergency...' : 'Tell us about your project...'}
          />
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white ${
            isEmergency ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'
          } disabled:opacity-50`}
        >
          {isSubmitting ? 'Submitting...' : (isEmergency ? 'Emergency Request' : 'Submit')}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
