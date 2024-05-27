import { z } from 'zod';

import { SchemaAddress, SchemaPhone } from './../utils';
import { SchemaEmail } from './utils';

export const SchemaProfileUpdate = z
  .object({
    type: z.enum(['patient', 'professional']),
    email: SchemaEmail,
    phone: SchemaPhone,
    profile: z.object({
      bio: z
        .string({
          errorMap: () => ({ message: 'Campo inválido' }),
        })
        .min(100, 'Mínimo 100 caracteres')
        .max(1000, 'Mínimo 1000 caracteres'),
      specialties: z.array(z.string()),
      approach: z.array(z.string()),
      service: z.array(z.enum(['private', 'social', 'covenant'])),
    }),
    address: SchemaAddress,
  })
  .superRefine((values, ctx) => {
    if (values.type === 'professional') {
      if (values.profile.specialties.length <= 0) {
        ctx.addIssue({
          fatal: true,
          path: ['profile', 'specialties'],
          code: 'custom',
          message: 'Informe ao menos 1 especialidade',
        });
      }

      if (values.profile.approach.length <= 0) {
        ctx.addIssue({
          fatal: true,
          path: ['profile', 'approach'],
          code: 'custom',
          message: 'Informe ao menos 1 abordagem',
        });
      }

      if (values.profile.service.length <= 0) {
        ctx.addIssue({
          fatal: true,
          path: ['profile', 'service'],
          code: 'custom',
          message: 'Informe ao menos 1 serviço',
        });
      }
    }

    return z.NEVER;
  });
export type TypeProfileUpdate = z.infer<typeof SchemaProfileUpdate>;
