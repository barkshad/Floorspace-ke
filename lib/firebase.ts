
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Shared config as provided in your prompt
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
