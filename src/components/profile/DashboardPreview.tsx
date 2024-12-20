import React from 'react';
import { motion } from 'framer-motion';
import { Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Profile } from '../../types';

interface DashboardPreviewProps {
  profile: Profile;
  className?: string;
}

export function DashboardPreview({ profile, className = '' }: DashboardPreviewProps) {
  const navigate = useNavigate();
  const { theme } = profile;

  return (
    <div 
      className={`relative w-full h-full overflow-hidden rounded-lg ${className}`}
      style={{ 
        background: theme.colors.background,
        color: theme.colors.text,
        fontFamily: theme.font
      }}
    >
      {/* Edit Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        onClick={() => navigate('/edit')}
        className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
      >
        <Edit2 className="w-4 h-4" style={{ color: theme.colors.text }} />
      </motion.button>

      {/* Profile Header */}
      <div className="flex flex-col items-center p-4">
        {profile.avatar ? (
          <motion.img
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={profile.avatar}
            alt={profile.name}
            className="w-16 h-16 rounded-full object-cover border-2"
            style={{ borderColor: theme.colors.accent }}
          />
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold"
            style={{ backgroundColor: theme.colors.accent, color: theme.colors.background }}
          >
            {profile.name.charAt(0)}
          </motion.div>
        )}

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-lg font-bold text-center"
        >
          {profile.name}
        </motion.h1>

        {profile.title && (
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm opacity-80 text-center"
          >
            {profile.title}
          </motion.p>
        )}

        {profile.company && (
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm opacity-80 text-center"
          >
            {profile.company}
          </motion.p>
        )}
      </div>

      {/* Links Preview */}
      <motion.div 
        className="px-4 py-2 space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {profile.links?.slice(0, 2).map((link, index) => (
          <motion.div
            key={link.id}
            className="h-6 rounded"
            style={{ 
              backgroundColor: theme.colors.accent,
              opacity: 0.7 - (index * 0.2)
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.7 - (index * 0.2) }}
            transition={{ delay: 0.6 + index * 0.1 }}
          />
        ))}
      </motion.div>

      {/* Social Icons Preview */}
      {Object.values(profile.social).some(Boolean) && (
        <motion.div
          className="flex justify-center gap-2 p-2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {Object.entries(profile.social).slice(0, 3).map(([platform, url], index) => {
            if (!url) return null;
            return (
              <div
                key={platform}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: theme.colors.accent, opacity: 0.8 - (index * 0.2) }}
              />
            );
          })}
        </motion.div>
      )}
    </div>
  );
}