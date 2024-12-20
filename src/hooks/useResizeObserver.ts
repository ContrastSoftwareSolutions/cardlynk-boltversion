import { useEffect, useRef } from 'react';

export function useResizeObserver<T extends HTMLElement>(
  callback: (entry: ResizeObserverEntry) => void
) {
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let rafId: number;
    const observer = new ResizeObserver((entries) => {
      // Use requestAnimationFrame to throttle updates and prevent loop warnings
      rafId = requestAnimationFrame(() => {
        if (entries[0]) {
          callback(entries[0]);
        }
      });
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [callback]);

  return elementRef;
}