'use client';

import Image from 'next/image';

import {
  SchemaProfileUpdate,
  TypeProfileUpdate,
} from '@/@types/schema/auth/profile';
import { SchemaPassword } from '@/@types/schema/auth/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import MultiSelect from '@/components/ui/multi-select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  useAuthUpdatePassword,
  useAuthUpdateProfile,
} from '@/libraries/hooks/useAuth';
import {
  useProfessionalsApproach,
  useProfessionalsServices,
  useProfessionalsSpecialties,
} from '@/libraries/hooks/useProfessional';
import { useSearchAddress } from '@/libraries/hooks/useUtils';
import masked from '@/libraries/masked';
import { getChangedValues } from '@/libraries/utils';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import {
  LucideEdit,
  LucideKey,
  LucideLoader2,
  LucidePlus,
  LucideX,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounceValue } from 'usehooks-ts';
import { z } from 'zod';
import { useProfileContext } from './provider';

const SchemaInsertSpecialties = z.object({
  id: z.array(z.string().ulid()).min(1),
});
type TypeInsertSpecialties = z.infer<typeof SchemaInsertSpecialties>;

const SchemaInsertApproach = z.object({
  id: z.array(z.string().ulid()).min(1),
});
type TypeInsertApproach = z.infer<typeof SchemaInsertApproach>;

export default function FormUpdateUser() {
  const data = useProfileContext();
  const { toast, dismiss } = useToast();
  const session = useSession();

  const form = useForm<TypeProfileUpdate>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaProfileUpdate),
    defaultValues: {
      type: data.type,
      email: data.email,
      phone: masked.phone(data.phone.slice(2)),
      profile: {
        bio: data.profile.bio,
        specialties:
          data.type === 'patient'
            ? []
            : data.profile.specialties?.flatMap((item) => item.id),
        approach:
          data.type === 'patient'
            ? []
            : data.profile.approach?.flatMap((item) => item.id),
        service:
          data.type === 'patient'
            ? []
            : data.profile.service?.flatMap((item) => item),
      },
      address: !!data.address.street
        ? {
            display_name: data.address.display_name,
            street: data.address.street,
            number: data.address.number,
            neighborhood: data.address.neighborhood,
            city: data.address.city,
            state: data.address.state,
            state_code: data.address.state_code,
            country: data.address.country,
            country_code: data.address.country_code,
            zip_code: data.address.zip_code,
            latitude: data.address.latitude,
            longitude: data.address.longitude,
          }
        : undefined,
    },
  });
  form.formState.defaultValues;
  const values = form.watch();
  const validate = SchemaProfileUpdate.safeParse(values).success;

  const formInsertSpecialties = useForm<TypeInsertSpecialties>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaInsertSpecialties),
    defaultValues: {
      id: [],
    },
  });

  const formInsertApproach = useForm<TypeInsertApproach>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaInsertApproach),
    defaultValues: {
      id: [],
    },
  });

  const specialties = useProfessionalsSpecialties();
  const approach = useProfessionalsApproach();
  const services = useProfessionalsServices();

  const [addressSearchText, setAddressSearchText] = useDebounceValue('', 2000);
  const address = useSearchAddress(addressSearchText);

  const { mutate, isPending } = useAuthUpdateProfile(session.data?.user.id!);
  function updated(props: TypeProfileUpdate) {
    const defaults = form.formState.defaultValues!;
    const changedValues = getChangedValues<TypeProfileUpdate>(defaults, {
      ...props,
      phone: masked.phone(props.phone.slice(2)),
    });

    const toastIds = {
      success: 'toast-profile-updated-success',
      error: 'toast-profile-updated-error',
    };
    mutate(
      {
        ...changedValues,
        //@ts-expect-error
        phone: changedValues.phone
          ? masked.number(changedValues.phone)
          : undefined,
      },
      {
        onSuccess() {
          dismiss(toastIds.error);
          toast({
            itemID: toastIds.success,
            title: 'ATUALIZADO COM SUCESSO',
            className: 'bg-green-500 text-white border-0',
            color: '#FFFFFF',
          });

          // return window.location.reload();
        },
        onError() {
          dismiss(toastIds.error);
          return toast({
            itemID: toastIds.error,
            title: 'FALHA AO ATUALIZAR O PERFIL',
            description: 'Tente novamente.',
            variant: 'destructive',
          });
        },
      }
    );
  }

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((value) => updated(value))}
          className='relative'
        >
          <div className='relative flex flex-col min-w-0 break-words border bg-white w-full border-b-0 rounded-lg'>
            <div className='px-6 grid grid-cols-[35vw_auto] max-md:grid-cols-1'>
              <div className='flex-1 w-full border-r max-md:border-r-0 max-md:border-b py-10 max-md:pb-2'>
                <div className='flex flex-wrap justify-center relative'>
                  <div className='flex flex-row items-center justify-end gap-x-2 max-md:hidden'>
                    <ModalUpdatePassword>
                      <Button
                        type='button'
                        size='sm'
                        className='mb-10 absolute top-0 left-5 z-10 h-7 text-xs'
                      >
                        Alterar senha
                        <LucideKey className='w-3 h-3 ml-2' />
                      </Button>
                    </ModalUpdatePassword>
                  </div>
                  <div className='w-full px-4 lg:order-2 flex justify-center relative'>
                    <div className='relative items-center justify-center text-center self-center flex'>
                      <Image
                        src={data.image || PLACEHOLDER}
                        width={1280}
                        height={1280}
                        className='z-10 w-56 h-56 rounded-full'
                        placeholder='blur'
                        blurDataURL={PLACEHOLDER.blurDataURL}
                        alt='image'
                      />
                    </div>
                  </div>
                </div>
                <div className='text-center mt-6'>
                  <div className='flex justify-center'>
                    <div className='flex justify-center'>
                      <div className='lg:mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                          {data._count.followers}
                        </span>
                        <span className='text-sm text-blueGray-400'>
                          Seguidores
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-center'>
                      <div className='lg:mr-4 p-3 text-center'>
                        <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                          {data._count.followers}
                        </span>
                        <span className='text-sm text-blueGray-400'>
                          Seguindo
                        </span>
                      </div>
                    </div>
                    <div className='lg:mr-4 p-3 text-center'>
                      <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                        {data._count.connections}
                      </span>
                      <span className='text-sm text-blueGray-400'>
                        Conexões
                      </span>
                    </div>
                  </div>
                  <center>
                    <h3 className='text-4xl font-semibold leading-normal text-blueGray-700 mb-2 mt-4 truncate mx-auto px-8 max-md:px-0 text-center items-center justify-center'>
                      {masked.name(data.name)}
                    </h3>
                  </center>
                  <div className='pl-16 pr-20 max-md:px-0 space-y-4'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem className='flex flex-col items-center justify-start'>
                          <FormLabel>E-mail:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={({ target: { value } }) =>
                                field.onChange(value.trim())
                              }
                              placeholder='E-mail'
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
                        <FormItem className='flex flex-col items-center justify-start'>
                          <FormLabel>Contato:</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              onChange={({ target: { value } }) =>
                                field.onChange(masked.phone(value))
                              }
                              placeholder='(00) 00000-0000'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {data.type === 'professional' && (
                      <FormField
                        control={form.control}
                        name='profile.service'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tipo de atendimento:</FormLabel>
                            <FormControl>
                              <MultiSelect
                                {...field}
                                defaultValue={field.value}
                                placeholder='Tipo de atendimento'
                                onValueChange={(value) => field.onChange(value)}
                                options={services.data?.map((item) => ({
                                  value: item,
                                  label:
                                    item === 'social'
                                      ? 'Social'
                                      : item === 'covenant'
                                      ? 'Convênio'
                                      : 'Particular',
                                }))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                    <FormField
                      control={form.control}
                      name='address.street'
                      render={({ field }) => (
                        <FormItem className='relative'>
                          <div className='flex flex-col'>
                            <FormLabel>Endereço:</FormLabel>
                            <span className='text-xs text-[0.49rem] -top-1 right-0'>
                              Informe o número do endereço
                            </span>
                          </div>
                          <div className='flex flex-row items-center justify-between gap-2 relative'>
                            <FormControl>
                              <Input
                                {...field}
                                autoCorrect='off'
                                autoComplete='off'
                                placeholder='Pesquisar endereço'
                                value={
                                  address.data?.street &&
                                  field.value === address.data.street
                                    ? address.data?.display_name
                                    : field.value !==
                                      form.formState.defaultValues?.address
                                        ?.street
                                    ? field.value
                                    : form.formState.defaultValues?.address
                                        ?.zip_code
                                    ? form.formState.defaultValues?.address
                                        ?.display_name
                                    : field.value
                                }
                                onChange={({ target: { value } }) => [
                                  field.onChange(value),
                                  setAddressSearchText(value),
                                  form.setValue('address.zip_code', ''),
                                ]}
                                className='capitalize'
                              />
                            </FormControl>
                            {address.isFetching && (
                              <LucideLoader2 className='w-4 h-4 animate-spin text-muted-foreground absolute right-4' />
                            )}
                          </div>
                          <FormMessage />
                          <Popover
                            open={
                              values.address?.zip_code
                                ? false
                                : !!addressSearchText || address.isFetching
                            }
                          >
                            <PopoverTrigger />
                            <PopoverContent
                              sideOffset={-10}
                              className='w-96 p-0'
                            >
                              {!!address.data && (
                                <div
                                  className='text-sm hover:bg-slate-100 cursor-pointer p-2 capitalize'
                                  onClick={() => {
                                    const data = address.data;

                                    form.setValue('address', {
                                      display_name: data.display_name,
                                      street: data.street,
                                      number: data.number,
                                      city: data.city,
                                      neighborhood: data.neighborhood,
                                      state: data.state,
                                      state_code: data.state_code,
                                      country: data.country,
                                      country_code: data.country_code,
                                      zip_code: data.zip_code,
                                      latitude: data.geo.latitude,
                                      longitude: data.geo.longitude,
                                    });
                                  }}
                                >
                                  {address.data.display_name}
                                </div>
                              )}
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className='p-10 space-y-6 max-md:p-0 max-md:pb-10 max-md:mt-4'>
                <FormField
                  control={form.control}
                  name='profile.bio'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className='text-base font-semibold'>
                        Biografia:
                      </FormLabel>
                      <FormControl>
                        <Textarea {...field} className='min-h-60' />
                      </FormControl>
                      <div className='flex flex-row items-center justify-between'>
                        <FormMessage />
                        <div />
                        <div className='text-xs'>
                          <span>{values.profile.bio?.length || 0} / 1000</span>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
                {data.type === 'professional' && (
                  <Fragment>
                    <div>
                      <div className='flex flex-row items-center justify-between mb-3'>
                        <div className=' leading-none'>
                          <span className='text-base font-semibold block'>
                            Especialidades:
                          </span>
                          {!values.profile.specialties?.length && (
                            <p className='block text-xs font-medium text-destructive'>
                              Minímo 1 especialidade
                            </p>
                          )}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button type='button' size='sm' variant='outline'>
                              Adicionar <LucidePlus className='w-4 h-4 ml-2' />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Adicionar novas especialidades
                              </DialogTitle>
                              <DialogDescription>
                                Informe as novas especialidades que você atual
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...formInsertSpecialties}>
                              <FormField
                                control={formInsertSpecialties.control}
                                name='id'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <MultiSelect
                                        {...field}
                                        defaultValue={field.value}
                                        placeholder='Novas especialidades'
                                        onValueChange={(value) =>
                                          field.onChange(value || [])
                                        }
                                        options={specialties.data
                                          ?.filter(
                                            (e) =>
                                              !form
                                                .watch('profile.specialties')
                                                ?.includes(e.id)
                                          )
                                          .map((item) => ({
                                            value: item.id,
                                            label: item.name,
                                          }))}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </Form>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  type='button'
                                  variant='destructive'
                                  className='uppercase'
                                >
                                  fechar
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  type='button'
                                  className='uppercase'
                                  disabled={
                                    !SchemaInsertSpecialties.safeParse(
                                      formInsertSpecialties.watch()
                                    ).success
                                  }
                                  onClick={() => {
                                    form.setValue('profile.specialties', [
                                      ...formInsertSpecialties.getValues('id'),
                                      ...form.getValues('profile.specialties'),
                                    ]);

                                    formInsertSpecialties.reset();
                                  }}
                                >
                                  adicionar{' '}
                                  <LucidePlus className='w-4 h-4 ml-2' />
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className='space-y-3'>
                        {!values.profile.specialties?.length && (
                          <Badge>Nenhuma especialidade</Badge>
                        )}
                        {values.profile.specialties?.map((item) => (
                          <div
                            key={item}
                            className='rounded-md border px-4 py-2 font-mono text-sm capitalize relative flex flex-row items-center justify-between'
                          >
                            {specialties.data?.find((e) => e.id === item)?.name}
                            <Button
                              type='button'
                              size='icon'
                              variant='outline'
                              className='w-6 h-6'
                              onClick={() =>
                                form.setValue(
                                  'profile.specialties',
                                  form
                                    .getValues('profile.specialties')
                                    .filter((e) => e !== item)
                                )
                              }
                            >
                              <LucideX className='w-4 h-4' />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className='flex flex-row items-center justify-between mb-3'>
                        <div className=' leading-none'>
                          <span className='text-base font-semibold block'>
                            Abordagem:
                          </span>
                          {!values.profile.approach?.length && (
                            <p className='block text-xs font-medium text-destructive'>
                              Minímo 1 abordagem
                            </p>
                          )}
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button type='button' size='sm' variant='outline'>
                              Adicionar <LucidePlus className='w-4 h-4 ml-2' />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                Adicionar novas abordagens
                              </DialogTitle>
                              <DialogDescription>
                                Informe as novas abordagens que você atual
                              </DialogDescription>
                            </DialogHeader>
                            <Form {...formInsertApproach}>
                              <FormField
                                control={formInsertApproach.control}
                                name='id'
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <MultiSelect
                                        {...field}
                                        defaultValue={field.value}
                                        placeholder='Novas abordagens'
                                        onValueChange={(value) =>
                                          field.onChange(value || [])
                                        }
                                        options={approach.data
                                          ?.filter(
                                            (e) =>
                                              !form
                                                .watch('profile.approach')
                                                ?.includes(e.id)
                                          )
                                          .map((item) => ({
                                            value: item.id,
                                            label: item.name,
                                          }))}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </Form>
                            <DialogFooter>
                              <DialogClose asChild>
                                <Button
                                  type='button'
                                  variant='destructive'
                                  className='uppercase'
                                >
                                  fechar
                                </Button>
                              </DialogClose>
                              <DialogClose asChild>
                                <Button
                                  type='button'
                                  className='uppercase'
                                  disabled={
                                    !SchemaInsertApproach.safeParse(
                                      formInsertApproach.watch()
                                    ).success
                                  }
                                  onClick={() => {
                                    form.setValue('profile.approach', [
                                      ...formInsertApproach.getValues('id'),
                                      ...form.getValues('profile.approach'),
                                    ]);

                                    formInsertApproach.reset();
                                  }}
                                >
                                  adicionar{' '}
                                  <LucidePlus className='w-4 h-4 ml-2' />
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className='space-y-3'>
                        {!values.profile.approach?.length && (
                          <Badge>Nenhuma abordagem</Badge>
                        )}
                        {values.profile.approach?.map((item) => (
                          <div
                            key={item}
                            className='rounded-md border px-4 py-2 font-mono text-sm capitalize relative flex flex-row items-center justify-between'
                          >
                            {approach.data?.find((e) => e.id === item)?.name}
                            <Button
                              type='button'
                              size='icon'
                              variant='outline'
                              className='w-6 h-6'
                              onClick={() =>
                                form.setValue(
                                  'profile.approach',
                                  form
                                    .getValues('profile.approach')
                                    .filter((e) => e !== item)
                                )
                              }
                            >
                              <LucideX className='w-4 h-4' />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Fragment>
                )}
                <Button
                  type='submit'
                  className='w-full'
                  isLoading={isPending}
                  textloading='ALTERANDO'
                  disabled={isPending || !validate}
                >
                  Atualizar informações
                  <LucideEdit className='w-4 h-4 ml-2' />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </main>
  );
}

function ModalUpdatePassword({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { toast, dismiss } = useToast();
  const session = useSession();
  const SchemaUpdatePassword = z
    .object({
      current_password: SchemaPassword,
      password: SchemaPassword,
      password_confirm: SchemaPassword,
    })
    .refine((value) => value.password === value.password_confirm, {
      message: 'Senha não confere',
      path: ['password_confirm'],
    });
  type TypeUpdatePassword = z.infer<typeof SchemaUpdatePassword>;

  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useAuthUpdatePassword(session.data?.user.id!);

  const form = useForm<TypeUpdatePassword>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaUpdatePassword),
    defaultValues: {
      current_password: '',
      password: '',
      password_confirm: '',
    },
  });

  const validate = SchemaUpdatePassword.safeParse(form.watch()).success;

  function updated() {
    const toastIds = {
      success: 'toast-profile-updated-password-success',
      error: 'toast-profile-updated-password-error',
    };
    mutate(
      {
        password: form.getValues('current_password'),
        newPassword: form.getValues('password_confirm'),
      },
      {
        onSuccess() {
          dismiss(toastIds.error);
          toast({
            itemID: toastIds.success,
            title: 'SENHA ATUALIZADA COM SUCESSO',
            className: 'bg-green-500 text-white border-0',
            color: '#FFFFFF',
          });

          form.reset();
          return setOpen(false);
        },
        onError(error) {
          dismiss(toastIds.error);
          return toast({
            itemID: toastIds.error,
            title: (
              error.message || 'FALHA AO ATUALIZAR A SENHA'
            ).toUpperCase(),
            description: 'Tente novamente.',
            variant: 'destructive',
          });
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar senha</DialogTitle>
          <DialogDescription>
            Faça a alteração da sua senha atual
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <Form {...form}>
          <form onSubmit={() => {}} className='space-y-4'>
            <FormField
              control={form.control}
              name='current_password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sua senha atual:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Senha atual'
                      type='password'
                      onChange={({ target: { value } }) =>
                        field.onChange(value.trim())
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
                  <FormLabel>Nova senha:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Nova senha'
                      type='password'
                      onChange={({ target: { value } }) =>
                        field.onChange(value.trim())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password_confirm'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme sua nova senha:</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Confirme sua nova senha'
                      type='password'
                      onChange={({ target: { value } }) =>
                        field.onChange(value.trim())
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <Separator />
        <DialogFooter className='gap-y-3'>
          <DialogClose asChild>
            <Button type='button' variant='destructive' className='uppercase'>
              fechar
            </Button>
          </DialogClose>
          <Button
            onClick={updated}
            disabled={!validate}
            className='uppercase'
            isLoading={isPending}
            textloading='ALTERANDO'
          >
            alterar senha <LucideKey className='w-4 h-4 ml-2' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
