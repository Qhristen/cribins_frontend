'use client';

import { auth } from '@/lib/firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Icons } from './icons';
import { Button } from './ui/button';

export default function GoogleSignInButton() {
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User Info:', user); // User information
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={signInWithGoogle}
    >
      <Icons.gitHub className="mr-2 h-4 w-4" />
      Continue with Github
    </Button>
  );
}
