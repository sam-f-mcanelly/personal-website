import { cn } from '@/lib/utils';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import type React from 'react';
import LiveBackground from '@/components/live-background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sam McAnelly - Senior Software Engineer',
  description:
    'Senior Software Engineer at Netflix, delivering new content experiences end to end across distributed systems.',
  icons: {
    icon: 'favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen font-sans antialiased', inter.className)}>
        <LiveBackground />
        {children}
      </body>
    </html>
  );
}
