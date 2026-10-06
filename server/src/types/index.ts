export interface IProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  priceLabel?: string;
  category: string;
  images: {
    url: string;
    publicId: string;
  }[];
  isFeatured: boolean;
  isAvailable: boolean;
  isCustomizable: boolean;
  tags: string[];
  viewCount: number;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  name: string;
  slug: string;
  description?: string;
  image: {
    url: string;
    publicId: string;
  };
  displayOrder: number;
  isActive: boolean;
  productCount?: number;
}

export interface ITestimonial {
  customerName: string;
  review: string;
  rating: number;
  image?: {
    url: string;
    publicId: string;
  };
  isVisible: boolean;
  displayOrder: number;
}

export interface IAdmin {
  name: string;
  email: string;
  password: string;
  isFirstLogin: boolean;
}

export interface IInstagramPost {
  image: {
    url: string;
    publicId: string;
  };
  postUrl?: string;
  caption?: string;
  displayOrder: number;
}

export interface ISettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutText: string;
  businessHours: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  metaTitle: string;
  metaDescription: string;
}

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

export interface IPaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}