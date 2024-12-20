import React from 'react';
import { Plus } from 'lucide-react';

interface CreateProfileCardProps {
  onClick: () => void;
}

export function CreateProfileCard({ onClick }: CreateProfileCardProps) {
  return (
    <button
      onClick={onClick}
      className="h-full rounded-lg border-2 border-dashed border-gray-300 hover:border-indigo-600 hover:bg-indigo-50/50 transition-all p-6 flex flex-col items-center justify-center gap-4"
    >
      <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
        <Plus className="w-8 h-8 text-indigo-600" />
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Create New Profile
        </h3>
        <p className="text-sm text-gray-500">
          Add another digital business card
        </p>
      </div>
    </button>
  );
}