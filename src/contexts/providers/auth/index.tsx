import { SessionProvider } from 'next-auth/react';

export default function ProviderAuth({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}
