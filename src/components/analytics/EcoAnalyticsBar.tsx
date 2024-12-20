import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, TreePine, Share2 } from 'lucide-react';
import type { EcoMetrics } from '../../types';

interface EcoAnalyticsBarProps {
  metrics: EcoMetrics;
  brandColor?: string;
  variant?: 'compact' | 'full';
}

export function EcoAnalyticsBar({ metrics, brandColor = '#6366F1', variant = 'full' }: EcoAnalyticsBarProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 1,
    }).format(num);
  };

  if (variant === 'compact') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TreePine className="w-5 h-5 text-green-600" />
              <h3 className="text-sm font-medium text-gray-900">Environmental Impact</h3>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {/* Trees Saved */}
            <div className="relative">
              <div className="absolute inset-0 bg-green-50 rounded-lg" />
              <motion.div
                className="absolute inset-0 bg-green-100 rounded-lg origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: metrics.treesSaved / 100 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <div className="relative p-3">
                <div className="text-lg font-bold text-gray-900">
                  {formatNumber(metrics.treesSaved)}
                </div>
                <div className="text-xs text-gray-500">Trees Saved</div>
              </div>
            </div>

            {/* Carbon Reduction */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-50 rounded-lg" />
              <motion.div
                className="absolute inset-0 bg-blue-100 rounded-lg origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: metrics.carbonReduced / 1000 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <div className="relative p-3">
                <div className="text-lg font-bold text-gray-900">
                  {formatNumber(metrics.carbonReduced)}g
                </div>
                <div className="text-xs text-gray-500">CO₂ Reduced</div>
              </div>
            </div>

            {/* Digital Interactions */}
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-50 rounded-lg" />
              <motion.div
                className="absolute inset-0 rounded-lg origin-left"
                style={{ backgroundColor: brandColor }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                transition={{ duration: 1 }}
              />
              <div className="relative p-3">
                <div className="text-lg font-bold text-gray-900">
                  {formatNumber(
                    metrics.digitalInteractions.scans +
                    metrics.digitalInteractions.shares +
                    metrics.digitalInteractions.views
                  )}
                </div>
                <div className="text-xs text-gray-500">Digital Saves</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Full variant - original implementation
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* ... existing full implementation ... */}
    </div>
  );
}