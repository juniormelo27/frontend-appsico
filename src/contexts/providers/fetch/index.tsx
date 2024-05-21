import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '@/services/fetch';

export default function ProviderFetch({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
