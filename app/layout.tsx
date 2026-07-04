import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import logo from '../public/assets/revive logo.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://revivewardrobe.com'),
  title: 'Revive Wardrobe | Luxury Designer Abayas & Jalabiyas Dubai',
  description:
    'Discover Revive Wardrobe, the premier destination for luxury designer abayas and jalabiyas in Dubai & UAE. Handcrafted from premium Nida and Saudi crepe in limited quantities. Enjoy complimentary express delivery and cash on delivery across the UAE.',
  keywords: [
    'luxury abayas',
    'designer abayas',
    'jalabiyas dubai',
    'modest wear uae',
    'premium nida abayas',
    'saudi crepe abaya',
    'modest fashion boutique',
    'abaya online dubai',
    'revive wardrobe'
  ],
  icons: {
    icon: '/assets/R-icon-f.png',
    apple: '/assets/R-icon-f.png',
  },
  openGraph: {
    title: 'Revive Wardrobe | Luxury Designer Abayas & Jalabiyas Dubai',
    description:
      'Discover Revive Wardrobe, the premier destination for luxury designer abayas and jalabiyas in Dubai & UAE. Handcrafted from premium Nida and Saudi crepe in limited quantities.',
    images: [
      {
        url: '/assets/R-icon-f.png',
        width: 800,
        height: 800,
        alt: 'Revive Wardrobe Logo',
      },
    ],
  },
  robots: {
    index: false,
    follow: false,
  },
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
