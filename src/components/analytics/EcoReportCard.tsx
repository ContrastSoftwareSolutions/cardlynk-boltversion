import React from 'react';
import { motion } from 'framer-motion';
import { Download, TreePine, Users, Building2 } from 'lucide-react';
import type { EcoMetrics } from '../../types';

interface EcoReportCardProps {
  metrics: EcoMetrics;
  companyName: string;
  teamSize: number;
  brandColor?: string;
}

export function EcoReportCard({ metrics, companyName, teamSize, brandColor = '#6366F1' }: EcoReportCardProps) {
  const downloadReport = () => {
    // TODO: Implement report download
    console.log('Downloading eco report...');
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Company Impact Report</h3>
            <p className="text-sm text-gray-500">Environmental savings across your organization</p>
          </div>
          <button
            onClick={downloadReport}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-white rounded-lg">
              <Building2 className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Company</div>
              <div className="font-semibold text-gray-900">{companyName}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-white rounded-lg">
              <Users className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Team Size</div>
              <div className="font-semibold text-gray-900">{teamSize} members</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-3 bg-white rounded-lg">
              <TreePine className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="text-sm text-gray-600">Trees Saved</div>
              <div className="font-semibold text-gray-900">{metrics.treesSaved.toFixed(1)}</div>
            </div>
          </div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Paper Reduction Goal</span>
              <span className="text-sm text-gray-500">
                {metrics.paperSaved} / 10,000 sheets
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-green-500"
                initial={{ width: 0 }}
                animate={{ width: `${(metrics.paperSaved / 10000) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Carbon Reduction</span>
              <span className="text-sm text-gray-500">
                {metrics.carbonReduced}g / 1000g CO₂
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full"
                style={{ backgroundColor: brandColor }}
                initial={{ width: 0 }}
                animate={{ width: `${(metrics.carbonReduced / 1000) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mt-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Environmental Achievements</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.treesSaved >= 1 && (
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <TreePine className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">First Tree Saved</div>
              </div>
            )}
            {metrics.paperSaved >= 1000 && (
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-600 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 8v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  <path d="M12 12h.01" />
                </svg>
                <div className="text-sm font-medium text-gray-900">1000 Sheets Saved</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}