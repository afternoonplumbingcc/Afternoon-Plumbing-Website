import { useState } from 'react';
import type { FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuoteFormProps {
  onSuccess?: () => void;
}

interface FormData {
  serviceCategory: string;
  specificService: string;
  address: string;
  city: string;
  zipCode: string;
  name: string;
  phone: string;
  email: string;
  description: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceCategory: '',
    specificService: '',
    address: '',
    city: 'Westminster',
    zipCode: '',
    name: '',
    phone: '',
    email: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const serviceCategories = [
    { value: 'water_heating', label: 'Water Heaters', services: ['Tank Water Heater', 'Tankless Water Heater', 'Water Heater Repair'] },
    { value: 'well_pumps', label: 'Well Pumps', services: ['Well Pump Replacement', 'Well Pump Repair', 'Pressure Tank Installation'] },
    { value: 'water_treatment', label: 'Water Treatment', services: ['Water Softener', 'Acid Neutralizer', 'Whole-House Filtration'] },
    { value: 'general', label: 'General Plumbing', services: ['Leak Repair', 'Drain Cleaning', 'Fixture Installation', 'Pipe Replacement'] }
  ];

  const steps = [
    { number: 1, title: 'Service' },
    { number: 2, title: 'Address' },
    { number: 3, title: 'Contact' },
    { number: 4, title: 'Details' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorMessage('');
  };

  const handleRadioChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.serviceCategory) {
          setErrorMessage('Please select a service category');
          return false;
        }
        if (!formData.specificService) {
          setErrorMessage('Please select a specific service');
          return false;
        }
        return true;
      case 2:
        if (!formData.address.trim()) {
          setErrorMessage('Please enter your address');
          return false;
        }
        if (!formData.city.trim()) {
          setErrorMessage('Please enter your city');
          return false;
        }
        if (!formData.zipCode.trim() || !/^\d{5}$/.test(formData.zipCode)) {
          setErrorMessage('Please enter a valid 5-digit zip code');
          return false;
        }
        return true;
      case 3:
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
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          setErrorMessage('Please enter a valid email address');
          return false;
        }
        return true;
      case 4:
        if (!formData.description.trim()) {
          setErrorMessage('Please describe your project');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, String(value));
        }
      });
      formDataToSend.append('form-name', 'multi-step-quote');

      const response = await fetch('/', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        onSuccess?.();
        setSubmitSuccess(true);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setErrorMessage('Failed to submit quote request. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-3">What type of service do you need?</h3>
            <div className="grid grid-cols-2 gap-3">
              {serviceCategories.map(category => (
                <button
                  key={category.value}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      serviceCategory: category.value,
                      specificService: ''
                    }));
                  }}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    formData.serviceCategory === category.value
                      ? 'border-amber-400 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800">{category.label}</div>
                </button>
              ))}
            </div>

            {formData.serviceCategory && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Select specific service:</h4>
                <div className="space-y-2">
                  {serviceCategories.find(c => c.value === formData.serviceCategory)?.services.map(service => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleRadioChange('specificService', service)}
                      className={`w-full p-3 rounded-lg border transition-all ${
                        formData.specificService === service
                          ? 'border-amber-400 bg-amber-100 font-medium'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-800">Where is the work needed?</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Street Address *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
                placeholder="123 Main St"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Zip Code *</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                  maxLength={5}
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
                  placeholder="21157"
                />
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-800">Your Contact Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none"
              />
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-bold text-gray-800">Project Details</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Describe your project *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 rounded border border-gray-300 focus:border-amber-500 focus:outline-none resize-none"
                placeholder="Describe what needs to be done..."
              />
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-bold text-green-600 mb-2">Thank You!</h3>
          <p className="text-gray-700">We've received your request and will respond within 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            {steps.map(step => (
              <div key={step.number} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-semibold ${
                  currentStep >= step.number
                    ? 'bg-amber-500 border-amber-500 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span className="ml-2 text-sm hidden sm:inline">{step.title}</span>
                {step.number < 4 && (
                  <div className={`w-full h-1 mx-2 ${currentStep > step.number ? 'bg-amber-400' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded mb-4 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          <div className="flex justify-between pt-4 border-t">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            >
              Back
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
              >
                Continue
              </button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Get Free Quote'}
              </motion.button>
            )}
          </div>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500">
          Response within 24 hours • Licensed & Insured
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
