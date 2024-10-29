import '@uploadthing/react/styles.css';
import './globals.css';

import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/components/layout/providers';
import { Toaster } from '@/components/ui/toaster';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Media Dashboard',
  description: 'Manage your appointments'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
        suppressHydrationWarning={true}
      >
        <NextTopLoader showSpinner={false} />
        <Providers session={session}>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
