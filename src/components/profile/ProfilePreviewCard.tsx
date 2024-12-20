import React from 'react';
import { ProfilePreview } from './ProfilePreview';
import type { Profile } from '../../types';

interface ProfilePreviewCardProps {
  profile: Profile;
  className?: string;
}

export function ProfilePreviewCard({ profile, className = '' }: ProfilePreviewCardProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
        <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
          <ProfilePreview profile={profile} />
        </div>
      </div>
    </div>
  );
}