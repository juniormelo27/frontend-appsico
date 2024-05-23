'use client';

import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  TypeMessage as TypeMessageSend,
  useConversationMessages,
} from '@/libraries/hooks/useConversations';
import { cn } from '@/libraries/utils';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import WALLPAPER from '@/public/images/wallpaper-whatsapp-background.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, LucideSendHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { Virtuoso } from 'react-virtuoso';
import { z } from 'zod';

const SchemaMessage = z.object({
  message: z.string().min(1),
});
type TypeMessage = z.infer<typeof SchemaMessage>;

const urlWs =
  process.env.NODE_ENV === 'production'
    ? 'wss://apiappsico.segwise.com.br/chat/'
    : 'ws://localhost:3001/chat/';

export default function ChatScreen() {
  const params = useParams<{
    id: string;
  }>();

  const [connect, setConnect] = useState<boolean | null>(null);
  const socket = useMemo(() => new WebSocket(urlWs + params.id), [params.id]);

  const session = useSession().data?.user.id;
  const chat = useRef<any>(null);

  const [timeNextPage, setTimeNextPage] = useState<boolean>(false);

  const messages = useConversationMessages(params.id, {
    limit: 100,
  });
  const [messagesList, setMessageList] = useState<
    Array<
      TypeMessageSend & {
        message: string;
      }
    >
  >([]);

  const form = useForm<TypeMessage>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaMessage),
    defaultValues: {
      message: '',
    },
  });
  const validate = !SchemaMessage.safeParse(form.watch()).success;

  const sendMessage = useCallback(() => {
    socket.send(
      JSON.stringify({
        id: params.id,
        type: 'text',
        sender: session,
        content: form.getValues('message'),
      } as TypeMessageSend & {
        sender: string;
      })
    );

    chat.current.scrollToIndex(messagesList.length);

    form.reset();
  }, [socket, params.id, session, form, messagesList.length]);

  function connectUser() {
    setConnect(true);
  }

  function disconnectUser() {
    setConnect(false);
  }

  useEffect(() => {
    if (socket) {
      socket.addEventListener('open', connectUser);
      socket.addEventListener('error', disconnectUser);
      socket.addEventListener('message', (event: any) => {
        const data = JSON.parse(event.data) as TypeMessageSend & {
          message: string;
          created_at: string;
        };

        console.log(chat.current)
        console.log(chat.current.autoscrollToBottom())

        setMessageList((e) => [
          ...e,
          {
            ...data,
            content: data.message,
            created_at: new Date(data.created_at),
          },
        ]);
      });
    }

    return () => {
      socket.close();
    };
  }, [socket]);

  useEffect(() => {
    //@ts-ignore
    setMessageList((e) => [...messages.data, ...e]);
  }, [messages.data]);

  useEffect(() => {
    setTimeout(() => {
      setTimeNextPage(true);
    }, 500);
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-between relative overflow-hidden'>
      <Image
        src={WALLPAPER}
        alt='wallpaper'
        className='w-full h-full invert opacity-5 object-cover absolute z-0'
      />
      {connect === null && (
        <Badge className='bg-gray-400 uppercase border-b rounded-none z-10 text-center items-center justify-center'>
          <span className='flex flex-row items-center justify-center gap-2'>
            conectando <Loader2Icon className='w-3 h-3 animate-spin' />
          </span>
        </Badge>
      )}
      {connect === false && (
        <Badge className='bg-red-400 uppercase border-b rounded-none z-10 text-center items-center justify-center'>
          <span className='flex flex-row items-center justify-center gap-2'>
            desconectado
          </span>
        </Badge>
      )}
      {!!messagesList.length && (
        <Virtuoso
          ref={chat}
          atTopThreshold={500}
          atTopStateChange={(value) => {
            if (value && messages.hasNextPage) {
              if (timeNextPage) {
                messages.fetchNextPage();
              }
            }
          }}
          initialTopMostItemIndex={messagesList.length - 1}
          totalCount={messagesList.length}
          className='flex flex-col z-10 justify-end items-end w-full h-full mb-20'
          data={messagesList}
          components={{
            Header: () => (
              <Fragment>
                {messages.isFetchingNextPage && (
                  <div className='items-center justify-center self-center flex mt-4 mb-6'>
                    <Button
                      variant='outline'
                      className='mx-auto z-10 items-center justify-center w-40 rounded-full border-slate-300'
                      isLoading
                      disabled
                      onClick={() => messages.fetchNextPage()}
                    >
                      Carregando
                    </Button>
                  </div>
                )}
              </Fragment>
            ),
          }}
          itemContent={(index, data) => (
            <div
              className={cn(
                'mx-6',
                index === messages.data.length - 1 && 'pb-4',
                index === 0 && !messages.hasNextPage && 'pt-10'
              )}
            >
              <Message key={data.id} data={data} session={session} />
            </div>
          )}
        />
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((value) => {})}
          className='py-5 px-6 z-10 flex flex-row items-center justify-between gap-4 fixed bg-white bottom-0 border-t w-[calc(100vw_-_25vw)]'
        >
          <FormField
            control={form.control}
            name='message'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input {...field} disabled={!connect} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            size='icon'
            type='submit'
            disabled={!connect || validate}
            onClick={sendMessage}
          >
            <LucideSendHorizontal className='w-4 h-4' />
          </Button>
        </form>
      </Form>
    </div>
  );
}

function Message({
  data,
  session,
}: {
  data: TypeMessageSend;
  session?: string;
}) {
  if (!session) return;

  if (data.sender.id === session) {
    return (
      <div className='flex justify-end mb-4'>
        <div className='flex flex-col items-end justify-end'>
          <div className='mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white max-w-96'>
            {data.content}
          </div>
          <span className='block text-right text-xs mt-1 pr-2'>
            {new Intl.DateTimeFormat('pt-BR', {
              dateStyle: 'short',
            }).format(data.created_at)}{' '}
            ás{' '}
            {new Intl.DateTimeFormat('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(data.created_at)}
          </span>
        </div>
        <Image
          src={data.sender.image || PLACEHOLDER}
          className='object-cover h-8 w-8 rounded-full'
          alt=''
          width={52}
          height={52}
        />
      </div>
    );
  }

  return (
    <div className='flex justify-start mb-4'>
      <Image
        src={data.sender.image || PLACEHOLDER}
        className='object-cover h-8 w-8 rounded-full'
        alt=''
        width={52}
        height={52}
      />
      <div className='items-start justify-start'>
        <div className='ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'>
          {data.content}
        </div>
        <span className='block text-right text-xs mt-1 pl-2'>
          {new Intl.DateTimeFormat('pt-BR', {
            dateStyle: 'short',
          }).format(data.created_at)}{' '}
          ás{' '}
          {new Intl.DateTimeFormat('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }).format(data.created_at)}
        </span>
      </div>
    </div>
  );
}
