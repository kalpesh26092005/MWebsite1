import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, Eye } from 'lucide-react';
import { useProducts } from '../../context/ProductContext';
import { formatPrice, generateProductWhatsAppMessage, generateWhatsAppUrl, WHATSAPP_NUMBER } from '../../utils/helpers';
import { Product } from '../../types';

export const BestSellers = () => {
  const { featuredProducts } = useProducts();

  const handleWhatsAppOrder = (product: Product) => {
    const message = generateProductWhatsAppMessage(product);
    const url = generateWhatsAppUrl(WHATSAPP_NUMBER, message);
    window.open(url, '_blank');
  };

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
          <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185]">Featured</span>
          <h2 className="section-title mt-2 mb-4">Best Sellers</h2>
          <p className="text-[#57534E] dark:text-[#A8A29E] text-lg max-w-2xl mx-auto">
            Our most loved handcrafted pieces, chosen by customers like you
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="card relative">
                {/* Image */}
                <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden">
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Featured Badge */}
                  {product.isFeatured && (
                    <div className="absolute top-3 left-3 bg-[#9F1239] text-white px-3 py-1 rounded-full text-xs font-medium">
                      Featured
                    </div>
                  )}

                  {/* Customizable Badge */}
                  {product.isCustomizable && (
                    <div className="absolute top-3 right-3 bg-[#8B6508] text-white px-3 py-1 rounded-full text-xs font-medium">
                      Customizable
                    </div>
                  )}

                  {/* Quick Actions Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={false}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                      aria-label="View product details"
                    >
                      <Eye className="w-5 h-5 text-white" aria-hidden="true" />
                    </Link>
                    <button
                      onClick={() => handleWhatsAppOrder(product)}
                      className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                      aria-label="Order on WhatsApp"
                    >
                      <MessageCircle className="w-5 h-5 text-white" aria-hidden="true" />
                    </button>
                  </motion.div>
                </Link>

                {/* Content */}
                <div className="p-4">
                  {/* Category */}
                  {typeof product.category === 'object' && product.category.name && (
                    <Link
                      to={`/gallery?category=${product.category.slug}`}
                      className="text-xs text-[#8B6508] dark:text-[#F3E5AB] hover:underline font-medium"
                    >
                      {product.category.name}
                    </Link>
                  )}

                  {/* Title */}
                  <Link to={`/product/${product._id}`}>
                    <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mt-2 mb-2 group-hover:text-[#8B6508] dark:group-hover:text-[#F3E5AB] transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-xl font-bold text-[#8B6508] dark:text-[#F3E5AB]">
                        {formatPrice(product.price)}
                      </span>
                      {product.priceLabel && (
                        <span className="text-xs text-[#57534E] dark:text-[#A8A29E] block">
                          {product.priceLabel}
                        </span>
                      )}
                    </div>
                    {product.viewCount > 0 && (
                      <div className="flex items-center gap-1 text-[#57534E] dark:text-[#A8A29E] text-sm">
                        <Eye className="w-4 h-4" aria-hidden="true" />
                        <span>{product.viewCount}</span>
                      </div>
                    )}
                  </div>

                  {/* Order Button */}
                  <button
                    onClick={() => handleWhatsAppOrder(product)}
                    className="w-full btn-primary text-sm py-2"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                    Order Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/gallery" className="btn-secondary">
            View All Products
            <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};