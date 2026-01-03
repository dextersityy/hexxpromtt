// This file is the single source of truth for all things Firebase.
'use client';

import {
  type FirebaseApp,
  getApp,
  getApps,
  initializeApp,
} from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';

// App-level configuration.
import { firebaseConfig } from './config';
// Providers and hooks.
import {
  FirebaseProvider,
  useFirebaseApp,
  useFirestore,
  useAuth,
} from './provider';
import { FirebaseClientProvider, useLoginModal } from './client-provider';
// Auth hooks.
import { useUser } from './auth/use-user';
// Firestore hooks.
import { useCollection } from './firestore/use-collection';
import { useDoc } from './firestore/use-doc';

// Initialize Firebase app.
//
// You can retrieve the Firebase app instance by calling `getFirebase()`.
// This is useful for server components and server actions.
let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

// This check is to prevent re-initializing the app on the client.
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getFirestore(app);

const getFirebase = () => ({ app, auth, db });

export {
  // Config.
  firebaseConfig,
  // Initialization.
  getFirebase,
  app,
  auth,
  db,
  // Providers.
  FirebaseProvider,
  FirebaseClientProvider,
  // Hooks.
  useUser,
  useCollection,
  useDoc,
  useFirebaseApp,
  useFirestore,
  useAuth,
  useLoginModal,
};
