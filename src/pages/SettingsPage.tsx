import React, { useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileMenu } from '../components/profile/MobileMenu';
import { Menu } from 'lucide-react';
import { SettingsTabs } from '../components/settings/SettingsTabs';
import { SettingsContent } from '../components/settings/SettingsContent';
import { DesktopSidebar } from '../components/layout/DesktopSidebar';
import { MobileFooter } from '../components/layout/MobileFooter';
import type { Profile } from '../types';

interface SettingsPageProps {
  profile: Profile;
  brandColor: string;
}

export function SettingsPage({ profile, brandColor }: SettingsPageProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('account');

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold">Settings</h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandColor={brandColor}
        />

        {/* Settings Navigation */}
        <div className="px-4 py-4">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Settings Content */}
        <div className="px-4 pb-4">
          <SettingsContent activeTab={activeTab} profile={profile} />
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account preferences</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          {/* Settings Navigation */}
          <div className="border-b border-gray-200">
            <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Settings Content */}
          <div className="p-6">
            <SettingsContent activeTab={activeTab} profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}