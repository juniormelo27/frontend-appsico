'use client';

import { Fragment } from 'react';

import ProviderAuth from './auth';
import ProviderFetch from './fetch';

import CookiesAccepts from '@/components/cookies';
import { Toaster } from '@/components/ui/toaster';

export default function Providers({
  children,
  cookiesAccepts,
}: Readonly<{
  cookiesAccepts: boolean;
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <ProviderAuth>
        <ProviderFetch>{children}</ProviderFetch>
      </ProviderAuth>
      <Toaster />
      <CookiesAccepts cookies={cookiesAccepts} />
    </Fragment>
  );
}
