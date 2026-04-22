import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Replace with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdBzx02JFAP13AHe4AjRUQq20kr23X9Gs",
  authDomain: "ust-website-67d89.firebaseapp.com",
  projectId: "ust-website-67d89",
  storageBucket: "ust-website-67d89.firebasestorage.app",
  messagingSenderId: "884205207304",
  appId: "1:884205207304:web:393b6142e51f5abe89b6bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
