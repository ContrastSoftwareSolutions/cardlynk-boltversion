import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileMenu } from '../components/profile/MobileMenu';
import { Menu, ArrowLeft } from 'lucide-react';
import { EventDashboard } from '../components/events/EventDashboard';
import { DesktopSidebar } from '../components/layout/DesktopSidebar';
import { MobileFooter } from '../components/layout/MobileFooter';
import { mockEvents } from '../utils/mockEvents';
import type { Profile } from '../types';

interface EventDetailPageProps {
  profile: Profile;
  brandColor: string;
}

export function EventDetailPage({ profile, brandColor }: EventDetailPageProps) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const event = mockEvents.find(e => e.id === id);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleEdit = () => {
    // TODO: Implement edit functionality
    console.log('Edit event:', event);
  };

  const handleDelete = () => {
    // TODO: Implement delete functionality
    console.log('Delete event:', event);
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share event:', event);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
          <button 
            onClick={() => navigate('/events')}
            className="p-2 -ml-2"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 -mr-2"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandColor={brandColor}
        />

        {/* Event Dashboard */}
        <div className="p-4">
          <EventDashboard
            event={event}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
          />
        </div>

        <MobileFooter brandColor={brandColor} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopSidebar brandColor={brandColor} />
      
      {/* Desktop Content */}
      <div className="content-wrapper">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </button>

        <EventDashboard
          event={event}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onShare={handleShare}
        />
      </div>
    </div>
  );
}