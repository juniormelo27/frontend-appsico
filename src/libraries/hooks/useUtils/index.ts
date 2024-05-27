import http from '@/services/fetch';
import { useQuery } from '@tanstack/react-query';

export type ResponseAddress = {
  display_name: string;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
  state_code: string;
  country: string;
  country_code: string;
  zip_code: string;
  geo: {
    latitude: number;
    longitude: number;
  };
};

export const useSearchAddress = (value: string) =>
  useQuery<ResponseAddress, Error>({
    queryKey: ['address', value],
    queryFn: async ({ signal }) => {
      const searchParams = new URLSearchParams();

      searchParams.set('search', value);

      const result = await http<ResponseAddress>(
        '/address/?' + searchParams.toString(),
        {
          signal,
          method: 'GET',
        }
      );

      return result;
    },
    staleTime: 3600,
    gcTime: 3600,
    refetchInterval: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!value.length,
  });
