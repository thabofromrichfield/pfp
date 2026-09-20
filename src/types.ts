export interface SupportPackage {
  id: 'package-1' | 'package-2' | 'package-3';
  packageNumber: 1 | 2 | 3;
  name: string;
  tagline: string;
  headline: string;
  grocerySupport: number; // e.g. 15000
  cashBenefit?: number; // e.g. 10000
  cateringGuests?: number; // e.g. 500
  totalValue: number;
  premiums: {
    age18_64: number;
    age65_75: number;
  };
  highlight?: boolean;
  popular?: boolean;
  description: string;
  cateringIncludes?: string[];
  features: string[];
}

export type AgeBand = '18-64' | '65-75';

export interface ClaimDocument {
  id: string;
  name: string;
  description: string;
  requiredFor: 'all' | 'cash' | 'catering';
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'packages' | 'payments' | 'claims' | 'catering' | 'compliance';
}

export interface ColorTheme {
  id: string;
  name: string;
  description: string;
  primaryHex: string;
  accentHex: string;
  bgHex: string;
  badge: string;
}
