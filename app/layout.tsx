import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import logo from '../public/assets/revive logo.png';

export const metadata: Metadata = {
  title: 'Revive Wardrobe - High Fashion Editorial',
  description:
    'A premium, editorial-style landing page for Revive Wardrobe, a luxury fashion house specializing in exclusive, one-of-a-kind Abayas and modest haute couture.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
