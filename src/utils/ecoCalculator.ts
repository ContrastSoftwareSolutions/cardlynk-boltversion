import type { EcoAction } from '../types';

const IMPACT_FACTORS = {
  scan: {
    paperSaved: 1, // 1 business card = 1 sheet
    treesSaved: 0.0001, // 10,000 sheets = 1 tree
    carbonReduced: 10, // 10g CO2 per card
  },
  share: {
    paperSaved: 2, // Assuming each share saves 2 potential cards
    treesSaved: 0.0002,
    carbonReduced: 20,
  },
  view: {
    paperSaved: 0.5, // Assuming 50% of views prevent a physical card
    treesSaved: 0.00005,
    carbonReduced: 5,
  },
};

export function calculateEcoImpact(action: EcoAction['type']): EcoAction['impact'] {
  const factor = IMPACT_FACTORS[action];
  
  return {
    paperSaved: factor.paperSaved,
    treesSaved: factor.treesSaved,
    carbonReduced: factor.carbonReduced,
  };
}

export function formatEcoMetrics(value: number, unit: string): string {
  if (value < 1) {
    return `${(value * 1000).toFixed(1)}m${unit}`;
  }
  return `${value.toFixed(1)}${unit}`;
}