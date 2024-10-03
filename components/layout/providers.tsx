'use client';

import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import Footer from '../footer';
import Header from './header';
import { PhotoProvider } from 'react-photo-view';
import { AuthContextProvider } from '@/context/auth-context';
import AppWalletProvider from '@/provider/wallet-provider';

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
