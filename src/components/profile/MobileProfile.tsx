import React, { useState } from 'react';
import { MobileHeader } from '../layout/MobileHeader';
import { MobileMenu } from '../layout/MobileMenu';
import { MobileShareModal } from './MobileShareModal';
import { MobileFooter } from '../layout/MobileFooter';
import { ProfilePreview } from './ProfilePreview';
import type { Profile } from '../../types';

interface MobileProfileProps {
  profile: Profile;
}

export function MobileProfile({ profile }: MobileProfileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      <MobileHeader 
        profile={profile}
        onMenuOpen={() => setIsMenuOpen(true)}
        onShareOpen={() => setIsShareModalOpen(true)}
      />

      <MobileMenu 
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        brandColor={profile.theme.colors.accent}
      />

      <MobileShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        profile={profile}
      />

      {/* Profile Preview */}
      <div className="h-[calc(100vh-64px)]">
        <ProfilePreview profile={profile} />
      </div>

      <MobileFooter brandColor={profile.theme.colors.accent} />
    </div>
  );
}