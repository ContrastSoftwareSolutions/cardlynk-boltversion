import React from 'react';
import { Smartphone, Laptop, Tablet } from 'lucide-react';

interface DeviceStatsProps {
  data: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
}

export function DeviceStats({ data }: DeviceStatsProps) {
  const total = data.mobile + data.desktop + data.tablet;
  const devices = [
    {
      name: 'Mobile',
      value: data.mobile,
      percentage: Math.round((data.mobile / total) * 100),
      icon: Smartphone,
      color: 'bg-blue-500'
    },
    {
      name: 'Desktop',
      value: data.desktop,
      percentage: Math.round((data.desktop / total) * 100),
      icon: Laptop,
      color: 'bg-indigo-500'
    },
    {
      name: 'Tablet',
      value: data.tablet,
      percentage: Math.round((data.tablet / total) * 100),
      icon: Tablet,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Device Breakdown</h3>
      <div className="space-y-4">
        {devices.map((device) => (
          <div key={device.name}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <device.icon className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">
                  {device.name}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {device.percentage}%
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full ${device.color} transition-all`}
                style={{ width: `${device.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}