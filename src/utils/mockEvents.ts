import type { Event } from '../types';

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring the latest innovations',
    startDate: new Date('2024-03-15T09:00:00'),
    endDate: new Date('2024-03-17T18:00:00'),
    location: 'San Francisco Convention Center',
    type: 'conference',
    status: 'upcoming',
    tags: ['Technology', 'Networking'],
    notes: 'Keynote speech on AI developments',
    createdAt: new Date('2024-02-01'),
    color: '#4F46E5',
    isAllDay: true,
    reminders: [
      { type: 'email', time: 1440 }, // 24 hours before
      { type: 'push', time: 60 } // 1 hour before
    ]
  },
  {
    id: '2',
    title: 'Product Strategy Meeting',
    description: 'Quarterly product roadmap review',
    startDate: new Date('2024-03-20T14:00:00'),
    endDate: new Date('2024-03-20T16:00:00'),
    location: 'Virtual',
    type: 'meeting',
    status: 'upcoming',
    tags: ['Product', 'Planning'],
    notes: 'Prepare Q2 roadmap presentation',
    createdAt: new Date('2024-02-15'),
    color: '#059669',
    reminders: [
      { type: 'push', time: 15 } // 15 minutes before
    ]
  },
  {
    id: '3',
    title: 'Startup Networking Mixer',
    description: 'Connect with local startup founders and investors',
    startDate: new Date('2024-03-25T18:00:00'),
    endDate: new Date('2024-03-25T21:00:00'),
    location: 'Innovation Hub',
    type: 'networking',
    status: 'upcoming',
    tags: ['Networking', 'Startups'],
    notes: 'Bring business cards',
    createdAt: new Date('2024-02-20'),
    color: '#D97706',
    reminders: [
      { type: 'email', time: 120 }, // 2 hours before
      { type: 'push', time: 30 } // 30 minutes before
    ]
  },
  {
    id: '4',
    title: 'Weekly Team Sync',
    description: 'Regular team status update and planning',
    startDate: new Date('2024-03-12T10:00:00'),
    endDate: new Date('2024-03-12T11:00:00'),
    location: 'Conference Room A',
    type: 'meeting',
    status: 'upcoming',
    tags: ['Team', 'Planning'],
    createdAt: new Date('2024-02-25'),
    color: '#DC2626',
    isRecurring: true,
    recurrence: {
      frequency: 'weekly',
      interval: 1,
      daysOfWeek: [2] // Tuesday
    },
    reminders: [
      { type: 'push', time: 5 } // 5 minutes before
    ]
  },
  {
    id: '5',
    title: 'Client Presentation',
    description: 'New feature demo for enterprise client',
    startDate: new Date('2024-03-28T15:00:00'),
    endDate: new Date('2024-03-28T16:30:00'),
    location: 'Client Office',
    type: 'meeting',
    status: 'upcoming',
    tags: ['Sales', 'Demo'],
    notes: 'Prepare demo environment',
    createdAt: new Date('2024-03-01'),
    color: '#7C3AED',
    reminders: [
      { type: 'email', time: 60 }, // 1 hour before
      { type: 'push', time: 30 } // 30 minutes before
    ]
  }
];