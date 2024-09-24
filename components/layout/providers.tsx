'use client';

import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import Footer from '../footer';
import Header from './header';
import { PhotoProvider } from 'react-photo-view';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PhotoProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
          {/* <Footer /> */}
        </ThemeProvider>
      </PhotoProvider>
    </>
  );
}
