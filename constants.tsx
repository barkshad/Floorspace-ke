
import React from 'react';
import { ProductCategory, Product, Testimonial, GalleryImage } from './types';

export const COLORS = {
  primary: '#C19A6B',
  secondary: '#0F0F0F',
  accent: '#F9F7F5',
  glass: 'rgba(255, 255, 255, 0.03)',
  textMuted: 'rgba(255, 255, 255, 0.5)',
};

export const CONTACT_INFO = {
  phone: '+254 743 000 000',
  whatsapp: '254743000000',
  email: 'concierge@floorspacekenya.com',
  address: 'Floor 3, Magunas Plaza, Thika Road, Nairobi',
  googleMapsLink: 'https://goo.gl/maps/floor-space-kenya',
  facebook: 'https://facebook.com/floorspacekenya',
  instagram: 'https://instagram.com/floorspace.ke'
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Antique Nordic Oak',
    category: ProductCategory.LVT,
    description: 'A masterpiece of texture. Hand-scraped visuals with ultimate 7-layer acoustic backing.',
    price: 'Request Quote',
    image: 'https://images.unsplash.com/photo-1581850518616-bcb8186c3f30?auto=format&fit=crop&q=80&w=1200',
    features: ['Acoustic 22dB Reduction', 'Ceramic Bead Finish', 'Zero VOC'],
    status: 'available'
  },
  {
    id: '2',
    name: 'Sahara Rigid Core SPC',
    category: ProductCategory.SPC,
    description: 'Engineered for the extreme. A stone-composite core that laughs at humidity and heat.',
    price: 'Request Quote',
    image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&q=80&w=1200',
    features: ['Indestructible Core', 'Pre-attached IXPE Underlay', 'Click-Lock Pro'],
    status: 'available'
  },
  {
    id: '3',
    name: 'Titanium Slate Wall Panel',
    category: ProductCategory.WALLPAPER,
    description: 'Seamless architectural wall cladding. Lightweight elegance for feature environments.',
    price: 'Request Quote',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=1200',
    features: ['Anti-Microbial', 'Class A Fire Rated', 'Satin Polish'],
    status: 'available'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Eng. David Maina',
    location: 'Westlands, Nairobi',
    rating: 5,
    text: "Floor Space Kenya provides the technical depth that most interior suppliers lack. Their SPC selection is the best in East Africa.",
    date: '2024-08-12',
    published: true
  },
  {
    id: 't2',
    name: 'Architect Sarah Mutua',
    location: 'Karen Resident',
    rating: 5,
    text: "The texture and light reflection on the Nordic Oak LVT are indistinguishable from real wood. Truly premium finishes.",
    date: '2024-09-05',
    published: true
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200', title: 'Modern Penthouse', category: 'LVT', type: 'image' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200', title: 'Executive Suite', category: 'SPC', type: 'image' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200', title: 'Feature Wall PVC', category: 'Wall Decor', type: 'image' }
];

export const Logo = ({ className = "h-8", light = false }: { className?: string; light?: boolean }) => (
  <div className={`flex items-center gap-4 font-bold tracking-tight ${className}`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${light ? 'border-white/20 bg-white/5' : 'border-wood/30 bg-wood/10'}`}>
      <span className={`text-lg font-black italic ${light ? 'text-white' : 'text-wood'}`}>FS</span>
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-black tracking-tight leading-none text-white">FLOOR SPACE</span>
      <span className="text-[9px] font-black uppercase tracking-[0.4em] text-wood/80">Kenya</span>
    </div>
  </div>
);
