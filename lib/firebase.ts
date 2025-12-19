
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * FIRESTORE SECURITY RULES (Copy these to your Firebase Console -> Firestore -> Rules):
 * 
 * rules_version = '2';
 * service cloud.firestore {
 *   match /databases/{database}/documents {
 *     // Allow public read access to site content
 *     match /siteConfig/{document} {
 *       allow read: if true;
 *       allow write: if request.auth != null;
 *     }
 *     match /products/{document} {
 *       allow read: if true;
 *       allow write: if request.auth != null;
 *     }
 *     match /gallery/{document} {
 *       allow read: if true;
 *       allow write: if request.auth != null;
 *     }
 *     match /testimonials/{document} {
 *       allow read: if true;
 *       allow write: if request.auth != null;
 *     }
 *   }
 * }
 */

const firebaseConfig = {
  apiKey: "AIzaSyBIIPrYDmVDAjTeP-XbQa0bdErshvf5Pds",
  authDomain: "floor-spa.firebaseapp.com",
  projectId: "floor-spa",
  storageBucket: "floor-spa.firebasestorage.app",
  messagingSenderId: "425754208334",
  appId: "1:425754208334:web:bdff1d6ef822a90506fb1f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
