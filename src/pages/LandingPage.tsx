import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  QrCode, 
  Users, 
  BarChart2, 
  Zap, 
  Leaf, 
  Globe,
  ChevronRight,
  Check
} from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: QrCode,
      title: 'Smart QR Technology',
      description: 'Instantly share your digital card with anyone, anywhere'
    },
    {
      icon: Users,
      title: 'Contact Managers',
      description: 'Organize and nurture your professional network effortlessly'
    },
    {
      icon: BarChart2,
      title: 'Analytics Dashboard',
      description: 'Track engagement and measure your networking success'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Update your information once, changes reflect everywhere'
    },
    {
      icon: Leaf,
      title: 'Eco-friendly',
      description: 'Reduce paper waste and track your environmental impact'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with professionals worldwide, break language barriers'
    }
  ];

  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      features: [
        '1 Digital Card',
        'Basic Analytics',
        'QR Code Sharing',
        'Contact Management',
        'Standard Support'
      ]
    },
    {
      name: 'Pro',
      price: '$9.99',
      popular: true,
      features: [
        'Everything in Basic',
        'Unlimited Digital Cards',
        'Advanced Analytics',
        'Custom Branding',
        'Priority Support',
        'Team Collaboration'
      ]
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      features: [
        'Everything in Pro',
        'Custom Integration',
        'Dedicated Account Manager',
        'API Access',
        'SSO & Advanced Security',
        '24/7 Premium Support'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?w=1920&h=1080&fit=crop')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="py-6">
            <nav className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-8 h-8" />
                <span className="text-xl font-bold">CardLynk</span>
              </div>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-medium hover:text-indigo-200"
                >
                  Log in
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-medium bg-white text-indigo-600 rounded-lg hover:bg-indigo-50"
                >
                  Sign up
                </button>
              </div>
            </nav>
          </header>

          <div className="py-20 md:py-28 text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Your Digital Identity,{' '}
              <span className="text-indigo-200">Reimagined</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Create stunning digital business cards that make lasting impressions. 
              Share instantly, connect meaningfully, and track your networking success.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <button
                onClick={() => navigate('/onboarding')}
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium bg-white text-indigo-600 rounded-lg hover:bg-indigo-50 flex items-center justify-center gap-2"
              >
                Create Your Card
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/demo')}
                className="w-full sm:w-auto px-8 py-4 text-lg font-medium border-2 border-white rounded-lg hover:bg-white/10"
              >
                View Demo
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Network Smarter
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Replace traditional business cards with a powerful digital platform 
              that helps you make meaningful connections and grow your network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-indigo-500 transition-colors"
              >
                <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that best fits your needs. All plans include core features 
              to help you network more effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative bg-white p-8 rounded-xl border-2 ${
                  plan.popular 
                    ? 'border-indigo-500 shadow-xl' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <div className="bg-indigo-500 text-white px-3 py-1 text-sm font-medium rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-600">/month</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/register')}
                  className={`w-full py-3 rounded-lg font-medium ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Networking?
          </h2>
          <p className="text-xl text-indigo-100 mb-12 max-w-3xl mx-auto">
            Join thousands of professionals who've already made the switch to 
            digital business cards. Start for free today.
          </p>
          <button
            onClick={() => navigate('/onboarding')}
            className="px-8 py-4 text-lg font-medium bg-white text-indigo-600 rounded-lg hover:bg-indigo-50"
          >
            Create Your Digital Card
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Features</a></li>
                <li><a href="#" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
                <li><a href="#" className="hover:text-white">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">API Reference</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p>© 2024 CardLynk. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
