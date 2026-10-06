import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-[#1C1C21]/95 backdrop-blur-xl border-b border-[#EAE2D7] dark:border-stone-800' 
          : 'bg-transparent'
      }`}
    >
      <nav className="section-container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Minal's Art Corner Home">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6508] to-[#B8860B] flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" aria-hidden="true" />
            </div>
            <span className="font-heading text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
              Minal's Art Corner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative font-body font-medium transition-colors duration-200 ${
                  location.pathname === link.href
                    ? 'text-[#8B6508] dark:text-[#F3E5AB]'
                    : 'text-[#1C1917] dark:text-[#FAF7F5] hover:text-[#B8860B] dark:hover:text-[#F3E5AB]'
                }`}
              >
                {link.label}
                {location.pathname === link.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#8B6508] to-[#B8860B] rounded-full"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-[#EAE2D7] dark:bg-stone-800 text-[#1C1917] dark:text-[#FAF7F5] hover:bg-[#B8860B]/20 dark:hover:bg-amber-600/20 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Admin Link */}
            {isAuthenticated && !isLoading && (
              <Link
                to="/admin_access/dashboard"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#8B6508] dark:text-[#F3E5AB] bg-amber-500/10 dark:bg-amber-400/10 rounded-full hover:bg-amber-500/20 dark:hover:bg-amber-400/20 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#EAE2D7] dark:bg-stone-800 text-[#1C1917] dark:text-[#FAF7F5]"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-[#1C1C21] border-t border-[#EAE2D7] dark:border-stone-800"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block px-4 py-3 rounded-xl font-body font-medium transition-colors ${
                      location.pathname === link.href
                        ? 'bg-amber-500/10 dark:bg-amber-400/10 text-[#8B6508] dark:text-[#F3E5AB]'
                        : 'text-[#1C1917] dark:text-[#FAF7F5] hover:bg-[#EAE2D7] dark:hover:bg-stone-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    to="/admin_access/dashboard"
                    className="block px-4 py-3 rounded-xl font-body font-medium text-[#8B6508] dark:text-[#F3E5AB] bg-amber-500/10 dark:bg-amber-400/10 text-center"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};