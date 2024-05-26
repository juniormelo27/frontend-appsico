'use client';

import { Button } from '@/components/ui/button';
import {
  PaginationContent,
  PaginationItem,
  Pagination as PaginationUI,
} from '@/components/ui/pagination';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  LucideChevronLeft,
  LucideChevronRight,
  LucideLayoutGrid,
  LucideList,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { memo } from 'react';

function PaginationComponent({
  next,
  previous,
}: Partial<{
  next: string;
  previous: string;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const current = params.get('cursor');

  function previousPage() {
    const searchParams = new URLSearchParams(params);

    if (previous) {
      searchParams.set('cursor', previous);
    } else {
      searchParams.delete('cursor');
    }

    const url = `${pathname}?${searchParams.toString()}`;

    return router.push(url);
  }

  function nextPage() {
    const searchParams = new URLSearchParams(params);

    if (next) {
      searchParams.set('cursor', next);
    }

    const url = `${pathname}?${searchParams.toString()}`;

    return router.push(url);
  }

  if (!next && !previous) {
    return;
  }

  return (
    <PaginationUI>
      <PaginationContent>
        <PaginationItem>
          <Button
            variant='ghost'
            onClick={previousPage}
            disabled={!previous || current === previous}
          >
            <LucideChevronLeft className='w-4 h-4 mr-2' /> Anterior
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button
            variant='ghost'
            onClick={nextPage}
            disabled={!next || current === next}
          >
            Próximo
            <LucideChevronRight className='w-4 h-4 ml-2' />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </PaginationUI>
  );
}

const Pagination = memo(PaginationComponent);
export default Pagination;

export function TabGrid() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const type = params.get('viewed');

  function onChange() {
    const searchParams = new URLSearchParams(params);

    searchParams.set(
      'viewed',
      !type ? 'list' : type === 'grid' ? 'list' : 'grid'
    );

    const url = `${pathname}?${searchParams.toString()}`;

    return router.push(url);
  }

  return (
    <Tabs
      value={!type ? 'grid' : type === 'list' ? 'list' : 'grid'}
      onClick={onChange}
    >
      <TabsList className='h-9 text-slate-400'>
        <TabsTrigger value='grid' className='h-7 text-sm gap-x-1 px-2'>
          <LucideLayoutGrid className='w-4 h-4' /> Grade
        </TabsTrigger>
        <TabsTrigger value='list' className='h-7 text-sm gap-x-1 px-2'>
          <LucideList className='w-4 h-4' /> Lista
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
