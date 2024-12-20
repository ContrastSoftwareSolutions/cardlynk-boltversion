import React from 'react';
import { ProfileCard } from './ProfileCard';
import { CreateProfileCard } from './CreateProfileCard';
import type { Profile } from '../../types';

interface ProfilesGridProps {
  profiles: Profile[];
  activeProfileId?: string;
  onCreateProfile: () => void;
  onEditProfile: (profile: Profile) => void;
  onShareProfile: (profile: Profile) => void;
  onDeleteProfile: (profile: Profile) => void;
  brandColor?: string;
}

export function ProfilesGrid({
  profiles,
  activeProfileId,
  onCreateProfile,
  onEditProfile,
  onShareProfile,
  onDeleteProfile,
  brandColor
}: ProfilesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {profiles.map(profile => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          isActive={profile.id === activeProfileId}
          onEdit={() => onEditProfile(profile)}
          onShare={() => onShareProfile(profile)}
          onDelete={() => onDeleteProfile(profile)}
          brandColor={brandColor}
        />
      ))}
      <CreateProfileCard onClick={onCreateProfile} />
    </div>
  );
}