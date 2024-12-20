import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download } from 'lucide-react';
import QRCode from 'react-qr-code';
import type { Profile } from '../../types';

interface MobileShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  brandColor: string;
}

export function MobileShareModal({ isOpen, onClose, profile, brandColor }: MobileShareModalProps) {
  const handleSaveToGallery = () => {
    // TODO: Implement save to gallery functionality
    console.log('Save to gallery');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <button 
              onClick={onClose}
              className="p-2 -ml-2"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold">Share Profile</h1>
            <div className="w-9" /> {/* Spacer for alignment */}
          </div>

          {/* Content */}
          <div className="px-4 py-6 text-center">
            {/* Profile Info */}
            <div className="mb-8">
              {profile.avatar ? (
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-400">
                    {profile.name.charAt(0)}
                  </span>
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="text-gray-600">{profile.title}</p>
              <p className="text-gray-600">{profile.company}</p>
            </div>

            {/* QR Code */}
            <div className="mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm inline-block">
                <QRCode
                  value={`https://cardlynk.app/p/${profile.id}`}
                  size={200}
                  className="mx-auto"
                />
              </div>
            </div>

            {/* Save to Gallery Button */}
            <button
              onClick={handleSaveToGallery}
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg text-white transition-colors"
              style={{ backgroundColor: brandColor }}
            >
              <Download className="w-5 h-5" />
              Save to Gallery
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}