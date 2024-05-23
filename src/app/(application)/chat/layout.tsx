import authOptions from '@/services/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React, { Fragment } from 'react';

export default async function LayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  return <Fragment>{children}</Fragment>;
}
