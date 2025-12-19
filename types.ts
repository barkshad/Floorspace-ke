
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: string;
  image: string;
  features?: string[];
}

export enum ProductCategory {
  LVT = 'LVT Flooring',
  SPC = 'SPC Flooring',
  VINYL = 'Vinyl & Contact Paper',
  WALLPAPER = 'Wallpapers & PVC',
  TURF = 'Artificial Turf'
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
  isBeforeAfter?: boolean;
}
