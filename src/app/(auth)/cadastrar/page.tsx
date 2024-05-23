'use client';

import { Register } from '@/@types';
import SchemaRegister from '@/@types/schema/auth/register';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { useAuthRegister } from '@/libraries/hooks/useAuth';
import masked from '@/libraries/masked';
import { cn } from '@/libraries/utils';
import validated, { errorsPassword } from '@/libraries/validate';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function FormRegister(props: {
  searchParams: { type: 'patient' | 'professional' };
}) {
  const router = useRouter();
  const { toast, dismiss } = useToast();

  const [terms, setTerms] = useState<boolean>(false);
  const [remember, setRemember] = useState<boolean>(false);
  const form = useForm<Register>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaRegister),
    defaultValues: {
      type: props.searchParams.type || 'patient',
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirm: '',
    },
  });
  const validate = !SchemaRegister.safeParse(form.watch()).success;

  const watchType = form.watch('type');
  const watchPassword = form.watch('password');

  const { mutate, isPending } = useAuthRegister();

  function register(value: Register) {
    const idToast = 'fetch-auth-register';
    dismiss(idToast);

    mutate(value, {
      onSuccess(data) {
        toast({
          title: (data.message || 'Cadastrado com sucesso').toUpperCase(),
          description: 'Foi enviado um e-mail para confirmação de conta.',
        });
        return router.push('/acessar');
      },
      onError(error) {
        return toast({
          itemID: idToast,
          title: (error.message || 'Falha ao cadastrar').toUpperCase(),
          variant: 'destructive',
        });
      },
    });
  }

  return (
    <Card className='w-full border-0 shadow-none overflow-scroll max-md:overflow-hidden h-full py-0'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>
          Faça seu cadastro{' '}
          {form.getValues('type') === 'professional' && 'profissional'}
        </CardTitle>
        <CardDescription>Informe seus dados para se registrar</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit((value) => register(value))}
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(value) =>
                        field.onChange(
                          masked.name(
                            value.target.value.replaceAll('  ', '').trimStart()
                          )
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(value) =>
                        field.onChange(value.target.value.trim())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Celular:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='tel'
                      onChange={(value) =>
                        field.onChange(masked.phone(value.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha:</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                </FormItem>
              )}
            />
            {watchPassword && (
              <ul className='text-xs'>
                {Object.keys(errorsPassword)
                  .slice(1)
                  .map((item: any) => (
                    <li
                      key={item}
                      className={cn(
                        'text-green-500',
                        validated
                          .password(watchPassword)
                          .message.includes(item) && 'text-destructive'
                      )}
                    >
                      {/* @ts-ignore */}
                      {errorsPassword[item]}
                    </li>
                  ))}
              </ul>
            )}
            <FormField
              control={form.control}
              name='password_confirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar senha:</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {watchType == 'professional' && (
              <FormField
                control={form.control}
                name='registration'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CRP:</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='tel'
                        onChange={(value) =>
                          field.onChange(masked.crp(value.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <div className='flex flex-row items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='remember'
                  checked={remember}
                  onCheckedChange={(value) => setRemember(Boolean(value))}
                />
                <label
                  htmlFor='remember'
                  className='text-xs font-normal cursor-pointer leading-none'
                >
                  Manter logado
                </label>
              </div>
            </div>
            <div className='flex flex-row items-center justify-between'>
              <div className='flex items-center space-x-2'>
                <Checkbox
                  id='terms'
                  checked={terms}
                  onCheckedChange={(value) => setTerms(Boolean(value))}
                />
                <label
                  htmlFor='terms'
                  className='text-xs font-normal cursor-pointer leading-none'
                >
                  Concordo com os{' '}
                  <Link
                    href='termos-e-condicoes'
                    className='text-primary underline font-medium'
                  >
                    Termos e Condições
                  </Link>
                </label>
              </div>
            </div>
            <Button
              type='submit'
              disabled={validate || !terms}
              className='w-full'
              isLoading={isPending}
              textloading='Cadastrando'
            >
              Cadastrar
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className='flex flex-row items-center justify-center gap-4 mx-6 mb-6'>
        <Separator className='w-full flex-1' />
        <span className='font-normal text-sm text-slate-400'>ou</span>
        <Separator className='w-full flex-1' />
      </div>
      <div className='px-6 mb-6'>
        <Button
          variant='outline'
          size='lg'
          className='flex flex-row items-center justify-center gap-6 w-full group'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 48 48'
            width='480px'
            height='480px'
            className='w-7 h-7'
          >
            <path
              fill='#FFC107'
              d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
            />
            <path
              fill='#FF3D00'
              d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
            />
            <path
              fill='#4CAF50'
              d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
            />
            <path
              fill='#1976D2'
              d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
            />
          </svg>
          <span className='font-normal text-slate-500 group-hover:text-black'>
            Registrar com Google
          </span>
        </Button>
      </div>
      <CardFooter className='justify-center'>
        <Label className='font-normal'>
          Lembrei minha senha?{' '}
          <Link href='/acessar' className='text-primary underline'>
            Fazer login
          </Link>
        </Label>
      </CardFooter>
    </Card>
  );
}
