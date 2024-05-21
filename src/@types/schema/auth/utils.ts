import validated from '@/libraries/validate';
import { z } from 'zod';

export type ErrorPassword =
  | 'empty'
  | 'small'
  | 'uppercase'
  | 'lowercase'
  | 'numeric'
  | 'special';

export const SchemaEmail = z
  .string({
    errorMap: () => ({
      message: 'Preencha o campo',
    }),
  })
  .trim()
  .email('E-mail inválido').toLowerCase();

export const SchemaPassword = z
  .string({
    errorMap: () => ({
      message: 'Preencha a senha',
    }),
  })
  .refine(
    (value) => validated.password(value).score >= 100,
    (value) => {
      return {
        message: validated.translatePassword(
          validated.password(value).message[0] as ErrorPassword
        ),
      };
    }
  )
  .transform((value) => value.trim());
