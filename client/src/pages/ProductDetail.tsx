import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Instagram, ChevronLeft, ChevronRight, Share2, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { api } from '../services/api';
import { Product, Category } from '../types';
import { PageLoader } from '../components/common/Loader';
import { formatPrice, generateProductWhatsAppMessage, generateWhatsAppUrl, WHATSAPP_NUMBER, INSTAGRAM_URL, PHONE_NUMBER } from '../utils/helpers';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    setIsLoading(true);
    try {
      const response = await api.getProduct(id!);
      if (response.success && response.data) {
        setProduct(response.data);
        fetchRelatedProducts(response.data.category, response.data._id);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      toast.error('Failed to load product');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedProducts = async (categoryId: string | Category, currentProductId: string) => {
    try {
      const response = await api.getProducts({
        category: typeof categoryId === 'object' && categoryId !== null ? categoryId._id : categoryId,
        limit: 4,
        available: true,
      });
      if (response.success && response.data) {
        const products = response.data as Product[];
        setRelatedProducts(products.filter((p) => p._id !== currentProductId));
      }
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    }
  };

  const handleWhatsAppOrder = () => {
    if (product) {
      const message = generateProductWhatsAppMessage(product);
      const url = generateWhatsAppUrl(WHATSAPP_NUMBER, message);
      window.open(url, '_blank');
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product?.name,
          text: product?.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + (product?.images.length || 0)) % (product?.images.length || 1));
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % (product?.images.length || 1));
  };

  if (isLoading) return <PageLoader />;
  if (!product) return <div className="min-h-screen pt-24 flex items-center justify-center bg-white dark:bg-[#121214]"><p className="text-[#57534E] dark:text-[#A8A29E]">Product not found</p></div>;

  return (
    <>
      <SEOHead
        title={product.name}
        description={product.description}
        image={product.images[0]?.url}
        type="product"
        productName={product.name}
        price={product.price}
        category={typeof product.category === 'object' ? product.category.name : undefined}
      />
      <main className="min-h-screen pt-24 pb-20 bg-white dark:bg-[#121214] transition-colors">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-[#57534E] dark:text-[#A8A29E]">
            <Link to="/" className="hover:text-[#B8860B] dark:hover:text-[#F3E5AB]">Home</Link>
            <span className="text-[#78716C] dark:text-[#78716C]">/</span>
            <Link to="/gallery" className="hover:text-[#B8860B] dark:hover:text-[#F3E5AB]">Gallery</Link>
            {typeof product.category === 'object' && (
              <>
                <span className="text-[#78716C] dark:text-[#78716C]">/</span>
                <Link to={`/gallery?category=${product.category.slug}`} className="hover:text-[#B8860B] dark:hover:text-[#F3E5AB]">
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="text-[#78716C] dark:text-[#78716C]">/</span>
            <span className="text-[#1C1917] dark:text-[#FAF7F5]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Images */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="relative aspect-square rounded-3xl overflow-hidden mb-4 border border-[#EAE2D7] dark:border-stone-800">
                <img
                  src={product.images[currentImageIndex]?.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.images.length > 1 && (
                  <>
                    <button onClick={goToPreviousImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-[#1C1C21]/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-[#26262B] transition-colors shadow-sm">
                      <ChevronLeft className="w-6 h-6 text-[#1C1917] dark:text-[#FAF7F5]" />
                    </button>
                    <button onClick={goToNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 dark:bg-[#1C1C21]/90 backdrop-blur-sm flex items-center justify-center hover:bg-white dark:hover:bg-[#26262B] transition-colors shadow-sm">
                      <ChevronRight className="w-6 h-6 text-[#1C1917] dark:text-[#FAF7F5]" />
                    </button>
                  </>
                )}
              </div>
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((img, index) => (
                    <button
                      key={img.publicId}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-[#B8860B]' : 'border-transparent'
                      }`}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {typeof product.category === 'object' && (
                <Link to={`/gallery?category=${product.category.slug}`} className="text-sm text-[#8B6508] dark:text-[#F3E5AB] hover:underline font-medium">
                  {product.category.name}
                </Link>
              )}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1917] dark:text-[#FAF7F5] mt-2 mb-4">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl md:text-4xl font-bold text-[#8B6508] dark:text-[#F3E5AB]">{formatPrice(product.price)}</span>
                {product.priceLabel && <span className="text-[#57534E] dark:text-[#A8A29E]">{product.priceLabel}</span>}
              </div>
              <div className="prose prose-stone dark:prose-invert max-w-none mb-8 text-[#57534E] dark:text-[#A8A29E]">
                <p className="leading-relaxed">{product.description}</p>
              </div>
              {product.isCustomizable && (
                <div className="bg-amber-500/10 dark:bg-amber-400/10 border border-amber-600/30 dark:border-amber-400/30 rounded-2xl p-4 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 dark:bg-amber-400/20 flex items-center justify-center text-[#8B6508] dark:text-[#F3E5AB] flex-shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <p className="text-[#1C1917] dark:text-[#FAF7F5] font-medium">✨ This item can be customized! Contact us for details.</p>
                </div>
              )}
              <div className="space-y-3 mb-8">
                <button onClick={handleWhatsAppOrder} className="btn-primary w-full justify-center text-base shadow-lg">
                  <MessageCircle className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                  Order on WhatsApp
                </button>
                <a href={`tel:${PHONE_NUMBER}`} className="btn-secondary w-full justify-center text-base">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="btn-secondary w-full justify-center text-base">
                  <Instagram className="w-5 h-5 mr-2" />
                  DM on Instagram
                </a>
              </div>
              <button onClick={handleShare} className="flex items-center gap-2 text-[#57534E] dark:text-[#A8A29E] hover:text-[#B8860B] dark:hover:text-[#F3E5AB] transition-colors text-sm font-medium">
                <Share2 className="w-5 h-5" />
                Share this product
              </button>
              {product.tags && product.tags.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm text-[#57534E] dark:text-[#A8A29E] mb-2">Tags:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-[#EAE2D7] dark:bg-stone-800 rounded-full text-sm text-[#44403C] dark:text-[#D6D3D1]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="font-heading text-2xl font-semibold text-[#1C1917] dark:text-[#FAF7F5] mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relProduct) => (
                  <Link key={relProduct._id} to={`/product/${relProduct._id}`} className="card group">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={relProduct.images[0]?.url}
                        alt={relProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading text-lg font-semibold text-[#1C1917] dark:text-[#FAF7F5] group-hover:text-[#B8860B] transition-colors line-clamp-2 mb-2">
                        {relProduct.name}
                      </h3>
                      <span className="text-xl font-bold text-[#8B6508] dark:text-[#F3E5AB]">{formatPrice(relProduct.price)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductDetail;