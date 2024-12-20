import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Edit, Share2 } from 'lucide-react';
import { getContrastColor } from '../../utils/colors';
import type { Profile } from '../../types';

interface MobileHeaderProps {
  profile: Profile;
  onMenuOpen: () => void;
  onShareOpen: () => void;
}

export function MobileHeader({ profile, onMenuOpen, onShareOpen }: MobileHeaderProps) {
  const navigate = useNavigate();
  const textColor = getContrastColor(profile.theme.colors.background);

  return (
    <div className="absolute top-0 left-0 right-0 z-10">
      <div className="flex justify-between items-center p-4">
        <button 
          onClick={onMenuOpen}
          className="p-2 -ml-2 rounded-full hover:bg-black/10 transition-colors"
          style={{ color: textColor }}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigate('/edit')}
            className="p-2 rounded-full hover:bg-black/10 transition-colors"
            style={{ color: textColor }}
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={onShareOpen}
            className="p-2 -mr-2 rounded-full hover:bg-black/10 transition-colors"
            style={{ color: textColor }}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}