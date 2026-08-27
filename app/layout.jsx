import { Analytics } from '@vercel/analytics/next'

import './globals.css'

export const metadata = {
  title: 'Vyxel - AI-Powered Student Relationship Management',
  description: 'Transform your study abroad consultancy with Vyxel - AI-powered lead management, student tracking, and workflow automation.',
  generator: 'v0.app',
  openGraph: {
    title: 'Vyxel - AI-Powered Student Relationship Management',
    description: 'Transform your study abroad consultancy with Vyxel - AI-powered lead management, student tracking, and workflow automation.',
    url: 'https://vyxel.digi-wire.com',
    siteName: 'Vyxel',
    images: [
      {
        url: './public/vyxel_logo_1.png',
        width: 500,
        height: 500,
        alt: 'Vyxel Logo Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
