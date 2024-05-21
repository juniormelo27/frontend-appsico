'use client';

import { cn } from '@/libraries/utils';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

export default function StickyScroll({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [sticky, setSticky] = useState<boolean>(false);

  const isSticky = useCallback(() => {
    if (pathname !== '/') {
      return setSticky(true);
    }

    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 250;

    setSticky(stickyClass);
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      return setSticky(true);
    }

    setSticky(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', isSticky);

    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, [isSticky]);

  return (
    <div
      className={cn(
        'w-full sticky top-0 z-50 bg-white transition-all px-24',
        sticky ? 'shadow' : '',
        pathname.startsWith('/chat') && 'px-4'
      )}
    >
      {children}
    </div>
  );
}
