import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowLeft, Github, Chrome, Wand2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { SocialButton } from '../components/auth/SocialButton';

const sampleData = {
  name: 'John Smith',
  email: 'john.smith@example.com',
  password: 'Password123!',
  confirmPassword: 'Password123!'
};

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/onboarding');
  };

  const handleSocialAuth = (provider: string) => {
    // TODO: Implement social auth
    console.log(`Authenticating with ${provider}`);
    navigate('/onboarding');
  };

  const handleAutofill = () => {
    setFormData(sampleData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to home
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Create your account
            </h1>
            <p className="text-gray-600">
              Get started with your digital business card
            </p>
          </div>

          {/* Social Sign Up Options */}
          <div className="space-y-3 mb-8">
            <SocialButton
              icon={Chrome}
              provider="Google"
              onClick={() => handleSocialAuth('google')}
              fullWidth
            />
            <SocialButton
              icon={Github}
              provider="GitHub"
              onClick={() => handleSocialAuth('github')}
              fullWidth
            />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with email
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Autofill Button */}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleAutofill}
                leftIcon={<Wand2 className="w-4 h-4" />}
              >
                Autofill
              </Button>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-brand-600 hover:text-brand-700 font-medium"
              >
                Log in
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}