import masked from '@/libraries/masked';
import validated from '@/libraries/validate';
import { z } from 'zod';

export const SchemaName = z
  .string({
    errorMap: () => ({ message: 'Campo inválido' }),
  })
  .min(3, {
    message: 'Mínimo 3 caracteres',
  })
  .refine((value) => value.split(' ').filter((e) => !!e).length >= 2, {
    message: 'Informe o nome completo',
  })
  .refine((value) => value.split(' ')?.[1]?.length > 3, {
    message: 'Informe o sobrenome completo',
  })
  .transform((value) =>
    value.trimStart().trimEnd().replaceAll('  ', '').toLowerCase()
  );

export const SchemaPhone = z
  .string({
    errorMap: () => ({
      message: 'Preencha o campo',
    }),
  })
  .refine(validated.phone, {
    message: 'Celular inválido',
  })
  .transform((value) => '55' + masked.number(value));

export const SchemaRegistrationPerson = z
  .string({
    errorMap: () => ({
      message: 'Informe o CPF',
    }),
  })
  .refine(validated.cpf, {
    message: 'CPF inválido',
  })
  .transform((value) => masked.number(value));

export const SchemaRegistrationBusiness = z
  .string({
    errorMap: () => ({
      message: 'Informe o CNPJ',
    }),
  })
  .refine(validated.cnpj, {
    message: 'CNPJ inválido',
  })
  .transform((value) => masked.number(value));

export const SchemaRegistration = z
  .string({
    errorMap: () => ({
      message: 'Informe o documento',
    }),
  })
  .min(1, {
    message: 'Informe o documento',
  })
  .refine((value) => validated.cpf(value) || validated.cnpj(value), {
    message: 'Documento inválido',
  })
  .transform((value) => masked.number(value));

export const SchemaRegisterProfession = z
  .string({
    errorMap: () => ({ message: 'Campo inválido' }),
  })
  .min(1, {
    message: 'Preencha o campo',
  })
  .refine((value) => masked.number(value).length === 8, {
    message: 'CRP incompleto',
  })
  .transform((value) => masked.number(value));
