import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Phone } from 'lucide-react';

interface SocialContactProps {
  phoneNumber: string;
  className?: string;
  variant?: 'horizontal' | 'vertical' | 'icon-only' | 'compact';
  showLabels?: boolean;
}

interface ContactButton {
  platform: 'whatsapp' | 'telegram' | 'phone';
  label: string;
  icon: ReactNode;
  href: string;
}

const SocialContact: React.FC<SocialContactProps> = ({
  phoneNumber,
  className = '',
  variant = 'horizontal',
  showLabels = true
}) => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  const buttons: ContactButton[] = [
    {
      platform: 'whatsapp',
      label: 'WhatsApp',
      icon: <MessageCircle className="w-5 h-5" />,
      href: `https://wa.me/1${cleanPhone}`
    },
    {
      platform: 'telegram',
      label: 'Telegram',
      icon: <Send className="w-5 h-5" />,
      href: `https://t.me/+1${cleanPhone}`
    },
    {
      platform: 'phone',
      label: 'Call',
      icon: <Phone className="w-5 h-5" />,
      href: `tel:${phoneNumber}`
    }
  ];

  const containerStyles = {
    horizontal: 'flex items-center space-x-3',
    vertical: 'flex flex-col space-y-3',
    'icon-only': 'flex items-center space-x-4',
    compact: 'inline-flex items-center space-x-2'
  };

  const buttonStyles = {
    horizontal: 'px-5 py-3 rounded-full',
    vertical: 'w-full px-4 py-3 rounded-lg justify-start',
    'icon-only': 'w-12 h-12 rounded-full justify-center p-0',
    compact: 'px-3 py-2 rounded-full'
  };

  return (
    <div className={`${containerStyles[variant]} ${className}`}>
      {buttons.map((button, index) => (
        <motion.a
          key={button.platform}
          href={button.href}
          target={button.platform !== 'phone' ? '_blank' : undefined}
          rel={button.platform !== 'phone' ? 'noopener noreferrer' : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center ${buttonStyles[variant]} ${
            button.platform === 'whatsapp' ? 'bg-green-600 hover:bg-green-700 text-white' :
            button.platform === 'telegram' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
            'bg-amber-600 hover:bg-amber-700 text-white'
          } shadow-lg transition-colors`}
        >
          {showLabels && variant !== 'icon-only' ? (
            <>
              <span className={variant === 'compact' ? '' : 'mr-2'}>{button.icon}</span>
              <span>{variant === 'compact' ? button.label.slice(0, 4) : button.label}</span>
            </>
          ) : (
            button.icon
          )}
        </motion.a>
      ))}
    </div>
  );
};

export const MobileContactBar: React.FC<{ phoneNumber: string }> = ({ phoneNumber }) => {
  const cleanPhone = phoneNumber.replace(/\D/g, '');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex items-center justify-around py-3">
        <motion.a
          href={`tel:${phoneNumber}`}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center space-y-1 text-amber-600"
        >
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium">Call</span>
        </motion.a>

        <motion.a
          href={`https://wa.me/1${cleanPhone}`}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center space-y-1 text-green-600"
        >
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <MessageCircle className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium">WhatsApp</span>
        </motion.a>

        <motion.a
          href="#contact-form"
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center space-y-1 text-blue-600"
        >
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <Send className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium">Form</span>
        </motion.a>
      </div>
    </div>
  );
};

export default SocialContact;
