'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { useUser, useLoginModal } from '@/firebase';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/auth/user-nav';
import { Skeleton } from '@/components/ui/skeleton';

export function Header() {
  const { user, loading } = useUser();
  const { showLoginModal } = useLoginModal();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-primary">Home</Link>
            <Link href="#" className="hover:text-primary">Explore</Link>
            <Link href="#" className="hover:text-primary">Community</Link>
            <Link href="#" className="hover:text-primary">Pricing</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {loading ? (
              <Skeleton className="h-8 w-20" />
            ) : user ? (
              <UserNav user={user} />
            ) : (
              <>
                <Button onClick={showLoginModal} variant="ghost">
                  Log In
                </Button>
                <Button onClick={showLoginModal}>
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
