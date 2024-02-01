import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import '@/assets/styles/globals.scss';

const inter = Inter({ subsets: ['cyrillic'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'JolQalai',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='kz'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </head>
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
