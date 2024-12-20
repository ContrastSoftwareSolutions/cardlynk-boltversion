import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface WelcomeStepProps {
  onNext: () => void;
}

export function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to CardLynk
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Let's create your digital business card in just a few steps
        </p>
      </div>

      <button
        onClick={onNext}
        className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
      >
        Get Started
        <ArrowRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}