import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-7xl',
};

export const Modal = ({ isOpen, onClose, title, children, size = 'md' }: ModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className={`w-full ${sizeClasses[size]} bg-white dark:bg-[#1C1C21] rounded-2xl shadow-xl overflow-hidden`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE2D7] dark:border-stone-800">
            <h2 id="modal-title" className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-[#EAE2D7] dark:hover:bg-stone-800 text-[#57534E] dark:text-[#A8A29E] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);