import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const Testimonials = () => {
  const { testimonials } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const visibleTestimonials = testimonials.filter(t => t.isVisible);

  useEffect(() => {
    if (visibleTestimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % visibleTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [visibleTestimonials.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + visibleTestimonials.length) % visibleTestimonials.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % visibleTestimonials.length);
  };

  if (visibleTestimonials.length === 0) return null;

  const currentTestimonial = visibleTestimonials[currentIndex];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1 justify-center mb-4" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-6 h-6 ${star <= rating ? 'text-[#8B6508] dark:text-[#F3E5AB] fill-[var(--color-primary)]' : 'text-[#D6D3D1] dark:text-[#3F3F46]'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#121214] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <Quote className="absolute top-20 left-20 w-32 h-32 text-[#8B6508] dark:text-[#F3E5AB]" aria-hidden="true" />
        <Quote className="absolute bottom-20 right-20 w-32 h-32 text-[#8B6508] dark:text-[#F3E5AB] rotate-180" aria-hidden="true" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185]">Reviews</span>
          <h2 className="section-title mt-2 mb-4">What Our Customers Say</h2>
          <p className="text-[#57534E] dark:text-[#A8A29E] text-lg max-w-2xl mx-auto">
            Real experiences from our delighted customers
          </p>
        </motion.div>

        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5 }}
              className="card p-8 md:p-12"
            >
              {/* Stars */}
              {renderStars(currentTestimonial.rating)}

              {/* Review Text */}
              <blockquote className="text-center mb-6">
                <Quote className="w-10 h-10 text-[#8B6508]/30 dark:text-[#F3E5AB]/30 mx-auto mb-4" aria-hidden="true" />
                <p className="text-lg md:text-xl text-[#1C1917] dark:text-[#FAF7F5] font-body leading-relaxed italic">
                  "{currentTestimonial.review}"
                </p>
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-4">
                {currentTestimonial.image ? (
                  <img
                    src={currentTestimonial.image.url}
                    alt={currentTestimonial.customerName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#8B6508] dark:border-amber-500"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#8B6508] to-[#B8860B] flex items-center justify-center text-white font-heading text-xl">
                    {currentTestimonial.customerName.charAt(0)}
                  </div>
                )}
                <div className="text-left">
                  <p className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5]">
                    {currentTestimonial.customerName}
                  </p>
                  <p className="text-[#57534E] dark:text-[#A8A29E] text-sm">Verified Customer</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          {visibleTestimonials.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 rounded-full bg-white dark:bg-[#1C1C21] shadow-gold flex items-center justify-center text-[#8B6508] dark:text-[#F3E5AB] hover:bg-[#8B6508] dark:hover:bg-amber-500 hover:text-white dark:hover:text-[#121214] transition-colors border border-[#EAE2D7] dark:border-stone-800"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" aria-hidden="true" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 rounded-full bg-white dark:bg-[#1C1C21] shadow-gold flex items-center justify-center text-[#8B6508] dark:text-[#F3E5AB] hover:bg-[#8B6508] dark:hover:bg-amber-500 hover:text-white dark:hover:text-[#121214] transition-colors border border-[#EAE2D7] dark:border-stone-800"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" aria-hidden="true" />
              </button>
            </>
          )}

          {/* Dots */}
          {visibleTestimonials.length > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {visibleTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#8B6508] dark:bg-[#F3E5AB] w-8'
                      : 'bg-[#D6D3D1] dark:bg-[#3F3F46] hover:bg-[#8B6508]/50 dark:hover:bg-[#F3E5AB]/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};