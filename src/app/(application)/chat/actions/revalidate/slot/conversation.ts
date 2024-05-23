'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidateSlotByConversationById(id: string) {
  revalidateTag(`conversation.slots.${id}`);
}
