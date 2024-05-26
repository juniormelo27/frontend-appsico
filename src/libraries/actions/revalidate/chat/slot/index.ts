'use server';

import { revalidateTag } from 'next/cache';

export async function revalidateSlotConversations() {
  revalidateTag(`conversation.slots`);
}
