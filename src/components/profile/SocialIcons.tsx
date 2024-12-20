import React from 'react';
import { Linkedin, Twitter, Instagram, Facebook, Youtube, Globe } from 'lucide-react';
import { getContrastColor } from '../../utils/colors';

interface SocialIconsProps {
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
    website?: string;
  };
  iconColor: string;
  size?: number;
}

export function SocialIcons({ social, iconColor, size = 20 }: SocialIconsProps) {
  const icons = {
    linkedin: Linkedin,
    twitter: Twitter,
    instagram: Instagram,
    facebook: Facebook,
    youtube: Youtube,
    website: Globe
  };

  return (
    <div className="flex justify-center gap-4">
      {Object.entries(social).map(([platform, url]) => {
        if (!url) return null;
        const Icon = icons[platform as keyof typeof icons];
        if (!Icon) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-110"
            style={{ color: iconColor }}
          >
            <Icon size={size} />
          </a>
        );
      })}
    </div>
  );
}