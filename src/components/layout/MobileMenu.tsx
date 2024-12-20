import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X, LayoutDashboard, Settings, HelpCircle, LogOut } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  brandColor: string;
}

export function MobileMenu({ isOpen, onClose, brandColor }: MobileMenuProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <img 
                  src="https://cardlynk.com/wp-content/uploads/2024/02/Group-161.png" 
                  alt="CardLynk" 
                  className="h-6"
                />
                <button 
                  onClick={onClose}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
              <button 
                onClick={() => handleNavigation('/profile')}
                className="flex items-center gap-3 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => handleNavigation('/settings')}
                className="flex items-center gap-3 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <button 
                onClick={() => handleNavigation('/help')}
                className="flex items-center gap-3 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <HelpCircle className="w-5 h-5" />
                <span>Help Center</span>
              </button>
              <button 
                onClick={() => handleNavigation('/logout')}
                className="flex items-center gap-3 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Log out</span>
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}