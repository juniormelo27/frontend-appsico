'use client';

import { Button } from '@/components/ui/button';
import { LucideArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export default function NotFoundScreen() {
  const pathname = usePathname();

  const url = useMemo(() => {
    if (pathname.startsWith('/chat')) {
      return '/chat';
    }

    return '/';
  }, [pathname]);

  return (
    <main className='grid h-screen place-content-center bg-white px-4'>
      <div className='text-center'>
        <h1 className='text-9xl font-black text-gray-200'>404</h1>
        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Opsss!
        </p>
        <p className='mt-4 text-gray-500'>Página não encontrada.</p>
        <Link href={url} className='mt-6 block'>
          <Button size='lg'>
            <LucideArrowLeft className='w-4 h-4 mr-2' />
            Voltar ao ínicio
          </Button>
        </Link>
      </div>
    </main>
  );
}
