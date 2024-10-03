'use client';

import { useAuth } from '@/context/auth-context';
import { FcGoogle } from 'react-icons/fc';
import { Button } from './ui/button';

export default function GoogleSignInButton() {
  const { signInWithGoogle } = useAuth();

  return (
    <Button
      className="my-2 w-full"
      variant="outline"
      type="button"
      onClick={async () => {
        try {
          await signInWithGoogle();
        } catch (error) {}
      }}
    >
      <FcGoogle className="mr-2 h-4 w-4" />
      Signin with Google
    </Button>
  );
}
