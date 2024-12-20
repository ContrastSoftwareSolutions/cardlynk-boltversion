import React from 'react';
import { Trash2, Plus, ExternalLink } from 'lucide-react';
import type { ProfileLink } from '../../types';

interface LinkEditorProps {
  links: ProfileLink[];
  onChange: (links: ProfileLink[]) => void;
}

export function LinkEditor({ links, onChange }: LinkEditorProps) {
  const addLink = () => {
    const newLink: ProfileLink = {
      id: crypto.randomUUID(),
      title: '',
      url: '',
      order: links.length
    };
    onChange([...links, newLink]);
  };

  const updateLink = (id: string, updates: Partial<ProfileLink>) => {
    const updatedLinks = links.map(link => 
      link.id === id ? { ...link, ...updates } : link
    );
    onChange(updatedLinks);
  };

  const removeLink = (id: string) => {
    const updatedLinks = links
      .filter(link => link.id !== id)
      .map((link, index) => ({
        ...link,
        order: index
      }));
    onChange(updatedLinks);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Links</h3>
        <button
          onClick={addLink}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      <div className="space-y-2">
        {links.map((link) => (
          <div
            key={link.id}
            className="bg-white rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-sm"
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) => updateLink(link.id, { title: e.target.value })}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Link Title"
                />
                <button
                  onClick={() => removeLink(link.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="relative">
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(link.id, { url: e.target.value })}
                  className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="https://example.com"
                />
                <ExternalLink className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}