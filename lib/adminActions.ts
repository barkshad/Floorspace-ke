
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./firebase";
import { uploadToCloudinary } from "./cloudinary";
import { Product } from "../types";

const PRODUCTS_COLLECTION = "products";
const GALLERY_COLLECTION = "gallery";

/**
 * CMS: Add a new product with an optional image upload
 */
export async function addProduct(productData: Partial<Product>, imageFile?: File) {
  try {
    let imageUrl = productData.image || "";

    if (imageFile) {
      imageUrl = await uploadToCloudinary(imageFile);
    }

    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      image: imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return { id: docRef.id, ...productData, image: imageUrl };
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

/**
 * CMS: Update an existing product
 */
export async function updateProduct(productId: string, updates: Partial<Product>, newImageFile?: File) {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId);
    let imageUrl = updates.image;

    if (newImageFile) {
      imageUrl = await uploadToCloudinary(newImageFile);
    }

    await updateDoc(productRef, {
      ...updates,
      ...(imageUrl && { image: imageUrl }),
      updatedAt: serverTimestamp(),
    });

    return { id: productId, ...updates, ...(imageUrl && { image: imageUrl }) };
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

/**
 * CMS: Delete a product
 */
export async function deleteProduct(productId: string) {
  try {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

/**
 * CMS: Add to gallery (Instagram-style reels/photos)
 */
export async function addToGallery(title: string, category: string, file: File) {
  try {
    const mediaUrl = await uploadToCloudinary(file);
    const docRef = await addDoc(collection(db, GALLERY_COLLECTION), {
      title,
      category,
      url: mediaUrl,
      mediaType: file.type.startsWith('video/') ? 'video' : 'image',
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, url: mediaUrl };
  } catch (error) {
    console.error("Error adding to gallery:", error);
    throw error;
  }
}
