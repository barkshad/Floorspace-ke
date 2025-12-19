
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  getDoc,
  setDoc,
  query, 
  orderBy,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import { uploadToCloudinary } from "./cloudinary";
import { Product, SiteConfig, Testimonial, GalleryImage } from "../types";

// Collections
const PRODUCTS = "products";
const CONFIG = "siteConfig";
const TESTIMONIALS = "testimonials";
const GALLERY = "gallery";

/**
 * Site Configuration
 */
export async function getSiteConfig(): Promise<SiteConfig | null> {
  const docRef = doc(db, CONFIG, "global");
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() as SiteConfig : null;
}

export async function updateSiteConfig(config: Partial<SiteConfig>) {
  const docRef = doc(db, CONFIG, "global");
  await setDoc(docRef, { ...config, updatedAt: serverTimestamp() }, { merge: true });
}

/**
 * Products
 */
export async function fetchProducts() {
  const q = query(collection(db, PRODUCTS), orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as Product[];
}

export async function saveProduct(product: Partial<Product>, file?: File) {
  let imageUrl = product.image;
  if (file) {
    imageUrl = await uploadToCloudinary(file);
  }

  const data = {
    ...product,
    image: imageUrl,
    updatedAt: serverTimestamp()
  };

  if (product.id) {
    const ref = doc(db, PRODUCTS, product.id);
    await updateDoc(ref, data);
    return product.id;
  } else {
    const ref = await addDoc(collection(db, PRODUCTS), { ...data, createdAt: serverTimestamp() });
    return ref.id;
  }
}

export async function removeProduct(id: string) {
  await deleteDoc(doc(db, PRODUCTS, id));
}

/**
 * Testimonials
 */
export async function fetchTestimonials() {
  const q = query(collection(db, TESTIMONIALS), orderBy("date", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as Testimonial[];
}

export async function toggleTestimonial(id: string, published: boolean) {
  await updateDoc(doc(db, TESTIMONIALS, id), { published });
}

/**
 * Gallery
 */
export async function fetchGallery() {
  const q = query(collection(db, GALLERY), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() })) as GalleryImage[];
}

export async function saveGalleryItem(item: Partial<GalleryImage>, file: File) {
  const url = await uploadToCloudinary(file);
  const data = {
    ...item,
    url,
    type: file.type.startsWith('video/') ? 'video' : 'image',
    createdAt: serverTimestamp()
  };
  await addDoc(collection(db, GALLERY), data);
}
