import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { OnboardingData } from '../../../types';

interface CompletionStepProps {
  data: Partial<OnboardingData>;
  onNext: (data: Partial<OnboardingData>) => void;
}

export function CompletionStep({ data, onNext }: CompletionStepProps) {
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const handleViewProfile = () => {
    onNext(data);
  };

  return (
    <motion.div 
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <motion.div 
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
        >
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </motion.div>
        <motion.h2 
          className="text-3xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          You're all set!
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Your digital profile is ready to be shared with the world
        </motion.p>
      </div>

      <motion.button
        onClick={handleViewProfile}
        className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        View My Profile
      </motion.button>
    </motion.div>
  );
}