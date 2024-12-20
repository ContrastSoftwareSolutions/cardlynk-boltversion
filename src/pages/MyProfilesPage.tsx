import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileMenu } from '../components/profile/MobileMenu';
import { Menu, Plus } from 'lucide-react';
import { ProfilesGrid } from '../components/profiles/ProfilesGrid';
import { MobileFooter } from '../components/layout/MobileFooter';
import { DesktopSidebar } from '../components/layout/DesktopSidebar';
import type { Profile } from '../types';

interface MyProfilesPageProps {
  profile: Profile;
  brandColor: string;
}

export function MyProfilesPage({ profile, brandColor }: MyProfilesPageProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Ensure the main profile has an ID
  const mainProfile = {
    ...profile,
    id: profile.id || '1'
  };

  // Mock data - in a real app, this would come from an API
  const mockProfiles: Profile[] = [
    mainProfile,
    {
      id: 'profile-2',
      name: 'Sarah Wilson',
      title: 'Marketing Director',
      company: 'Growth Co',
      email: 'sarah@growthco.com',
      phone: '+1 (555) 234-5678',
      bio: 'Marketing professional with 10+ years of experience.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      social: {}
    },
    {
      id: 'profile-3',
      name: 'Michael Chen',
      title: 'Software Engineer',
      company: 'Tech Solutions',
      email: 'michael@techsolutions.com',
      phone: '+1 (555) 345-6789',
      bio: 'Full-stack developer passionate about building great products.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      social: {}
    }
  ];

  const handleCreateProfile = () => {
    // TODO: Implement profile creation
    console.log('Create new profile');
  };

  const handleEditProfile = (profile: Profile) => {
    // TODO: Implement profile editing
    console.log('Edit profile:', profile);
  };

  const handleShareProfile = (profile: Profile) => {
    // TODO: Implement profile sharing
    console.log('Share profile:', profile);
  };

  const handleDeleteProfile = (profile: Profile) => {
    // TODO: Implement profile deletion
    console.log('Delete profile:', profile);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={handleCreateProfile}
            className="p-2 -mr-2"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandColor={brandColor}
        />

        {/* Page Content */}
        <div className="p-4">
          <div className="space-y-4">
            <ProfilesGrid
              profiles={mockProfiles}
              activeProfileId={mainProfile.id}
              onCreateProfile={handleCreateProfile}
              onEditProfile={handleEditProfile}
              onShareProfile={handleShareProfile}
              onDeleteProfile={handleDeleteProfile}
              brandColor={brandColor}
            />
          </div>
        </div>

        <MobileFooter brandColor={brandColor} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopSidebar brandColor={brandColor} />
      
      {/* Desktop Content */}
      <div className="content-wrapper">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Profiles</h1>
            <p className="text-gray-600">Manage your digital business cards</p>
          </div>
          <button
            onClick={handleCreateProfile}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Profile
          </button>
        </div>

        <ProfilesGrid
          profiles={mockProfiles}
          activeProfileId={mainProfile.id}
          onCreateProfile={handleCreateProfile}
          onEditProfile={handleEditProfile}
          onShareProfile={handleShareProfile}
          onDeleteProfile={handleDeleteProfile}
          brandColor={brandColor}
        />
      </div>
    </div>
  );
}