import React from 'react';
import { motion } from 'framer-motion';
import { 
  X, Mail, Phone, Building2, Globe, MapPin, Calendar, 
  Edit2, Trash2, Tag, Star, Share2 
} from 'lucide-react';
import type { Contact } from '../../types';

interface ContactDetailProps {
  contact: Contact;
  onClose: () => void;
  onEdit: (contact: Contact) => void;
  onDelete: (contact: Contact) => void;
  onAddTag: (contact: Contact) => void;
  onToggleFavorite: (contact: Contact) => void;
}

export function ContactDetail({
  contact,
  onClose,
  onEdit,
  onDelete,
  onAddTag,
  onToggleFavorite
}: ContactDetailProps) {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween' }}
      className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="p-2 -ml-2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(contact)}
              className={`p-2 rounded-full ${
                contact.favorite
                  ? 'text-yellow-400'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Star className={`w-5 h-5 ${contact.favorite ? 'fill-yellow-400' : ''}`} />
            </button>
            <button
              onClick={() => onEdit(contact)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Edit2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete(contact)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="p-6">
        <div className="text-center mb-6">
          {contact.avatar ? (
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl font-medium text-indigo-600">
                {contact.name.charAt(0)}
              </span>
            </div>
          )}
          <h2 className="text-xl font-bold text-gray-900">{contact.name}</h2>
          {contact.title && contact.company && (
            <p className="text-gray-600">
              {contact.title} at {contact.company}
            </p>
          )}
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <Mail className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900">{contact.email}</span>
            </a>
          )}
          {contact.phone && (
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <Phone className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900">{contact.phone}</span>
            </a>
          )}
          {contact.website && (
            <a
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50"
            >
              <Globe className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900">{contact.website}</span>
            </a>
          )}
          {contact.location && (
            <div className="flex items-center gap-3 p-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span className="text-gray-900">{contact.location}</span>
            </div>
          )}
          <div className="flex items-center gap-3 p-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <span className="text-gray-900">
              Added on {new Date(contact.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-900">Tags</h3>
            <button
              onClick={() => onAddTag(contact)}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <Tag className="w-4 h-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {contact.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Notes</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              {contact.notes || 'No notes added yet.'}
            </p>
          </div>
        </div>

        {/* Share Contact */}
        <div className="mt-6">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            <Share2 className="w-5 h-5" />
            Share Contact
          </button>
        </div>
      </div>
    </motion.div>
  );
}