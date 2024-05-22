import { LucideUserRoundSearch } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import authOptions from '@/services/auth';
import http from '@/services/fetch';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const conversations: Array<{
  id: string;
  users: Array<{
    id: string;
    name: string;
    image?: string | null;
  }>;
  message: string;
  updatedAt: Date;
}> = [
  {
    id: 'fdsfdsfdsfdsf',
    users: [
      {
        id: 'fdsfdsfds',
        name: 'fdsfdsf',
      },
    ],
    message:
      'fsdfdsfdsfdsfds fsdfds fdsf dsf dsf ds ffsd fds fsd fsd fsd fs df sdf ',
    updatedAt: new Date(),
  },
];

export default async function LayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const slots = await http<{
    data: Array<string>;
  }>(`/conversations/slots/${session.user.id}`, {
    method: 'GET',
  });

  const conversations = await Promise.all(
    slots.data.map((item) =>
      http<{
        id: string;
        users: Array<{
          id: string;
          name: string;
          image?: string;
        }>;
        messages: {
          id: string;
          type: 'text' | 'image' | 'video';
          content: string;
          created_at: Date;
        };
        created_at: Date;
      }>(`/conversations/slots/${session.user.id}/${item}`, {
        method: 'GET',
        next: {
          tags: ['conversation', item, 'slot'],
        },
      }).then((response) => ({
        ...response,
        created_at: new Date(response.created_at),
      }))
    )
  );

  return (
    <div className='grid grid-cols-[25vw_auto] bg-white flex-1'>
      <div className='flex flex-col overflow-y-auto sticky self-start top-20 left-0'>
        <div className='border-b-2 py-4 px-4 flex flex-row items-center gap-0 w-full'>
          <Button
            size='icon'
            variant='ghost'
            className='border rounded-r-none border-r-0'
          >
            <LucideUserRoundSearch className='w-5 h-5' />
          </Button>
          <Input
            placeholder='Pesquisar conversa'
            className='w-full rounded-l-none'
          />
        </div>
        {conversations.map((item) => (
          <Link
            key={item.id}
            className='flex flex-row px-2 items-center border-b-2 truncate'
            href={`/chat/${item.id}`}
            replace
          >
            <div className='mr-3'>
              {item.users
                .filter((e) => e.id !== session.user.id)
                .map((item) => (
                  <Avatar key={item.id} className='rounded'>
                    <AvatarImage src={item.image || PLACEHOLDER.src} />
                    <AvatarFallback>{item.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
            </div>
            <div className='w-full relative truncate py-4'>
              <span className='text-xs text-[0.4rem] text-gray-500 font-light absolute top-2 right-0'>
                {new Intl.DateTimeFormat('pt-BR', {
                  dateStyle: 'short',
                }).format(item.created_at)}{' '}
                ás{' '}
                {new Intl.DateTimeFormat('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(item.created_at)}
              </span>
              <div className='text-lg font-semibold'>
                {item.users
                  .filter((e) => e.id !== session.user.id)
                  .flatMap((item) => item.name)
                  .join(', ')}
              </div>
              <span className='text-gray-500 truncate text-sm'>
                {item.messages.content}
              </span>
            </div>
          </Link>
        ))}
      </div>
      <div className='border-l-2'>{children}</div>
    </div>
  );
}
