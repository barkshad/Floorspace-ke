
import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, SiteConfig, Testimonial, GalleryImage } from '../types';
import { CONTACT_INFO, PRODUCTS as DEFAULT_PRODUCTS, TESTIMONIALS as DEFAULT_TESTIMONIALS, GALLERY_IMAGES as DEFAULT_GALLERY } from '../constants';

export function useSiteData() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // We wrap listeners in error handlers to catch [code=permission-denied] 
    // This allows the app to use fallback constants without console noise.

    // 1. Config
    const unsubConfig = onSnapshot(
      doc(db, 'siteConfig', 'global'), 
      (snap) => {
        if (snap.exists()) setConfig(snap.data() as SiteConfig);
      },
      (err) => {
        console.warn("Firestore siteConfig read restricted. Using local defaults.");
        setHasError(true);
      }
    );

    // 2. Products
    const unsubProducts = onSnapshot(
      collection(db, 'products'), 
      (snap) => {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Product[];
        setProducts(items.length > 0 ? items : (DEFAULT_PRODUCTS as unknown as Product[]));
      },
      (err) => {
        console.warn("Firestore products read restricted. Using local defaults.");
        setProducts(DEFAULT_PRODUCTS as unknown as Product[]);
      }
    );

    // 3. Testimonials
    const unsubTestimonials = onSnapshot(
      collection(db, 'testimonials'), 
      (snap) => {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() })) as Testimonial[];
        setTestimonials(items.length > 0 ? items : (DEFAULT_TESTIMONIALS as unknown as Testimonial[]));
      },
      (err) => {
        console.warn("Firestore testimonials read restricted. Using local defaults.");
        setTestimonials(DEFAULT_TESTIMONIALS as unknown as Testimonial[]);
      }
    );

    // 4. Gallery
    const unsubGallery = onSnapshot(
      collection(db, 'gallery'), 
      (snap) => {
        const items = snap.docs.map(d => ({ id: d.id, ...d.data() })) as GalleryImage[];
        setGallery(items.length > 0 ? items : (DEFAULT_GALLERY as unknown as GalleryImage[]));
      },
      (err) => {
        console.warn("Firestore gallery read restricted. Using local defaults.");
        setGallery(DEFAULT_GALLERY as unknown as GalleryImage[]);
      }
    );

    setLoading(false);
    return () => {
      unsubConfig();
      unsubProducts();
      unsubTestimonials();
      unsubGallery();
    };
  }, []);

  const safeConfig = config || {
    heroTitle: "Premium Flooring & Interior Finishes",
    heroSubtitle: "Transform your space with Kenya's most trusted partner for LVT, SPC, Wallpapers & Decor.",
    aboutText: "Based in the heart of the bustling Thika Road...",
    phone: CONTACT_INFO.phone,
    whatsapp: CONTACT_INFO.whatsapp,
    email: CONTACT_INFO.email,
    address: CONTACT_INFO.address,
    facebookUrl: CONTACT_INFO.facebook,
    instagramUrl: CONTACT_INFO.instagram
  };

  return { config: safeConfig, products, testimonials, gallery, loading, hasError };
}
