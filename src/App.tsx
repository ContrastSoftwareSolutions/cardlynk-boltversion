import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { OnboardingFlow } from './components/onboarding/OnboardingFlow';
import { ProfileView } from './components/profile/ProfileView';
import { ProfileEditor } from './components/profile/ProfileEditor';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ContactsPage } from './pages/ContactsPage';
import { SettingsPage } from './pages/SettingsPage';
import { HelpCenterPage } from './pages/HelpCenterPage';
import { DEFAULT_THEMES } from './utils/themes';
import type { Profile } from './types';

function App() {
  const [profile, setProfile] = useState<Profile>({
    name: '',
    title: '',
    company: '',
    bio: '',
    email: '',
    phone: '',
    avatar: '',
    links: [],
    theme: DEFAULT_THEMES[0],
    social: {}
  });

  const handleOnboardingComplete = (data: Partial<Profile>, selectedTheme?: string) => {
    setProfile(prev => ({
      ...prev,
      ...data,
      theme: selectedTheme ? 
        DEFAULT_THEMES.find(theme => theme.id === selectedTheme) || DEFAULT_THEMES[0] :
        prev.theme
    }));
  };

  const handleProfileUpdate = (updates: Partial<Profile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route 
          path="/onboarding" 
          element={
            <OnboardingFlow onComplete={handleOnboardingComplete} />
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/profile" 
          element={<ProfileView profile={profile} />} 
        />
        <Route 
          path="/edit" 
          element={
            <ProfileEditor 
              profile={profile} 
              onSave={handleProfileUpdate} 
            />
          } 
        />
        <Route 
          path="/analytics" 
          element={
            <AnalyticsPage 
              profile={profile} 
              brandColor={profile.theme.colors.accent} 
            />
          } 
        />
        <Route 
          path="/contacts" 
          element={
            <ContactsPage 
              profile={profile} 
              brandColor={profile.theme.colors.accent} 
            />
          } 
        />
        <Route 
          path="/settings" 
          element={
            <SettingsPage 
              profile={profile} 
              brandColor={profile.theme.colors.accent} 
            />
          } 
        />
        <Route 
          path="/help" 
          element={
            <HelpCenterPage 
              profile={profile} 
              brandColor={profile.theme.colors.accent} 
            />
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;