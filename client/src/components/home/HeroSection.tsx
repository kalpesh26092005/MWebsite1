import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { generateWhatsAppUrl, WHATSAPP_NUMBER } from '../../utils/helpers';
import { SEOHead } from '../common/SEOHead';

const floatingElements = [
  { top: '15%', left: '8%', size: 18, delay: 0 },
  { top: '25%', right: '12%', size: 14, delay: 1 },
  { bottom: '25%', left: '10%', size: 22, delay: 2 },
  { bottom: '20%', right: '15%', size: 16, delay: 0.5 },
  { top: '55%', left: '5%', size: 12, delay: 1.5 },
  { top: '65%', right: '8%', size: 20, delay: 2.5 },
];

export const HeroSection = () => {
  const { settings } = useProducts();

  const heroTitle = settings?.heroTitle || "Minal's Art Corner";
  const heroSubtitle = settings?.heroSubtitle || 'Handcrafted with Love, Delivered with Heart ❤️';

  const whatsappUrl = generateWhatsAppUrl(
    WHATSAPP_NUMBER,
    "Hi Minal! 👋\n\nI'm interested in your handmade products and custom collections. Can you share more details?"
  );

  return (
    <>
      <SEOHead />
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] dark:from-[#121214] dark:via-[#19191E] dark:to-[#121214] pt-20 pb-16">
        {/* Subtle decorative background pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#B8860B_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Floating Decorative Elements */}
        {floatingElements.map((el, index) => (
          <motion.div
            key={index}
            className="absolute text-[#B8860B]/25 dark:text-[#F3E5AB]/20 pointer-events-none"
            style={{
              top: el.top,
              bottom: el.bottom,
              left: el.left,
              right: el.right,
              fontSize: `${el.size}px`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [1, 1.2, 1] }}
            transition={{ delay: el.delay, duration: 4, repeat: Infinity }}
          >
            <Sparkles aria-hidden="true" />
          </motion.div>
        ))}

        {/* Hero Content */}
        <div className="relative z-10 section-container py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 dark:bg-amber-400/10 border border-amber-600/20 dark:border-amber-400/30 text-[#8B6508] dark:text-[#F3E5AB] text-sm font-medium mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              <span>Authentic Handmade Art & Custom Creations</span>
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              className="font-heading text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-6 text-[#1C1917] dark:text-[#FAF7F5]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                {heroTitle}
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className="font-accent text-2xl sm:text-3xl md:text-4xl text-[#9F1239] dark:text-[#FB7185] mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
            >
              {heroSubtitle}
            </motion.p>

            {/* Subtitle */}
            <motion.p
              className="text-base sm:text-lg md:text-xl text-[#57534E] dark:text-[#D6D3D1] max-w-2xl mx-auto mb-10 font-body leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Premium Handmade Decoratives • Mehandi Art • Embroidery • Rukhwat • Custom Gifts
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <Link
                  to="/gallery"
                  className="btn-primary group w-full sm:w-auto text-base shadow-lg"
                >
                  Explore Collection
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                </Link>
              </motion.div>
              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary group w-full sm:w-auto flex items-center justify-center gap-2 text-base shadow-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                Order on WhatsApp
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
