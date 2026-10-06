import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '../../hooks/useDebounce';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop = () => {
  const scrollPosition = useScrollPosition();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {scrollPosition > 300 && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-gold hover:shadow-gold-hover transition-all duration-300"
          aria-label="Scroll to top"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowUp className="w-6 h-6" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};