'use client';

import { useUser } from '@/firebase';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from './ui/skeleton';

function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && user) {
      if (user.onboarding_required && pathname !== '/onboarding') {
        router.push('/onboarding');
      }
    }
  }, [user, loading, router, pathname]);

  if (loading) {
    return <FullScreenLoader />;
  }

  // Allow access to the onboarding page itself.
  if (user?.onboarding_required && pathname !== '/onboarding') {
    return <FullScreenLoader />;
  }
  
  if (user?.onboarding_required && pathname === '/onboarding') {
    return <>{children}</>;
  }


  return <>{children}</>;
}
