import React from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, MapPin, Users, Tag, Clock, Share2, Edit, 
  Download, Trash2, Bell, MessageCircle, CheckCircle2
} from 'lucide-react';
import { QRCode } from '../profile/QRCode';
import type { Event } from '../../types';

interface EventDashboardProps {
  event: Event;
  onEdit: () => void;
  onDelete: () => void;
  onShare: () => void;
}

export function EventDashboard({ event, onEdit, onDelete, onShare }: EventDashboardProps) {
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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div 
              className="w-16 h-16 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: event.color || '#E5E7EB' }}
            >
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
                {event.isRecurring && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    <Bell className="w-3 h-3" />
                    Recurring
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onShare}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onEdit}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <Edit className="w-5 h-5" />
            </button>
            <button 
              onClick={onDelete}
              className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* Date & Time */}
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Date & Time</h3>
                <p className="text-sm text-gray-500">
                  {new Date(event.startDate).toLocaleDateString()},{' '}
                  {formatEventTime(event.startDate)}
                  {event.endDate && ` - ${formatEventTime(event.endDate)}`}
                </p>
                {event.isRecurring && event.recurrence && (
                  <p className="text-sm text-gray-500 mt-1">
                    Repeats every {event.recurrence.interval}{' '}
                    {event.recurrence.interval > 1 ? event.recurrence.frequency + 's' : event.recurrence.frequency}
                  </p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-gray-900">Location</h3>
                <p className="text-sm text-gray-500">
                  {event.location || 'Virtual'}
                </p>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <div className="flex items-start gap-3">
                <MessageCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Description</h3>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
              </div>
            )}

            {/* Tags */}
            {event.tags && event.tags.length > 0 && (
              <div className="flex items-start gap-3">
                <Tag className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {event.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Attendees */}
            {event.attendees && event.attendees.length > 0 && (
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Attendees</h3>
                  <div className="mt-2 space-y-2">
                    {event.attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center gap-3">
                        {attendee.avatar ? (
                          <img
                            src={attendee.avatar}
                            alt={attendee.name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {attendee.name.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {attendee.name}
                          </p>
                          {attendee.email && (
                            <p className="text-sm text-gray-500">
                              {attendee.email}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reminders */}
            {event.reminders && event.reminders.length > 0 && (
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Reminders</h3>
                  <div className="mt-2 space-y-2">
                    {event.reminders.map((reminder, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-500">
                          {reminder.type === 'push' && 'Push notification'}
                          {reminder.type === 'email' && 'Email notification'}
                          {reminder.type === 'sms' && 'SMS notification'}{' '}
                          {reminder.time === 0
                            ? 'at time of event'
                            : `${reminder.time} minutes before`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Code */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Share Event</h2>
          <button
            onClick={onShare}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Download className="w-4 h-4" />
            Download QR Code
          </button>
        </div>
        <div className="flex items-center gap-6">
          <QRCode value={`https://cardlynk.app/events/${event.id}`} size={160} />
          <div>
            <p className="text-sm text-gray-500">
              Share this QR code with others to let them quickly access the event details
              and add it to their calendar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}