import React from 'react';
import { Plus, Bell, X } from 'lucide-react';
import type { Event } from '../../types';

interface ReminderSelectorProps {
  reminders: Event['reminders'];
  onChange: (reminders: Event['reminders']) => void;
}

export function ReminderSelector({ reminders = [], onChange }: ReminderSelectorProps) {
  const reminderOptions = [
    { value: 0, label: 'At time of event' },
    { value: 5, label: '5 minutes before' },
    { value: 15, label: '15 minutes before' },
    { value: 30, label: '30 minutes before' },
    { value: 60, label: '1 hour before' },
    { value: 120, label: '2 hours before' },
    { value: 1440, label: '1 day before' }
  ];

  const handleAddReminder = () => {
    onChange([...reminders, { type: 'push', time: 15 }]);
  };

  const handleRemoveReminder = (index: number) => {
    onChange(reminders.filter((_, i) => i !== index));
  };

  const handleUpdateReminder = (index: number, field: 'type' | 'time', value: any) => {
    onChange(
      reminders.map((reminder, i) =>
        i === index ? { ...reminder, [field]: value } : reminder
      )
    );
  };

  return (
    <div className="space-y-3">
      {reminders.map((reminder, index) => (
        <div key={index} className="flex items-center gap-3">
          <select
            value={reminder.type}
            onChange={(e) => handleUpdateReminder(index, 'type', e.target.value)}
            className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="push">Push</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>

          <select
            value={reminder.time}
            onChange={(e) => handleUpdateReminder(index, 'time', parseInt(e.target.value))}
            className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {reminderOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => handleRemoveReminder(index)}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddReminder}
        className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
      >
        <Plus className="w-4 h-4" />
        Add Reminder
      </button>
    </div>
  );
}