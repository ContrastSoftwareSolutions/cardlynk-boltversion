import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / (totalSteps - 1)) * 100;

  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
      <motion.div
        className="h-full bg-indigo-600"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}