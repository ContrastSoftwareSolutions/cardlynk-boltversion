import React from 'react';
import { User, Bell, CreditCard } from 'lucide-react';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard }
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 md:gap-0">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-2 whitespace-nowrap transition-colors
            md:border-b-2 md:rounded-none
            ${activeTab === tab.id
              ? 'md:border-indigo-600 md:text-indigo-600 bg-indigo-600 md:bg-transparent text-white md:text-current rounded-lg md:rounded-none'
              : 'md:border-transparent md:text-gray-500 md:hover:text-gray-700 md:hover:border-gray-300 bg-white md:bg-transparent text-gray-600 border border-gray-200 md:border-none rounded-lg md:rounded-none'
            }
          `}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
        </button>
      ))}
    </div>
  );
}