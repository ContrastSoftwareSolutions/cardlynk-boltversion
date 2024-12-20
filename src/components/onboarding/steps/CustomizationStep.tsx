import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ThemeSelector } from '../../profile/ThemeSelector';
import { ImageUpload } from '../../profile/ImageUpload';
import { DEFAULT_THEMES } from '../../../utils/themes';
import type { Profile } from '../../../types';

interface CustomizationStepProps {
  data: Partial<Profile>;
  onNext: (data: Partial<Profile>) => void;
  onBack: () => void;
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function CustomizationStep({ 
  data, 
  onNext, 
  onBack,
  selectedTheme,
  onThemeChange
}: CustomizationStepProps) {
  const [avatar, setAvatar] = React.useState<string>(
    data.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const theme = DEFAULT_THEMES.find(t => t.id === selectedTheme) || DEFAULT_THEMES[0];
    onNext({ 
      avatar,
      theme
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Make it yours
        </h2>
        <p className="text-gray-600">
          Customize your profile's appearance
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <ImageUpload
            value={avatar}
            onChange={setAvatar}
          />

          <ThemeSelector
            themes={DEFAULT_THEMES}
            selectedTheme={selectedTheme}
            onSelect={onThemeChange}
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}