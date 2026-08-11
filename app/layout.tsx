import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://shop.revivewardrobe.com'),
  title: 'Revive Wardrobe | Exclusive Abayas & Jalabiyas - Made in UAE',
  description:
    'Discover original, limited-production abayas and jalabiyas by Revive Wardrobe. One design, one creation. Premium fabrics, Made in UAE. Buy 2+ pieces and get AED 25 off. Free Dubai shipping.',
  keywords: [
    'abayas uae',
    'jalabiyas dubai',
    'designer abayas',
    'exclusive abayas',
    'modest wear uae',
    'revive wardrobe',
    'made in uae abayas',
    'premium abayas dubai',
    'original abaya designs',
  ],
  authors: [{ name: 'Revive Wardrobe' }],
  creator: 'Revive Wardrobe',
  publisher: 'Revive Wardrobe',
  robots: {
    index: false,
    follow: true,
    googleBot: {
      index: false,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://shop.revivewardrobe.com/',
  },
  icons: {
    icon: '/assets/R-icon-f.png',
    apple: '/assets/R-icon-f.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://shop.revivewardrobe.com/',
    siteName: 'Revive Wardrobe',
    title: 'Revive Wardrobe | Exclusive Abayas & Jalabiyas - Made in UAE',
    description:
      'Original, limited-production abayas and jalabiyas. One design, one creation. Premium fabrics, Made in UAE. Buy 2+ pieces and get AED 25 off.',
    images: [
      {
        url: 'https://shop.revivewardrobe.com/assets/R-icon-f.png',
        width: 800,
        height: 800,
        alt: 'Revive Wardrobe - Exclusive Abayas & Jalabiyas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revive Wardrobe | Exclusive Abayas & Jalabiyas - Made in UAE',
    description:
      'Original, limited-production abayas and jalabiyas. One design, one creation. Premium fabrics, Made in UAE.',
    images: ['https://shop.revivewardrobe.com/assets/R-icon-f.png'],
  },
  other: {
    'facebook-domain-verification': '',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Revive Wardrobe',
  url: 'https://revivewardrobe.com',
  logo: 'https://revivewardrobe.com/assets/revive%20logo.png',
  image: 'https://revivewardrobe.com/assets/R-icon-f.png',
  description:
    'Premium fashion brand creating original, limited-production abayas and jalabiyas in the UAE.',
  sameAs: [
    'https://www.instagram.com/premium.abayas.uae',
    'https://www.facebook.com/revivewardrobe/',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+971-58-244-7684',
    contactType: 'customer service',
    availableLanguage: ['English', 'Arabic'],
    contactOption: 'WhatsApp',
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Revive Wardrobe',
  url: 'https://shop.revivewardrobe.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://revivewardrobe.com/shop?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ClothingStore',
  name: 'Revive Wardrobe',
  image: 'https://revivewardrobe.com/assets/R-icon-f.png',
  '@id': 'https://revivewardrobe.com',
  url: 'https://revivewardrobe.com',
  telephone: '+971-58-244-7684',
  priceRange: '$$$',
  areaServed: {
    '@type': 'Country',
    name: 'United Arab Emirates',
  },
  brand: {
    '@type': 'Brand',
    name: 'Revive Wardrobe',
  },
  paymentAccepted: ['Cash on Delivery', 'Credit Card'],
  currenciesAccepted: 'AED',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#610000" />
        <meta name="msapplication-TileColor" content="#610000" />
        <meta name="geo.region" content="AE" />
        <meta name="geo.placename" content="Dubai" />
        <meta name="language" content="English" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body suppressHydrationWarning>
        {children}

        <Script
          id="schema-org-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="schema-org-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Script
          id="schema-org-localbusiness"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </body>
    </html>
  );
}
