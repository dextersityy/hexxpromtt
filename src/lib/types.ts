import type { Timestamp } from 'firebase/firestore';

export interface User {
  uid: string;
  username: string | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  role: 'user' | 'prompter' | 'mod' | 'admin';
  onboarding_required?: boolean;
  birthDate?: Timestamp;
  stats: {
    total_copies_received: number;
    followers: number;
    following: number;
  };
  createdAt: Timestamp;
}

export interface Prompt {
  id: string;
  author_uid: string;
  author_name: string;
  author_image: string; // denormalized for easy display
  title: string;
  content: string;
  description?: string; // from form
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  admin_tag: boolean;
  metrics: {
    likes: number;
    copies: number;
    views: number;
  };
  rejection_reason?: string; // if rejected
  createdAt: Timestamp;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
}
