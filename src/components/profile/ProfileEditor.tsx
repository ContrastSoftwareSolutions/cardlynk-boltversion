import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { LinkEditor } from './LinkEditor';
import { ThemeSelector } from './ThemeSelector';
import { ImageUpload } from './ImageUpload';
import { DEFAULT_THEMES } from '../../utils/themes';
import type { Profile, ProfileLink } from '../../types';

interface ProfileEditorProps {
  profile: Profile;
  onSave: (updates: Partial<Profile>) => void;
}

export function ProfileEditor({ profile, onSave }: ProfileEditorProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: profile.name,
    title: profile.title,
    company: profile.company,
    bio: profile.bio,
    email: profile.email,
    phone: profile.phone,
    avatar: profile.avatar,
    links: profile.links || [],
    theme: profile.theme || DEFAULT_THEMES[0],
    social: profile.social
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      // Only navigate if explicitly saving
      if (e.nativeEvent.submitter?.getAttribute('data-action') === 'save') {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      // TODO: Show error toast
    } finally {
      setIsSaving(false);
    }
  };

  const handleLinksChange = (links: ProfileLink[]) => {
    setFormData(prev => ({ ...prev, links }));
    // Auto-save without navigation
    onSave({ ...formData, links });
  };

  const handleThemeChange = (themeId: string) => {
    const selectedTheme = DEFAULT_THEMES.find(theme => theme.id === themeId);
    if (selectedTheme) {
      const newData = { ...formData, theme: selectedTheme };
      setFormData(newData);
      // Auto-save without navigation
      onSave(newData);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const newData = { ...formData, [name]: value };
    setFormData(newData);
    // Auto-save without navigation
    onSave(newData);
  };

  const handleAvatarChange = (url: string) => {
    const newData = { ...formData, avatar: url };
    setFormData(newData);
    // Auto-save without navigation
    onSave(newData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={() => navigate('/profile')}
              leftIcon={<ArrowLeft className="w-5 h-5" />}
            >
              Back
            </Button>
            <Button
              variant="primary"
              type="submit"
              form="profile-form"
              data-action="save"
              leftIcon={<Save className="w-5 h-5" />}
              isLoading={isSaving}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <form id="profile-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <Card>
            <Card.Header>
              <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            </Card.Header>
            <Card.Body className="space-y-6">
              <ImageUpload
                value={formData.avatar}
                onChange={handleAvatarChange}
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  value={formData.bio}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500"
                />
              </div>
            </Card.Body>
          </Card>

          {/* Links */}
          <Card>
            <Card.Body>
              <LinkEditor
                links={formData.links}
                onChange={handleLinksChange}
              />
            </Card.Body>
          </Card>

          {/* Theme */}
          <Card>
            <Card.Body>
              <ThemeSelector
                themes={DEFAULT_THEMES}
                selectedTheme={formData.theme.id}
                onSelect={handleThemeChange}
              />
            </Card.Body>
          </Card>
        </form>
      </div>
    </div>
  );
}