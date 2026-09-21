export type PageTab =
  | 'home'
  | 'about'
  | 'packages'
  | 'catering'
  | 'grocery'
  | 'claims'
  | 'terms';

export type AgeBand = '18-64' | '65-75';

export interface SupportPackage {
  id: string;
  packageNumber: number;
  name: string;
  tagline: string;
  headline: string;
  description: string;
  totalValue?: number;
  premiums: {
    age18_64: number; // 18-65 for Package 3
    age65_75: number;
    ageLabel1?: string;
  };
  cateringIncludes?: string[];
}
