import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'client' | 'professional';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'client' | 'professional';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'client' | 'professional';
  }
}
