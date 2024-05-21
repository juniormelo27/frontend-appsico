'use client';

import {
  ForgotPassword,
  SchemaForgotPassword,
} from '@/@types/schema/auth/login';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { useToast } from '@/components/ui/use-toast';
import { useAuthForgot } from '@/libraries/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

export default function FormForgotPassword() {
  const router = useRouter();
  const { toast, dismiss } = useToast();

  const form = useForm<ForgotPassword>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaForgotPassword),
    defaultValues: {
      email: '',
    },
  });
  const validate = !SchemaForgotPassword.safeParse(form.watch()).success;

  const { mutate, isPending } = useAuthForgot();

  function forgot(value: ForgotPassword) {
    dismiss('fetch-auth-forgot-password');

    mutate(value, {
      onSuccess(data) {
        toast({
          title: (
            data.message || 'Recuperação enviada com sucesso'
          ).toUpperCase(),
        });

        return router.push('/acessar');
      },
      onError(error) {
        return toast({
          itemID: 'fetch-auth-forgot-password',
          title: (error.message || 'Falha ao enviar e-mail').toUpperCase(),
          variant: 'destructive',
        });
      },
    });
  }

  return (
    <Card className='w-full h-fit border-0 shadow-none'>
      <CardHeader>
        <CardTitle className='text-3xl font-bold'>
          Recuperação de senha
        </CardTitle>
        <CardDescription>
          Por favor, insira seu email para recuperação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className='space-y-4'
            onSubmit={form.handleSubmit((value) => forgot(value))}
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
            <Button
              type='submit'
              disabled={validate}
              className='w-full'
              isLoading={isPending}
              textloading='Enviando e-mail'
            >
              Recuperar senha
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className='justify-center flex flex-col space-y-4'>
        <Label className='font-normal'>
          Lembreu minha senha.
          <Link href='/acessar' className='text-primary underline ml-1'>
            Fazer login
          </Link>
        </Label>
      </CardFooter>
    </Card>
  );
}
