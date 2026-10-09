export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  priceLabel?: string;
  category: Category | string;
  images: ProductImage[];
  isFeatured: boolean;
  isAvailable: boolean;
  isCustomizable: boolean;
  tags: string[];
  viewCount: number;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  url: string;
  publicId: string;
}

// Image selected in the admin panel: a local preview (data URL + temp id)
// that still carries the underlying File until the form is submitted.
export interface UploadImage extends ProductImage {
  file?: File;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image: ProductImage;
  displayOrder: number;
  isActive: boolean;
  productCount?: number;
}

export interface Testimonial {
  _id: string;
  customerName: string;
  review: string;
  rating: number;
  image?: ProductImage;
  isVisible: boolean;
  displayOrder: number;
  createdAt: string;
}

export interface InstagramPost {
  _id: string;
  image: ProductImage;
  postUrl?: string;
  caption?: string;
  displayOrder: number;
}

export interface Settings {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
  businessHours: string;
  faqs: FAQ[];
  metaTitle: string;
  metaDescription: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Admin {
  _id: string;
  name: string;
  email: string;
  isFirstLogin: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}