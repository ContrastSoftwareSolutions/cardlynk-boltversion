import type { Profile } from './profile';
import type { Contact } from './contact';
import type { EcoMetrics } from './eco';

export interface Profile {
  id?: string;
  userId?: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  company: string;
  bio: string;
  avatar?: string;
  logo?: string;
  logoUrl?: string;
  website?: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  customization?: {
    font?: string;
    layout?: string;
    brandColor?: string;
    accentColor?: string;
  };
  ecoMetrics?: EcoMetrics;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface EcoMetrics {
  treesSaved: number;
  paperSaved: number; // in sheets
  carbonReduced: number; // in grams
  digitalInteractions: {
    scans: number;
    shares: number;
    views: number;
  };
  monthlyStats: {
    month: string;
    treesSaved: number;
    paperSaved: number;
    carbonReduced: number;
  }[];
}

export interface EcoAction {
  type: 'scan' | 'share' | 'view';
  timestamp: Date;
  impact: {
    treesSaved: number;
    paperSaved: number;
    carbonReduced: number;
  };
}

export * from './contact';