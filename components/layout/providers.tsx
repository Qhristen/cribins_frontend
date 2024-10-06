'use client';

import AppWalletProvider from '@/provider/wallet-provider';
import React from 'react';
import { PhotoProvider } from 'react-photo-view';
import Header from './header';
import ThemeProvider from './ThemeToggle/theme-provider';
import { AuthContextProvider } from '@/context/auth-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthContextProvider>
        <AppWalletProvider>
          <PhotoProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <Header />
              {children}
              {/* <Footer /> */}
            </ThemeProvider>
          </PhotoProvider>
        </AppWalletProvider>
      </AuthContextProvider>
    </>
  );
}
AppWalletProvider;
