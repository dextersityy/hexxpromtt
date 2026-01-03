import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "hexprompt.firebaseapp.com",
  projectId: "hexprompt",
  storageBucket: "hexprompt.appspot.com",
  messagingSenderId: "874781563150",
  appId: "1:874781563150:web:c4a67d41a8cdc0f4f5df5f",
  measurementId: "G-3FCYRK0658"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
