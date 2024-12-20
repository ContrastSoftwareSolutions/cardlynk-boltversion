import React from 'react';
import { Check } from 'lucide-react';

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
}

export function FontSelector({ value, onChange }: FontSelectorProps) {
  const fonts = [
    { id: 'inter', name: 'Inter', className: 'font-sans' },
    { id: 'merriweather', name: 'Merriweather', className: 'font-serif' },
    { id: 'space-mono', name: 'Space Mono', className: 'font-mono' },
    { id: 'playfair', name: 'Playfair Display', className: 'font-display' }
  ];

  return (
    <div className="space-y-4">
      {fonts.map((font) => (
        <button
          key={font.id}
          onClick={() => onChange(font.id)}
          className={`w-full flex items-center justify-between p-4 rounded-lg border-2 ${
            value === font.id
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className={`text-lg ${font.className}`}>{font.name}</span>
          {value === font.id && (
            <Check className="w-5 h-5 text-indigo-600" />
          )}
        </button>
      ))}
    </div>
  );
}