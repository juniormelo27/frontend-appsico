import authOptions from '@/services/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import Listining from './components/listining/page';

export type ResponseConversation = {
  id: string;
  users: Array<{
    id: string;
    name: string;
    image?: string;
  }>;
  message: {
    id: string;
    type: 'text' | 'image' | 'video';
    content: string;
    created_at: Date;
  };
  created_at: Date;
};

export default async function LayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }
  return (
    <div className='grid grid-cols-[25vw_auto] bg-white flex-1'>
      <Listining />
      <div className='border-l-2 h-[100vh_-_5rem]'>
        <div className='w-full h-full relative overflow-hidden'>{children}</div>
      </div>
    </div>
  );
}
