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

export const getChangedValues = <T>(initialValues: any, currentValues: any): T => {
  const set = (obj: any, path: string[], value: any) => {
    let tempObj = obj;
    for (let i = 0; i < path.length - 1; i++) {
      const key = path[i];
      if (!tempObj[key]) {
        tempObj[key] = {};
      }
      tempObj = tempObj[key];
    }
    tempObj[path[path.length - 1]] = value;
  };

  const changes: any = {};

  const compareValues = (
    initial: any,
    current: any,
    changes: any,
    path: string[] = []
  ) => {
    if (Array.isArray(initial) && Array.isArray(current)) {
      if (initial.length !== current.length) {
        set(changes, path, current);
      } else {
        let arrayChanged = false;
        const arrayChanges = current.map((item, index) => {
          const change = compareValues(initial[index], current[index], {}, path.concat(String(index)));
          if (change !== undefined) {
            arrayChanged = true;
            return item;
          }
          return undefined;
        });
        if (arrayChanged) {
          set(changes, path, arrayChanges);
        } else {
          set(changes, path, undefined);
        }
      }
    } else if (typeof initial === 'object' && typeof current === 'object' && initial !== null && current !== null) {
      for (const key in initial) {
        compareValues(initial[key], current[key], changes, path.concat(key));
      }
      for (const key in current) {
        if (!(key in initial)) {
          set(changes, path.concat(key), current[key]);
        }
      }
    } else {
      const fullPath = path.join('.');
      if (initial !== current) {
        set(changes, path, current);
      } else {
        set(changes, path, undefined);
      }
    }
  };

  compareValues(initialValues, currentValues, changes);
  return changes;
};
