import { Fragment } from 'react';

import http from '@/services/fetch';
import { redirect } from 'next/navigation';

export default async function LayoutRoot({
  children,
  params: { id },
}: Readonly<{
  children: React.ReactNode;
  params: {
    id: string;
  };
}>) {
  const session = await http<{
    empty: boolean;
  }>('/conversations/empty/' + id, {
    cache: 'no-cache',
  });

  if (session.empty) return redirect('/chat');

  return <Fragment>{children}</Fragment>;
}
