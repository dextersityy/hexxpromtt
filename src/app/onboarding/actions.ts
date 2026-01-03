'use server';

import { getFirebase } from '@/firebase/server';
import { User } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function completeOnboarding(
  userId: string,
  data: {
    username: string;
    displayName: string;
    birthDate: Date;
  }
) {
  const { db } = getFirebase();
  const { username, displayName, birthDate } = data;

  try {
    // Check if username is already taken
    const usernameQuery = await db
      .collection('users')
      .where('username', '==', username)
      .limit(1)
      .get();

    if (!usernameQuery.empty) {
      const existingUser = usernameQuery.docs[0].data() as User;
      if (existingUser.uid !== userId) {
        return { success: false, error: 'Username is already taken.' };
      }
    }

    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      username: username,
      displayName: displayName,
      birthDate: birthDate,
      onboarding_required: false,
    });

    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Error completing onboarding:', error);
    return { success: false, error: error.message || 'Failed to update profile.' };
  }
}
