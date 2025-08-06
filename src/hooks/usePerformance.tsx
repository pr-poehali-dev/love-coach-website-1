import { useCallback, useMemo } from 'react';
import type { DependencyList } from 'react';

export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  return useCallback(
    (...args: Parameters<T>) => {
      const timeoutId = setTimeout(() => callback(...args), delay);
      return () => clearTimeout(timeoutId);
    },
    [callback, delay]
  ) as T;
};

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  let lastCall = 0;
  
  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        return callback(...args);
      }
    },
    [callback, delay]
  ) as T;
};

export const useMemoizedValue = <T>(value: T, deps: DependencyList): T => {
  return useMemo(() => value, deps);
};

export const usePreloadImage = (src: string) => {
  const preload = useCallback(() => {
    const img = new Image();
    img.src = src;
  }, [src]);

  return { preload };
};