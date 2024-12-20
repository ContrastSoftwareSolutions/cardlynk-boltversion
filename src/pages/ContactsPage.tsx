import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileMenu } from '../components/profile/MobileMenu';
import { Menu, Plus, Download, Trash2, Tag, Star } from 'lucide-react';
import { ContactList } from '../components/contacts/ContactList';
import { MobileContactList } from '../components/contacts/MobileContactList';
import { ContactFilters } from '../components/contacts/ContactFilters';
import { ContactDetail } from '../components/contacts/ContactDetail';
import { DesktopSidebar } from '../components/layout/DesktopSidebar';
import { MobileFooter } from '../components/layout/MobileFooter';
import { mockContacts } from '../utils/mockContacts';
import { exportContactsToCSV, downloadCSV } from '../utils/exportContacts';
import type { Contact, Profile } from '../types';

interface ContactsPageProps {
  profile: Profile;
  brandColor: string;
}

export function ContactsPage({ profile, brandColor }: ContactsPageProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get unique tags from all contacts
  const availableTags = Array.from(
    new Set(mockContacts.flatMap(contact => contact.tags || []))
  );

  // Filter contacts based on search and tags
  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = !searchTerm || 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tag => contact.tags?.includes(tag));

    return matchesSearch && matchesTags;
  });

  const handleExportContacts = () => {
    const contactsToExport = selectedContacts.length > 0
      ? mockContacts.filter(c => selectedContacts.includes(c.id))
      : mockContacts;
    
    const csvContent = exportContactsToCSV(contactsToExport);
    downloadCSV(csvContent, 'contacts.csv');
  };

  const handleToggleSelect = (contactId: string) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-600">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandColor={brandColor}
        />

        {/* Search and Filters */}
        <div className="p-4">
          <ContactFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagSelect={(tag) => {
              setSelectedTags(prev =>
                prev.includes(tag)
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              );
            }}
            availableTags={availableTags}
            onClearFilters={handleClearFilters}
            totalContacts={mockContacts.length}
            filteredCount={filteredContacts.length}
          />
        </div>

        {/* Contact List */}
        <MobileContactList
          contacts={filteredContacts}
          onSelectContact={setSelectedContact}
        />

        {/* Contact Detail Slide-over */}
        {selectedContact && (
          <ContactDetail
            contact={selectedContact}
            onClose={() => setSelectedContact(null)}
            onEdit={() => {}}
            onDelete={() => {}}
            onAddTag={() => {}}
            onToggleFavorite={() => {}}
          />
        )}

        <MobileFooter brandColor={brandColor} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopSidebar brandColor={brandColor} />
      
      {/* Desktop Content */}
      <div className="content-wrapper">
        {/* Page Title */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Contacts</h1>
            <p className="text-gray-600">Manage your network and connections</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExportContacts}
              className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
              <Plus className="w-4 h-4" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        {selectedContacts.length > 0 && (
          <div className="flex items-center gap-3 mb-6">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
              <Trash2 className="w-4 h-4" />
              Delete ({selectedContacts.length})
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Tag className="w-4 h-4" />
              Add Tags
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Star className="w-4 h-4" />
              Add to Favorites
            </button>
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-6">
          <ContactFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedTags={selectedTags}
            onTagSelect={(tag) => {
              setSelectedTags(prev =>
                prev.includes(tag)
                  ? prev.filter(t => t !== tag)
                  : [...prev, tag]
              );
            }}
            availableTags={availableTags}
            onClearFilters={handleClearFilters}
            totalContacts={mockContacts.length}
            filteredCount={filteredContacts.length}
          />
        </div>

        {/* Contact List */}
        <div className="bg-white rounded-lg border border-gray-200">
          <ContactList
            contacts={filteredContacts}
            onSelectContact={setSelectedContact}
            onTagContact={() => {}}
            onDeleteContact={() => {}}
            onFavoriteContact={() => {}}
            selectedContacts={selectedContacts}
            onToggleSelect={handleToggleSelect}
          />
        </div>
      </div>

      {/* Contact Detail Slide-over */}
      {selectedContact && (
        <ContactDetail
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
          onEdit={() => {}}
          onDelete={() => {}}
          onAddTag={() => {}}
          onToggleFavorite={() => {}}
        />
      )}
    </div>
  );
}