'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import WALLPAPER from '@/public/images/wallpaper-whatsapp-background.png';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideSendHorizontal } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SchemaMessage = z.object({
  message: z.string().min(1),
});
type TypeMessage = z.infer<typeof SchemaMessage>;

const SchemaSend = z.object({
  id: z.string().ulid(),
  type: z.enum(['text', 'image', 'video']),
  sender: z.string().ulid(),
  message: z.string(),
});
type TypeSend = z.infer<typeof SchemaSend>;

const SchemaReceiver = z.object({
  id: z.string().ulid(),
  type: z.enum(['text', 'image', 'video']),
  sender: z.object({
    id: z.string().ulid(),
    name: z.string(),
    image: z.string(),
  }),
  message: z.string(),
  created_at: z.coerce.date(),
});
type TypeReceiver = z.infer<typeof SchemaReceiver>;

const socket = new WebSocket('ws://localhost:3001/chats');

export default function ChatScreen() {
  const params = useParams<{
    id: string;
  }>();

  const session = useSession().data?.user.id;
  const [messages, setMessage] = useState<TypeReceiver[]>([]);

  const { toast } = useToast();

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

  function sendMessage() {
    socket.send(
      JSON.stringify({
        id: params.id,
        type: 'text',
        sender: session,
        message: form.getValues('message'),
      } as TypeSend)
    );

    form.reset();
  }

  useEffect(() => {
    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data) as TypeReceiver;
      setMessage((e) => [
        {
          id: data.id,
          type: data.type,
          sender: {
            id: data.sender.id,
            image: data.sender.image,
            name: data.sender.name,
          },
          message: data.message,
          created: data.created_at,
        },
        ...e,
      ]);
    });

    socket.addEventListener('error', () => {
      toast({
        title: 'Falha na conexão'.toUpperCase(),
        variant: 'destructive',
      });
    });

    return () => {};
  }, []);

  return (
    <div className='w-full h-full flex flex-col justify-between relative overflow-hidden'>
      <Image
        src={WALLPAPER}
        alt='wallpaper'
        className='w-full h-full invert opacity-5 object-cover absolute z-0'
      />
      <div className='flex flex-col mt-5 z-10 pb-32 px-5'>
        {messages.map((item) => (
          <Message key={item.id} data={item} session={session} />
        ))}
      </div>
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
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button size='icon' disabled={validate} onClick={sendMessage}>
            <LucideSendHorizontal className='w-4 h-4' />
          </Button>
        </form>
      </Form>
    </div>
  );
}

function Message({ data, session }: { data: Type; session?: string }) {
  if (!session) return;

  if (data.sender.id === session) {
    return (
      <div className='flex justify-end mb-4'>
        <div className='mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white'>
          {data.message}
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
      <div className='ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white'>
        {data.message}
      </div>
    </div>
  );
}
