'use client';

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { firebaseConfig } from './config';
import { FirebaseProvider } from './provider';

import { useState, createContext, useContext } from 'react';
import LoginModal from '@/components/auth/login-modal';

type ModalContextType = {
  showLoginModal: () => void;
  hideLoginModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// We are doing this to make sure there is only one instance of firebase
// running on the client.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export function FirebaseClientProvider({
  children,
}: React.PropsWithChildren<{}>) {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const showLoginModal = () => setIsLoginModalOpen(true);
  const hideLoginModal = () => setIsLoginModalOpen(false);

  return (
    <FirebaseProvider app={app} auth={auth} db={db}>
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
