import React from 'react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { GROCERY_BASKET_ITEMS } from '../data/pfpData';

interface GroceryVoucherSectionProps {
  onSelectPackage: (pkgId: string) => void;
}

export const GroceryVoucherSection: React.FC<GroceryVoucherSectionProps> = ({ onSelectPackage }) => {
  const supermarkets = [
    { name: 'Shoprite', note: 'Nationwide Low-Price Superstores' },
    { name: 'Checkers', note: 'Fresh Food & Bulk Wholesalers' },
    { name: 'Pick n Pay', note: 'Neighbourhood & Hyper Stores' },
    { name: 'SPAR', note: 'Community & Rural Supermarkets' },
    { name: 'Boxer', note: 'Essential Food & Meat Wholesalers' },
  ];

  return (
    <section id="grocery" className="py-20 sm:py-28 bg-[#08080A] border-b border-gold-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            SUPERMARKET GROCERY VOUCHER &bull; UP TO R15,000 BENEFIT
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-[1.12]">
            Essential food and supplies during the funeral period, delivered directly where you shop.
          </h2>
          <p className="mt-4 text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Every PFP package includes grocery support of up to R15,000 through a voucher redeemable at your nearest participating supermarket, helping your family purchase essential food, meats, staples, and supplies without dipping into family savings.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Voucher Mechanism & Supermarkets */}
          <div className="lg:col-span-6 space-y-8">
            <div className="dark-glass-card p-8 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                HOW THE GROCERY BENEFIT OPERATES
              </span>
              <h3 className="font-serif text-2xl font-normal text-white">
                Redeemable at Your Nearest Participating Supermarket
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                When an eligible claim is accepted, PFP promptly issues the grocery support benefit of up to R15,000. The voucher is redeemable at reputable supermarket chains across South Africa, ensuring your family can immediately procure bulk food, poultry, cooking essentials, and household supplies.
              </p>
              <div className="pt-2 text-xs text-gold-400 font-serif italic border-t border-stone-800">
                Turnaround: Issued within 48–72 hours of complete claim verification.
              </div>
            </div>

            {/* Participating Supermarkets Grid */}
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest-2xl text-stone-400 block">
                Participating Supermarket Networks
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {supermarkets.map((store, i) => (
                  <div
                    key={i}
                    className="p-4 bg-[#121318] border border-gold-500/20 flex flex-col justify-center hover:border-gold-500/50 transition-colors"
                  >
                    <span className="font-serif text-lg font-medium text-white">
                      {store.name}
                    </span>
                    <span className="text-[11px] text-stone-400 mt-0.5">
                      {store.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Allocation Table */}
          <div className="lg:col-span-6">
            <div className="dark-glass-card p-8 sm:p-10 space-y-6">
              <div className="border-b border-stone-800 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  PRACTICAL ALLOCATION BREAKDOWN
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mt-1">
                  What R15,000 in Grocery Support Covers
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Representative breakdown for feeding extended family and funeral attendees:
                </p>
              </div>

              <div className="divide-y divide-stone-800 text-xs">
                {GROCERY_BASKET_ITEMS.map((item, idx) => (
                  <div key={idx} className="py-3.5 space-y-1">
                    <div className="flex items-center justify-between font-serif text-sm">
                      <span className="font-medium text-white">{item.category}</span>
                      <span className="text-gold-400 font-bold">{item.share}</span>
                    </div>
                    <p className="text-stone-400 text-[11px] leading-relaxed">
                      {item.items}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectPackage('package-1')}
                  className="btn-gold w-full py-4 text-xs tracking-widest-xl uppercase flex items-center justify-center gap-2"
                >
                  <span>Select Package 1 (Grocery Support from R295/mo)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
