import { z } from 'zod';

import { SchemaName, SchemaPhone, SchemaRegisterProfession } from '../utils';
import { SchemaEmail, SchemaPassword } from './utils';

const SchemaRegister = z
  .object({
    type: z.enum(['patient', 'professional']),
    name: SchemaName,
    email: SchemaEmail,
    password: SchemaPassword,
    password_confirm: SchemaPassword,
    phone: SchemaPhone,
    registration: SchemaRegisterProfession.optional(),
  })
  .refine((value) => value.password === value.password_confirm, {
    message: 'Senha não confere',
    path: ['password_confirm'],
  })
  .refine(
    (value) =>
      value.type === 'patient'
        ? true
        : value.type === 'professional' && value.registration,
    {
      message: 'Preencha o seu registro',
    }
  );
export type Register = z.infer<typeof SchemaRegister>;

export default SchemaRegister;
