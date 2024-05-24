'use client';

import Image from 'next/image';
import { ProfessionalResponse } from '../page';

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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  useProfessionalsApproach,
  useProfessionalsSpecialties,
} from '@/libraries/hooks/useProfessional';
import masked from '@/libraries/masked';
import PLACEHOLDER from '@/public/images/placeholder.jpeg';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogClose } from '@radix-ui/react-dialog';
import { LucideEdit, LucidePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const ShemaUpdate = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  profile: z.object({
    bio: z.string(),
    specialties: z.array(z.string()),
    approach: z.array(z.string()),
    service: z.array(z.enum(['private', 'social', 'covenant'])),
  }),
  address: z.object({
    street: z.string(),
    number: z.coerce.number(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    state_code: z.string(),
    country: z.string(),
    country_code: z.string(),
  }),
  email: z.string(),
  phone: z.string(),
});
type TypeUpdate = z.infer<typeof ShemaUpdate>;

const SchemaInsertSpecialties = z.object({
  id: z.string().ulid(),
});
type TypeInsertSpecialties = z.infer<typeof SchemaInsertSpecialties>;

const SchemaInsertApproach = z.object({
  id: z.string().ulid(),
});
type TypeInsertApproach = z.infer<typeof SchemaInsertApproach>;

export default function FormUpdateUser({
  data,
}: {
  data: ProfessionalResponse;
}) {
  const form = useForm<TypeUpdate>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(ShemaUpdate),
    defaultValues: {
      id: data.id,
      name: data.name,
      image: data.image,
      profile: {
        bio: data.profile.bio,
        specialties: data.profile.specialties.flatMap((item) => item.id),
        approach: data.profile.approach.flatMap((item) => item.id),
      },
      address: {
        street: data.address.street,
        number: data.address.number,
        complement: data.address.complement,
        neighborhood: data.address.neighborhood,
        city: data.address.city,
        state: data.address.state,
        state_code: data.address.state_code,
        country: data.address.country,
        country_code: data.address.country_code,
      },
      email: data.email,
      phone: data.phone,
    },
  });
  const values = form.watch();

  const formInsertSpecialties = useForm<TypeInsertSpecialties>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaInsertSpecialties),
    defaultValues: {
      id: undefined,
    },
  });

  const formInsertApproach = useForm<TypeInsertApproach>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(SchemaInsertApproach),
    defaultValues: {
      id: undefined,
    },
  });

  const specialties = useProfessionalsSpecialties();
  const approach = useProfessionalsApproach();

  return (
    <Form {...form}>
      <section className='relative '>
        <div className='relative flex flex-col min-w-0 break-words border bg-white w-full border-b-0 rounded-lg'>
          <div className='px-6 grid grid-cols-[35vw_auto] max-md:grid-cols-1'>
            <div className='flex-1 w-full border-r max-md:border-r-0 max-md:border-b py-10'>
              <div className='flex flex-wrap justify-center'>
                <div className='w-full px-4 lg:order-2 flex justify-center relative'>
                  <div className='relative items-center justify-center text-center self-center flex'>
                    <Image
                      src={data.image || PLACEHOLDER}
                      width={1280}
                      height={1280}
                      alt='image'
                      className='z-10 w-56 h-56 rounded-full'
                    />
                  </div>
                </div>
              </div>
              <div className='text-center mt-6'>
                <div className='flex justify-center'>
                  {/* <div className='flex justify-center'>
                  <div className='lg:mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                      {data._count.followers}
                    </span>
                    <span className='text-sm text-blueGray-400'>
                      Seguidores
                    </span>
                  </div>
                </div> */}
                  {/* <div className='flex justify-center'>
                  <div className='lg:mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                      {data._count.followers}
                    </span>
                    <span className='text-sm text-blueGray-400'>Seguindo</span>
                  </div>
                </div> */}
                  <div className='lg:mr-4 p-3 text-center'>
                    <span className='text-xl font-bold block uppercase tracking-wide text-blueGray-600'>
                      {data._count.connections}
                    </span>
                    <span className='text-sm text-blueGray-400'>Conexões</span>
                  </div>
                </div>
                <center>
                  <h3 className='text-4xl font-semibold leading-normal text-blueGray-700 mb-2 mt-4 truncate mx-auto px-8 text-center items-center justify-center'>
                    {masked.name(data.name)}
                  </h3>
                </center>
                <div className='pl-16 pr-20'>
                  <div className='text-sm leading-normal mt-4 mb-2 text-blueGray-400 font-bold uppercase'>
                    <FormField
                      control={form.control}
                      name='address.city'
                      render={({ field }) => (
                        <FormItem className='flex flex-col items-center justify-start'>
                          <FormLabel>Cidade de atividade:</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value='fsdfds'>
                                  São Paulo - SP
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <ButtonChat id={id} /> */}
                  <div className='text-sm leading-normal mt-4 mb-2 text-blueGray-400 font-bold uppercase'>
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem className='flex flex-col items-center justify-start'>
                          <FormLabel>E-mail:</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className='mb-2 text-blueGray-600 mt-10 capitalize flex flex-col'>
                  <span className='text-base font-semibold'>Contato</span>
                  <span className='text-gray-500 text-sm lowercase'>
                    {masked.phone(data.phone.slice(2))}
                  </span>
                </div> */}
                  <div className='text-sm leading-normal mt-4 mb-2 text-blueGray-400 font-bold uppercase'>
                    <FormField
                      control={form.control}
                      name='profile.service'
                      render={({ field }) => (
                        <FormItem className='flex flex-col items-center justify-start'>
                          <FormLabel>Tipo de Atendimento:</FormLabel>
                          <FormControl>
                            <Select {...field}>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem>
                                  Tipo de serviço, Tipo de serviço
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='p-10 space-y-6'>
              <div className='flex flex-row items-center justify-end'>
                <Button>
                  Atualizar informações
                  <LucideEdit className='w-4 h-4 ml-2' />
                </Button>
              </div>
              <div>
                <span className='text-base font-semibold'>Biografia:</span>
                <Textarea className='min-h-60' />
              </div>
              <div>
                <div className='flex flex-row items-center justify-between mb-3'>
                  <span className='text-base font-semibold'>
                    Especialidades:
                  </span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size='sm' variant='outline'>
                        Adicionar <LucidePlus className='w-4 h-4 ml-2' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar nova especialidade</DialogTitle>
                        <DialogDescription>
                          fdsf dsf dsf ds fds f dsf
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...formInsertSpecialties}>
                        <FormField
                          control={formInsertSpecialties.control}
                          name='id'
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent {...field}>
                                    {specialties.data?.map((item) => (
                                      <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </Form>
                      <DialogFooter>
                        <DialogClose>
                          <Button variant='destructive'>fechar</Button>
                        </DialogClose>
                        <Button>adicionar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className='space-y-3'>
                  {/* {!values.profile.specialties.length && (
                    <Badge>Nenhuma especialidade</Badge>
                  )} */}
                  {[...values.profile.specialties, 'Nome da especialidade', 'Nome da especialidade', 'Nome da especialidade'].map((item) => (
                    <div
                      key={item}
                      className='rounded-md border px-4 py-3 font-mono text-sm'
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className='flex flex-row items-center justify-between mb-3'>
                  <span className='text-base font-semibold'>Abordagem:</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size='sm' variant='outline'>
                        Adicionar <LucidePlus className='w-4 h-4 ml-2' />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar nova abordagem</DialogTitle>
                        <DialogDescription>
                          fdsf dsf dsf ds fds f dsf
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...formInsertApproach}>
                        <FormField
                          control={formInsertApproach.control}
                          name='id'
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent {...field}>
                                    {approach.data?.map((item) => (
                                      <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </Form>
                      <DialogFooter>
                        <DialogClose>
                          <Button variant='destructive'>fechar</Button>
                        </DialogClose>
                        <Button>adicionar</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className='space-y-3'>
                  {/* {!values.profile.approach.length && (
                    <Badge>Nenhuma abordagem</Badge>
                  )} */}
                  {[...values.profile.approach, 'Nome da abordagem', 'Nome da abordagem', 'Nome da abordagem'].map((item) => (
                    <div
                      key={item}
                      className='rounded-md border px-4 py-3 font-mono text-sm'
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Form>
  );
}
