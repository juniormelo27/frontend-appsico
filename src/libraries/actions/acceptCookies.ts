'use server';

import { cookies } from 'next/headers';

export default async function acceptCookies() {
  cookies().set('cookies-accepts', 'true');
}
