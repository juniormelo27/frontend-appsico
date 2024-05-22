'use client';

import { Button } from '@/components/ui/button';
import http from '@/services/fetch';
import { useMutation } from '@tanstack/react-query';
import { LucideMessageSquare } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ButtonChat({ id }: { id: string }) {
  const router = useRouter();
  const session = useSession();

  const { mutate, isPending } = useMutation<{
    id: string;
  }>({
    mutationFn: async () => {
      const response = await http<{
        id: string;
      }>(`/conversations/verify/${id}/${session.data?.user.id}`, {
        method: 'POST',
      });

      return response;
    },
    onSuccess({ id }) {
      return router.push(`/chat/${id}`);
    },
  });

  return (
    <Button
      className='uppercase w-60 text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150'
      type='button'
      onClick={() => mutate()}
      isLoading={isPending}
      disabled={isPending}
      textloading='direcionando'
    >
      Conversar <LucideMessageSquare className='w-4 h-4 ml-3' />
    </Button>
  );
}
