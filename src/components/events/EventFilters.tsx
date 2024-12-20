import React from 'react';
import { Search, Filter, SlidersHorizontal, X } from 'lucide-react';

interface EventFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  availableTags: string[];
  selectedType: string;
  onTypeSelect: (type: string) => void;
  selectedStatus: string;
  onStatusSelect: (status: string) => void;
  onClearFilters: () => void;
  totalEvents: number;
  filteredCount: number;
}

export function EventFilters({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagSelect,
  availableTags,
  selectedType,
  onTypeSelect,
  selectedStatus,
  onStatusSelect,
  onClearFilters,
  totalEvents,
  filteredCount
}: EventFiltersProps) {
  const eventTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'meeting', label: 'Meeting' },
    { value: 'conference', label: 'Conference' },
    { value: 'networking', label: 'Networking' },
    { value: 'other', label: 'Other' }
  ];

  const eventStatuses = [
    { value: 'all', label: 'All Statuses' },
    { value: 'upcoming', label: 'Upcoming' },
    { value: 'ongoing', label: 'Ongoing' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const hasActiveFilters = searchTerm || selectedTags.length > 0 || 
    selectedType !== 'all' || selectedStatus !== 'all';

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
            placeholder="Search events..."
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

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => onTypeSelect(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg"
        >
          {eventTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Filter Summary and Clear */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {filteredCount} of {totalEvents} events
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

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2">
        {eventStatuses.map((status) => (
          <button
            key={status.value}
            onClick={() => onStatusSelect(status.value)}
            className={`inline-flex items-center px-3 py-1 rounded-lg text-sm ${
              selectedStatus === status.value
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
    </div>
  );
}