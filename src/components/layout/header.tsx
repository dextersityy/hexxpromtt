'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/auth/user-nav';
import { useLoginModal } from '@/components/providers/app-provider';
import { Skeleton } from '@/components/ui/skeleton';

export function Header() {
  const { user, loading } = useAuth();
  const { showLoginModal } = useLoginModal();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : user ? (
              <UserNav user={user} />
            ) : (
              <Button onClick={showLoginModal} >
                Login
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
