import { motion } from 'framer-motion';
import { Award, Heart, Users, Truck, Sparkles, Target, CheckCircle2, Palette } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { useProducts } from '../context/ProductContext';

const stats = [
  { icon: Users, label: 'Happy Customers', value: '500+' },
  { icon: Award, label: 'Handcrafted Pieces', value: '1000+' },
  { icon: Sparkles, label: 'Wedding Orders', value: '50+' },
  { icon: Truck, label: 'Years Experience', value: '5+' },
];

const values = [
  { icon: Heart, title: 'Handcrafted with Love', description: 'Every piece is made with passion and attention to detail' },
  { icon: Award, title: 'Premium Quality', description: 'We use only the finest materials for lasting beauty' },
  { icon: Target, title: 'Custom Designs', description: 'Personalized creations tailored to your vision' },
  { icon: Truck, title: 'Timely Delivery', description: 'Reliable shipping across India and internationally' },
];

const About = () => {
  const { settings } = useProducts();
  const aboutText = settings?.aboutText || '';

  return (
    <>
      <SEOHead title="About Us" description="Learn about Minal's Art Corner and our journey in creating beautiful handmade art" />
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] dark:from-[#121214] dark:via-[#19191E] dark:to-[#121214] overflow-hidden">
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#B8860B_1px,transparent_1px)] [background-size:28px_28px]" />

          <div className="section-container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12 md:mb-20"
            >
              <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185]">About Us</span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] dark:text-[#FAF7F5] mt-2 mb-6 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                Our Story & Craftsmanship
              </h1>
              <p className="text-lg md:text-xl text-[#57534E] dark:text-[#A8A29E] max-w-3xl mx-auto leading-relaxed">
                A story of passion, dedication, and the timeless beauty of authentic Indian handmade art
              </p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-20">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-7 rounded-2xl bg-white dark:bg-[#1C1C21] border border-[#EAE2D7] dark:border-stone-800 text-center shadow-sm hover:border-amber-600/40 dark:hover:border-amber-400/40 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-[#8B6508] dark:text-[#F3E5AB] mb-4 mx-auto">
                    <stat.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <div className="font-heading text-3xl md:text-4xl font-bold text-[#8B6508] dark:text-[#FDE68A] mb-1">
                    {stat.value}
                  </div>
                  <p className="text-sm md:text-base font-medium text-[#44403C] dark:text-[#D6D3D1]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 md:py-28 bg-white dark:bg-[#121214] transition-colors">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Artistic Visual - No Photo Placeholder */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#EAE2D7] dark:border-stone-800">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#B8860B]/10 via-transparent to-[#9F1239]/10" />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23B8860B%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2036v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-[0.08]" />
                  <div className="relative inset-0 flex items-center justify-center p-8">
                    <div className="text-center max-w-sm">
                      <div className="w-20 h-20 mx-auto mb-5 rounded-xl bg-gradient-to-br from-[#B8860B] to-[#D4AF37] flex items-center justify-center shadow-xl">
                        <Award className="w-10 h-10 text-white" aria-hidden="true" />
                      </div>
                      <div className="p-6 bg-white/90 dark:bg-[#1C1C21]/90 backdrop-blur-md rounded-2xl border border-amber-600/30 dark:border-amber-400/30">
                        <p className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-1">
                          Minal's Art Corner
                        </p>
                        <p className="text-[#57534E] dark:text-[#A8A29E] font-body">Est. 2020 · Authentic Handmade Art</p>
                        <p className="text-xs text-[#8B6508] dark:text-[#FDE68A] font-medium mt-2">
                          ✦ 100% Handcrafted · ✦ Custom Designs · ✦ Premium Materials ✦
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Story Content */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-[#FAF7F5] mb-8 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                  Our Journey of Artisanal Excellence
                </h2>

                <div className="prose prose-stone dark:prose-invert max-w-none text-[#57534E] dark:text-[#A8A29E] space-y-6 text-lg leading-relaxed">
                  <p>
                    {aboutText || "Minal's Art Corner was born from a simple love for creativity and the joy of making something beautiful with one's own hands. Founded by Minal Privin Gurav, our journey began over 5 years ago with a passion for traditional Indian art forms and a dream to share that beauty with the world."}
                  </p>
                  <p>
                    From intricate mehandi designs that tell stories on hands, to delicate embroidery that preserves age-old techniques, from traditional rukhwat that celebrates our culture, to personalized gifts that capture memories - every piece at Minal's Art Corner carries a piece of our heart.
                  </p>
                  <p>
                    We believe that handmade items are more than just products - they're expressions of love, culture, and artistry. Each creation is a testament to the time, skill, and dedication poured into making something truly special. When you choose a handcrafted piece from us, you're not just buying a product; you're becoming part of a story that celebrates tradition, creativity, and the irreplaceable value of human touch.
                  </p>
                  <p>
                    Today, we're proud to have served over 500 happy customers, delivered more than 1000 products, and been part of 50+ wedding celebrations. But more than numbers, what matters to us is the smile on every customer's face when they receive their handcrafted treasure.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us - Modern Card Grid */}
        <section className="py-20 md:py-28 bg-[#FAF7F2] dark:bg-[#161619] transition-colors">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185] block mb-2">Why Choose Minal's Art Corner</span>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-[#FAF7F5] mb-4 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                Craftsmanship That Speaks for Itself
              </h2>
              <p className="text-lg md:text-xl text-[#57534E] dark:text-[#A8A29E] max-w-2xl mx-auto leading-relaxed">
                What makes our handcrafted creations truly exceptional
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-7 rounded-2xl bg-white dark:bg-[#1C1C21] border border-[#EAE2D7] dark:border-stone-800 hover:border-amber-600/40 dark:hover:border-amber-400/40 transition-all duration-300 hover:shadow-xl text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-[#8B6508] dark:text-[#F3E5AB] group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="w-8 h-8" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg md:text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Pillars of Excellence */}
        <section className="py-20 md:py-28 bg-white dark:bg-[#121214] border-y border-[#EAE2D7] dark:border-stone-800 transition-colors">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-[#FAF7F5] mb-4 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                The Pillars of Our Excellence
              </h2>
              <p className="text-lg md:text-xl text-[#57534E] dark:text-[#A8A29E] max-w-2xl mx-auto leading-relaxed">
                Foundational principles that guide every creation
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: Heart, title: '100% Handcrafted with Love', desc: 'Every design is thoughtfully shaped with artisanal passion and heartfelt care — no machines, only hands and heart.' },
                { icon: Palette, title: 'Customized to Perfection', desc: 'Personalized color palettes, themes, and styles tailored to your unique occasions and preferences.' },
                { icon: Award, title: 'Premium Raw Materials', desc: 'Only the finest fabrics, threads, embellishments, and finishing touches — sourced with integrity and care.' },
                { icon: CheckCircle2, title: 'Pan-India Safe Delivery', desc: 'Carefully packaged with multi-layer protection ensuring your handcrafted treasures arrive safely.' },
                { icon: Sparkles, title: 'Authentic Traditional Techniques', desc: 'Preserving heritage art forms like mehandi, embroidery, and rukhwat with authentic methods passed down through generations.' },
                { icon: Target, title: 'Timeless Keepsake Quality', desc: 'Heirloom-quality pieces designed to be treasured for generations, carrying memories forward beautifully.' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-7 rounded-2xl bg-[#FAF7F2] dark:bg-[#1C1C21] border border-[#EAE2D7] dark:border-stone-800 hover:border-amber-600/40 dark:hover:border-amber-400/40 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-14 h-14 mx-auto mb-5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 flex items-center justify-center text-[#8B6508] dark:text-[#F3E5AB]">
                    <item.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-3 text-center">
                    {item.title}
                  </h3>
                  <p className="text-[#57534E] dark:text-[#A8A29E] text-center leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default About;