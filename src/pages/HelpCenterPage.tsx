import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, FileText, Settings, Shield, Zap, HelpCircle } from 'lucide-react';
import { HelpHeader } from '../components/help/HelpHeader';
import { CategoryCard } from '../components/help/CategoryCard';
import { ArticleList } from '../components/help/ArticleList';

const categories = [
  {
    id: 'getting-started',
    icon: Book,
    title: 'Getting Started',
    description: 'Learn the basics and get up and running quickly',
    articleCount: 8
  },
  {
    id: 'features',
    icon: Zap,
    title: 'Features & Tools',
    description: 'Discover all the powerful features at your disposal',
    articleCount: 12
  },
  {
    id: 'account',
    icon: Settings,
    title: 'Account Settings',
    description: 'Manage your account and preferences',
    articleCount: 6
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security & Privacy',
    description: 'Keep your data safe and secure',
    articleCount: 5
  }
];

const popularArticles = [
  {
    id: '1',
    title: 'Creating Your First Digital Card',
    excerpt: 'Learn how to create and customize your digital business card in minutes.',
    category: 'Getting Started',
    readTime: 5
  },
  {
    id: '2',
    title: 'Sharing Your Card with QR Codes',
    excerpt: 'Master the different ways to share your digital card with others.',
    category: 'Features',
    readTime: 3
  },
  {
    id: '3',
    title: 'Understanding Analytics',
    excerpt: 'Get insights into how your digital card is performing.',
    category: 'Features',
    readTime: 7
  },
  {
    id: '4',
    title: 'Managing Your Contacts',
    excerpt: 'Learn how to organize and manage your professional network.',
    category: 'Features',
    readTime: 4
  }
];

export function HelpCenterPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/help/categories/${categoryId}`);
  };

  const handleArticleClick = (articleId: string) => {
    navigate(`/help/articles/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <HelpHeader 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                title={category.title}
                description={category.description}
                articleCount={category.articleCount}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>

        {/* Popular Articles */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Popular Articles</h2>
          <ArticleList 
            articles={popularArticles}
            onArticleClick={handleArticleClick}
          />
        </div>

        {/* Contact Support */}
        <div className="mt-16 bg-white rounded-xl border border-gray-200 p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-50 rounded-full mb-4">
            <HelpCircle className="w-8 h-8 text-brand-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. Get in touch and we'll get back to you as soon as we can.
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="inline-flex items-center justify-center px-6 py-3 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}