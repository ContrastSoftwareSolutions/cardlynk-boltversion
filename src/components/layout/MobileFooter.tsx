import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, QrCode, Users, BarChart2 } from 'lucide-react';
import { BusinessCardScanner } from '../scanner/BusinessCardScanner';
import { getContrastColor } from '../../utils/colors';

interface MobileFooterProps {
  brandColor: string;
}

export function MobileFooter({ brandColor }: MobileFooterProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScannerOpen, setIsScannerOpen] = React.useState(false);

  const isActive = (path: string) => location.pathname === path;
  const contrastColor = getContrastColor(brandColor);

  const getIconColor = (path: string) => {
    if (isActive(path)) {
      return contrastColor === '#FFFFFF' ? brandColor : '#6366F1';
    }
    return '#6B7280';
  };

  const getLabelColor = (path: string) => {
    if (isActive(path)) {
      return contrastColor === '#FFFFFF' ? brandColor : '#6366F1';
    }
    return '#6B7280';
  };

  const getButtonStyle = (path: string) => {
    if (isActive(path)) {
      return {
        backgroundColor: contrastColor === '#FFFFFF' ? 'white' : '#EEF2FF',
      };
    }
    return {};
  };

  const handleScanComplete = (contactInfo: any) => {
    console.log('Scanned contact:', contactInfo);
    setIsScannerOpen(false);
    navigate('/contacts');
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-4 h-16">
          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center justify-center transition-colors"
            style={getButtonStyle('/profile')}
          >
            <LayoutDashboard 
              className="w-5 h-5 mb-1" 
              style={{ color: getIconColor('/profile') }}
            />
            <span 
              className="text-xs"
              style={{ color: getLabelColor('/profile') }}
            >
              Profile
            </span>
          </button>

          <button
            onClick={() => setIsScannerOpen(true)}
            className="flex flex-col items-center justify-center transition-colors"
            style={getButtonStyle('/scan')}
          >
            <QrCode 
              className="w-5 h-5 mb-1" 
              style={{ color: getIconColor('/scan') }}
            />
            <span 
              className="text-xs"
              style={{ color: getLabelColor('/scan') }}
            >
              Scanner
            </span>
          </button>

          <button
            onClick={() => navigate('/contacts')}
            className="flex flex-col items-center justify-center transition-colors"
            style={getButtonStyle('/contacts')}
          >
            <Users 
              className="w-5 h-5 mb-1" 
              style={{ color: getIconColor('/contacts') }}
            />
            <span 
              className="text-xs"
              style={{ color: getLabelColor('/contacts') }}
            >
              Contacts
            </span>
          </button>

          <button
            onClick={() => navigate('/analytics')}
            className="flex flex-col items-center justify-center transition-colors"
            style={getButtonStyle('/analytics')}
          >
            <BarChart2 
              className="w-5 h-5 mb-1" 
              style={{ color: getIconColor('/analytics') }}
            />
            <span 
              className="text-xs"
              style={{ color: getLabelColor('/analytics') }}
            >
              Analytics
            </span>
          </button>
        </div>
      </div>

      {isScannerOpen && (
        <BusinessCardScanner
          onScanComplete={handleScanComplete}
          onClose={() => setIsScannerOpen(false)}
        />
      )}
    </>
  );
}