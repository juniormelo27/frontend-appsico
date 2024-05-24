import authOptions from '@/services/auth';
import http from '@/services/fetch';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import FormUpdateUser from './form';

export type ProfessionalResponse = {
  id: string;
  name: string;
  image?: string;
  profile: {
    bio: string;
    specialties: Array<{
      id: string;
      name: string;
    }>;
    approach: Array<{
      id: string;
      name: string;
    }>;
    service: Array<string>;
  };
  address: {
    street: string;
    number: number;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    state_code: string;
    country: string;
    country_code: string;
  };
  email: string;
  phone: string;
  _count: {
    followers: number;
    following: number;
    connections: number;
  };
};

export default async function ProfessionalDetailsScreen({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const data = await http<ProfessionalResponse>(
    `/professionals/${session.user.id}`,
    {
      method: 'GET',
      next: {
        revalidate: 300,
      },
    }
  );

  if (!data) {
    redirect('/profissionais');
  }
  return (
    <main>
      <FormUpdateUser data={data} />
    </main>
  );
}
