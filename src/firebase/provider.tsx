'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { FirebaseApp } from 'firebase/app';
import type { Auth } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';

// Base context.
//
// This context is responsible for holding the Firebase app, auth, and
// firestore instances. We create this context so that we can compositions
// of this provider can be created for the client and server.
const FirebaseContext = createContext<
  | {
      app: FirebaseApp;
      auth: Auth;
      db: Firestore;
    }
  | undefined
>(undefined);

// Base provider.
//
// This provider is responsible for creating the Firebase app, auth, and
// firestore instances and making them available to the rest of the
// application.
export function FirebaseProvider({
  children,
  app,
  auth,
  db,
}: React.PropsWithChildren<{
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
}>) {
  return (
    <FirebaseContext.Provider value={{ app, auth, db }}>
      {children}
    </FirebaseContext.Provider>
  );
}

// Hooks.
//
// These hooks are responsible for providing the Firebase app, auth, and
// firestore instances to the rest of the application.
export function useFirebaseApp() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebaseApp must be used within a FirebaseProvider');
  }
  return context.app;
}

export function useAuth() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a FirebaseProvider');
  }
  return context.auth;
}

export function useFirestore() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirestore must be used within a FirebaseProvider');
  }
  return context.db;
}
