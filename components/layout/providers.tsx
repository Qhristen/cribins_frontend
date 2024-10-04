'use client';

import AppWalletProvider from '@/provider/wallet-provider';
import React from 'react';
import { PhotoProvider } from 'react-photo-view';
import Header from './header';
import ThemeProvider from './ThemeToggle/theme-provider';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppWalletProvider>
        <PhotoProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Header />
            {children}
            {/* <Footer /> */}
          </ThemeProvider>
        </PhotoProvider>
      </AppWalletProvider>
    </>
  );
}
AppWalletProvider;
