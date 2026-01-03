import { FirebaseOptions } from "firebase/app";

// This configuration is used for both client and server-side rendering.
// NEXT_PUBLIC_FIREBASE_API_KEY is exposed to the browser and populated
// from .env.local file.
// Providing a fallback for the build process if the env var is not present.
export const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key",
    authDomain: "hexprompt.firebaseapp.com",
    projectId: "hexprompt",
    storageBucket: "hexprompt.appspot.com",
    messagingSenderId: "874781563150",
    appId: "1:874781563150:web:c4a67d41a8cdc0f4f5df5f",
    measurementId: "G-3FCYRK0658"
  };
  
