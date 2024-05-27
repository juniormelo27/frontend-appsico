import http from '@/services/fetch';
import { useMutation, useQuery } from '@tanstack/react-query';

export type RequestFindManyProfessionals = {
  cursor?: string;
  limit: number;
  search?: string;
  validated?: boolean;
  specialties?: Array<string>;
  approach?: Array<string>;
  services?: Array<string>;
  address?: {
    state?: string;
    city?: string;
  };
  exacts?: Array<string>;
  removes?: Array<string>;
};

export type ResponseFindManyProfessionals = {
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
  data: RequestFindManyProfessionals = {
    limit: 30,
  },
  props: {
    enabled?: boolean;
  } = {
    enabled: true,
  }
) =>
  useQuery<ResponseFindManyProfessionals>({
    queryKey: ['professional', data],
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();

      if (data.cursor) {
        searchParams.set('cursor', data.cursor);
      }
      if (data.limit) {
        searchParams.set('limit', data.limit.toString());
      }
      if (!!data.search?.length) {
        searchParams.set('search', data.search);
      }
      if (data.validated) {
        searchParams.set('validated', String(data.validated));
      }

      if (!!data.specialties?.length) {
        for (const item of data.specialties) {
          searchParams.append('specialties', item);
        }
      }
      if (!!data.approach?.length) {
        for (const item of data.approach) {
          searchParams.append('approach', item);
        }
      }
      if (!!data.services?.length) {
        for (const item of data.services) {
          searchParams.append('services', item);
        }
      }

      if (data.address?.state) {
        searchParams.set('state', data.address.state);
      }
      if (data.address?.city) {
        searchParams.set('city', data.address.city);
      }

      if (!!data.exacts?.length) {
        for (const item of data.exacts) {
          searchParams.append('exacts', item);
        }
      }
      if (!!data.removes?.length) {
        for (const item of data.removes) {
          searchParams.append('removes', item);
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
    enabled: props.enabled,
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

export const useProfessionalsConversationVerify = () =>
  useMutation<
    {
      id: string;
    },
    Error,
    {
      id: string;
      session: string;
    }
  >({
    mutationFn: async ({ id, session }) => {
      const response = await http<{
        id: string;
      }>(`/conversations/verify`, {
        method: 'POST',
        body: JSON.stringify([id, session]),
      });

      return response;
    },
  });

export const useProfessionalsFollowAndUnfollow = () =>
  useMutation<
    {
      message: string;
    },
    Error,
    {
      id: string;
      user: string;
      action: 'follow' | 'unfollow';
    }
  >({
    mutationFn: async ({ id, user, action }) => {
      const response = await http<{
        message: string;
      }>(`/professionals/${id}/social/${action}`, {
        method: 'PATCH',
        body: JSON.stringify({
          user,
        }),
      });

      return response;
    },
  });
