'use client';

import { Button } from '@/components/ui/button';
import { revalidateProfessionalProfileById } from '@/libraries/actions/revalidate/professionals';
import { useProfessionalsFollowAndUnfollow } from '@/libraries/hooks/useProfessional';
import { LucidePlus, LucideX } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function ButtonFollowAndUnfollow({
  id,
  subscriber,
}: {
  id: string;
  subscriber: boolean;
}) {
  const session = useSession();
  const [current, setCurrent] = useState<boolean>(subscriber);

  const { mutateAsync, isPending } = useProfessionalsFollowAndUnfollow();

  return (
    <Button
      size='sm'
      variant={current ? 'outline' : 'default'}
      className='absolute top-0 right-16 h-7 text-xs z-10'
      onClick={() =>
        mutateAsync(
          {
            id,
            user: session.data?.user.id!,
            action: current ? 'unfollow' : 'follow',
          },
          {
            onSuccess(_, variables) {
              setCurrent(variables.action === 'follow');
            },
          }
        ).then(() => revalidateProfessionalProfileById(id))
      }
      isLoading={isPending}
      disabled={isPending}
      textloading={current ? 'Deixando de seguir' : 'Seguindo'}
    >
      {!current ? 'Seguir' : 'Deixar de seguir'}
      {!current && <LucidePlus className='w-4 h-4 ml-2' />}
      {current && <LucideX className='w-4 h-4 ml-2' />}
    </Button>
  );
}
