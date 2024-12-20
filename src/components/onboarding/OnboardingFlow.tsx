import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeStep } from './steps/WelcomeStep';
import { BasicInfoStep } from './steps/BasicInfoStep';
import { CustomizationStep } from './steps/CustomizationStep';
import { CompletionStep } from './steps/CompletionStep';
import { ProgressBar } from './ProgressBar';
import { DEFAULT_THEMES } from '../../utils/themes';
import type { Profile } from '../../types';

interface OnboardingFlowProps {
  onComplete: (profile: Profile, selectedTheme?: string) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<Partial<Profile>>({
    name: '',
    email: '',
    phone: '',
    title: '',
    company: '',
    bio: '',
    avatar: '',
    links: [],
    social: {}
  });
  const [selectedTheme, setSelectedTheme] = useState(DEFAULT_THEMES[0].id);

  const steps = [
    { component: WelcomeStep, title: 'Welcome' },
    { component: BasicInfoStep, title: 'Basic Info' },
    { component: CustomizationStep, title: 'Customize' },
    { component: CompletionStep, title: 'All Set!' },
  ];

  const currentStep = steps[step];

  const handleNext = (stepData: Partial<Profile> = {}) => {
    const newData = { ...data, ...stepData };
    setData(newData);

    if (step === steps.length - 1) {
      onComplete(newData as Profile, selectedTheme);
      navigate('/profile');
    } else {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    if (step === 0) {
      navigate('/');
    } else {
      setStep((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <img 
            src="https://cardlynk.com/wp-content/uploads/2024/02/Group-161.png" 
            alt="CardLynk" 
            className="h-12 w-auto mx-auto mb-8"
          />
          <ProgressBar currentStep={step} totalSteps={steps.length} />
        </div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-sm p-8"
          >
            {React.createElement(currentStep.component, {
              data,
              onNext: handleNext,
              onBack: handleBack,
              isFirstStep: step === 0,
              isLastStep: step === steps.length - 1,
              selectedTheme,
              onThemeChange: setSelectedTheme,
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}