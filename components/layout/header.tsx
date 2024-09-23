'use client';

import { LogoDark, LogoLight } from '@/assets/icons';
import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { UserNav } from './user-nav';
import Container from '../container';

export default function Header() {
  const { theme } = useTheme();

  return (
    <div className="fixed left-0 right-0 top-0 z-20 ">
      <Container>
        <nav className="flex h-14 items-center justify-between">
          <div className="">
            <Link href={`/`} className="text-2xl font-medium tracking-widest">
              {/* {theme === 'light' ? (
              <Image src={LogoDark} alt="logo_dark" />
            ) : (
              <Image src={LogoLight} alt="logo_white" />
            )} */}
              {/* Cribins */}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <UserNav />
            <ThemeToggle />
          </div>
        </nav>
      </Container>
    </div>
  );
}
