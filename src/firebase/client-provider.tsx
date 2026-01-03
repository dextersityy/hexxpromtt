'use client';

import { getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { FirebaseProvider } from './provider';

import { useState, createContext, useContext, useEffect } from 'react';
import LoginModal from '@/components/auth/login-modal';

type ModalContextType = {
  showLoginModal: () => void;
  hideLoginModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Define state types for Firebase services
type FirebaseServices = {
  app: FirebaseApp;
  auth: Auth;
  db: Firestore;
};

export function FirebaseClientProvider({
  children,
}: React.PropsWithChildren<{}>) {
  const [firebaseServices, setFirebaseServices] = useState<FirebaseServices | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Firebase only on the client side
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);
    setFirebaseServices({ app, auth, db });
  }, []);

  const showLoginModal = () => setIsLoginModalOpen(true);
  const hideLoginModal = () => setIsLoginModalOpen(false);

  // Render a loading state or null until Firebase is initialized
  if (!firebaseServices) {
    return null; // Or a loading spinner, but null is safer to avoid hydration errors
  }

  return (
    <FirebaseProvider app={firebaseServices.app} auth={firebaseServices.auth} db={firebaseServices.db}>
      <ModalContext.Provider value={{ showLoginModal, hideLoginModal }}>
        {children}
        <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
      </ModalContext.Provider>
    </FirebaseProvider>
  );
}

export function useLoginModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useLoginModal must be used within an FirebaseClientProvider');
  }
  return context;
}
