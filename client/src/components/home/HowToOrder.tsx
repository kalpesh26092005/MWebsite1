import { motion } from 'framer-motion';
import { Search, MessageCircle, Truck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Browse our collection',
    description: 'Explore our gallery of handcrafted products across various categories',
    color: 'from-[#8B6508] to-[#B8860B]',
  },
  {
    icon: MessageCircle,
    title: 'Contact us',
    description: 'Reach out via WhatsApp, phone call, or Instagram DM with your choice',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Truck,
    title: 'Get delivered',
    description: 'Receive your beautiful handcrafted item at your doorstep',
    color: 'from-[#9F1239] to-[#FB7185]',
  },
];

export const HowToOrder = () => {
  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#121214] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 dark:bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/10 dark:bg-red-400/10 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185]">Simple Process</span>
          <h2 className="section-title mt-2 mb-4">How to Order</h2>
          <p className="text-[#57534E] dark:text-[#A8A29E] text-lg max-w-2xl mx-auto">
            Three simple steps to get your beautiful handcrafted items
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting Lines */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#8B6508] via-green-500 to-[#9F1239]" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Card */}
              <div className="card p-8 text-center relative z-10">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white dark:bg-[#1C1C21] flex items-center justify-center border-2 border-[#8B6508] dark:border-amber-500">
                  <span className="text-sm font-bold text-[#8B6508] dark:text-[#F3E5AB]">{index + 1}</span>
                </div>

                {/* Icon */}
                <motion.div
                  className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <step.icon className="w-10 h-10 text-white" aria-hidden="true" />
                </motion.div>

                {/* Content */}
                <h3 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-3">
                  {step.title}
                </h3>
                <p className="text-[#57534E] dark:text-[#A8A29E] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-[#57534E] dark:text-[#A8A29E] text-lg mb-6">
            Ready to place your order?
          </p>
          <a
            href={`https://wa.me/919307791258?text=${encodeURIComponent('Hi Minal! 👋\n\nI\'d like to place an order. Can you help me?')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
            Start Order
          </a>
        </motion.div>
      </div>
    </section>
  );
};