import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileMenu } from '../components/profile/MobileMenu';
import { Menu, Plus, Upload, Download, Calendar } from 'lucide-react';
import { EventList } from '../components/events/EventList';
import { EventFilters } from '../components/events/EventFilters';
import { CreateEventModal } from '../components/events/CreateEventModal';
import { DesktopSidebar } from '../components/layout/DesktopSidebar';
import { MobileFooter } from '../components/layout/MobileFooter';
import { mockEvents } from '../utils/mockEvents';
import type { Event, Profile } from '../types';

interface EventsPageProps {
  profile: Profile;
  brandColor: string;
}

export function EventsPage({ profile, brandColor }: EventsPageProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Get unique tags from all events
  const availableTags = Array.from(
    new Set(mockEvents.flatMap(event => event.tags || []))
  );

  // Filter events based on search, tags, type, and status
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = !searchTerm || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tag => event.tags?.includes(tag));

    const matchesType = selectedType === 'all' || event.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || event.status === selectedStatus;

    return matchesSearch && matchesTags && matchesType && matchesStatus;
  });

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
    setSelectedType('all');
    setSelectedStatus('all');
  };

  const handleCreateEvent = (eventData: Partial<Event>) => {
    // In a real app, this would make an API call to create the event
    console.log('Creating event:', eventData);
    // For now, just close the modal
    setIsCreateModalOpen(false);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600">
              <Calendar className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="p-2 text-gray-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandColor={brandColor}
        />

        {/* Search and Filters */}
        <div className="p-4">
          <EventFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagSelect={(tag) => {
              setSelectedTags(prev =>
                prev.includes(tag)
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              );
            }}
            availableTags={availableTags}
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
            selectedStatus={selectedStatus}
            onStatusSelect={setSelectedStatus}
            onClearFilters={handleClearFilters}
            totalEvents={mockEvents.length}
            filteredCount={filteredEvents.length}
          />
        </div>

        {/* Event List */}
        <div className="px-4">
          <EventList
            events={filteredEvents}
            onSelectEvent={() => {}}
            onEditEvent={() => {}}
            onDeleteEvent={() => {}}
          />
        </div>

        {/* Create Event Modal */}
        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateEvent}
        />

        <MobileFooter brandColor={brandColor} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopSidebar brandColor={brandColor} />
      
      {/* Desktop Content */}
      <div className="content-wrapper">
        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Events</h1>
            <p className="text-gray-600">Manage your meetings and events</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Calendar className="w-4 h-4" />
              Calendar View
            </button>
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button 
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <EventFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagSelect={(tag) => {
              setSelectedTags(prev =>
                prev.includes(tag)
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              );
            }}
            availableTags={availableTags}
            selectedType={selectedType}
            onTypeSelect={setSelectedType}
            selectedStatus={selectedStatus}
            onStatusSelect={setSelectedStatus}
            onClearFilters={handleClearFilters}
            totalEvents={mockEvents.length}
            filteredCount={filteredEvents.length}
          />
        </div>

        {/* Event List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <EventList
            events={filteredEvents}
            onSelectEvent={() => {}}
            onEditEvent={() => {}}
            onDeleteEvent={() => {}}
          />
        </div>

        {/* Create Event Modal */}
        <CreateEventModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateEvent}
        />
      </div>
    </div>
  );
}