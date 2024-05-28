import masked from '@/libraries/masked';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import authOptions from '@/services/auth';
import http from '@/services/fetch';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { ResponseConversation } from '../../layout';

export default async function Listining() {
  const session = (await getServerSession(authOptions))!;

  const slots = await http<{
    data: Array<string>;
  }>(`/conversations/slots/${session.user.id}/`, {
    method: 'GET',
    next: {
      tags: ['conversation.slots'],
    },
  });

  const conversations = await Promise.all(
    slots.data.map((item) =>
      http<ResponseConversation>(
        `/conversations/slots/${session.user.id}/${item}`,
        {
          method: 'GET',
          next: {
            tags: [`conversation.slots.${item}`],
          },
        }
      ).then((response) => ({
        ...response,
        message: {
          ...response.message,
          created_at: new Date(response.message.created_at),
        },
        created_at: new Date(response.created_at),
      }))
    )
  );

  return (
    <div className='flex flex-col overflow-y-auto sticky self-start top-20 left-0 w-full'>
      {conversations
        .sort(
          (a, b) =>
            //@ts-ignore
            new Date(b.message.created_at) - new Date(a.message.created_at)
        )
        .map((item) => (
          <Link
            key={item.id}
            className='flex flex-row px-2 items-center border-b-2 truncate h-[calc(4rem_+_0.05rem)]'
            href={`/chat/${item.id}`}
            replace
          >
            <div className='mr-3'>
              {item.users
                .filter((e) => e.id !== session.user.id)
                .map((item) => (
                  <Image
                    key={item.id}
                    src={item.image || PLACEHOLDER.src}
                    width={512}
                    height={512}
                    placeholder='blur'
                    blurDataURL={PLACEHOLDER.blurDataURL}
                    className='w-10 h-10 rounded'
                    alt=''
                  />
                ))}
            </div>
            <div className='w-full relative truncate py-4 flex-1'>
              <span className='text-xs text-[0.65rem] text-gray-500 font-light absolute top-1 right-0'>
                {new Intl.DateTimeFormat('pt-BR', {
                  dateStyle: 'short',
                }).format(item.message.created_at)}{' '}
                ás{' '}
                {new Intl.DateTimeFormat('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit',
                }).format(item.message.created_at)}
              </span>
              <div className='leading-none truncate'>
                <div className='text-sm font-semibold leading-none w-40 truncate'>
                  {item.users
                    .filter((e) => e.id !== session.user.id)
                    .flatMap((item) => masked.name(item.name))
                    .join(', ')}
                </div>
                <span className='text-gray-500 truncate text-sm leading-none'>
                  {item.message.content}
                </span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
