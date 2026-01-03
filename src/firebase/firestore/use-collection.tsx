'use client';

import {
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
  limit,
  type DocumentData,
  type Query,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { useFirestore } from '../provider';

// A hook that returns a collection from Firestore.
//
// This hook is responsible for setting up the onSnapshot listener and
// returning the data from it.
//
// It also returns the loading and error states of the collection.
export const useCollection = <T extends DocumentData>(q: Query<T> | null) => {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!q) {
      setData([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => doc.data());
        setData(data);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [q]);

  return { data, loading, error };
};
