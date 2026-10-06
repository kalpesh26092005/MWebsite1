import { motion } from 'framer-motion';
import { Phone, MessageCircle, Instagram, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { WHATSAPP_NUMBER, INSTAGRAM_URL, PHONE_NUMBER } from '../utils/helpers';
import { useProducts } from '../context/ProductContext';
import { useState } from 'react';

const contactMethods = [
  {
    icon: Phone,
    title: 'Call Us',
    info: PHONE_NUMBER,
    action: `tel:${PHONE_NUMBER}`,
    color: 'from-[#8B6508] via-[#B8860B] to-[#D4AF37]',
    description: 'Give us a call for immediate assistance',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    info: '+91 9307791258',
    action: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Minal! 👋\n\nI have a question about your products. Can you help me?')}`,
    color: 'from-green-600 to-green-500',
    description: 'Message us on WhatsApp for quick responses',
  },
  {
    icon: Instagram,
    title: 'Instagram DM',
    info: '@minals_art_corner_',
    action: INSTAGRAM_URL,
    color: 'from-purple-600 via-pink-600 to-orange-500',
    description: 'Send us a direct message on Instagram',
  },
];

const Contact = () => {
  const { settings, faqs } = useProducts();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <>
      <SEOHead title="Contact Us" description="Get in touch with Minal's Art Corner. We're here to help!" />
      <main className="min-h-screen pt-24 pb-20">
        {/* Hero */}
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] dark:from-[#121214] dark:via-[#19191E] dark:to-[#121214] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#B8860B_1px,transparent_1px)] [background-size:28px_28px]" />
          
          <div className="section-container relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185] block mb-2">Connect With Us</span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] dark:text-[#FAF7F5] mb-6 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-lg md:text-xl text-[#57534E] dark:text-[#A8A29E] max-w-2xl mx-auto leading-relaxed">
                We'd love to hear from you! Choose your preferred way to connect with us.
              </p>
            </motion.div>

            {/* Contact Methods */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.title}
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : undefined}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <motion.div
                    className="card p-8 text-center h-full transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.02 }}
                  >
                    <motion.div
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${method.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <method.icon className="w-10 h-10 text-white" aria-hidden="true" />
                    </motion.div>
                    <h3 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-2">
                      {method.title}
                    </h3>
                    <p className="text-[#57534E] dark:text-[#A8A29E] mb-4">{method.description}</p>
                    <p className="text-[#8B6508] dark:text-[#F3E5AB] font-medium group-hover:underline">
                      {method.info}
                    </p>
                  </motion.div>
                </motion.a>
              ))}
            </div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card p-8 max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-[#8B6508] dark:text-[#F3E5AB]" aria-hidden="true" />
                <h3 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">
                  Business Hours
                </h3>
              </div>
              <p className="text-center text-[#57534E] dark:text-[#A8A29E] text-lg">
                {settings?.businessHours || 'Mon-Sat, 10 AM - 8 PM IST'}
              </p>
              <p className="text-center text-[#57534E] dark:text-[#A8A29E] text-sm mt-2">
                📱 Response Time: We typically respond within 1-2 hours
              </p>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        {faqs && faqs.length > 0 && (
          <section className="py-20 md:py-28 bg-white dark:bg-[#121214] transition-colors">
            <div className="section-container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185] block mb-2">Frequently Asked Questions</span>
                <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                  Frequently Asked Questions
                </h2>
                <p className="text-lg text-[#57534E] dark:text-[#A8A29E] max-w-2xl mx-auto leading-relaxed">
                  Find answers to common questions
                </p>
              </motion.div>

              <div className="max-w-3xl mx-auto space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="card"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                      className="w-full p-6 flex items-center justify-between text-left"
                    >
                      <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] pr-4">
                        {faq.question}
                      </h3>
                      {openFaqIndex === index ? (
                        <ChevronUp className="w-5 h-5 text-[#8B6508] dark:text-[#F3E5AB] flex-shrink-0" aria-hidden="true" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#8B6508] dark:text-[#F3E5AB] flex-shrink-0" aria-hidden="true" />
                      )}
                    </button>
                    {openFaqIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6"
                      >
                        <p className="text-[#57534E] dark:text-[#A8A29E] leading-relaxed">{faq.answer}</p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2] dark:from-[#121214] dark:via-[#19191E] dark:to-[#121214] transition-colors">
          <div className="section-container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-4 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                Ready to Place an Order?
              </h2>
              <p className="text-lg text-[#57534E] dark:text-[#A8A29E] mb-8 max-w-2xl mx-auto leading-relaxed">
                Contact us today and let's bring your vision to life with our handcrafted creations
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Minal! 👋\n\nI\'d like to place an order. Can you help me?')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 text-base shadow-lg"
              >
                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                Start Order on WhatsApp
              </a>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;