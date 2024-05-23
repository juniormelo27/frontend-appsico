import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'patient' | 'professional';
    } & DefaultSession['user'];
  }

  interface User {
    role: 'patient' | 'professional';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: 'patient' | 'professional';
  }
}
