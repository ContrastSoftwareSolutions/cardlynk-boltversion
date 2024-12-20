import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { getContrastColor } from '../../utils/colors';
import { SocialIcons } from './SocialIcons';
import type { Profile } from '../../types';

interface ProfilePreviewProps {
  profile: Profile;
  className?: string;
}

export function ProfilePreview({ profile, className = '' }: ProfilePreviewProps) {
  const { theme } = profile;
  const textColor = getContrastColor(theme.colors.background);
  const linkTextColor = getContrastColor(theme.colors.accent);

  return (
    <div 
      className={`w-full h-full overflow-hidden ${className}`}
      style={{ 
        background: theme.colors.background,
        color: textColor,
        fontFamily: theme.font
      }}
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center pt-12 px-6">
        {profile.avatar ? (
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={profile.avatar}
            alt={profile.name}
            className="w-24 h-24 rounded-full object-cover border-4"
            style={{ borderColor: theme.colors.accent }}
          />
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold"
            style={{ backgroundColor: theme.colors.accent, color: linkTextColor }}
          >
            {profile.name.charAt(0)}
          </motion.div>
        )}

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-2xl font-bold text-center"
          style={{ color: textColor }}
        >
          {profile.name}
        </motion.h1>

        {profile.title && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-1 text-lg text-center"
            style={{ color: `${textColor}CC` }}
          >
            {profile.title}
          </motion.p>
        )}

        {profile.company && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-1 text-lg text-center"
            style={{ color: `${textColor}CC` }}
          >
            {profile.company}
          </motion.p>
        )}

        {profile.bio && (
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-sm text-center max-w-md"
            style={{ color: `${textColor}99` }}
          >
            {profile.bio}
          </motion.p>
        )}

        {/* Social Icons */}
        {Object.values(profile.social).some(Boolean) && (
          <motion.div
            className="mt-6 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <SocialIcons 
              social={profile.social} 
              iconColor={textColor}
              size={24}
            />
          </motion.div>
        )}
      </div>

      {/* Links */}
      <motion.div 
        className="px-6 py-4 space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {profile.links?.map((link, index) => (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full p-3 rounded-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ 
              backgroundColor: theme.colors.accent,
              color: linkTextColor
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{link.title}</span>
              <ExternalLink className="w-4 h-4" style={{ color: linkTextColor }} />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}