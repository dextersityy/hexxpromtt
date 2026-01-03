'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useAuth } from '../provider';
import type { User as AppUser } from '@/lib/types';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from '../provider';

// A hook that returns the currently signed-in user.
//
// This hook is responsible for setting up the onAuthStateChanged listener
// and returning the user object from it.
//
// It also fetches the user's profile from Firestore and returns it.
export const useUser = () => {
  const auth = useAuth();
  const db = useFirestore();
  const [user, setUser] = useState<AppUser | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!auth || !db) {
      // Firebase services might not be available yet.
      return;
    }
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        try {
          if (user) {
            setFirebaseUser(user);
            const userRef = doc(db, 'users', user.uid);
            const docSnap = await getDoc(userRef);
    
            if (docSnap.exists()) {
              setUser({ ...docSnap.data(), uid: docSnap.id } as AppUser);
            } else {
              // Create new user document
              const newUser: AppUser = {
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                role: 'user',
                username: null,
                onboarding_required: true,
                stats: {
                  total_copies_received: 0,
                  followers: 0,
                  following: 0,
                },
                createdAt: serverTimestamp() as any, // Will be converted by Firestore
              };
              await setDoc(userRef, newUser);
              setUser(newUser);
            }
          } else {
            setFirebaseUser(null);
            setUser(null);
          }
        } catch (e: any) {
          setError(e);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [auth, db]);

  return { user, firebaseUser, loading, error };
};
