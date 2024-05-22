import { QueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const queryClient = new QueryClient();

const baseURL = process.env.NEXT_PUBLIC_DATABASE_URL as string;

console.log(baseURL);

function normalizeUrl(url: string) {
  const protocolIndex = url.indexOf('://');

  if (protocolIndex === -1) {
    return url;
  }

  const protocolPart = url.substring(0, protocolIndex + 3);
  const pathPart = url.substring(protocolIndex + 3);

  const normalizedPathPart = pathPart.replace(/\/{2,}/g, '/');

  return protocolPart + normalizedPathPart;
}

const http = async <T>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<T> =>
  fetch(
    !z
      .string()
      .url()
      .safeParse(input as string).success
      ? normalizeUrl(baseURL + input)
      : input,
    {
      ...init,
    }
  ).then(async (response) => {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || response.statusText);
    }

    const data = (await response.json()) as T;

    return data as T;
  });

export default http;