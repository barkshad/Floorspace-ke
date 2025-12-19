import React from 'react';
import { ProductCategory, Product, Testimonial, GalleryImage } from './types';

export const COLORS = {
  primary: '#C19A6B', // Desert Sand / Gold
  secondary: '#121212', // Deep Charcoal
  accent: '#E5E5E5', // Soft White
  muted: '#2A2A2A', // Lighter Charcoal
  background: '#0A0A0A', // Pure Black for depth
  text: '#FFFFFF',
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

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Royal Heritage Oak LVT',
    category: ProductCategory.LVT,
    description: 'Impeccable wood textures meet unmatched durability. Our flagship luxury vinyl collection.',
    price: 'Ksh 2,500 per sqm',
    image: 'https://images.unsplash.com/photo-1581850518616-bcb8186c3f30?auto=format&fit=crop&q=80&w=1200',
    features: ['100% Waterproof', 'Nano-Ceramic Coating', 'Commercial Grade'],
    status: 'available'
  },
  {
    id: '2',
    name: 'Everstone Slate SPC',
    category: ProductCategory.SPC,
    description: 'The strength of stone with the warmth of wood. Ultra-stable rigid core flooring.',
    price: 'Ksh 3,200 per sqm',
    image: 'https://images.unsplash.com/photo-1622372738946-62e02505feb3?auto=format&fit=crop&q=80&w=1200',
    features: ['High Density Core', 'Sound Insulation', 'Fire Resistant'],
    status: 'available'
  },
  {
    id: '3',
    name: 'Calacatta Luxe Wall PVC',
    category: ProductCategory.WALLPAPER,
    description: 'Seamless marble aesthetics for feature walls. The ultimate statement in interior luxury.',
    price: 'Ksh 4,500 per sheet',
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=1200',
    features: ['High Gloss Finish', 'Anti-Mold', 'Easy Clean'],
    status: 'available'
  },
  {
    id: '4',
    name: 'Imperial Emerald Turf',
    category: ProductCategory.TURF,
    description: 'Lush architectural turf designed for high-end residential landscapes and rooftops.',
    price: 'Ksh 1,800 per sqm',
    image: 'https://images.unsplash.com/photo-1533467647142-6e88a0cb2420?auto=format&fit=crop&q=80&w=1200',
    features: ['V-Shape Fiber', 'UV 10-Year Warranty', 'Maximum Drainage'],
    status: 'available'
  }
];

// Added missing TESTIMONIALS export to fix useSiteData.ts import error
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Amara Okoro',
    location: 'Karen, Nairobi',
    rating: 5,
    text: "The SPC flooring quality is world-class. It's completely transformed our boutique showroom's aesthetic while handling high foot traffic with ease.",
    date: '2024-05-12',
    published: true
  },
  {
    id: 't2',
    name: 'Samuel Kiprop',
    location: 'Muthaiga',
    rating: 5,
    text: "Professional installation and premium materials. Their LVT collection offers textures so realistic you'd swear it was solid hardwood.",
    date: '2024-06-20',
    published: true
  },
  {
    id: 't3',
    name: 'Wanjiku Kamau',
    location: 'Westlands',
    rating: 5,
    text: "Exceptional service from consultation to finish. The marble-finish wall PVC panels are the highlight of our new executive offices.",
    date: '2024-07-05',
    published: true
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 'g1', url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200', title: 'Minimalist Penthouse', category: 'LVT', type: 'image' },
  { id: 'g2', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=1200', title: 'Corporate Executive Suite', category: 'SPC', type: 'image' },
  { id: 'g3', url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200', title: 'Architectural Feature Wall', category: 'Wall Decor', type: 'image' },
  { id: 'g4', url: 'https://images.unsplash.com/photo-1591825729269-caeb344f6df2?auto=format&fit=crop&q=80&w=1200', title: 'Rooftop Oasis', category: 'Turf', type: 'image' }
];

export const Logo = ({ className = "h-8", light = false }: { className?: string; light?: boolean }) => (
  <div className={`flex items-center gap-3 font-bold tracking-tight ${className}`}>
    <div className={`${light ? 'bg-white text-black' : 'bg-wood text-white'} p-1.5 rounded-lg flex items-center justify-center aspect-square h-full shadow-lg`}>
      <span className="text-sm font-black italic">FS</span>
    </div>
    <div className="flex flex-col leading-none">
      <span className={`text-lg font-black tracking-tighter ${light ? 'text-white' : 'text-white'}`}>FLOOR SPACE</span>
      <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${light ? 'text-white/50' : 'text-wood'}`}>Interiors Kenya</span>
    </div>
  </div>
);