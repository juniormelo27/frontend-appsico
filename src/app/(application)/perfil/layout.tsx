import authOptions from '@/services/auth';
import http from '@/services/fetch';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

import ProviderProfile from './provider';

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
    service: Array<'private' | 'social' | 'covenant'>;
  };
  address: {
    display_name: string;
    street: string;
    number: number;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    state_code: string;
    country: string;
    country_code: string;
    zip_code: string;
    latitude: number;
    longitude: number;
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
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/');
  }

  const data = await http<ProfessionalResponse>(`/users/${session.user.id}`, {
    method: 'GET',
  });

  if (!data) {
    redirect('/profissionais');
  }

  return (
    <main>
      <ProviderProfile data={data}>{children}</ProviderProfile>
    </main>
  );
}
