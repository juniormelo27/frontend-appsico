import { z } from 'zod';

import { SchemaAddress, SchemaPhone } from './../utils';
import { SchemaEmail } from './utils';

export const SchemaProfileUpdate = z.object({
  email: SchemaEmail,
  phone: SchemaPhone,
  profile: z.object({
    bio: z
      .string({
        errorMap: () => ({ message: 'Campo inválido' }),
      })
      .min(100, 'Mínimo 100 caracteres')
      .max(1000, 'Mínimo 1000 caracteres'),
    specialties: z.array(z.string()).min(1, 'Informe ao menos 1 especialidade'),
    approach: z.array(z.string()).min(1, 'Informe ao menos 1 abordagem'),
    service: z
      .array(z.enum(['private', 'social', 'covenant']))
      .min(1, 'Informe ao menos 1 tipo serviço'),
  }),
  address: SchemaAddress,
});
export type TypeProfileUpdate = z.infer<typeof SchemaProfileUpdate>;
