import Header from '@/components/layout/header';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

const plus_Jakarta_Sans = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cribins',
  description:
    'Find your dream home with our comprehensive real estate platform. Browse listings, view photos, and connect with trusted agents. Your next property awaits!'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plus_Jakarta_Sans.className}`}>
        <NextTopLoader showSpinner={false} />
        <Providers>
          <Header />
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
