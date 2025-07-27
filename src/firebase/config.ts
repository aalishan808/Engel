// firebase/config.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; // optional
import { getStorage } from 'firebase/storage';     // optional


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFF7cfc3bMxs7_vZ0bnMRoR7uJyOiEGNo",
  authDomain: "enjel-15e1b.firebaseapp.com",
  projectId: "enjel-15e1b",
  storageBucket: "enjel-15e1b.firebasestorage.app",
  messagingSenderId: "519013623216",
  appId: "1:519013623216:web:d7a75a0ab0bf34fe88e275",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
console.log('✅ Firebase initialized:', app.name);

const auth = getAuth(app);
const db = getFirestore(app); // optional
const storage = getStorage(app); // optional

export { auth, db, storage };
