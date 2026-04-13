import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, AlertTriangle, X } from 'lucide-react';

interface EmergencyCTAProps {
  phoneNumber: string;
  showOnScroll?: boolean;
}

const EmergencyCTA: React.FC<EmergencyCTAProps> = ({ phoneNumber, showOnScroll = true }) => {
  const [isVisible, setIsVisible] = useState(!showOnScroll);

  useEffect(() => {
    if (!showOnScroll) return;
    const handleScroll = () => {
      const shouldShow = window.scrollY > 300;
      if (shouldShow !== isVisible) setIsVisible(shouldShow);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOnScroll, isVisible]);

  const phoneLink = `tel:${phoneNumber}`;
  const whatsappLink = `https://wa.me/1${phoneNumber.replace(/\D/g, '')}`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-300" />
                  <div>
                    <div className="font-bold text-sm">EMERGENCY SERVICE 24/7</div>
                    <div className="text-xs text-red-100">Major leaks? No water? Call NOW!</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <a href={phoneLink} className="px-4 py-2 bg-white text-red-700 rounded-full font-bold">
                    <Phone className="w-5 h-5 inline mr-2" />Call
                  </a>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white rounded-full">
                    WhatsApp
                  </a>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="p-2 hover:bg-red-800 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {!isVisible && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <a
            href={phoneLink}
            className="flex items-center justify-center w-14 h-14 bg-red-600 text-white rounded-full shadow-xl animate-bounce"
          >
            <Phone className="w-7 h-7" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmergencyCTA;
