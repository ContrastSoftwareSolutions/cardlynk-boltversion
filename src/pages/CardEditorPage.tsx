import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HexColorPicker } from 'react-colorful';
import { Save, ChevronLeft, Layout, Type, Palette, Image as ImageIcon } from 'lucide-react';
import { FontSelector } from '../components/editor/FontSelector';
import { LayoutSelector } from '../components/editor/LayoutSelector';
import { ImageUpload } from '../components/profile/ImageUpload';
import type { Profile } from '../types';

interface CardEditorPageProps {
  profile: Profile;
  onSave: (updates: Partial<Profile>) => void;
}

export function CardEditorPage({ profile, onSave }: CardEditorPageProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'layout' | 'typography' | 'colors' | 'images'>('layout');
  const [selectedFont, setSelectedFont] = useState('inter');
  const [selectedLayout, setSelectedLayout] = useState('modern');
  const [brandColor, setBrandColor] = useState('#6366F1');
  const [accentColor, setAccentColor] = useState('#4F46E5');

  const handleSave = () => {
    onSave({
      ...profile,
      customization: {
        font: selectedFont,
        layout: selectedLayout,
        brandColor,
        accentColor
      }
    });
    navigate('/');
  };

  const tabs = [
    { id: 'layout', label: 'Layout', icon: Layout },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'images', label: 'Images', icon: ImageIcon }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5" />
                Back
              </button>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Editor Panel */}
          <div className="col-span-4">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium border-b-2 ${
                        activeTab === tab.id
                          ? 'border-indigo-600 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <tab.icon className="w-5 h-5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'layout' && (
                  <LayoutSelector
                    value={selectedLayout}
                    onChange={setSelectedLayout}
                  />
                )}

                {activeTab === 'typography' && (
                  <FontSelector
                    value={selectedFont}
                    onChange={setSelectedFont}
                  />
                )}

                {activeTab === 'colors' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand Color
                      </label>
                      <HexColorPicker
                        color={brandColor}
                        onChange={setBrandColor}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Color
                      </label>
                      <HexColorPicker
                        color={accentColor}
                        onChange={setAccentColor}
                        className="w-full"
                      />
                    </div>
                  </div>
                )}

                {activeTab === 'images' && (
                  <div className="space-y-6">
                    <ImageUpload
                      value={profile.avatar}
                      onChange={(url) => onSave({ ...profile, avatar: url })}
                    />
                    {profile.logo && (
                      <ImageUpload
                        value={profile.logo}
                        onChange={(url) => onSave({ ...profile, logo: url })}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Preview</h2>
              <div 
                className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden"
                style={{ fontFamily: selectedFont }}
              >
                <motion.div
                  className="w-full h-full"
                  animate={{ backgroundColor: brandColor }}
                >
                  {/* Preview content will be added here */}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}