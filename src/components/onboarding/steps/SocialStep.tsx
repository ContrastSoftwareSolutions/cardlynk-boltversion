import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Facebook, Youtube, ArrowLeft } from 'lucide-react';
import type { OnboardingData } from '../../../types';

interface SocialStepProps {
  data: Partial<OnboardingData>;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export function SocialStep({ data, onNext, onBack }: SocialStepProps) {
  const [social, setSocial] = React.useState({
    linkedin: data.social?.linkedin || '',
    twitter: data.social?.twitter || '',
    instagram: data.social?.instagram || '',
    facebook: data.social?.facebook || '',
    youtube: data.social?.youtube || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ social });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocial(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSkip = () => {
    onNext({ social: {} });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Add your social profiles
        </h2>
        <p className="text-gray-600">
          Help people connect with you across platforms
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Linkedin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="linkedin"
              id="linkedin"
              value={social.linkedin}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 mb-1">
            Twitter Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Twitter className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="twitter"
              id="twitter"
              value={social.twitter}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://twitter.com/username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700 mb-1">
            Instagram Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Instagram className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="instagram"
              id="instagram"
              value={social.instagram}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://instagram.com/username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="facebook" className="block text-sm font-medium text-gray-700 mb-1">
            Facebook Profile
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Facebook className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="facebook"
              id="facebook"
              value={social.facebook}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://facebook.com/username"
            />
          </div>
        </div>

        <div>
          <label htmlFor="youtube" className="block text-sm font-medium text-gray-700 mb-1">
            YouTube Channel
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Youtube className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              name="youtube"
              id="youtube"
              value={social.youtube}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="https://youtube.com/@username"
            />
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSkip}
              className="text-gray-600 hover:text-gray-900"
            >
              Skip for now
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}