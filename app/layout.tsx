import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Technology Trends — Tech Trends Dashboard',
  description:
    'Real-time technology trends aggregator for UK and US — GitHub, news, YouTube, Reddit, and Stack Overflow.',
  keywords: ['technology trends', 'tech', 'GitHub', 'news', 'UK', 'US', 'dashboard'],
  authors: [{ name: 'Technology Trends' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#111827',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-gray-900 text-gray-50 antialiased">
        {children}
      </body>
    </html>
  );
}
