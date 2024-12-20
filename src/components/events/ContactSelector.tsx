import React, { useState } from 'react';
import { Search, X, Users } from 'lucide-react';
import { mockContacts } from '../../utils/mockContacts';
import type { Contact } from '../../types';

interface ContactSelectorProps {
  selectedContacts: Contact[];
  onChange: (contacts: Contact[]) => void;
}

export function ContactSelector({ selectedContacts, onChange }: ContactSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredContacts = mockContacts.filter(contact => 
    !selectedContacts.find(c => c.id === contact.id) &&
    (contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectContact = (contact: Contact) => {
    onChange([...selectedContacts, contact]);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  const handleRemoveContact = (contactId: string) => {
    onChange(selectedContacts.filter(c => c.id !== contactId));
  };

  return (
    <div className="space-y-2">
      {/* Selected Contacts */}
      {selectedContacts.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedContacts.map(contact => (
            <div
              key={contact.id}
              className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm"
            >
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-4 h-4 rounded-full"
                />
              ) : (
                <span className="w-4 h-4 rounded-full bg-indigo-200 flex items-center justify-center text-xs">
                  {contact.name.charAt(0)}
                </span>
              )}
              {contact.name}
              <button
                onClick={() => handleRemoveContact(contact.id)}
                className="p-0.5 hover:bg-indigo-200 rounded-full"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Users className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Search contacts..."
        />

        {/* Dropdown */}
        {isDropdownOpen && searchTerm && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
            <ul className="max-h-60 overflow-auto py-1">
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <li key={contact.id}>
                    <button
                      onClick={() => handleSelectContact(contact)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                    >
                      {contact.avatar ? (
                        <img
                          src={contact.avatar}
                          alt={contact.name}
                          className="w-8 h-8 rounded-full"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium text-gray-600">
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {contact.name}
                        </div>
                        {contact.email && (
                          <div className="text-sm text-gray-500">
                            {contact.email}
                          </div>
                        )}
                      </div>
                    </button>
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 text-sm text-gray-500">
                  No contacts found
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}