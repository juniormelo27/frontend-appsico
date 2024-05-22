import SchemaLogin from '@/@types/schema/auth/login';
import { NextAuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import environment from '../env';
import http from '../fetch';

const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {
          type: 'text',
          label: 'E-mail',
          placeholder: 'Preencha seu e-mail',
        },
        password: {
          type: 'password',
          label: 'Senha',
          placeholder: 'Preencha sua senha',
        },
      },
      async authorize(credentials) {
        const { email, password } = SchemaLogin.parse(credentials);

        const response = await http<User>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        });

        return {
          id: response.id,
          sub: response.id,
          name: response.name,
          email: response.email,
          image: response.image,
          role: response.role,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;

      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.sub!;

      return session;
    },
  },
  secret: environment.auth.secret,
};

export default authOptions;
