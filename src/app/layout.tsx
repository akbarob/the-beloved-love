import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const siteUrl = 'https://www.tblinitiative.org';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The Beloved Love Initiative | Restoring Identity. Awakening Love. Transforming Lives.',
    template: '%s | The Beloved Love Initiative',
  },
  description:
    'The Beloved Love Initiative is a transformative movement dedicated to healing hearts, restoring identity in Christ, and raising whole individuals through truth, shared stories, and purposeful encounters.',
  keywords: [
    'The Beloved Love Initiative',
    'TBLI',
    'identity in Christ',
    'emotional healing',
    'spiritual growth',
    'faith community',
    'Bible Recitation Movement',
    'healing hearts',
    'restoring identity',
    'Christian ministry',
    'A Moment With Love podcast',
    'Habibat Salawudeen',
    'wholeness',
    'purpose',
    'community outreach',
  ],
  authors: [{ name: 'Habibat Salawudeen', url: siteUrl }],
  creator: 'The Beloved Love Initiative',
  publisher: 'The Beloved Love Initiative',
  category: 'Faith & Spirituality',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'The Beloved Love Initiative',
    title: 'The Beloved Love Initiative | Restoring Identity. Awakening Love. Transforming Lives.',
    description:
      'A transformative movement dedicated to healing hearts, restoring identity in Christ, and raising whole individuals through truth, shared stories, and purposeful encounters.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Beloved Love Initiative, Restoring Identity. Awakening Love. Transforming Lives.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Beloved Love Initiative',
    description:
      'Healing hearts, restoring identity in Christ, and raising whole individuals through truth and purposeful encounters.',
    images: ['/og-image.jpg'],
    creator: '@thebelovedlove',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/favicon-32.png',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180' },
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
