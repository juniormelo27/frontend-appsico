'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidateSlotConversations() {
  revalidateTag(`conversation.slots`);
}
