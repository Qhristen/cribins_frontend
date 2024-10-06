'use client';

import { CribinsLogo, LogoDark, LogoLight } from '@/assets/icons';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { UserNav } from './user-nav';
import Container from '../container';
import { useAuth } from '@/context/auth-context';
import GoogleSignInButton from '../google-auth-button';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Header() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <div className="fixed left-0 right-0 top-0 z-20 bg-white px-4 dark:bg-black">
      <nav className="flex h-14 items-center justify-between">
        <div className="">
          <Link href={`/`} className="text-2xl font-medium tracking-widest">
            <Image src={CribinsLogo} className="h-10 w-10" alt="logo_dark" />
            {/* Cribins */}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center justify-center">
              <WalletMultiButton
                style={{ background: 'none', color: 'gray' }}
              />
              <UserNav user={user} />
            </div>
          ) : (
            <GoogleSignInButton />
          )}
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
