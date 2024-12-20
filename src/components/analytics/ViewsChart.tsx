import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { ResizeContainer } from '../ui';

interface ViewsChartProps {
  data: {
    date: string;
    views: number;
  }[];
}

export function ViewsChart({ data }: ViewsChartProps) {
  const maxViews = Math.max(...data.map(d => d.views));
  const [chartHeight, setChartHeight] = useState(256); // Default height

  const handleResize = (entry: ResizeObserverEntry) => {
    // Maintain aspect ratio or adjust height based on width
    const width = entry.contentRect.width;
    setChartHeight(Math.min(256, width * 0.5));
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Profile Views</h3>
        <button className="inline-flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg">
          <Calendar className="w-4 h-4" />
          Last 30 Days
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      <ResizeContainer onResize={handleResize}>
        <div style={{ height: chartHeight }} className="flex items-end gap-2">
          {data.map((day) => (
            <div
              key={day.date}
              className="flex-1 group relative"
              style={{ height: '100%' }}
            >
              <div
                className="absolute bottom-0 w-full bg-indigo-100 group-hover:bg-indigo-200 transition-all rounded-t"
                style={{
                  height: `${(day.views / maxViews) * 100}%`,
                }}
              >
                <div className="invisible group-hover:visible absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs py-1.5 px-2.5 rounded whitespace-nowrap">
                  {day.views.toLocaleString()} views
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-8 border-transparent border-t-gray-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </ResizeContainer>

      <div className="flex justify-between mt-4 text-xs text-gray-500">
        {data.filter((_, i) => i % 5 === 0).map((day) => (
          <span key={day.date}>{day.date}</span>
        ))}
      </div>
    </div>
  );
}