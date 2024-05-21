import { QueryClient } from '@tanstack/react-query';
import { z } from 'zod';

export const queryClient = new QueryClient();

const baseURL = 'http://localhost:3001/';
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

const http = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(z.string().url() ? normalizeUrl(baseURL + input) : input, {
    ...init,
  });

export default http;
