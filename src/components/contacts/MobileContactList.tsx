import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Star, ChevronRight } from 'lucide-react';
import type { Contact } from '../../types';

interface MobileContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
}

export function MobileContactList({ contacts, onSelectContact }: MobileContactListProps) {
  return (
    <div className="divide-y divide-gray-200">
      {contacts.map((contact) => (
        <motion.div
          key={contact.id}
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="hover:bg-gray-50"
          onClick={() => onSelectContact(contact)}
        >
          <div className="p-4 flex items-center gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              {contact.avatar ? (
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-indigo-600">
                    {contact.name.charAt(0)}
                  </span>
                </div>
              )}
              {contact.favorite && (
                <div className="absolute -top-1 -right-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {contact.name}
                </p>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
              {contact.title && contact.company && (
                <p className="text-sm text-gray-500 truncate">
                  {contact.title} at {contact.company}
                </p>
              )}
              <div className="mt-1 flex items-center gap-2">
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone}`}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                )}
                {contact.tags && contact.tags.length > 0 && (
                  <span className="text-xs text-gray-500">
                    {contact.tags[0]}
                    {contact.tags.length > 1 && ` +${contact.tags.length - 1}`}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}