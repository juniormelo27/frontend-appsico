import '@/styles/globals.css';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import Providers from '@/contexts/providers';
import { cn } from '@/libraries/utils';
import { cookies } from 'next/headers';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'AppSico',
  description: 'Encontre seu psicólogo na appsico',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookiesAccepts = cookies().get('cookies-accepts');

  return (
    <html lang='pt-BR'>
      <body className={cn(montserrat.className, montserrat.variable)}>
        <Providers cookiesAccepts={!!cookiesAccepts}>{children}</Providers>
      </body>
    </html>
  );
}
