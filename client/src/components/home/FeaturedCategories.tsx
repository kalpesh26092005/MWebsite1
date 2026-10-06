import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';

export const FeaturedCategories = () => {
  const { categories } = useProducts();

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#121214]">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185]">Explore</span>
          <h2 className="section-title mt-2 mb-4">Our Categories</h2>
          <p className="text-[#57534E] dark:text-[#A8A29E] text-lg max-w-2xl mx-auto">
            Discover our wide range of handcrafted masterpieces across various categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/gallery?category=${category.slug}`}
                className="group block"
              >
                <motion.div
                  className="card relative overflow-hidden aspect-square"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="absolute inset-0">
                    <img
                      src={category.image.url}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="font-heading text-2xl font-semibold text-white mb-2 group-hover:gold-text transition-all">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-white/80 text-sm mb-3 line-clamp-2">
                        {category.description}
                      </p>
                    )}
                    {category.productCount !== undefined && (
                      <p className="text-white/60 text-sm">
                        {category.productCount} {category.productCount === 1 ? 'Product' : 'Products'}
                      </p>
                    )}
                    
                    {/* Hover Arrow */}
                    <motion.div
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ArrowRight className="w-5 h-5 text-white" aria-hidden="true" />
                    </motion.div>
                  </div>

                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 gold-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        {categories.length > 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/gallery" className="btn-secondary">
              View All Categories
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};