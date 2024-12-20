import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Tag, Clock, MoreVertical } from 'lucide-react';
import type { Event } from '../../types';

interface EventListProps {
  events: Event[];
  onSelectEvent: (event: Event) => void;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
}

export function EventList({
  events,
  onSelectEvent,
  onEditEvent,
  onDeleteEvent
}: EventListProps) {
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatEventTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full table">
        <div className="table-header-group bg-gray-50 border-b border-gray-200">
          <div className="table-row">
            <div className="table-cell py-3 px-4 text-xs font-medium text-gray-500 uppercase">Event</div>
            <div className="table-cell py-3 px-4 text-xs font-medium text-gray-500 uppercase">Date & Time</div>
            <div className="table-cell py-3 px-4 text-xs font-medium text-gray-500 uppercase">Location</div>
            <div className="table-cell py-3 px-4 text-xs font-medium text-gray-500 uppercase">Attendees</div>
            <div className="table-cell py-3 px-4 text-xs font-medium text-gray-500 uppercase">Status</div>
            <div className="table-cell w-20 py-3 px-4"></div>
          </div>
        </div>

        <div className="table-row-group divide-y divide-gray-200">
          {events.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="table-row hover:bg-gray-50"
            >
              <div className="table-cell py-4 px-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: event.color || '#E5E7EB' }}
                  >
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">{event.title}</h3>
                    {event.description && (
                      <p className="text-sm text-gray-500 truncate max-w-xs">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="table-cell py-4 px-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(event.startDate).toLocaleDateString()},{' '}
                    {formatEventTime(event.startDate)}
                    {event.endDate && ` - ${formatEventTime(event.endDate)}`}
                  </span>
                </div>
              </div>

              <div className="table-cell py-4 px-4">
                {event.location ? (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                ) : (
                  <span className="text-sm text-gray-500">Virtual</span>
                )}
              </div>

              <div className="table-cell py-4 px-4">
                {event.attendees ? (
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {event.attendees.slice(0, 3).map((attendee) => (
                        <div
                          key={attendee.id}
                          className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                        >
                          {attendee.avatar ? (
                            <img
                              src={attendee.avatar}
                              alt={attendee.name}
                              className="w-full h-full rounded-full"
                            />
                          ) : (
                            <span className="text-xs font-medium text-gray-600">
                              {attendee.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                    {event.attendees.length > 3 && (
                      <span className="text-sm text-gray-500">
                        +{event.attendees.length - 3}
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>No attendees</span>
                  </div>
                )}
              </div>

              <div className="table-cell py-4 px-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>

              <div className="table-cell w-20 py-4 px-4">
                <button
                  onClick={() => onSelectEvent(event)}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}