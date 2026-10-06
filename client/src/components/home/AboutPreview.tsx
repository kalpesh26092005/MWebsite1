import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Truck, Sparkles, Heart, Palette, CheckCircle2 } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

const stats = [
  { icon: Users, label: 'Happy Customers', value: '500+' },
  { icon: Award, label: 'Handcrafted Pieces', value: '1000+' },
  { icon: Sparkles, label: 'Wedding Orders', value: '50+' },
  { icon: Truck, label: 'Years Experience', value: '5+' },
];

const pillars = [
  {
    icon: Heart,
    title: '100% Handcrafted with Love',
    desc: 'Every design is thoughtfully shaped with artisanal passion and heartfelt care.',
  },
  {
    icon: Palette,
    title: 'Customized to Perfection',
    desc: 'Personalized color palettes, themes, and styles to suit your special occasions.',
  },
  {
    icon: Award,
    title: 'Premium Raw Materials',
    desc: 'Long-lasting quality, exquisite fabrics, embellishments, and meticulous finishing.',
  },
  {
    icon: CheckCircle2,
    title: 'Pan-India Safe Delivery',
    desc: 'Carefully packaged with multi-layer protection so your items arrive safely.',
  },
];

export const AboutPreview = () => {
  const { settings } = useProducts();
  const aboutText = settings?.aboutText || '';

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-[#161619] border-y border-[#EAE2D7] dark:border-stone-800 transition-colors">
      <div className="section-container">
        {/* Animated Counter Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1C21] border border-[#EAE2D7] dark:border-stone-800 text-center shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-[#8B6508] dark:text-[#F3E5AB] mb-4">
                <stat.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="font-heading text-3xl md:text-4xl font-bold text-[#8B6508] dark:text-[#FDE68A] mb-1">
                {stat.value}
              </div>
              <p className="text-sm md:text-base font-medium text-[#44403C] dark:text-[#D6D3D1]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Story and Craftsmanship Highlights (No Photo/Avatar Placeholders) */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Story Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-6"
          >
            <div>
              <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185] block mb-1">
                Our Craft & Passion
              </span>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1C1917] dark:text-[#FAF7F5] leading-tight">
                Handcrafted with Dedication & Authentic Artistry
              </h2>
            </div>

            <div className="prose prose-stone dark:prose-invert max-w-none text-[#57534E] dark:text-[#A8A29E] leading-relaxed space-y-4 text-base md:text-lg">
              <p>
                {aboutText ||
                  "At Minal's Art Corner, every piece is born from a deep reverence for traditional Indian craftsmanship blended with modern artistic aesthetics. From bridal mehandi and festive torans to bespoke rukhwat setups and customized keepsake gifts, we bring timeless handmade elegance to your special moments."}
              </p>
              <p>
                We believe that handmade items possess a soul and warmth that factory-made goods can never replicate. Every stroke of henna, every embroidery stitch, and every decorative ornament is curated with meticulous attention to detail.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="btn-secondary inline-flex items-center gap-2 text-sm md:text-base"
              >
                Discover Our Full Story
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </motion.div>

          {/* Pillars Cards Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 grid sm:grid-cols-2 gap-4 md:gap-5"
          >
            {pillars.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1C21] border border-[#EAE2D7] dark:border-stone-800 hover:border-amber-600/40 dark:hover:border-amber-400/40 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-[#8B6508] dark:text-[#F3E5AB] mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
