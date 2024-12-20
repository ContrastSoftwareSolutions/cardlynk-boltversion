import React from 'react';

interface QRCodeProps {
  value: string;
  size?: number;
}

export function QRCode({ value, size = 120 }: QRCodeProps) {
  // In a real app, you would generate a QR code here
  // For now, we'll just show a placeholder
  return (
    <div 
      className="bg-white p-2 rounded-lg shadow-sm" 
      style={{ width: size, height: size }}
    >
      <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
        QR Code
      </div>
    </div>
  );
}