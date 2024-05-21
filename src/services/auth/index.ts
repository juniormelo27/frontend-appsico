import SchemaLogin from '@/@types/schema/auth/login';
import { NextAuthOptions } from 'next-auth';
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

        const response = await http('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message, {
            cause: data.description,
          });
        }

        return {
          id: data.id,
          sub: data.id,
          name: data.name,
          email: data.email,
          image: data.image,
          role: data.role,
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
