import React, { useState } from 'react';
import { Building2, Briefcase, Link, Mail, Phone, User, Image, Share2 } from 'lucide-react';
import { QRCode } from './QRCode';
import { ImageUpload } from './ImageUpload';
import { SocialLinks } from './SocialLinks';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { Profile } from '../../types';

export function ProfileForm() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [profile, setProfile] = useState<Partial<Profile>>({
    name: '',
    title: '',
    company: '',
    bio: '',
    social: {
      linkedin: '',
      twitter: '',
      website: '',
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (network: string, value: string) => {
    setProfile(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [network]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile data:', profile);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Profile Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly on your digital card.
            </p>
          </div>

          <div className="mt-5 md:mt-0 md:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              <ImageUpload
                value={profile.avatar}
                onChange={(url) => setProfile(prev => ({ ...prev, avatar: url }))}
              />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={profile.title}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Software Engineer"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="company"
                    id="company"
                    value={profile.company}
                    onChange={handleChange}
                    className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Company Name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={profile.bio}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Tell us about yourself"
                  />
                </div>
              </div>

              <SocialLinks
                values={profile.social}
                onChange={handleSocialChange}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Preview
          </button>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Profile
          </button>
        </div>

        {!isMobile && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900">Share Your Profile</h4>
            <div className="mt-2 flex items-center space-x-4">
              <QRCode value={`https://cardlynk.app/p/${profile.id}`} />
              <div className="flex-1">
                <p className="text-sm text-gray-500">
                  Scan this QR code to instantly share your digital card
                </p>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}