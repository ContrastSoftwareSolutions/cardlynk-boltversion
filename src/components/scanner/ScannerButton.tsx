import React from 'react';
import { Scan } from 'lucide-react';
import { BusinessCardScanner } from './BusinessCardScanner';
import type { Contact } from '../../types';

interface ScannerButtonProps {
  onScanComplete: (contact: Partial<Contact>) => void;
  className?: string;
}

export function ScannerButton({ onScanComplete, className = '' }: ScannerButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleScanComplete = (contact: Partial<Contact>) => {
    onScanComplete(contact);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`inline-flex items-center gap-2 ${className}`}
      >
        <Scan className="w-5 h-5" />
        <span>Scan Business Card</span>
      </button>

      {isOpen && (
        <BusinessCardScanner
          onScanComplete={handleScanComplete}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}