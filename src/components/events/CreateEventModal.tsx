import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Users, Bell, Repeat } from 'lucide-react';
import { ContactSelector } from './ContactSelector';
import { ReminderSelector } from './ReminderSelector';
import { RecurrenceSelector } from './RecurrenceSelector';
import type { Event, Contact } from '../../types';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (event: Partial<Event>) => void;
}

export function CreateEventModal({ isOpen, onClose, onCreate }: CreateEventModalProps) {
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    startDate: new Date(),
    type: 'meeting',
    status: 'upcoming',
    isAllDay: false,
    location: '',
    attendees: [],
    tags: [],
    reminders: [{ type: 'push', time: 15 }],
    color: '#4F46E5'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  const handleAttendeesChange = (attendees: Contact[]) => {
    setFormData(prev => ({ ...prev, attendees }));
  };

  const handleRemindersChange = (reminders: Event['reminders']) => {
    setFormData(prev => ({ ...prev, reminders }));
  };

  const handleRecurrenceChange = (recurrence: Event['recurrence']) => {
    setFormData(prev => ({ ...prev, isRecurring: !!recurrence, recurrence }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Create Event</h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Event Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Enter event title"
                    />
                  </div>

                  {/* Date and Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Start Date & Time
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="datetime-local"
                          value={formData.startDate?.toISOString().slice(0, 16)}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            startDate: new Date(e.target.value)
                          }))}
                          className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        End Date & Time
                      </label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Clock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="datetime-local"
                          value={formData.endDate?.toISOString().slice(0, 16)}
                          onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            endDate: new Date(e.target.value)
                          }))}
                          className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* All Day Toggle */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isAllDay"
                      checked={formData.isAllDay}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        isAllDay: e.target.checked 
                      }))}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isAllDay" className="ml-2 block text-sm text-gray-700">
                      All day event
                    </label>
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          location: e.target.value 
                        }))}
                        className="block w-full pl-10 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Add location or 'Virtual'"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        description: e.target.value 
                      }))}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="Add event description"
                    />
                  </div>

                  {/* Attendees */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Attendees
                    </label>
                    <ContactSelector
                      selectedContacts={formData.attendees || []}
                      onChange={handleAttendeesChange}
                    />
                  </div>

                  {/* Reminders */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Reminders
                    </label>
                    <ReminderSelector
                      reminders={formData.reminders || []}
                      onChange={handleRemindersChange}
                    />
                  </div>

                  {/* Recurrence */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recurrence
                    </label>
                    <RecurrenceSelector
                      recurrence={formData.recurrence}
                      onChange={handleRecurrenceChange}
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Event Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        type: e.target.value as Event['type']
                      }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="meeting">Meeting</option>
                      <option value="conference">Conference</option>
                      <option value="networking">Networking</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Color Picker */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Event Color
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => setFormData(prev => ({ 
                          ...prev, 
                          color: e.target.value 
                        }))}
                        className="h-8 w-8 rounded border border-gray-300"
                      />
                      <span className="text-sm text-gray-500">
                        Choose a color for your event
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Create Event
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}