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
  PopoverValue,
} from '@/components/ui/popover';
import {
  useProfessionalsApproach,
  useProfessionalsCities,
  useProfessionalsServices,
  useProfessionalsSpecialties,
  useProfessionalsStates,
} from '@/libraries/hooks/useProfessional';
import masked from '@/libraries/masked';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideCheck, LucideFilter, Trash } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Schema = z.object({
  search: z.string().min(3, 'Mínimo 3 caracteres').or(z.literal('')).optional(),
  specialties: z.array(z.string().ulid()).optional(),
  approach: z.array(z.string().ulid()).optional(),
  services: z.array(z.string()).optional(),
  address: z
    .object({
      state: z.string().optional(),
      city: z.string().optional(),
    })
    .optional(),
});

type Type = z.infer<typeof Schema>;

const states = [
  {
    id: 'fdsfdsfdsf',
    name: 'fdsfdsfdsfdsfdsfs',
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
      search: '',
      specialties: undefined,
      approach: undefined,
      services: undefined,
      address: undefined,
    },
  });
  const values = form.watch();

  const specialties = useProfessionalsSpecialties();
  const approach = useProfessionalsApproach();
  const services = useProfessionalsServices();

  const states = useProfessionalsStates();
  const cities = useProfessionalsCities(values.address?.state);

  const errorForm = useMemo(() => {
    let error = false;

    if (!Schema.safeParse(values).success) {
      error = true;
    }

    const formEmpty =
      !values.search?.length &&
      !values.specialties?.length &&
      !values.approach?.length &&
      !values.services?.length &&
      (!values.address ||
        (values.address && !values.address.state && !values.address.city));

    if (formEmpty) {
      error = true;
    }

    if (formEmpty && !!params.size) {
      error = false;
    }

    return error;
  }, [values, params]);

  function mutate() {
    const search = form.getValues('search');
    const specialties = form.getValues('specialties');
    const approach = form.getValues('approach');
    const services = form.getValues('services');
    const state = form.getValues('address.state');
    const city = form.getValues('address.city');

    const searchParams = new URLSearchParams(params);

    searchParams.delete('cursor');

    if (!!search?.length) {
      searchParams.set('search', search);
    } else {
      searchParams.delete('search');
    }

    if (!!specialties?.length) {
      searchParams.delete('specialties');

      for (const item of specialties) {
        searchParams.append('specialties', item);
      }
    } else {
      searchParams.delete('specialties');
    }

    if (!!approach?.length) {
      searchParams.delete('approach');

      for (const item of approach) {
        searchParams.append('approach', item);
      }
    } else {
      searchParams.delete('approach');
    }

    if (!!services?.length) {
      searchParams.delete('services');

      for (const item of services) {
        searchParams.append('services', item);
      }
    } else {
      searchParams.delete('services');
    }

    if (!!state) {
      searchParams.set('state', state);
    } else {
      searchParams.delete('state');
    }

    if (!!city) {
      searchParams.set('city', city);
    } else {
      searchParams.delete('city');
    }

    const url = `${pathname}?${searchParams.toString()}`;

    return router.push(url);
  }

  function clear() {
    return router.push(pathname);
  }

  useEffect(() => {
    const search = params.get('search');

    const specialties = params.getAll('specialties');
    const approach = params.getAll('approach');
    const services = params.getAll('services');

    const state = params.get('state');
    const city = params.get('city');

    if (!!search) {
      form.setValue('search', search);
    } else {
      form.setValue('search', '');
    }

    if (!!specialties.length) {
      form.setValue('specialties', specialties);
    } else {
      form.setValue('specialties', []);
    }
    if (!!approach.length) {
      form.setValue('approach', approach);
    } else {
      form.setValue('approach', []);
    }
    if (!!services.length) {
      form.setValue('services', services);
    } else {
      form.setValue('services', []);
    }

    if (!!state) {
      form.setValue('address.state', state);
    } else {
      form.setValue('address.state', '');
    }
    if (!!city) {
      form.setValue('address.city', city);
    } else {
      form.setValue('address.city', '');
    }
  }, [form, params]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() => mutate())}
        className='bg-white dark:bg-gray-950 p-6 space-y-8 max-md:relative'
      >
        <div className='flex flex-row items-center justify-between gap-4'>
          <h1 className='text-2xl font-bold -mb-6'>Filtros:</h1>
          {!!params.size && (
            <Button
              size='icon'
              type='button'
              onClick={clear}
              className='w-6 h-6'
            >
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
                  defaultValue={field.value}
                  placeholder='Especialidades'
                  onValueChange={(value) => field.onChange(value)}
                  options={specialties.data?.map((item) => ({
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
          name='services'
          render={() => (
            <FormItem>
              <FormLabel className='mb-1'>Tipo de atendimento:</FormLabel>
              {services.data?.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name='services'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([
                                    ...(field?.value || []),
                                    item,
                                  ])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal capitalize cursor-pointer'>
                          {item === 'social' && 'Social'}
                          {item === 'covenant' && 'Convênio'}
                          {item === 'private' && 'Particular'}
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
                  defaultValue={field.value}
                  placeholder='Abordagem'
                  onValueChange={(value) => field.onChange(value)}
                  options={approach.data?.map((item) => ({
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
                        <PopoverValue placeholder='Pesquisar Estado' />
                      </PopoverTrigger>
                      <PopoverContent align='start' className='w-[300px] p-0'>
                        <Command>
                          <CommandInput placeholder='Pesquisar Estado...' />
                          <CommandList>
                            <CommandEmpty>
                              Nenhum Estado encontrado.
                            </CommandEmpty>
                            <CommandGroup>
                              {states.data?.map((item) => (
                                <CommandItem
                                  key={item}
                                  value={item}
                                  onSelect={(current) => {
                                    field.onChange(
                                      current === field.value
                                        ? undefined
                                        : current
                                    );
                                    
                                    form.setValue('address.city', '')

                                    setOpenState(false);
                                  }}
                                  className='capitalize'
                                >
                                  {field.value === item && (
                                    <LucideCheck className='mr-2 h-4 w-4' />
                                  )}
                                  {item}
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
            {values.address?.state && (
              <FormField
                control={form.control}
                name='address.city'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel htmlFor='city'>Cidade:</FormLabel>
                    <FormControl>
                      <Popover open={openCity} onOpenChange={setOpenCity}>
                        <PopoverTrigger asChild>
                          <PopoverValue placeholder='Pesquisar cidade' />
                        </PopoverTrigger>
                        <PopoverContent align='start' className='w-[300px] p-0'>
                          <Command>
                            <CommandInput placeholder='Pesquisar cidade...' />
                            <CommandList>
                              <CommandEmpty>
                                Nenhuma cidade encontrado.
                              </CommandEmpty>
                              <CommandGroup>
                                {cities.data?.map((item) => (
                                  <CommandItem
                                    key={item}
                                    value={item}
                                    onSelect={(current) => {
                                      field.onChange(
                                        current === field.value
                                          ? undefined
                                          : current
                                      );

                                      setOpenCity(false);
                                    }}
                                    className='capitalize'
                                  >
                                    {field.value === item && (
                                      <LucideCheck className='mr-2 h-4 w-4' />
                                    )}
                                    {item}
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
