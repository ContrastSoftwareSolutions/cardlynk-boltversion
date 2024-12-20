import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BarChart2, Users,
  Settings, HelpCircle, LogOut, Star, ChevronLeft, ChevronRight
} from 'lucide-react';

interface DesktopSidebarProps {
  brandColor?: string;
}

export function DesktopSidebar({ brandColor = '#6366F1' }: DesktopSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem('sidebarCollapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', String(isCollapsed));
    document.documentElement.style.setProperty('--sidebar-width', isCollapsed ? '5rem' : '16rem');
    document.documentElement.setAttribute('data-sidebar-collapsed', String(isCollapsed));
  }, [isCollapsed]);

  const isActive = (path: string) => location.pathname === path;

  const mainNavItems = [
    { path: '/profile', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/analytics', icon: BarChart2, label: 'Analytics' },
    { path: '/contacts', icon: Users, label: 'Contacts' },
  ];

  const bottomNavItems = [
    { path: '/settings', icon: Settings, label: 'Settings' },
    { path: '/help', icon: HelpCircle, label: 'Help Center' },
  ];

  return (
    <aside 
      className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 z-30 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <button 
          onClick={() => navigate('/profile')}
          className="flex items-center"
        >
          {isCollapsed ? (
            <svg width="32" height="32" viewBox="0 0 88 108" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M37.9442 58.1573C35.1668 56.5014 31.3208 55.596 25.4042 55.9835C22.3183 56.1857 19.6528 53.8479 19.4506 50.762C19.2485 47.676 21.5863 45.0105 24.6722 44.8084C31.9982 44.3285 38.329 45.3483 43.6791 48.538C49.0303 51.7282 52.7038 56.6746 55.5115 62.6925C56.8191 65.495 55.6071 68.8269 52.8046 70.1344C50.0021 71.442 46.6702 70.2301 45.3627 67.4275C43.1252 62.6318 40.7206 59.8125 37.9442 58.1573Z" fill="#5A3DF5"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M49.6452 38.7171C43.2871 34.9301 35.0183 33.1218 23.4322 33.7213C20.3438 33.8811 17.7106 31.507 17.5508 28.4186C17.391 25.3302 19.7651 22.697 22.8535 22.5372C35.8434 21.865 46.5228 23.8222 55.3761 29.0954C64.2311 34.3697 70.6015 42.5702 75.7087 53.1297C77.0553 55.9137 75.8899 59.2622 73.1059 60.6087C70.3219 61.9552 66.9735 60.7899 65.6269 58.0059C61.1056 48.6578 56.0015 42.5031 49.6452 38.7171Z" fill="#5A3DF5"/>
              <path d="M21.1539 65.2372C27.0645 65.2372 32.0808 67.3176 36.2415 71.4589C40.3829 75.5614 42.4632 80.5971 42.4632 86.5466C42.4632 92.36 40.3829 97.3374 36.2415 101.479C32.0808 105.62 27.0645 107.7 21.1539 107.7C15.3404 107.7 10.3631 105.62 6.22172 101.479C2.06095 97.3374 0 92.36 0 86.5466C0 80.5971 2.06095 75.5614 6.22172 71.4589C10.3631 67.3176 15.3404 65.2372 21.1539 65.2372Z" fill="#5A3DF5"/>
            </svg>
          ) : (
            <img 
              src="https://cardlynk.com/wp-content/uploads/2024/02/Group-161.png" 
              alt="CardLynk" 
              className="h-8"
            />
          )}
        </button>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {mainNavItems.map((item) => (
          <button 
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors ${
              isActive(item.path) 
                ? 'text-indigo-600 bg-indigo-50' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Bottom Section - Sticky */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 pt-4 px-2">
        {/* PRO Advertisement */}
        {!isCollapsed && (
          <div className="p-4 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg text-white mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5" />
              <h3 className="font-semibold">Ready to go PRO?</h3>
            </div>
            <p className="text-sm text-indigo-100 mb-3">
              Unlock advanced features and analytics with CardLynk PRO
            </p>
            <button className="w-full py-2 bg-white text-indigo-600 rounded font-medium text-sm hover:bg-indigo-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="space-y-1 pb-4">
          {bottomNavItems.map((item) => (
            <button 
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? 'text-indigo-600 bg-indigo-50' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.label}</span>}
            </button>
          ))}
          <button className="flex items-center gap-3 w-full px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Log out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}