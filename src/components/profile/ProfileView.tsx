import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { MobileProfile } from './MobileProfile';
import { DesktopProfile } from './DesktopProfile';
import type { Profile } from '../../types';

interface ProfileViewProps {
  profile: Profile;
}

export function ProfileView({ profile }: ProfileViewProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  
  return isMobile ? (
    <MobileProfile profile={profile} />
  ) : (
    <DesktopProfile profile={profile} />
  );
}