import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  articleCount: number;
  onClick: () => void;
}

export function CategoryCard({ 
  icon: Icon, 
  title, 
  description, 
  articleCount,
  onClick 
}: CategoryCardProps) {
  return (
    <Card 
      hover
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card.Body className="flex items-start gap-4">
        <div className="p-3 bg-brand-50 rounded-lg">
          <Icon className="w-6 h-6 text-brand-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-sm text-brand-600">{articleCount} articles</p>
        </div>
      </Card.Body>
    </Card>
  );
}