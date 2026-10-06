import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { api } from '../services/api';
import { Product, Category, Testimonial, InstagramPost, Settings, FAQ } from '../types';

interface ProductContextType {
  products: Product[];
  featuredProducts: Product[];
  categories: Category[];
  testimonials: Testimonial[];
  instagramPosts: InstagramPost[];
  settings: Settings | null;
  faqs: FAQ[];
  isLoading: boolean;
  fetchProducts: (params?: any) => Promise<void>;
  fetchFeaturedProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchTestimonials: () => Promise<void>;
  fetchInstagramPosts: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  getProduct: (id: string) => Promise<Product | null>;
  incrementViewCount: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([]);
  const [settings, setSettings] = useState<Settings | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async (params?: any) => {
    setIsLoading(true);
    try {
      const response = await api.getProducts(params);
      if (response.success && response.data) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchFeaturedProducts = useCallback(async () => {
    try {
      const response = await api.getFeaturedProducts();
      if (response.success && response.data) {
        setFeaturedProducts(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await api.getCategories(true);
      if (response.success && response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await api.getTestimonials(true);
      if (response.success && response.data) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    }
  }, []);

  const fetchInstagramPosts = useCallback(async () => {
    try {
      const response = await api.getInstagramPosts();
      if (response.success && response.data) {
        setInstagramPosts(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch Instagram posts:', error);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      const response = await api.getSettings();
      if (response.success && response.data) {
        setSettings(response.data);
        setFaqs(response.data.faqs || []);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  }, []);

  const getProduct = useCallback(async (id: string): Promise<Product | null> => {
    try {
      const response = await api.getProduct(id);
      if (response.success) {
        return response.data;
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
    }
    return null;
  }, []);

  const incrementViewCount = useCallback((id: string) => {
    setProducts(prev => prev.map(p => p._id === id ? { ...p, viewCount: p.viewCount + 1 } : p));
    setFeaturedProducts(prev => prev.map(p => p._id === id ? { ...p, viewCount: p.viewCount + 1 } : p));
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
    fetchTestimonials();
    fetchInstagramPosts();
    fetchSettings();
  }, [fetchFeaturedProducts, fetchCategories, fetchTestimonials, fetchInstagramPosts, fetchSettings]);

  return (
    <ProductContext.Provider
      value={{
        products,
        featuredProducts,
        categories,
        testimonials,
        instagramPosts,
        settings,
        faqs,
        isLoading,
        fetchProducts,
        fetchFeaturedProducts,
        fetchCategories,
        fetchTestimonials,
        fetchInstagramPosts,
        fetchSettings,
        getProduct,
        incrementViewCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};