import React from 'react';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';
import { GROCERY_BASKET_ITEMS } from '../data/pfpData';

interface GroceryPageProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const GroceryPage: React.FC<GroceryPageProps> = ({ onOpenQuote }) => {
  const supermarkets = [
    { name: 'Shoprite', note: 'Nationwide Low-Price Superstores' },
    { name: 'Checkers', note: 'Fresh Food & Bulk Wholesalers' },
    { name: 'Pick n Pay', note: 'Neighbourhood & Hyper Stores' },
    { name: 'SPAR', note: 'Community & Rural Supermarkets' },
    { name: 'Boxer', note: 'Essential Food & Meat Wholesalers' },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#1E2028] pb-10">
        <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
          GROCERY SUPPORT &bull; UP TO R15,000 VALUE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Essential Food &amp; Supplies During the Funeral Period.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          Receive grocery support of up to R15,000 through a voucher redeemable at your nearest supermarket, helping your family purchase essential food and supplies during the funeral period without financial strain.
        </p>
      </div>

      {/* Grid: Photo & Supermarkets Left, Allocation Basket Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: How It Works & Retail Network */}
        <div className="lg:col-span-6 space-y-6">
          <div className="panel-dark rounded-lg overflow-hidden border border-[#242833]">
            <div className="aspect-[16/10]">
              <img
                src="/images/grocery-support.jpg"
                alt="Essential Supermarket Funeral Groceries"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6 bg-[#0E1015] border-t border-[#20232B] space-y-2">
              <div className="text-xs font-semibold text-gold-500 uppercase tracking-wider">
                Voucher Mechanism
              </div>
              <h3 className="font-serif text-xl text-white font-normal">
                Direct Relief at Checkout
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Upon claim verification (within 48–72 hours), PFP issues a voucher redeemable at major South African retail partners. No complex paperwork at the counter.
              </p>
            </div>
          </div>

          {/* Supermarket Network */}
          <div className="panel-dark p-6 rounded border border-[#20232B] space-y-4">
            <span className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
              Participating Retail Supermarket Chains:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {supermarkets.map((store, i) => (
                <div key={i} className="p-3 bg-[#0A0B0E] border border-[#1E2028] rounded">
                  <div className="font-semibold text-white text-sm">{store.name}</div>
                  <div className="text-[11px] text-stone-400 mt-0.5">{store.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Representative Allocation Table */}
        <div className="lg:col-span-6">
          <div className="panel-dark p-8 rounded-lg border border-[#242833] space-y-6">
            <div className="border-b border-[#20232B] pb-4">
              <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
                ALLOCATION SCHEDULE
              </span>
              <h3 className="font-serif text-2xl text-white font-normal mt-1">
                Where the R15,000 Grocery Support Goes
              </h3>
              <p className="text-xs text-stone-400 font-light mt-1">
                Representative allocation for household and community mourner provisions:
              </p>
            </div>

            <div className="divide-y divide-[#1E2028] text-xs">
              {GROCERY_BASKET_ITEMS.map((item, idx) => (
                <div key={idx} className="py-3.5 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-white">{item.category}</span>
                    <span className="text-gold-400 font-semibold">{item.share}</span>
                  </div>
                  <p className="text-stone-400 text-xs font-light leading-relaxed">
                    {item.items}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#20232B]">
              <button
                onClick={() => onOpenQuote('package-1')}
                className="btn-primary-gold w-full py-3.5 rounded text-xs tracking-wider uppercase font-bold"
              >
                Select Package 1 (Grocery Support from R295/mo)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
