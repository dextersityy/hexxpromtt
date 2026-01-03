'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/icons';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/firebase';

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
  const auth = useAuth();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    if (!auth) {
      console.error("Firebase Auth is not initialized.");
      toast({
        title: 'Error',
        description: 'Authentication service is not ready. Please try again later.',
        variant: 'destructive',
      });
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      onOpenChange(false);
      toast({
        title: 'Login Successful!',
        description: "Welcome to PromptHub!",
      });
    } catch (error: any) {
      console.error('Google Sign-In Error:', error);
      toast({
        title: 'Authentication Failed',
        description: error.message || 'Could not sign you in with Google. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-headline">Join PromptHub</DialogTitle>
          <DialogDescription className="text-center">
            Sign in to create, share, and like prompts.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            variant="outline"
          >
            <GoogleIcon className="mr-2 h-5 w-5" />
            Sign in with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
