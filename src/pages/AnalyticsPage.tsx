import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { MobileMenu } from '../components/profile/MobileMenu';
import { Menu, Download } from 'lucide-react';
import { AnalyticsSummary } from '../components/analytics/AnalyticsSummary';
import { ViewsChart } from '../components/analytics/ViewsChart';
import { DeviceStats } from '../components/analytics/DeviceStats';
import { EcoAnalyticsBar } from '../components/analytics/EcoAnalyticsBar';
import { EcoReportCard } from '../components/analytics/EcoReportCard';
import { DesktopSidebar } from '../components/layout/DesktopSidebar';
import { MobileFooter } from '../components/layout/MobileFooter';
import type { Profile } from '../types';

interface AnalyticsPageProps {
  profile: Profile;
  brandColor: string;
}

export function AnalyticsPage({ profile, brandColor }: AnalyticsPageProps) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Mock data - in a real app, this would come from an API
  const summaryData = {
    views: 1234,
    shares: 856,
    contacts: 432,
    growth: 15.8
  };

  const viewsData = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
      .toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    views: Math.floor(Math.random() * 100) + 20
  }));

  const deviceData = {
    mobile: 2156,
    desktop: 1548,
    tablet: 892
  };

  // Mock eco metrics data
  const ecoMetrics = {
    treesSaved: 12.5,
    paperSaved: 2500,
    carbonReduced: 450,
    digitalInteractions: {
      scans: 856,
      shares: 432,
      views: 1234
    },
    monthlyStats: [
      { month: 'Oct', treesSaved: 1.5, paperSaved: 300, carbonReduced: 50 },
      { month: 'Nov', treesSaved: 2.2, paperSaved: 440, carbonReduced: 75 },
      { month: 'Dec', treesSaved: 2.8, paperSaved: 560, carbonReduced: 95 },
      { month: 'Jan', treesSaved: 3.1, paperSaved: 620, carbonReduced: 105 },
      { month: 'Feb', treesSaved: 3.5, paperSaved: 700, carbonReduced: 120 },
      { month: 'Mar', treesSaved: 4.2, paperSaved: 840, carbonReduced: 140 }
    ]
  };

  const handleExportData = () => {
    // TODO: Implement data export functionality
    console.log('Exporting analytics data...');
  };

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Mobile Header */}
        <div className="flex justify-between items-center p-4 bg-white sticky top-0 z-10 border-b border-gray-100">
          <button onClick={() => setIsMenuOpen(true)} className="p-2 -ml-2">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <button 
            onClick={handleExportData}
            className="p-2 -mr-2"
          >
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <MobileMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          brandColor={brandColor}
        />

        {/* Analytics Content */}
        <div className="p-4 space-y-6">
          <AnalyticsSummary data={summaryData} />
          <EcoAnalyticsBar metrics={ecoMetrics} brandColor={brandColor} />
          <ViewsChart data={viewsData} />
          <DeviceStats data={deviceData} />
        </div>

        <MobileFooter brandColor={brandColor} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DesktopSidebar brandColor={brandColor} />
      
      {/* Desktop Content */}
      <div className="content-wrapper">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600">Track your profile performance and impact</p>
          </div>
          <button
            onClick={handleExportData}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <Download className="w-5 h-5" />
            Export Data
          </button>
        </div>

        <div className="space-y-6">
          <AnalyticsSummary data={summaryData} />
          <EcoAnalyticsBar metrics={ecoMetrics} brandColor={brandColor} />
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <ViewsChart data={viewsData} />
            </div>
            <div>
              <DeviceStats data={deviceData} />
            </div>
          </div>
          {profile.company && (
            <EcoReportCard 
              metrics={ecoMetrics}
              companyName={profile.company}
              teamSize={25}
              brandColor={brandColor}
            />
          )}
        </div>
      </div>
    </div>
  );
}