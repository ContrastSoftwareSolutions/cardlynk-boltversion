import React from 'react';
import { motion } from 'framer-motion';
import { UserCircle, Building2, ArrowLeft } from 'lucide-react';
import type { OnboardingData } from '../../../types';

interface ProfileTypeStepProps {
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
}

export function ProfileTypeStep({ onNext, onBack }: ProfileTypeStepProps) {
  const handleSelect = (type: 'personal' | 'business') => {
    onNext({ profileType: type });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choose your profile type
        </h2>
        <p className="text-gray-600">
          Select the type of profile that best represents you
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('personal')}
          className="p-6 bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-600 transition-all"
        >
          <UserCircle className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Personal</h3>
          <p className="text-sm text-gray-600">
            Perfect for individuals, freelancers, and professionals
          </p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect('business')}
          className="p-6 bg-white rounded-xl shadow-sm border-2 border-transparent hover:border-indigo-600 transition-all"
        >
          <Building2 className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Business</h3>
          <p className="text-sm text-gray-600">
            Ideal for companies, teams, and organizations
          </p>
        </motion.button>
      </div>

      <button
        onClick={onBack}
        className="inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>
    </div>
  );
}