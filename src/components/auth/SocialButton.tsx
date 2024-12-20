import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  provider: string;
  fullWidth?: boolean;
}

export function SocialButton({ 
  icon: Icon, 
  provider, 
  fullWidth = false,
  className,
  ...props 
}: SocialButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500",
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      <Icon className="w-5 h-5" />
      <span>Continue with {provider}</span>
    </button>
  );
}