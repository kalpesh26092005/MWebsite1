export interface PriceOption {
  label: string
  price: string
}

export interface Product {
  id: string
  name: string
  category: string
  images: string[]
  caption: string
  posterDetails?: string
  imageText?: string
  priceLabel: string
  priceOptions: PriceOption[] | null
  featured: boolean
  instagramPost: string
}

export interface Category {
  id: string
  name: string
  description: string
}

export interface GalleryItem {
  image: string
  alt: string
  instagramPost: string
}

export interface SiteData {
  business: {
    name: string
    owner: string
    instagram: string
    instagramHandle: string
    phone: string
    phoneRaw: string
    bio: string
    followers: number
    profileImage: string
  }
  categories: Category[]
  products: Product[]
  gallery: GalleryItem[]
}
