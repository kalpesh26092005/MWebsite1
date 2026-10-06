import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';

const NotFound = () => {
  return (
    <>
      <SEOHead title="404 - Page Not Found" description="The page you're looking for doesn't exist" />
      <main className="min-h-screen pt-24 pb-20 flex items-center justify-center">
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* 404 Illustration */}
            <div className="relative mb-8">
              <motion.h1
                className="font-heading text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent opacity-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                404
              </motion.h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-[#8B6508] to-[#B8860B] flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Search className="w-16 h-16 text-white" aria-hidden="true" />
                </motion.div>
              </div>
            </div>

            {/* Content */}
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-[#57534E] dark:text-[#A8A29E] text-lg mb-8 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track!
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/" className="btn-primary inline-flex items-center gap-2">
                <Home className="w-5 h-5" aria-hidden="true" />
                Go to Homepage
              </Link>
              <button
                onClick={() => window.history.back()}
                className="btn-secondary inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
                Go Back
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-12 pt-8 border-t border-[#EAE2D7] dark:border-stone-800">
              <p className="text-[#57534E] dark:text-[#A8A29E] mb-4">You might be looking for:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/gallery" className="text-[#8B6508] dark:text-[#F3E5AB] hover:underline font-medium">
                  Gallery
                </Link>
                <Link to="/about" className="text-[#8B6508] dark:text-[#F3E5AB] hover:underline font-medium">
                  About Us
                </Link>
                <Link to="/contact" className="text-[#8B6508] dark:text-[#F3E5AB] hover:underline font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default NotFound;