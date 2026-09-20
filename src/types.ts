export type PageTab = 'home' | 'about' | 'packages' | 'terms';

export type AgeBand = '18-64' | '65-75';

export interface SupportPackage {
  id: string;
  packageNumber: number;
  name: string;
  tagline: string;
  headline: string;
  grocerySupport: number;
  cashBenefit?: number;
  cateringGuests?: number;
  totalValue: number;
  premiums: {
    age18_64: number;
    age65_75: number;
  };
  description: string;
  cateringIncludes?: string[];
}
