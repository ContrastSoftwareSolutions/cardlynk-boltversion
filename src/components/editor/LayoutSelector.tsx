import React from 'react';
import { Check } from 'lucide-react';

interface LayoutSelectorProps {
  value: string;
  onChange: (layout: string) => void;
}

export function LayoutSelector({ value, onChange }: LayoutSelectorProps) {
  const layouts = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and minimal design with focus on content'
    },
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional business card layout with elegant styling'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold and unique design for standing out'
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate style with emphasis on credentials'
    }
  ];

  return (
    <div className="space-y-4">
      {layouts.map((layout) => (
        <button
          key={layout.id}
          onClick={() => onChange(layout.id)}
          className={`w-full flex items-start gap-4 p-4 rounded-lg border-2 ${
            value === layout.id
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex-1 text-left">
            <p className="font-medium text-gray-900">{layout.name}</p>
            <p className="text-sm text-gray-500">{layout.description}</p>
          </div>
          {value === layout.id && (
            <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
          )}
        </button>
      ))}
    </div>
  );
}