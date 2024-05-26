'use client';

import { Button } from '@/components/ui/button';
import { revalidateProfessionalProfileById } from '@/libraries/actions/revalidate/professionals';
import { useProfessionalsFollowAndUnfollow } from '@/libraries/hooks/useProfessional';
import { LucidePlus, LucideX } from 'lucide-react';
import { useSession } from 'next-auth/react';

export default function ButtonFollowAndUnfollow({
  id,
  subscriber,
}: {
  id: string;
  subscriber: boolean;
}) {
  const session = useSession();

  const { mutateAsync, isPending } = useProfessionalsFollowAndUnfollow();

  return (
    <Button
      size='sm'
      variant={subscriber ? 'outline' : 'default'}
      className='absolute top-0 right-16 h-7 text-xs z-10'
      onClick={() =>
        mutateAsync({
          id,
          user: session.data?.user.id!,
          action: subscriber ? 'unfollow' : 'follow',
        }).then(() => revalidateProfessionalProfileById(id))
      }
      isLoading={isPending}
      disabled={isPending}
      textloading={subscriber ? 'Deixando de seguir' : 'Seguindo'}
    >
      {!subscriber ? 'Seguir' : 'Deixar de seguir'}
      {!subscriber && <LucidePlus className='w-4 h-4 ml-2' />}
      {subscriber && <LucideX className='w-4 h-4 ml-2' />}
    </Button>
  );
}
