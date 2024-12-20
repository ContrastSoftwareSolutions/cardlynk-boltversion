import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Building2, Tag, MoreVertical, Star, Link2, Calendar, Scan } from 'lucide-react';
import { BusinessCardScanner } from '../scanner/BusinessCardScanner';
import type { Contact } from '../../types';

// ... rest of the imports ...

interface ContactListProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onTagContact: (contact: Contact) => void;
  onDeleteContact: (contact: Contact) => void;
  onFavoriteContact: (contact: Contact) => void;
  selectedContacts: string[];
  onToggleSelect: (contactId: string) => void;
  onAddContact?: (contact: Partial<Contact>) => void;
}

export function ContactList({
  contacts,
  onSelectContact,
  onTagContact,
  onDeleteContact,
  onFavoriteContact,
  selectedContacts,
  onToggleSelect,
  onAddContact
}: ContactListProps) {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleScanComplete = (contactInfo: Partial<Contact>) => {
    if (onAddContact) {
      onAddContact(contactInfo);
    }
    setIsScannerOpen(false);
  };

  return (
    <>
      <div className="overflow-x-auto">
        {/* Add Scan Button */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setIsScannerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
          >
            <Scan className="w-5 h-5" />
            Scan Business Card
          </button>
        </div>

        {/* Existing Contact List */}
        <div className="min-w-full table">
          {/* ... existing table code ... */}
        </div>
      </div>

      {/* Business Card Scanner Modal */}
      {isScannerOpen && (
        <BusinessCardScanner
          onScanComplete={handleScanComplete}
          onClose={() => setIsScannerOpen(false)}
        />
      )}
    </>
  );
}