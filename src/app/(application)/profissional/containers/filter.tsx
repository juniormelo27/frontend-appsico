'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MultiSelect from '@/components/ui/multi-select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import masked from '@/libraries/masked';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  LucideCheck,
  LucideChevronsUpDown,
  LucideFilter,
  Trash,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({
  search: z.string().min(3, 'Mínimo 3 caracteres').optional(),
  specialties: z.array(z.string().ulid()).optional(),
  approach: z.array(z.string().ulid()).optional(),
  service: z.array(z.string().ulid()).optional(),
  address: z
    .object({
      state: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
});

type Type = z.infer<typeof Schema>;

const specialties = [
  {
    id: 'fsdfsdfd',
    name: 'fdsfdsfd sfds f dsf',
  },
  {
    id: 'sdfdsf',
    name: 'sfdfds',
  },
];

const services = [
  {
    id: 'fsdfsdfd',
    name: 'fdsfdsfd sfds f dsf',
  },
  {
    id: 'sdfdsf',
    name: 'sfdfds',
  },
];

const states = [
  {
    id: 'fdsfdsfdsf',
    name: 'fdsfdsfdsfdsfdsfs',
  },
];

const approach = [
  {
    id: 'fsdfsdfd',
    name: 'fdsfdsfd sfds f dsf',
  },
  {
    id: 'sdfdsf',
    name: 'sfdfds',
  },
];

const cities = [
  {
    id: 'fdsfdsfdsf',
    name: 'fdsfdsfdsfdsfdsfs',
  },
];

export default function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [openState, setOpenState] = useState<boolean>(false);
  const [openCity, setOpenCity] = useState<boolean>(false);

  const form = useForm<Type>({
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(Schema),
    defaultValues: {
      search: undefined,
      specialties: undefined,
      approach: undefined,
      service: undefined,
      address: undefined,
    },
  });

  const errorForm = useMemo(() => {
    let error = false;

    if (!Schema.safeParse(form.watch()).success) {
      error = true;
    }

    const formEmpty =
      !form.watch('search') &&
      !form.watch('specialties') &&
      !form.watch('approach') &&
      !form.watch('service') &&
      (!form.watch('address') ||
        (!form.watch('address.state') && !form.watch('address.city')));

    if (formEmpty) {
      error = true;
    }

    return error;
  }, [form.watch()]);

  function mutate() {
    const search = form.getValues('search');

    const searchParams = new URLSearchParams(params);

    if (search) {
      searchParams.delete('cursor');
      searchParams.set('search', search);
    }

    const url = `${pathname}?${searchParams.toString()}`;

    return router.push(url);
  }

  function clear() {
    return (window.location.href = pathname);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => mutate())}
        className='bg-white dark:bg-gray-950 overflow-hidden p-6 space-y-8 sticky max-md:relative top-20 max-md:top-0 left-0 self-start'
      >
        <div className='flex flex-row items-center justify-between gap-4'>
          <h1 className='text-2xl font-bold -mb-6'>Filtros:</h1>
          {!!params.size && (
            <Button size='icon' type='button' onClick={clear} className='w-6 h-6'>
              <Trash className='w-3 h-3' />
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name='search'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pesquisa por nome:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Pesquisar por nome do profissional'
                  onChange={(value) =>
                    field.onChange(masked.name(value.target.value))
                  }
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='specialties'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especialidades:</FormLabel>
              <FormControl>
                <MultiSelect
                  {...field}
                  placeholder='Especialidades'
                  onValueChange={(value) => field.onChange(value)}
                  options={specialties.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='service'
          render={() => (
            <FormItem>
              <FormLabel className='mb-1'>Tipo de atendimento:</FormLabel>
              {services.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='service'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field?.value || []),
                                    item.id,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='approach'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Abordagem:</FormLabel>
              <FormControl>
                <MultiSelect
                  {...field}
                  placeholder='Abordagem'
                  onValueChange={(value) => field.onChange(value)}
                  options={approach.map((item) => ({
                    value: item.id,
                    label: item.name,
                  }))}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div>
          <div className='flex items-center justify-between mb-1'>
            <Label className='text-base'>Localização</Label>
          </div>
          <div className='space-y-2'>
            <FormField
              control={form.control}
              name='address.state'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel htmlFor='state'>Estado:</FormLabel>
                  <FormControl>
                    <Popover open={openState} onOpenChange={setOpenState}>
                      <PopoverTrigger asChild>
                        <Button
                          variant='outline'
                          className='w-full justify-between font-normal text-gray-500 pl-3'
                        >
                          Pesquisar Estado...
                          <LucideChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align='start' className='w-[300px] p-0'>
                        <Command>
                          <CommandInput placeholder='Pesquisar Estado...' />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum Estado encontrado.
                            </CommandEmpty>
                            <CommandGroup>
                              {states?.map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.id}
                                  onSelect={(current) => {
                                    field.onChange(
                                      current === field.value
                                        ? undefined
                                        : current
                                    );

                                    setOpenState(false);
                                  }}
                                >
                                  {field.value === item.id && (
                                    <LucideCheck className='mr-2 h-4 w-4' />
                                  )}
                                  {item.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                </FormItem>
              )}
            />
            {form.watch('address.state') && (
              <FormField
                control={form.control}
                name='address.city'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel htmlFor='city'>Cidade:</FormLabel>
                    <FormControl>
                      <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full justify-between font-normal text-gray-500 pl-3'
                          >
                            Pesquisar cidade...
                            <LucideChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent align='start' className='w-[300px] p-0'>
                          <Command>
                            <CommandInput placeholder='Pesquisar cidade...' />
                            <CommandList>
                              <CommandEmpty>
                                Nenhuma cidade encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {cities?.map((item) => (
                                  <CommandItem
                                    key={item.id}
                                    value={item.id}
                                    onSelect={(current) => {
                                      field.onChange(
                                        current === field.value
                                          ? undefined
                                          : current
                                      );

                                      setOpenState(false);
                                    }}
                                  >
                                    {field.value === item.id && (
                                      <LucideCheck className='mr-2 h-4 w-4' />
                                    )}
                                    {item.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
        <Button type='submit' size='sm' disabled={errorForm} className='w-full'>
          Filtrar <LucideFilter className='w-4 h-4 ml-2' />
        </Button>
      </form>
    </Form>
  );
}
