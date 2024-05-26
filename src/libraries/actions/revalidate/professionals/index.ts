'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateProfessionalProfileById(id: string) {
  revalidateTag(`professional.${id}`);
}
