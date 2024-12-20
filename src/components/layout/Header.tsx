import React from 'react';
import { Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="https://cardlynk.com/wp-content/uploads/2024/02/Group-161.png" 
              alt="CardLynk" 
              className="h-8 w-auto"
            />
          </div>
          
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-4">
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}