import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { WHATSAPP_NUMBER } from '../../utils/helpers';

export const WhatsAppFloat = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Hi Minal! 👋\n\nI\'m interested in your handmade products. Can you share more details?'
  )}`;

  const quickMessages = [
    { text: 'New Order Inquiry', message: 'Hi Minal! I\'d like to place a new order. Can you help me?' },
    { text: 'Custom Order', message: 'Hi Minal! I want a custom handmade item. Can we discuss?' },
    { text: 'Delivery Info', message: 'Hi Minal! Can you share delivery charges and timelines?' },
    { text: 'Product Question', message: 'Hi Minal! I have a question about one of your products.' },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        animate={{ scale: 1 }}
        initial={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-16 right-0 w-72 bg-white dark:bg-[#1C1C21] rounded-2xl shadow-gold-hover border border-[#EAE2D7] dark:border-stone-800 p-4"
              role="dialog"
              aria-label="Quick WhatsApp actions"
            >
              <div className="space-y-2">
                {quickMessages.map((item, index) => (
                  <motion.a
                    key={item.text}
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(item.message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#1C1917] dark:text-[#FAF7F5] hover:bg-[#EAE2D7] dark:hover:bg-stone-800 transition-colors group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                      <MessageCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                    </div>
                    <span className="font-body text-sm font-medium">{item.text}</span>
                  </motion.a>
                ))}
                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#8B6508] dark:text-[#F3E5AB] font-medium hover:bg-amber-500/10 dark:hover:bg-amber-400/10 transition-colors border border-amber-600/30 dark:border-amber-400/30"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: quickMessages.length * 0.05 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-[#8B6508] dark:text-[#F3E5AB]" aria-hidden="true" />
                  </div>
                  <span className="font-body text-sm">Custom Message</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg hover:shadow-gold-hover transition-all duration-300"
          aria-label={isExpanded ? 'Close WhatsApp options' : 'Open WhatsApp'}
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle className="w-7 h-7" aria-hidden="true" />
          
          {/* Pulse Animation */}
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500"
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            aria-hidden="true"
          />
          
          {/* Rotation indicator */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: 45 }}
                exit={{ rotate: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <X className="w-7 h-7" aria-hidden="true" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute bottom-4 right-16 whitespace-nowrap bg-[#1C1917] dark:bg-[#FAF7F5] text-[#FAF7F5] dark:text-[#1C1917] px-3 py-1.5 rounded-lg text-sm font-body shadow-lg pointer-events-none"
        >
          Chat on WhatsApp
        </motion.div>
      </motion.div>
    </>
  );
};