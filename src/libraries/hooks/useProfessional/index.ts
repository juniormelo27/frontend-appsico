import http from '@/services/fetch';
import { useQuery } from '@tanstack/react-query';

export const useProfessional = (
  props: {
    cursor?: string;
    limit: number;
    search?: string;
    validated?: boolean;
    specialties?: Array<string>;
    approach?: Array<string>;
    service?: Array<string>;
  } = {
    limit: 30,
  }
) =>
  useQuery<{
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
  }>({
    queryKey: ['professional', props],
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();

      if (props.cursor) {
        searchParams.set('cursor', props.cursor);
      }
      if (props.limit) {
        searchParams.set('limit', props.limit.toString());
      }
      if (props.search) {
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

      const response = await http(
        '/professionals/?' + searchParams.toString(),
        {
          signal,
          method: 'GET',
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message, {
          cause: data.description,
        });
      }

      return data;
    },
  });
