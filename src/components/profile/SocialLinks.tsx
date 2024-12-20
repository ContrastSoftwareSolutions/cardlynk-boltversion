import React from 'react';
import { Linkedin, Twitter, Globe } from 'lucide-react';

interface SocialLinksProps {
  values: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  onChange: (network: string, value: string) => void;
}

export function SocialLinks({ values, onChange }: SocialLinksProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900">Social Links</h4>
      
      <div>
        <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
          LinkedIn
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Linkedin className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="linkedin"
            value={values.linkedin}
            onChange={(e) => onChange('linkedin', e.target.value)}
            className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      <div>
        <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
          Twitter
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Twitter className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="twitter"
            value={values.twitter}
            onChange={(e) => onChange('twitter', e.target.value)}
            className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://twitter.com/username"
          />
        </div>
      </div>

      <div>
        <label htmlFor="website" className="block text-sm font-medium text-gray-700">
          Website
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            id="website"
            value={values.website}
            onChange={(e) => onChange('website', e.target.value)}
            className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="https://example.com"
          />
        </div>
      </div>
    </div>
  );
}