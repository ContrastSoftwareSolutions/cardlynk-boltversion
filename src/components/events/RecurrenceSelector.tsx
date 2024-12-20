import React from 'react';
import { Repeat } from 'lucide-react';
import type { Event } from '../../types';

interface RecurrenceSelectorProps {
  recurrence?: Event['recurrence'];
  onChange: (recurrence?: Event['recurrence']) => void;
}

export function RecurrenceSelector({ recurrence, onChange }: RecurrenceSelectorProps) {
  const [isRecurring, setIsRecurring] = React.useState(!!recurrence);

  const handleRecurrenceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const frequency = e.target.value as Event['recurrence']['frequency'];
    if (frequency) {
      onChange({
        frequency,
        interval: 1,
        daysOfWeek: frequency === 'weekly' ? [new Date().getDay()] : undefined
      });
    }
  };

  const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (recurrence) {
      onChange({
        ...recurrence,
        interval: parseInt(e.target.value) || 1
      });
    }
  };

  const handleDayChange = (day: number) => {
    if (recurrence) {
      const daysOfWeek = recurrence.daysOfWeek || [];
      const newDays = daysOfWeek.includes(day)
        ? daysOfWeek.filter(d => d !== day)
        : [...daysOfWeek, day];
      onChange({
        ...recurrence,
        daysOfWeek: newDays.sort()
      });
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isRecurring"
          checked={isRecurring}
          onChange={(e) => {
            setIsRecurring(e.target.checked);
            if (!e.target.checked) {
              onChange(undefined);
            } else {
              onChange({
                frequency: 'weekly',
                interval: 1,
                daysOfWeek: [new Date().getDay()]
              });
            }
          }}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="isRecurring" className="text-sm text-gray-700">
          Repeat this event
        </label>
      </div>

      {isRecurring && recurrence && (
        <div className="pl-6 space-y-3">
          <div className="flex items-center gap-3">
            <select
              value={recurrence.frequency}
              onChange={handleRecurrenceChange}
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <input
              type="number"
              min="1"
              max="99"
              value={recurrence.interval}
              onChange={handleIntervalChange}
              className="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />

            <span className="text-sm text-gray-500">
              {recurrence.interval > 1 ? `${recurrence.frequency}s` : recurrence.frequency}
            </span>
          </div>

          {recurrence.frequency === 'weekly' && (
            <div className="flex items-center gap-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDayChange(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium ${
                    recurrence.daysOfWeek?.includes(index)
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}