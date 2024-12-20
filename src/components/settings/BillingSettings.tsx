import React from 'react';
import { CreditCard, Star, CheckCircle2 } from 'lucide-react';

interface BillingSettingsProps {
  currentPlan: 'free' | 'pro' | 'business';
  billingCycle: 'monthly' | 'yearly';
  onUpgrade: () => void;
  onChangeBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

export function BillingSettings({ 
  currentPlan, 
  billingCycle,
  onUpgrade,
  onChangeBillingCycle 
}: BillingSettingsProps) {
  const plans = [
    {
      name: 'Free',
      price: 0,
      features: [
        '1 Digital Profile',
        'Basic Analytics',
        'Standard Support',
        'Limited Customization'
      ]
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? 9.99 : 99.99,
      features: [
        'Unlimited Digital Profiles',
        'Advanced Analytics',
        'Priority Support',
        'Full Customization',
        'Custom Branding',
        'Export Analytics'
      ]
    },
    {
      name: 'Business',
      price: billingCycle === 'monthly' ? 29.99 : 299.99,
      features: [
        'Everything in Pro',
        'Team Management',
        'API Access',
        'Dedicated Account Manager',
        'Custom Integration',
        'Enterprise Support'
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">Billing & Plans</h3>
        <p className="text-sm text-gray-500">Manage your subscription and payment details.</p>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center space-x-4 p-4 bg-gray-50 rounded-lg">
        <button
          onClick={() => onChangeBillingCycle('monthly')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            billingCycle === 'monthly'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => onChangeBillingCycle('yearly')}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            billingCycle === 'yearly'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Yearly
          <span className="ml-1 text-xs text-green-600">Save 17%</span>
        </button>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg border ${
              currentPlan === plan.name.toLowerCase()
                ? 'border-indigo-600 ring-1 ring-indigo-600'
                : 'border-gray-200'
            }`}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-gray-500">/{billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {currentPlan === plan.name.toLowerCase() ? (
                <button
                  disabled
                  className="w-full py-2 px-4 bg-indigo-100 text-indigo-600 rounded-lg text-sm font-medium"
                >
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={onUpgrade}
                  className="w-full py-2 px-4 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Upgrade to {plan.name}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Payment Method */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="text-base font-medium text-gray-900 mb-4">Payment Method</h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <CreditCard className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
              <p className="text-sm text-gray-500">Expires 12/24</p>
            </div>
          </div>
          <button className="text-sm text-indigo-600 hover:text-indigo-700">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}