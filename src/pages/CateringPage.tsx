import React from 'react';
import { ArrowRight, Utensils, ShoppingBag, ChefHat, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { GROCERY_BASKET_ITEMS } from '../data/pfpData';

interface CateringPageProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const CateringPage: React.FC<CateringPageProps> = ({ onOpenQuote }) => {
  const pillars = [
    {
      number: '01',
      title: 'Professional Cooking Team',
      desc: 'Trained, respectful kitchen personnel take complete charge of meal preparation, timing, and traditional recipes so immediate family never have to stand over smoke and fires.'
    },
    {
      number: '02',
      title: 'Dedicated Serving Stations',
      desc: 'Hygienic buffet lines, structured dishing points, and crowd-flow management ensuring that up to 500 guests and community members are served smoothly and respectfully.'
    },
    {
      number: '03',
      title: 'Pots & Heavy Equipment',
      desc: 'Commercial-grade large cauldrons, heavy-duty pots, food prep stations, and storage vessels — eliminating the stress and expense of hiring private equipment.'
    },
    {
      number: '04',
      title: 'Gas Stoves & Burners',
      desc: 'Independent, high-output industrial gas cooking units that operate with zero dependence on municipal power grids, load-shedding schedules, or wet firewood.'
    },
    {
      number: '05',
      title: 'Serving Utensils & Food Pans',
      desc: 'Full compliment of stainless steel dishing ladles, tongs, carvers, deep food pans, and protective shields provided directly on site.'
    },
    {
      number: '06',
      title: 'Setup & Service Clean-Up',
      desc: 'Our team arrives before dawn to stage the catering area and remains until all equipment is packed down, pots are scrubbed, and the family grounds are restored.'
    }
  ];

  const supermarkets = [
    { name: 'Shoprite', note: 'Nationwide Low-Price Superstores' },
    { name: 'Checkers', note: 'Fresh Food & Bulk Wholesalers' },
    { name: 'Pick n Pay', note: 'Neighbourhood & Hyper Stores' },
    { name: 'SPAR', note: 'Community & Rural Supermarkets' },
    { name: 'Boxer', note: 'Essential Food & Meat Wholesalers' },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            LOGISTICAL CARE &bull; 500-GUEST CATERING &amp; GROCERY RELIEF
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Feeding 500 Mourners With Dignity. <br />
          <span className="gold-text-gradient italic">Every Behind-the-Scenes Detail Handled.</span>
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          Through more than 10 years working hand in hand with catering companies in the funeral industry, we have seen how much goes into feeding and accommodating family members and guests during a funeral. Catering is a responsibility that families often need help managing.
        </p>
      </div>

      {/* 6 Logistical Pillars Grid with Smooth Cards */}
      <div className="space-y-8">
        <div className="border-b border-stone-800 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
            PACKAGE 3 CATERING SPECIFICATIONS
          </span>
          <h2 className="font-serif text-3xl font-normal text-white mt-1">
            The 6 Inclusions of PFP Professional Catering
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="smooth-card p-8 space-y-3 relative group"
            >
              <div className="font-serif text-3xl gold-text-gradient font-bold">
                {pillar.number}
              </div>
              <h3 className="font-serif text-xl font-medium text-white group-hover:text-gold-300 transition-colors">
                {pillar.title}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison: Conventional Cash Policy vs PFP Package 3 */}
      <div className="smooth-card p-8 sm:p-12 shadow-2xl space-y-8">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
            THE LOGISTICAL DIFFERENCE
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
            Conventional Funeral Cover vs PFP Package 3
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-800">
          {/* Old Way */}
          <div className="space-y-4 md:pr-8 pt-4 md:pt-0">
            <div className="font-serif text-lg text-stone-300 font-medium">
              The Conventional Reality (Cash Only)
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400 font-light">
              <li className="flex items-start gap-2.5">
                <span className="text-stone-500 font-serif font-bold">—</span>
                <span>A cash payout requires the grieving family to frantically locate, interview, and negotiate with private caterers under intense emotional distress.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-stone-500 font-serif font-bold">—</span>
                <span>Close relatives spend the vigil and funeral days peeling vegetables, tending wood smoke, and washing giant pots instead of mourning peacefully.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-stone-500 font-serif font-bold">—</span>
                <span>The family must locate and rent gas bottles, cauldrons, and serving tables separately, paying steep short-notice deposits.</span>
              </li>
            </ul>
          </div>

          {/* PFP Way */}
          <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
            <div className="font-serif text-lg gold-text-gradient font-semibold">
              The PFP Practical Relief Model
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-200">
              <li className="flex items-start gap-2.5">
                <span className="text-gold-400 font-serif font-bold">&bull;</span>
                <span><strong>Full Turnkey Catering:</strong> A professional culinary team arrives equipped to feed up to 500 mourners with dignity and hygiene.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold-400 font-serif font-bold">&bull;</span>
                <span><strong>Family Sits in Remembrance:</strong> Your family members spend the funeral remembering their loved one, not carrying pots or queuing at stoves.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold-400 font-serif font-bold">&bull;</span>
                <span><strong>Complete Equipment &amp; Clean-Up:</strong> Industrial gas burners, pots, serving utensils, and full post-service site clean-up included.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-stone-400 font-serif italic">
            Total Package 3 Value: R30,000 &bull; Monthly Premiums: 18–65: R445 | 65–75: R645
          </span>
          <button
            onClick={() => onOpenQuote('package-3')}
            className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase inline-flex items-center gap-2"
          >
            <span>Choose Package 3 (Grocery + Catering)</span>
            <ArrowRight className="w-4 h-4 text-obsidian-950" />
          </button>
        </div>
      </div>

      {/* Supermarket Grocery Voucher System */}
      <div className="space-y-8 pt-6">
        <div className="max-w-4xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-gold-500" />
            <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
              UP TO R15,000 GROCERY VOUCHER &bull; INCLUDED IN ALL PACKAGES
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
            Essential Supermarket Food Relief Without Out-of-Pocket Strain
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light leading-relaxed">
            Every PFP package includes grocery support of up to R15,000 through a voucher redeemable at your nearest participating supermarket, helping your family purchase essential food and supplies during the funeral period.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Supermarket network */}
          <div className="lg:col-span-6 space-y-6">
            <div className="smooth-card p-8 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                PARTNER RETAIL NETWORKS
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                Redeemable at Your Nearest Supermarket
              </h3>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                When an eligible claim is accepted, PFP promptly issues the grocery voucher. Redeemable nationwide at leading South African supermarket chains:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {supermarkets.map((sm, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#0B0C10] border border-gold-500/20">
                    <div className="font-serif font-bold text-white text-base">{sm.name}</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">{sm.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Allocation Basket */}
          <div className="lg:col-span-6">
            <div className="smooth-card p-8 space-y-5">
              <div className="border-b border-stone-800 pb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  PRACTICAL ALLOCATION BREAKDOWN
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mt-1">
                  What R15,000 in Grocery Support Covers
                </h3>
              </div>

              <div className="divide-y divide-stone-800 text-xs">
                {GROCERY_BASKET_ITEMS.map((item, idx) => (
                  <div key={idx} className="py-3 space-y-1">
                    <div className="flex justify-between font-serif text-sm">
                      <span className="text-white font-medium">{item.category}</span>
                      <span className="text-gold-400 font-bold">{item.share}</span>
                    </div>
                    <p className="text-stone-400 text-[11px] font-light leading-relaxed">
                      {item.items}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
