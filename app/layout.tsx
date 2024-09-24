import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import 'react-photo-view/dist/react-photo-view.css';

const plus_Jakarta_Sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800']
});

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
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
