import { SupportPackage, ClaimDocument, FaqItem, ColorTheme } from '../types';

export const COMPANY_INFO = {
  acronym: 'PFP',
  fullName: 'PREMIUM FUNERAL PLANNING',
  promise: 'At PFP, every detail with Care.',
  motto: 'Plan ahead. Prepare your family. Let PFP support you when it matters most.',
  payoutTimeframe: '48–72 hours',
  waitingPeriodNatural: '6 months',
  cateringExperience: '10+ years',
  supermarketGroceryValue: 'R15,000',
  cateringCapacity: 'Up to 500 people',
  phone: '0800 737 466',
  phoneDirect: '+27 11 892 4000',
  whatsapp: '+27 82 555 7437',
  email: 'info@premiumfuneralplanning.co.za',
  claimsEmail: 'claims@premiumfuneralplanning.co.za',
  complaintsEmail: 'complaints@premiumfuneralplanning.co.za',
  address: 'Sandton City Office Tower, 5th Floor, 158 5th St, Sandhurst, Johannesburg, South Africa',
  hours: '24/7 Claims Assistance | Mon - Fri 08:00 - 17:00 (Administration)',
  popiaNotice: 'PFP handles personal information in accordance with South Africa\'s Protection of Personal Information Act (POPIA).'
};

export const SUPPORT_PACKAGES: SupportPackage[] = [
  {
    id: 'package-1',
    packageNumber: 1,
    name: 'Package 1',
    tagline: 'GROCERY SUPPORT',
    headline: 'Grocery Support up to R15,000',
    grocerySupport: 15000,
    totalValue: 15000,
    premiums: {
      age18_64: 295,
      age65_75: 445,
    },
    description: 'Receive grocery support of up to R15,000 through a voucher redeemable at your nearest supermarket, helping your family purchase essential food and supplies during the funeral period.',
    features: [
      'Grocery support voucher of up to R15,000',
      'Redeemable at nearest leading supermarkets (Shoprite, Checkers, Pick n Pay, Spar)',
      'Immediate relief for household staples and food supplies',
      '48–72 hour claim turnaround upon document verification',
      'Dedicated claims assistance officer',
      'Transparent underwriting with 6-month natural death waiting period'
    ]
  },
  {
    id: 'package-2',
    packageNumber: 2,
    name: 'Package 2',
    tagline: 'GROCERY & CASH BENEFIT',
    headline: 'R15,000 Grocery Support + R10,000 Cash Benefit',
    grocerySupport: 15000,
    cashBenefit: 10000,
    totalValue: 25000,
    premiums: {
      age18_64: 395,
      age65_75: 545,
    },
    popular: true,
    description: 'Receive grocery support of up to R15,000, together with a R10,000 cash benefit paid directly into the client\'s bank account to provide essential financial flexibility during the funeral period.',
    features: [
      'Grocery support voucher of up to R15,000',
      'R10,000 Cash Benefit paid directly into your verified bank account',
      'Total combined benefit value of R25,000',
      'Flexible cash assistance for tent hire, transport, electricity or airtime',
      'Voucher redeemable at major national supermarkets',
      'Expedited 48–72 hour payout processing',
      'Full claims guidance and respectful family support'
    ]
  },
  {
    id: 'package-3',
    packageNumber: 3,
    name: 'Package 3',
    tagline: 'GROCERY & CATERING SUPPORT',
    headline: 'R15,000 Grocery Support + Catering Support for 500 People',
    grocerySupport: 15000,
    cateringGuests: 500,
    totalValue: 30000,
    premiums: {
      age18_64: 445,
      age65_75: 645,
    },
    highlight: true,
    description: 'Receive grocery support of up to R15,000, together with professional full-service catering support for up to 500 people. Built from over a decade of catering expertise to lift the heaviest practical burden off your family.',
    cateringIncludes: [
      'Professional cooking team',
      'Dedicated serving stations',
      'Heavy-duty pots and cooking equipment',
      'Gas stoves and industrial burners',
      'Full set of serving utensils and trays',
      'Complete kitchen setup & post-service clean-up'
    ],
    features: [
      'Grocery support voucher of up to R15,000',
      'Professional catering support for up to 500 people',
      'Experienced culinary team managing preparation and food execution',
      'Complete setup with pots, gas stoves, burners and serving stations',
      'Full post-service clean-up so family can focus on mourning',
      'Total package value of R30,000',
      'Backed by partners with 10+ years of catering excellence'
    ]
  }
];

export const CATERING_PILLARS = [
  {
    title: 'Up to 500 People Capacity',
    desc: 'Generously provisioned to feed both intimate extended family and the wider community of mourners without shortage.',
    icon: 'Users'
  },
  {
    title: 'Professional Cooking Team',
    desc: 'Trained, respectful chefs and kitchen hands who take complete charge of meal preparation and timing on the day.',
    icon: 'ChefHat'
  },
  {
    title: 'Dedicated Serving Stations',
    desc: 'Organized, clean buffet stations and dishing points designed to serve large queues quickly and with dignity.',
    icon: 'Utensils'
  },
  {
    title: 'Industrial Pots & Cookware',
    desc: 'Commercial-grade large cast iron and stainless steel pots suited for traditional funeral menus and stews.',
    icon: 'Flame'
  },
  {
    title: 'Gas Stoves & High-Output Burners',
    desc: 'Safe, self-contained gas cooking units that operate independently of municipal power outages or load shedding.',
    icon: 'Sparkles'
  },
  {
    title: 'Complete Setup & Service Clean-Up',
    desc: 'We arrive early to organize the prep area and stay behind to wash up, pack down, and leave the grounds clean.',
    icon: 'Sparkle'
  }
];

export const CLAIM_DOCUMENTS: ClaimDocument[] = [
  {
    id: 'doc-id',
    name: 'Identification Documents',
    description: 'Certified copy of the deceased\'s RSA ID and certified copy of the claimant\'s RSA ID.',
    requiredFor: 'all',
    iconName: 'CreditCard'
  },
  {
    id: 'doc-cert',
    name: 'Official Death Certificate',
    description: 'Original or certified copy of the official Home Affairs Death Certificate (DHA-5).',
    requiredFor: 'all',
    iconName: 'FileText'
  },
  {
    id: 'doc-bi1663',
    name: 'Notification of Death (BI-1663 / DHA-1663)',
    description: 'Medical certificate issued by the medical practitioner who certified the death.',
    requiredFor: 'all',
    iconName: 'ClipboardCheck'
  },
  {
    id: 'doc-policy',
    name: 'Membership / Policy Information',
    description: 'PFP membership number or initial policy schedule document.',
    requiredFor: 'all',
    iconName: 'Shield'
  },
  {
    id: 'doc-bank',
    name: 'Banking Details / Stamped Statement',
    description: 'Official bank confirmation letter or 3-month statement (required for Package 2 cash benefit).',
    requiredFor: 'cash',
    iconName: 'Building'
  },
  {
    id: 'doc-police',
    name: 'Police Report (If Accidental / Unnatural)',
    description: 'SAPS report and accident report number where death was accidental.',
    requiredFor: 'all',
    iconName: 'AlertCircle'
  }
];

export const GROCERY_BASKET_ITEMS = [
  { category: 'Staple Grains & Carbs', items: '50kg Super Maize Meal, 25kg Long Grain Parboiled Rice, 25kg Cake Flour, 10kg Samp, Pasta boxes', share: '32%' },
  { category: 'Meats & Proteins', items: 'Beef stew cuts, Chicken portions, Boiling fowl, Eggs, Canned pilchards and baked beans', share: '35%' },
  { category: 'Cooking Essentials & Oils', items: '20L Pure Cooking Oil, Spices, Salt, Stock powders, Tomato paste, Garlic & ginger', share: '12%' },
  { category: 'Fresh Produce & Vegetables', items: 'Pockets of potatoes, Onions, Butternut, Cabbage, Carrots, Green peppers', share: '11%' },
  { category: 'Beverages & Sugar', items: '10kg White Sugar, 100s Tea bags, Instant Coffee, Rooibos, Powdered soft drinks', share: '6%' },
  { category: 'Sanitation & Disposables', items: 'Dishwashing liquids, Bleach, Heavy-duty refuse bags, Napkins, Hand sanitizers', share: '4%' }
];

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'navy',
    name: 'Midnight Navy & Gold',
    description: 'The signature PFP brand palette. Represents deep trust, prestige, solemnity, and reassurance.',
    primaryHex: '#0C1E36',
    accentHex: '#C59B27',
    bgHex: '#FAF9F6',
    badge: 'Signature Default'
  },
  {
    id: 'emerald',
    name: 'Forest Emerald & Warm Brass',
    description: 'Deep South African emerald green celebrating family heritage, renewal, and timeless dignity.',
    primaryHex: '#083324',
    accentHex: '#C59B27',
    bgHex: '#F8FAF8',
    badge: 'Heritage & Life'
  },
  {
    id: 'burgundy',
    name: 'Regal Burgundy & Champagne',
    description: 'Warm deep wine with sparkling champagne gold accents, honoring love, memory, and respect.',
    primaryHex: '#380F1E',
    accentHex: '#D4AF37',
    bgHex: '#FAF7F8',
    badge: 'Warmth & Reverence'
  },
  {
    id: 'charcoal',
    name: 'Dark Slate & Rose Gold',
    description: 'Contemporary slate charcoal paired with subtle rose metallic, offering quiet modern elegance.',
    primaryHex: '#181C24',
    accentHex: '#C07D63',
    bgHex: '#F8F9FA',
    badge: 'Modern Elegance'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'packages',
    question: 'How does the R15,000 grocery support voucher work?',
    answer: 'Once your claim is validated, PFP issues a digital or physical grocery voucher valued at up to R15,000. This voucher is redeemable at participating national supermarket chains across South Africa (such as Shoprite, Checkers, Pick n Pay, and Spar). It enables your family to procure bulk staples, meats, fresh produce, and drinks directly without paying out of pocket.'
  },
  {
    category: 'packages',
    question: 'What is included in the catering support for Package 3?',
    answer: 'Package 3 provides full-service catering support for up to 500 mourners and attendees. It includes a dedicated professional cooking team, commercial-grade pots and cookware, gas stoves and high-output burners (no dependence on electricity or load shedding), serving stations, dishing utensils, and full setup and post-service clean-up. Our catering partners carry more than 10 years of specialized funeral catering experience.'
  },
  {
    category: 'payments',
    question: 'How are monthly premiums determined?',
    answer: 'Premiums are based on the specific package chosen (Package 1, 2, or 3) and the age band of the principal member at entry: 18–64 years (ranging from R295 to R445/month) or 65–75 years (ranging from R445 to R645/month). Premiums are payable through your approved payment method on your chosen scheduled monthly date.'
  },
  {
    category: 'claims',
    question: 'How fast are claims assessed and paid out?',
    answer: 'PFP commits to processing and paying eligible claims within 48 to 72 hours following the receipt of all required supporting documentation. For Package 2, cash benefits are transferred directly into the claimant\'s verified bank account; grocery vouchers and catering coordinators are dispatched immediately.'
  },
  {
    category: 'compliance',
    question: 'What is the waiting period for natural and accidental death?',
    answer: 'Under the PFP proposal, there is a standard 6-month waiting period for natural death from the policy inception date, subject to final underwriting approval and policy terms. Accidental and unnatural deaths are governed by approved policy terms and are typically covered from the first successful premium payment.'
  },
  {
    category: 'payments',
    question: 'What happens if a monthly premium is missed?',
    answer: 'We understand that unexpected financial circumstances arise. Where a payment is missed, your membership enters an approved grace period. If premiums remain unpaid after the grace period expires, the policy may lapse. Reinstatement may be requested subject to applicable rules and payment of outstanding premiums.'
  },
  {
    category: 'compliance',
    question: 'How does PFP protect my privacy and personal data?',
    answer: 'We respect member confidentiality. All personal and health information collected for underwriting, administration, and claims processing is strictly handled in accordance with the Protection of Personal Information Act (POPIA) and data security regulations.'
  },
  {
    category: 'compliance',
    question: 'How do I lodge a complaint or feedback?',
    answer: 'PFP has an official complaints channel reachable at complaints@premiumfuneralplanning.co.za or via our toll-free customer line. We investigate all administrative inquiries directly. In matters relating to insurer claim underwriting determinations, formal insurer dispute and ombud resolution channels are provided.'
  }
];
