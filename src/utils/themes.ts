import type { Theme } from '../types';

export const DEFAULT_THEMES: Theme[] = [
  {
    id: 'minimal',
    name: 'Minimal',
    preview: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=800&fit=crop',
    colors: {
      background: 'linear-gradient(135deg, #a78bfa 0%, #818cf8 100%)',
      text: '#ffffff',
      accent: '#ffffff'
    },
    font: 'inter'
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    preview: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=800&fit=crop',
    colors: {
      background: '#09090b',
      text: '#ffffff',
      accent: '#818cf8'
    },
    font: 'inter'
  },
  {
    id: 'gradient',
    name: 'Gradient',
    preview: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&h=800&fit=crop',
    colors: {
      background: 'linear-gradient(135deg, #f97316 0%, #db2777 50%, #6366f1 100%)',
      text: '#ffffff',
      accent: '#ffffff'
    },
    font: 'inter'
  },
  {
    id: 'neon',
    name: 'Neon',
    preview: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=800&fit=crop',
    colors: {
      background: '#000000',
      text: '#ffffff',
      accent: '#22d3ee'
    },
    font: 'space-mono'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=800&fit=crop',
    colors: {
      background: 'linear-gradient(135deg, #f43f5e 0%, #fb923c 100%)',
      text: '#ffffff',
      accent: '#ffffff'
    },
    font: 'inter'
  },
  {
    id: 'ocean',
    name: 'Ocean',
    preview: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=400&h=800&fit=crop',
    colors: {
      background: 'linear-gradient(135deg, #0ea5e9 0%, #2dd4bf 100%)',
      text: '#ffffff',
      accent: '#ffffff'
    },
    font: 'inter'
  },
  {
    id: 'forest',
    name: 'Forest',
    preview: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=800&fit=crop',
    colors: {
      background: 'linear-gradient(135deg, #059669 0%, #65a30d 100%)',
      text: '#ffffff',
      accent: '#ffffff'
    },
    font: 'merriweather'
  },
  {
    id: 'midnight',
    name: 'Midnight',
    preview: 'https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?w=400&h=800&fit=crop',
    colors: {
      background: 'linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)',
      text: '#ffffff',
      accent: '#e879f9'
    },
    font: 'inter'
  },
  {
    id: 'elegant',
    name: 'Elegant',
    preview: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=800&fit=crop',
    colors: {
      background: '#27272a',
      text: '#ffffff',
      accent: '#d4d4d8'
    },
    font: 'playfair'
  },
  {
    id: 'aurora',
    name: 'Aurora',
    preview: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=400&h=800&fit=crop',
    colors: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%)',
      text: '#ffffff',
      accent: '#ffffff'
    },
    font: 'inter'
  },
  {
    id: 'retro',
    name: 'Retro',
    preview: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=800&fit=crop',
    colors: {
      background: '#fef3c7',
      text: '#78350f',
      accent: '#d97706'
    },
    font: 'space-mono'
  },
  {
    id: 'noire',
    name: 'Noire',
    preview: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=800&fit=crop',
    colors: {
      background: 'linear-gradient(135deg, #18181b 0%, #27272a 100%)',
      text: '#ffffff',
      accent: '#f43f5e'
    },
    font: 'inter'
  }
];

export function getThemeById(id: string): Theme {
  return DEFAULT_THEMES.find(theme => theme.id === id) || DEFAULT_THEMES[0];
}