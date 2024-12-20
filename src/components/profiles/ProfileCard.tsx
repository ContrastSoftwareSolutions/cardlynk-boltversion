import React from 'react';
import { Edit, Share2, Trash2 } from 'lucide-react';
import { LogoDisplay } from '../profile/LogoDisplay';
import type { Profile } from '../../types';

interface ProfileCardProps {
  profile: Profile;
  isActive?: boolean;
  onEdit?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  brandColor?: string;
}

export function ProfileCard({ 
  profile, 
  isActive,
  onEdit,
  onShare,
  onDelete,
  brandColor = '#6366F1'
}: ProfileCardProps) {
  const getContrastColor = (hexColor: string) => {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const textColor = getContrastColor(brandColor);

  return (
    <div 
      className={`
        h-full rounded-lg overflow-hidden
        ${isActive ? 'ring-2 ring-indigo-600' : 'hover:shadow-lg'}
        transition-all duration-200
      `}
      style={{ backgroundColor: isActive ? brandColor : 'white' }}
    >
      {/* Card Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          {isActive && (
            <div className="px-2 py-1 bg-white/10 rounded text-xs font-medium" style={{ color: textColor }}>
              Active Profile
            </div>
          )}
          <div className="flex gap-1">
            <button
              onClick={onShare}
              className={`p-2 rounded-full ${
                isActive 
                  ? 'text-white/70 hover:text-white hover:bg-white/10' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onEdit}
              className={`p-2 rounded-full ${
                isActive 
                  ? 'text-white/70 hover:text-white hover:bg-white/10' 
                  : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Edit className="w-5 h-5" />
            </button>
            {!isActive && (
              <button
                onClick={onDelete}
                className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-center gap-4">
          {profile.avatar ? (
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : '#F3F4F6',
                color: isActive ? textColor : '#9CA3AF'
              }}
            >
              <span className="text-xl font-bold">
                {profile.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <h3 
              className="text-lg font-semibold mb-1"
              style={{ color: isActive ? textColor : '#111827' }}
            >
              {profile.name}
            </h3>
            <p 
              className="text-sm"
              style={{ color: isActive ? `${textColor}99` : '#6B7280' }}
            >
              {profile.title}
            </p>
            <p 
              className="text-sm"
              style={{ color: isActive ? `${textColor}99` : '#6B7280' }}
            >
              {profile.company}
            </p>
          </div>
        </div>

        {/* Company Logo */}
        {profile.logo && (
          <div className="mt-4">
            <LogoDisplay
              logo={profile.logo}
              logoUrl={profile.logoUrl}
              companyName={profile.company}
              className="h-8 w-auto"
            />
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div 
        className={`px-6 py-4 border-t ${
          isActive ? 'border-white/10' : 'border-gray-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <div 
            className="text-sm"
            style={{ color: isActive ? `${textColor}99` : '#6B7280' }}
          >
            Last updated {new Date().toLocaleDateString()}
          </div>
          {isActive && (
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: textColor }}
            />
          )}
        </div>
      </div>
    </div>
  );
}