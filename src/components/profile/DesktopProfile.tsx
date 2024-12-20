import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import { DesktopSidebar } from '../layout/DesktopSidebar';
import { DashboardPreview } from './DashboardPreview';
import type { Profile } from '../../types';

interface DesktopProfileProps {
  profile: Profile;
}

export function DesktopProfile({ profile }: DesktopProfileProps) {
  const navigate = useNavigate();

  // Mock contacts data
  const recentContacts = [
    {
      id: '1',
      name: 'Sarah Wilson',
      title: 'Marketing Director',
      company: 'Growth Co',
      date: '2024-02-28',
      needsFollowUp: true
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Software Engineer',
      company: 'Tech Solutions',
      date: '2024-02-27',
      needsFollowUp: true
    },
    {
      id: '3',
      name: 'Emma Thompson',
      title: 'Product Manager',
      company: 'Innovation Labs',
      date: '2024-02-26',
      needsFollowUp: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopSidebar brandColor={profile.theme.colors.accent} />
      
      <div className="content-wrapper">
        <div className="grid grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="col-span-8 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Profile Views</h3>
                  <span className="text-sm text-green-600">+12.5%</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">1,234</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">New Contacts</h3>
                  <span className="text-sm text-green-600">+8.3%</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">856</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500">Follow-ups</h3>
                  <span className="text-sm text-amber-600">2 pending</span>
                </div>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>

            {/* Latest Contacts */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Recent Contacts</h2>
                    <p className="text-sm text-gray-500">Your latest connections</p>
                  </div>
                  <button
                    onClick={() => navigate('/contacts')}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <Users className="w-4 h-4" />
                    View All Contacts
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentContacts.map(contact => (
                  <div key={contact.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {contact.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{contact.name}</h4>
                        <p className="text-sm text-gray-500">
                          {contact.title} at {contact.company}
                        </p>
                      </div>
                    </div>
                    {contact.needsFollowUp && (
                      <span className="px-2 py-1 text-xs font-medium text-amber-700 bg-amber-50 rounded-full">
                        Follow up
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-4">
            {/* Profile Preview */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Profile Preview</h3>
              <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
                <DashboardPreview profile={profile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}