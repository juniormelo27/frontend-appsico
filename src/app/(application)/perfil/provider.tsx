'use client';

import React, { createContext, useContext } from 'react';

import { ProfessionalResponse } from './layout';

//@ts-ignore
const ProfileContext = createContext<ProfessionalResponse>();

export default function ProviderProfile({
  children,
  data,
}: Readonly<{
  children: React.ReactNode;
  data: ProfessionalResponse;
}>) {
  return (
    <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>
  );
}

export const useProfileContext = () => useContext(ProfileContext);
