import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle, Phone, Heart, Sparkles } from 'lucide-react';
import { INSTAGRAM_URL } from '../../utils/helpers';

const footerLinks = {
  quick: [
    { href: '/', label: 'Home' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ],
  categories: [
    { href: '/gallery?category=mehandi', label: 'Mehandi' },
    { href: '/gallery?category=embroidery', label: 'Embroidery' },
    { href: '/gallery?category=rukhwat', label: 'Rukhwat' },
    { href: '/gallery?category=toran', label: 'Toran' },
    { href: '/gallery?category=gifts', label: 'Handmade Gifts' },
    { href: '/gallery?category=platters', label: 'Decorative Platters' },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] dark:from-[#161619] dark:via-[#1C1C21] dark:to-[#161619] relative overflow-hidden border-t border-[#EAE2D7] dark:border-stone-800">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#D4AF37]" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#B8860B]/5 rounded-full blur-3xl" />
      <div className="absolute top-40 right-10 w-24 h-24 bg-[#9F1239]/5 rounded-full blur-3xl" />

      <div className="section-container relative py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="Minal's Art Corner Home">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8B6508] to-[#B8860B] flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-white" aria-hidden="true" />
              </div>
              <span className="font-heading text-2xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] gold-gradient-title">
                Minal's Art Corner
              </span>
            </Link>
            <p className="text-[#57534E] dark:text-[#A8A29E] mb-6 leading-relaxed">
              Handcrafted with Love, Delivered with Heart ❤️
            </p>
            <p className="text-[#57534E] dark:text-[#A8A29E] text-sm mb-6">
              Premium handmade decoratives, mehandi, embroidery & gifts by Minal Privin Gurav.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://wa.me/919307791258`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.quick.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#57534E] dark:text-[#A8A29E] hover:text-[#B8860B] dark:hover:text-[#F3E5AB] transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-[#57534E] dark:text-[#A8A29E] hover:text-[#B8860B] dark:hover:text-[#F3E5AB] transition-colors font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#8B6508] dark:text-[#F3E5AB] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <a href="tel:+919307791258" className="text-[#57534E] dark:text-[#A8A29E] hover:text-[#B8860B] dark:hover:text-[#F3E5AB] transition-colors font-body">
                    +91 9307791258
                  </a>
                  <p className="text-xs text-[#57534E] dark:text-[#A8A29E]">Call Us</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <a href="https://wa.me/919307791258" target="_blank" rel="noopener noreferrer" className="text-[#57534E] dark:text-[#A8A29E] hover:text-[#B8860B] dark:hover:text-[#F3E5AB] transition-colors font-body">
                    +91 9307791258
                  </a>
                  <p className="text-xs text-[#57534E] dark:text-[#A8A29E]">WhatsApp</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="w-5 h-5 text-[#8B6508] dark:text-[#F3E5AB] mt-0.5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-[#57534E] dark:text-[#A8A29E] hover:text-[#B8860B] dark:hover:text-[#F3E5AB] transition-colors font-body">
                    @minals_art_corner_
                  </a>
                  <p className="text-xs text-[#57534E] dark:text-[#A8A29E]">Instagram DM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#EAE2D7] dark:border-stone-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#57534E] dark:text-[#A8A29E] text-sm text-center md:text-left">
              © 2025 Minal's Art Corner. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 text-[#57534E] dark:text-[#A8A29E] text-sm">
              <Heart className="w-4 h-4 text-[#9F1239] dark:text-[#FB7185]" aria-hidden="true" />
              <span>Made with love by Minal</span>
            </div>
            <p className="text-[#57534E] dark:text-[#A8A29E] text-sm text-center md:text-right">
              Designed for elegance, crafted for you ✨
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;