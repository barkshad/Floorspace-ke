
import React from 'react';
import { ProductCategory, Product, Testimonial, GalleryImage } from './types';

export const COLORS = {
  primary: '#8B5E3C', // Rich Wood Brown
  secondary: '#4A4A4A', // Slate Grey
  accent: '#D4A373', // Light Wood / Sand
  background: '#F9F7F5', // Creamy White
  text: '#2D2D2D',
};

export const CONTACT_INFO = {
  phone: '+254 7XX XXX XXX',
  whatsapp: '2547XXXXXXXX',
  email: 'info@floorspaceinteriors.co.ke',
  address: 'Magunas Supermarket Building, Thika Road, Nairobi, Kenya',
  googleMapsLink: 'https://goo.gl/maps/example',
  facebook: 'https://facebook.com/floorspacekenya',
  instagram: 'https://instagram.com/floorspaceke'
};

// Added missing status and features to satisfy Product interface
export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Luxury Oak LVT',
    category: ProductCategory.LVT,
    description: 'Durable, water-resistant luxury vinyl tiles with a realistic oak wood texture.',
    price: 'Ksh 2,500 per sqm',
    image: 'https://picsum.photos/seed/lvt1/600/400',
    features: ['Waterproof', 'Scratch Resistant', 'Easy Install'],
    status: 'available'
  },
  {
    id: '2',
    name: 'Rigid Core SPC - Grey Slate',
    category: ProductCategory.SPC,
    description: 'Ultra-stable SPC flooring perfect for high-traffic commercial or residential areas.',
    price: 'Ksh 3,200 per sqm',
    image: 'https://picsum.photos/seed/spc1/600/400',
    features: ['Ultra Durable', 'Stone Plastic Composite'],
    status: 'available'
  },
  {
    id: '3',
    name: 'Marble Finish PVC Sheet',
    category: ProductCategory.WALLPAPER,
    description: 'Transform your walls with premium PVC marble sheets. High gloss and easy to clean.',
    price: 'Ksh 4,500 per sheet',
    image: 'https://picsum.photos/seed/pvc1/600/400',
    features: ['High Gloss', 'Seamless Finish'],
    status: 'available'
  },
  {
    id: '4',
    name: 'Premium 40mm Artificial Grass',
    category: ProductCategory.TURF,
    description: 'Lush, evergreen turf for balconies, gardens, and playgrounds.',
    price: 'Ksh 1,800 per sqm',
    image: 'https://picsum.photos/seed/grass1/600/400',
    features: ['UV Stabilized', 'Pet Friendly'],
    status: 'available'
  },
  {
    id: '5',
    name: 'Self-Adhesive Wood Vinyl',
    category: ProductCategory.VINYL,
    description: 'Quick DIY solution for furniture and floor refreshes. Just peel and stick.',
    price: 'Ksh 800 per roll',
    image: 'https://picsum.photos/seed/vinyl1/600/400',
    features: ['Peel & Stick', 'Moisture Proof'],
    status: 'available'
  }
];

// Added missing published field to satisfy Testimonial interface
export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah M.',
    location: 'Syokimau',
    rating: 5,
    text: 'The LVT flooring transformed my living room completely. Excellent service and delivery was on time!',
    date: 'Oct 2023',
    published: true
  },
  {
    id: '2',
    name: 'John K.',
    location: 'Kiserian',
    rating: 5,
    text: 'Highly recommend their SPC flooring for office spaces. Extremely durable and looks professional.',
    date: 'Dec 2023',
    published: true
  },
  {
    id: '3',
    name: 'Amara W.',
    location: 'Nairobi',
    rating: 4,
    text: 'Beautiful wallpapers! The selection at Floor Space is unmatched in Kenya.',
    date: 'Jan 2024',
    published: true
  }
];

// Added missing type field to satisfy GalleryImage interface
export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: 'https://picsum.photos/seed/inst1/800/600', title: 'LVT Installation - Residential', category: 'LVT', type: 'image' },
  { id: 'g2', url: 'https://picsum.photos/seed/inst2/800/600', title: 'SPC Office Floor', category: 'SPC', type: 'image' },
  { id: 'g3', url: 'https://picsum.photos/seed/inst3/800/600', title: 'PVC Marble Wall Feature', category: 'Wall Decor', type: 'image' },
  { id: 'g4', url: 'https://picsum.photos/seed/inst4/800/600', title: 'Balcony Turf Makeover', category: 'Turf', type: 'image' }
];

export const Logo = ({ className = "h-8" }: { className?: string }) => (
  <div className={`flex items-center gap-2 font-bold text-xl tracking-tighter ${className}`}>
    <div className="bg-wood text-white p-1 rounded flex items-center justify-center aspect-square h-full">
      <span className="text-sm">FS</span>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-wood">FLOOR SPACE</span>
      <span className="text-[10px] text-gray-500 font-normal">INTERIORS KENYA</span>
    </div>
  </div>
);
