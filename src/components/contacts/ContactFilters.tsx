import React from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

interface ContactFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  availableTags: string[];
  onClearFilters: () => void;
  totalContacts: number;
  filteredCount: number;
}

export function ContactFilters({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagSelect,
  availableTags,
  onClearFilters,
  totalContacts,
  filteredCount
}: ContactFiltersProps) {
  const hasActiveFilters = searchTerm || selectedTags.length > 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Bar */}
        <div className="relative col-span-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Advanced Filters Button */}
        <button className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 justify-center">
          <SlidersHorizontal className="w-4 h-4" />
          Advanced Filters
        </button>
      </div>

      {/* Filter Summary and Clear */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {filteredCount} of {totalContacts} contacts
          </span>
          <button
            onClick={onClearFilters}
            className="text-sm text-indigo-600 hover:text-indigo-700"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Active Tags */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800"
            >
              {tag}
              <button
                onClick={() => onTagSelect(tag)}
                className="p-0.5 hover:bg-indigo-200 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Available Tags */}
      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              selectedTags.includes(tag)
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}