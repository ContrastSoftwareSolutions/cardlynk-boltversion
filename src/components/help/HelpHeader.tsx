import React from 'react';
import { Search } from 'lucide-react';

interface HelpHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function HelpHeader({ searchQuery, onSearchChange }: HelpHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-4">
          How can we help you?
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Search our knowledge base or browse categories below
        </p>
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for articles..."
              className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}