import http from '@/services/fetch';
import { useQuery } from '@tanstack/react-query';

export type RequestFindManyProfessionals = {
  cursor?: string;
  limit: number;
  search?: string;
  validated?: boolean;
  specialties?: Array<string>;
  approach?: Array<string>;
  service?: Array<string>;
  address?: {
    state?: string;
    city?: string;
  };
};

type ResponseFindManyProfessionals = {
  next?: string;
  previous?: string;
  data: Array<{
    id: string;
    type: 'patient' | 'professional';
    name: string;
    image: string;
    profile?: {
      bio: string;
      approach: Array<{
        id: string;
        name: string;
      }>;
      specialties: Array<{
        id: string;
        name: string;
      }>;
      service: Array<string>;
    };
  }>;
  total: number;
};

export const useProfessionals = (
  props: RequestFindManyProfessionals = {
    limit: 30,
  }
) =>
  useQuery<ResponseFindManyProfessionals>({
    queryKey: ['professional', props],
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();

      if (props.cursor) {
        searchParams.set('cursor', props.cursor);
      }
      if (props.limit) {
        searchParams.set('limit', props.limit.toString());
      }
      if (!!props.search?.length) {
        searchParams.set('search', props.search);
      }
      if (props.validated) {
        searchParams.set('validated', String(props.validated));
      }
      if (props.specialties) {
        for (const item of props.specialties) {
          searchParams.append('specialties', item);
        }
      }
      if (props.approach) {
        for (const item of props.approach) {
          searchParams.append('approach', item);
        }
      }
      if (props.service) {
        for (const item of props.service) {
          searchParams.append('service', item);
        }
      }

      const response = await http<ResponseFindManyProfessionals>(
        '/professionals/?' + searchParams.toString(),
        {
          signal,
          method: 'GET',
        }
      );

      return response;
    },
  });

export const useProfessionalsSpecialties = () =>
  useQuery<
    Array<{
      id: string;
      name: string;
    }>
  >({
    queryKey: ['professionals', 'specialties'],
    queryFn: async ({ signal }) => {
      const response = await http<
        Array<{
          id: string;
          name: string;
        }>
      >('/professionals/specialties', {
        signal,
        method: 'GET',
      });

      return response;
    },
  });

export const useProfessionalsApproach = () =>
  useQuery<
    Array<{
      id: string;
      name: string;
    }>
  >({
    queryKey: ['professionals', 'approach'],
    queryFn: async ({ signal }) => {
      const response = await http<
        Array<{
          id: string;
          name: string;
        }>
      >('/professionals/approach', {
        signal,
        method: 'GET',
      });

      return response;
    },
  });

export const useProfessionalsServices = () =>
  useQuery<Array<string>>({
    queryKey: ['professionals', 'services'],
    queryFn: async ({ signal }) => {
      const response = await http<Array<string>>('/professionals/services', {
        signal,
        method: 'GET',
      });

      return response;
    },
  });

export const useProfessionalsStates = () =>
  useQuery<Array<string>>({
    queryKey: ['professionals', 'address', 'states'],
    queryFn: async ({ signal }) => {
      const response = await http<Array<string>>('/professionals/states', {
        signal,
        method: 'GET',
      });

      return response;
    },
  });

export const useProfessionalsCities = (state?: string) =>
  useQuery<Array<string>>({
    queryKey: ['professionals', 'address', state, 'cities'],
    queryFn: async ({ signal }) => {
      const response = await http<Array<string>>(
        `/professionals/states/${state}`,
        {
          signal,
          method: 'GET',
          next: {
            revalidate: 3600,
          },
        }
      );

      return response;
    },
    enabled: !!state ? true : false,
  });
