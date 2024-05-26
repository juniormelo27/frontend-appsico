import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformSearchParamsToArray(
  value: string | Array<string | undefined> | undefined
): Array<string> | undefined {
  return (
    value
      ? Array.isArray(value)
        ? value.filter((e) => !!e)
        : [value].filter((e) => !!e)
      : undefined
  ) as Array<string> | undefined;
}
