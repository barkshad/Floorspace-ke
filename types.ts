
// Enum for product categories to ensure consistent naming across the app
export enum ProductCategory {
  LVT = 'LVT Flooring',
  SPC = 'SPC Flooring',
  TURF = 'Artificial Turf',
  WALLPAPER = 'Wallpapers & PVC',
  VINYL = 'Vinyl Decor'
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory | string;
  description: string;
  price: string;
  image: string;
  features: string[];
  status: 'available' | 'out_of_stock';
  updatedAt?: any;
}

export interface SiteConfig {
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  published: boolean;
}

// Renamed from GalleryItem to GalleryImage for clarity and consistency with constants.tsx
export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  type: 'image' | 'video';
  isBeforeAfter?: boolean;
  createdAt?: any;
}
