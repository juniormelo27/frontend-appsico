'use client';

import SchemaLogin, { Login } from '@/@types/schema/auth/login';
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
import { useAuthLogin } from '@/libraries/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideUser2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function FormLogin() {
  const router = useRouter();
  const { toast, dismiss } = useToast();

  const form = useForm<Login>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const validate = !SchemaLogin.safeParse(form.watch()).success;

  const { mutate, isPending } = useAuthLogin();

  function login(value: Login) {
    dismiss('fetch-auth-login');

    mutate(value, {
      onSuccess() {
        return (window.location.href = '/');
      },
      onError(error) {
        return toast({
          itemID: 'fetch-auth-login',
          title: (error.message || 'Falha ao acessar').toUpperCase(),
          description: '',
          variant: 'destructive',
        });
      },
    });
  }

  return (
    <div className='h-full flex flex-col items-center justify-between py-10 max-md:pb-10 max-md:pt-0'>
      <div />
      <Card className='w-full h-fit border-0 shadow-none'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            Bem vindo de volta!
          </CardTitle>
          <CardDescription>Por favor, insira suas credenciais</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              className='space-y-4'
              onSubmit={form.handleSubmit((value) => login(value))}
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail:</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex flex-row items-center justify-between'>
                <div className='flex items-center space-x-2'>
                  <Checkbox id='remember' />
                  <label
                    htmlFor='remember'
                    className='text-xs font-normal cursor-pointer leading-none'
                  >
                    Lembrar senha
                  </label>
                </div>
                <Link
                  href='/esqueceu-a-senha'
                  className='text-xs text-primary hover:underline'
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Button
                type='submit'
                disabled={validate}
                className='w-full'
                isLoading={isPending}
                textloading='Acessando'
              >
                Entrar
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
            className='flex flex-row items-center justify-center w-full group'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 48 48'
              width='480px'
              height='480px'
              className='w-6 h-6 opacity-80'
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
            <span className='font-normal text-slate-500 group-hover:text-black ml-3'>
              Acessar com Google
            </span>
          </Button>
        </div>
        <CardFooter className='justify-center flex flex-col space-y-4'>
          <Label className='font-normal'>
            Não tem uma conta?{' '}
            <Link href='/cadastrar' className='text-primary underline'>
              Registre-se
            </Link>
          </Label>
        </CardFooter>
      </Card>
      <Label className='font-normal items-center justify-center'>
        <span className='flex flex-row items-center justify-center gap-2'>
          Sou Profissional <LucideUser2 className='w-4 h-4' />
        </span>
        <br />
        <Button size='sm' className='h-7 px-10'>
          <Link href='/cadastrar/?type=professional' className='text-white'>
            Registre-se
          </Link>
        </Button>
      </Label>
    </div>
  );
}
