import React from 'react';
import { useResizeObserver } from '../../hooks/useResizeObserver';

interface ResizeContainerProps {
  onResize?: (entry: ResizeObserverEntry) => void;
  children: React.ReactNode;
  className?: string;
}

export function ResizeContainer({ 
  onResize, 
  children, 
  className 
}: ResizeContainerProps) {
  const containerRef = useResizeObserver<HTMLDivElement>((entry) => {
    if (onResize) {
      onResize(entry);
    }
  });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}