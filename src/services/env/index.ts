import SchemaEnvironment, { Environment } from '@/@types/schema/environment';

const environment = SchemaEnvironment.parse({
  auth: {
    secret: process.env.AUTH_SECRET,
  },
} as Environment);
export default environment;
