import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  hover?: boolean;
}

export function Card({ 
  className, 
  gradient = false,
  hover = false,
  children,
  ...props 
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        gradient && "bg-gradient-to-br from-white to-gray-50",
        hover && "transition-all duration-200 hover:shadow-md hover:border-brand-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

Card.Header = function CardHeader({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 py-4 border-b border-gray-200", className)}
      {...props}
    />
  );
};

Card.Body = function CardBody({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 py-4", className)}
      {...props}
    />
  );
};

Card.Footer = function CardFooter({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-6 py-4 border-t border-gray-200", className)}
      {...props}
    />
  );
};