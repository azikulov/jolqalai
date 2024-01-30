import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import '@/assets/styles/globals.scss';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
