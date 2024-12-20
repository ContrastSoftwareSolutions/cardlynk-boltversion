import React, { useState } from 'react';
import { AccountSettings } from './AccountSettings';
import { NotificationSettings } from './NotificationSettings';
import { BillingSettings } from './BillingSettings';
import type { Profile } from '../../types';

interface SettingsContentProps {
  activeTab: string;
  profile: Profile;
}

export function SettingsContent({ activeTab, profile }: SettingsContentProps) {
  const [userData] = useState({
    name: profile.name,
    email: profile.email,
    language: 'en',
    timezone: 'UTC'
  });

  const [notificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    profileViews: true,
    newConnections: true,
    marketing: false
  });

  const [billingSettings] = useState({
    currentPlan: 'free' as const,
    billingCycle: 'monthly' as const
  });

  const handleAccountUpdate = (field: string, value: string) => {
    console.log('Update account field:', field, value);
  };

  const handleNotificationUpdate = (setting: string, value: boolean) => {
    console.log('Update notification setting:', setting, value);
  };

  const handleUpgrade = () => {
    console.log('Upgrade plan');
  };

  const handleChangeBillingCycle = (cycle: 'monthly' | 'yearly') => {
    console.log('Change billing cycle:', cycle);
  };

  switch (activeTab) {
    case 'account':
      return <AccountSettings user={userData} onUpdate={handleAccountUpdate} />;
    case 'notifications':
      return <NotificationSettings settings={notificationSettings} onUpdate={handleNotificationUpdate} />;
    case 'billing':
      return (
        <BillingSettings
          currentPlan={billingSettings.currentPlan}
          billingCycle={billingSettings.billingCycle}
          onUpgrade={handleUpgrade}
          onChangeBillingCycle={handleChangeBillingCycle}
        />
      );
    default:
      return null;
  }
}