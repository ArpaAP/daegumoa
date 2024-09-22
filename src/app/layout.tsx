import { Toaster } from 'react-hot-toast';

import type { Metadata, Viewport } from 'next';

import { Layout } from '@/components/layouts';

import { Paperlogy } from '@/styles/font';
import '@/styles/globals.css';

import Providers from '@/providers';
import Script from 'next/script';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: '대구모아',
  description: '2024 대구를 빛내는 해커톤 - 반짝반짝작은별 조',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={Paperlogy.variable}>
      <body>
        <Providers>
          <Toaster position="top-center" reverseOrder={false} />
          <Layout>{children}</Layout>
        </Providers>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
