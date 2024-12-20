import React from 'react';
import { Check } from 'lucide-react';
import { getContrastColor } from '../../utils/colors';
import type { Theme } from '../../types';

interface ThemeSelectorProps {
  themes: Theme[];
  selectedTheme: string;
  onSelect: (themeId: string) => void;
}

export function ThemeSelector({ themes, selectedTheme, onSelect }: ThemeSelectorProps) {
  const handleThemeSelect = (e: React.MouseEvent, themeId: string) => {
    e.preventDefault();
    onSelect(themeId);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Choose a Theme</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {themes.map((theme) => {
          const textColor = getContrastColor(theme.colors.background);
          const isSelected = selectedTheme === theme.id;

          return (
            <div
              key={theme.id}
              onClick={(e) => handleThemeSelect(e, theme.id)}
              className={`group relative h-40 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'ring-4 ring-indigo-600 ring-offset-4'
                  : 'hover:scale-105'
              }`}
              style={{
                background: theme.colors.background,
                borderColor: theme.colors.accent
              }}
            >
              {/* Theme Preview Content */}
              <div className="absolute inset-0 p-3 flex flex-col items-center">
                {/* Avatar Circle */}
                <div 
                  className="w-10 h-10 rounded-full mb-2 border-2"
                  style={{ 
                    backgroundColor: theme.colors.accent,
                    borderColor: textColor,
                    opacity: 0.9
                  }}
                />
                
                {/* Text Lines */}
                <div 
                  className="w-16 h-1.5 rounded-full mb-1"
                  style={{ backgroundColor: textColor, opacity: 0.9 }}
                />
                <div 
                  className="w-12 h-1.5 rounded-full"
                  style={{ backgroundColor: textColor, opacity: 0.6 }}
                />
                
                {/* Links Preview */}
                <div className="w-full mt-auto space-y-1">
                  <div 
                    className="w-full h-5 rounded-lg"
                    style={{ backgroundColor: theme.colors.accent }}
                  />
                  <div 
                    className="w-full h-5 rounded-lg"
                    style={{ backgroundColor: theme.colors.accent, opacity: 0.8 }}
                  />
                </div>
              </div>

              {/* Theme Name */}
              <div 
                className="absolute bottom-0 inset-x-0 p-2 backdrop-blur-sm"
                style={{ 
                  background: `linear-gradient(to top, ${theme.colors.background}E6, ${theme.colors.background}99, transparent)`
                }}
              >
                <p 
                  className="text-sm font-medium text-center"
                  style={{ color: textColor }}
                >
                  {theme.name}
                </p>
              </div>

              {/* Selected Check */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Hover Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ 
                  background: `linear-gradient(to bottom, transparent, ${theme.colors.background}99)`
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}