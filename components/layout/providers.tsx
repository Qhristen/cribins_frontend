'use client';

import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import Footer from '../footer';
import Header from './header';
import { PhotoProvider } from 'react-photo-view';
import { AuthContextProvider } from '@/context/auth-context';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthContextProvider>
        <PhotoProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
            {/* <Footer /> */}
          </ThemeProvider>
        </PhotoProvider>
      </AuthContextProvider>
    </>
  );
}
