import http from '@/services/fetch';
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useMemo } from 'react';

export type TypeMessage = {
  id: string;
  type: 'text' | 'image' | 'video';
  content: string;
  sender: {
    id: string;
    name: string;
    image?: string;
  };
  created_at: Date;
};

type TypeReceiverMessage = {
  next?: string;
  previous?: string;
  data: Array<
    TypeMessage & {
      created_at: string;
    }
  >;
  total: number;
};

export type TypeResponseMessage = {
  next?: string;
  previous?: string;
  data: Array<TypeMessage>;
  total: number;
};

export const useConversationMessages = (
  id?: string,
  props: Partial<{
    limit?: number;
    cursor?: string;
  }> = {
    limit: 30,
  }
) => {
  const query = useInfiniteQuery<
    TypeResponseMessage,
    Error,
    InfiniteData<TypeResponseMessage>,
    QueryKey,
    string | undefined
  >({
    refetchOnReconnect: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    queryKey: ['conversations', id, 'messages'],
    queryFn: async ({ pageParam }) => {
      const searchParams = new URLSearchParams();

      if (pageParam) {
        searchParams.set('cursor', pageParam);
      }
      if (props.limit) {
        searchParams.set('limit', props.limit.toString());
      }

      const response = await http<TypeReceiverMessage>(
        `/conversations/${id}/messages/?` + searchParams.toString()
      );

      const data = response.data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at),
      }));

      return {
        ...response,
        data: data,
      };
    },
    initialPageParam: undefined,
    getNextPageParam(lastPage) {
      return lastPage.next;
    },
    enabled: !!id ? true : false,
  });

  const messages = useMemo(() => {
    return (query.data?.pages.flatMap((item) => item.data).flat() || []).sort(
      //@ts-ignore
      (a, b) => a.created_at - b.created_at
    );
  }, [query.data?.pages]);

  return {
    ...query,
    data: messages,
  };
};
