import { z } from 'zod';

import { SchemaEmail, SchemaPassword } from './utils';

const SchemaLogin = z.object({
  email: SchemaEmail,
  password: SchemaPassword,
});
export type Login = z.infer<typeof SchemaLogin>;
export default SchemaLogin;

export const SchemaForgotPassword = z.object({
  email: SchemaEmail,
});
export type ForgotPassword = z.infer<typeof SchemaForgotPassword>;
