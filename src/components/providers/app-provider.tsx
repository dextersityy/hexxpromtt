'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthProvider } from './auth-provider';
import LoginModal from '@/components/auth/login-modal';

type ModalContextType = {
  showLoginModal: () => void;
  hideLoginModal: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function AppProviders({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const showLoginModal = () => setIsLoginModalOpen(true);
  const hideLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthProvider>
      <ModalContext.Provider value={{ showLoginModal, hideLoginModal }}>
        {children}
        <LoginModal isOpen={isLoginModalOpen} onOpenChange={setIsLoginModalOpen} />
      </ModalContext.Provider>
    </AuthProvider>
  );
}

export function useLoginModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useLoginModal must be used within an AppProviders');
  }
  return context;
}
