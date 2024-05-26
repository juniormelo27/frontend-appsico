'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import Filter from './containers/filter';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  RequestFindManyProfessionals,
  useProfessionals,
} from '@/libraries/hooks/useProfessional';
import masked from '@/libraries/masked';
import { cn, transformSearchParamsToArray } from '@/libraries/utils';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import { useSession } from 'next-auth/react';
import Pagination, { TabGrid } from './containers/pagination';

const LIMIT = 24;

export default function ProfessionalScreen(props: {
  searchParams: RequestFindManyProfessionals & {
    viewed?: 'grid' | 'list';
    state?: string;
    city?: string;
  };
}) {
  const session = useSession();

  const { data, isPending, error, refetch } = useProfessionals(
    {
      ...props.searchParams,
      address:
        props.searchParams.state || props.searchParams.city
          ? {
              state: props.searchParams.state,
              city: props.searchParams.city,
            }
          : undefined,
      specialties: transformSearchParamsToArray(props.searchParams.specialties),
      approach: transformSearchParamsToArray(props.searchParams.approach),
      services: transformSearchParamsToArray(props.searchParams.services),
      removes: transformSearchParamsToArray(session.data?.user.id),
      limit: LIMIT,
      validated: true,
    },
    {
      enabled: !!session.data?.user.id,
    }
  );

  return (
    <main className='grid grid-cols-[25vw_auto] max-md:grid-cols-1 relative overflow-visible'>
      <Filter />
      <div className='border-l'>
        <div className='p-6 pb-0 flex flex-row items-center justify-between gap-10'>
          <div>
            <h1 className='font-bold text-2xl'>Resultados</h1>
            {isPending && (
              <div className='w-40 h-5 bg-slate-200 rounded animate-pulse mt-1' />
            )}
            {!!data && (
              <span className='text-gray-500 text-sm font-normal'>
                Registros: {data.total}
              </span>
            )}
          </div>
          <div className='max-md:hidden'>
            <TabGrid />
          </div>
        </div>
        <div
          className={cn(
            'grid grid-cols-4 max-md:grid-cols-1 gap-6 p-6',
            props.searchParams.viewed === 'list' && 'grid-cols-1'
          )}
        >
          {error ? (
            <Card className='col-span-full'>
              <CardHeader>
                <CardTitle>Falha ao encontrar registros</CardTitle>
                <CardDescription>
                  Recarregue a página novamente para uma nova tentativa de
                  encontrar registros
                </CardDescription>
                <CardContent className='p-0'>
                  <Button
                    type='button'
                    onClick={() => refetch()}
                    className='mt-2'
                  >
                    Recarregar página
                  </Button>
                </CardContent>
              </CardHeader>
            </Card>
          ) : isPending ? (
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className='bg-slate-100 animate-pulse w-full h-80 rounded-lg border overflow-hidden dark:bg-gray-950'
              ></div>
            ))
          ) : data.data.length === 0 ? (
            <Card className='col-span-full'>
              <CardHeader>
                <CardTitle>Nenhum registro encontrado</CardTitle>
                <CardDescription>
                  Desculpe por não atender como imaginava. Estaremos trabalhando
                  para lhe proporcionar o máximo de conteúdo em pouco tempo.
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            data.data.map((item) => (
              <div
                key={item.id}
                className='bg-white rounded-lg h-full border overflow-hidden dark:bg-gray-950'
              >
                <div
                  className={cn(
                    'relative group overflow-hidden',
                    props.searchParams.viewed === 'list' &&
                      'grid grid-cols-[30vw_auto]'
                  )}
                >
                  <Link
                    className='absolute inset-0 z-10'
                    href={`/profissional/${item.id}`}
                  >
                    <span className='sr-only'>Ver perfil</span>
                  </Link>
                  <Image
                    alt={item.name}
                    className={cn(
                      'object-cover w-full h-48 aspect-[400/300]',
                      props.searchParams.viewed === 'list' && 'h-full'
                    )}
                    src={item.image || PLACEHOLDER}
                    width={400}
                    height={300}
                    placeholder='blur'
                    blurDataURL={PLACEHOLDER.blurDataURL}
                  />
                  <div className='p-4 flex flex-col h-full justify-between'>
                    <div className='flex-1'>
                      <h3 className='text-base font-semibold truncate'>
                        {masked.name(item.name)}
                      </h3>
                      {!!item.profile?.approach.length && (
                        <p className='text-gray-500 text-sm truncate'>
                          {item.profile?.approach
                            .flatMap((item) => item.name)
                            .slice(0, 3)
                            .join(', ')}
                        </p>
                      )}
                      <Separator className='my-3' />
                      {item.profile?.bio && (
                        <p className='text-gray-500 text-sm font-normal'>
                          {item.profile?.bio.slice(
                            0,
                            props.searchParams.viewed === 'list' ? 400 : 40
                          ) + '...'}
                        </p>
                      )}
                    </div>
                    <Button className='mt-4 w-full' size='sm'>
                      Ver mais
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
          <div className='col-span-full flex items-center justify-center mx-auto'>
            <Pagination previous={data?.previous} next={data?.next} />
          </div>
        </div>
      </div>
    </main>
  );
}
