import React from 'react';

interface LogoDisplayProps {
  logo?: string;
  logoUrl?: string;
  companyName: string;
  className?: string;
}

export function LogoDisplay({ logo, logoUrl, companyName, className = "h-8 w-auto" }: LogoDisplayProps) {
  if (!logo) return null;

  const LogoImage = (
    <img
      src={logo}
      alt={`${companyName} logo`}
      className={className}
    />
  );

  if (logoUrl) {
    return (
      <a 
        href={logoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {LogoImage}
      </a>
    );
  }

  return LogoImage;
}