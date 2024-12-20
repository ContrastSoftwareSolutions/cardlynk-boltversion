import React from 'react';
import { Eye, Share2, UserPlus, TrendingUp } from 'lucide-react';

interface AnalyticsSummaryProps {
  data: {
    views: number;
    shares: number;
    contacts: number;
    growth: number;
  };
}

export function AnalyticsSummary({ data }: AnalyticsSummaryProps) {
  const metrics = [
    {
      label: 'Total Views',
      value: data.views.toLocaleString(),
      icon: Eye,
      change: '+12.5%',
      positive: true
    },
    {
      label: 'Profile Shares',
      value: data.shares.toLocaleString(),
      icon: Share2,
      change: '+8.2%',
      positive: true
    },
    {
      label: 'Contact Saves',
      value: data.contacts.toLocaleString(),
      icon: UserPlus,
      change: '-2.4%',
      positive: false
    },
    {
      label: 'Growth Rate',
      value: `${data.growth}%`,
      icon: TrendingUp,
      change: '+4.1%',
      positive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg">
              <metric.icon className="w-5 h-5 text-indigo-600" />
            </div>
            <span className={`text-sm font-medium ${
              metric.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">
            {metric.value}
          </h3>
          <p className="text-sm text-gray-600">{metric.label}</p>
        </div>
      ))}
    </div>
  );
}