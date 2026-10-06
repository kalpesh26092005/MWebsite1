import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { useProducts } from '../context/ProductContext';
import { useDebounce } from '../hooks/useDebounce';
import { api } from '../services/api';
import { Product } from '../types';
import { ProductCardSkeleton } from '../components/common/Loader';
import { formatPrice, generateProductWhatsAppMessage, generateWhatsAppUrl, WHATSAPP_NUMBER } from '../utils/helpers';
import { MessageCircle, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categories } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest');

  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    fetchProducts();
  }, [debouncedSearch, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await api.getProducts({
        search: debouncedSearch,
        category: selectedCategory,
        sort: sortBy,
        available: true,
      });
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    if (categorySlug) {
      searchParams.set('category', categorySlug);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleWhatsAppOrder = (product: Product) => {
    const message = generateProductWhatsAppMessage(product);
    const url = generateWhatsAppUrl(WHATSAPP_NUMBER, message);
    window.open(url, '_blank');
  };

  return (
    <>
      <SEOHead title="Gallery - Handmade Products" description="Browse our collection of handcrafted products" />
      <main className="min-h-screen pt-24 pb-20 bg-white dark:bg-[#121214] transition-colors">
        <div className="section-container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="font-accent text-2xl text-[#9F1239] dark:text-[#FB7185] block mb-2">Explore</span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1917] dark:text-[#FAF7F5] mb-6 bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
              Our Gallery
            </h1>
            <p className="text-lg md:text-xl text-[#57534E] dark:text-[#A8A29E] max-w-2xl mx-auto leading-relaxed">
              Explore our curated collection of beautiful handcrafted products
            </p>
          </motion.div>

          {/* Filters */}
          <div className="mb-10 space-y-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#57534E] dark:text-[#A8A29E]" />
              <input
                type="text"
                placeholder="Search products by name, style, or occasion..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12 pr-12"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#57534E] dark:text-[#A8A29E] hover:text-[#B8860B] dark:hover:text-[#F3E5AB] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange('')}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === '' 
                    ? 'bg-gradient-to-r from-[#8B6508] to-[#B8860B] text-white shadow-sm hover:shadow-gold' 
                    : 'bg-white dark:bg-[#1C1C21] text-[#57534E] dark:text-[#A8A29E] border border-[#EAE2D7] dark:border-stone-800 hover:border-[#B8860B]/40 dark:hover:border-[#D4AF37]/40'
                }`}
              >
                All Categories
              </button>
              {categories.map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                    selectedCategory === category.slug
                      ? 'bg-gradient-to-r from-[#8B6508] to-[#B8860B] text-white shadow-sm hover:shadow-gold'
                      : 'bg-white dark:bg-[#1C1C21] text-[#57534E] dark:text-[#A8A29E] border border-[#EAE2D7] dark:border-stone-800 hover:border-[#B8860B]/40 dark:hover:border-[#D4AF37]/40'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="text-[#57534E] dark:text-[#A8A29E] font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-2 w-auto min-w-[180px]"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <div className="card relative">
                    <Link to={`/product/${product._id}`} className="block relative aspect-square overflow-hidden">
                      <img
                        src={product.images[0]?.url}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      {product.isFeatured && (
                        <div className="absolute top-3 left-3 bg-[#9F1239] text-white px-3 py-1 rounded-full text-xs font-medium">
                          Featured
                        </div>
                      )}
                      {product.isCustomizable && (
                        <div className="absolute top-3 right-3 bg-[#8B6508] text-white px-3 py-1 rounded-full text-xs font-medium">
                          Customizable
                        </div>
                      )}
                      <motion.div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link
                          to={`/product/${product._id}`}
                          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <Eye className="w-5 h-5 text-white" />
                        </Link>
                        <button
                          onClick={() => handleWhatsAppOrder(product)}
                          className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors"
                        >
                          <MessageCircle className="w-5 h-5 text-white" />
                        </button>
                      </motion.div>
                    </Link>
                    <div className="p-4">
                      {typeof product.category === 'object' && product.category.name && (
                        <Link to={`/gallery?category=${product.category.slug}`} className="text-xs text-[#8B6508] dark:text-[#F3E5AB] hover:underline font-medium">
                          {product.category.name}
                        </Link>
                      )}
                      <Link to={`/product/${product._id}`}>
                        <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] mt-2 mb-2 group-hover:text-[#B8860B] transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xl font-bold text-[#8B6508] dark:text-[#F3E5AB]">{formatPrice(product.price)}</span>
                        {product.viewCount > 0 && (
                          <div className="flex items-center gap-1 text-[#57534E] dark:text-[#A8A29E] text-sm">
                            <Eye className="w-4 h-4" />
                            <span>{product.viewCount}</span>
                          </div>
                        )}
                      </div>
                      <button onClick={() => handleWhatsAppOrder(product)} className="w-full btn-primary text-sm py-2">
                        <MessageCircle className="w-4 h-4 mr-2 text-green-600 dark:text-green-400" />
                        Order Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#57534E] dark:text-[#A8A29E] text-lg">No products found matching your criteria</p>
              <p className="text-[#78716C] dark:text-[#78716C] text-sm mt-2">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Gallery;