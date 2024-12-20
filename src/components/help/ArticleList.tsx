import React from 'react';
import { ChevronRight, FileText } from 'lucide-react';
import { Card } from '../ui/Card';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: number;
}

interface ArticleListProps {
  articles: Article[];
  onArticleClick: (articleId: string) => void;
}

export function ArticleList({ articles, onArticleClick }: ArticleListProps) {
  return (
    <div className="space-y-4">
      {articles.map((article) => (
        <Card 
          key={article.id}
          hover
          className="cursor-pointer"
          onClick={() => onArticleClick(article.id)}
        >
          <Card.Body className="flex items-center gap-4">
            <div className="p-2 bg-gray-100 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
              <p className="text-sm text-gray-600">{article.excerpt}</p>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span>{article.category}</span>
                <span>·</span>
                <span>{article.readTime} min read</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}