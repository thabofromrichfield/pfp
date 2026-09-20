import React from 'react';
import { ShoppingBag, Store, CheckCircle, ArrowRight, ShieldCheck, HeartHandshake } from 'lucide-react';
import { GROCERY_BASKET_ITEMS } from '../data/pfpData';

interface GroceryVoucherSectionProps {
  onSelectPackage: (pkgId: string) => void;
}

export const GroceryVoucherSection: React.FC<GroceryVoucherSectionProps> = ({ onSelectPackage }) => {
  const supermarkets = [
    { name: 'Shoprite', tag: 'South Africa’s Low Price Champion' },
    { name: 'Checkers', tag: 'Fresh Produce & Bulk Quality' },
    { name: 'Pick n Pay', tag: 'Nationwide Supermarkets' },
    { name: 'SPAR', tag: 'Community & Town Centre Convenience' },
    { name: 'Boxer Superstores', tag: 'Bulk Staples & Meat Wholesale' },
  ];

  return (
    <section id="grocery" className="py-20 lg:py-28 bg-paper relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Explainer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold tracking-widest uppercase">
              <span>UP TO R15,000 GROCERY VOUCHER &bull; INCLUDED IN ALL PACKAGES</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              Essential Food Supplies <br />
              <span className="text-accent italic font-normal">Without Out-Of-Pocket Stress.</span>
            </h2>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              During a bereavement, immediate family and relatives arrive from across the country days before the service. Feeding the household and community creates sudden, overwhelming grocery bills.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-paper-border shadow-sm space-y-3">
              <h3 className="font-serif text-lg font-bold text-primary flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent" />
                <span>How the Grocery Support Voucher Works</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Upon claim verification (within 48–72 hours), PFP issues a guaranteed supermarket voucher of up to <strong>R15,000</strong>. This voucher is redeemable directly at your nearest participating national supermarket, helping your family purchase essential food, meats, staples, and supplies.
              </p>
            </div>

            {/* Participating Supermarkets */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Redeemable at Your Nearest Participating Supermarket:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {supermarkets.map((sm, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white border border-paper-border text-center shadow-xs"
                  >
                    <div className="font-serif font-bold text-sm text-primary">{sm.name}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{sm.tag}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onSelectPackage('package-1')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider shadow transition-all"
              >
                <span>View Grocery Support Packages</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </button>
            </div>
          </div>

          {/* Right Column: Visual Grocery Image + Typical Basket Breakdown */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-900 group">
              <img
                src="/images/grocery-support.jpg"
                alt="Essential Funeral Groceries & Pantry Provisions"
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase font-bold text-accent">Guaranteed Relief</div>
                  <div className="font-serif text-lg font-bold">R15,000 Supermarket Food Basket</div>
                </div>
                <div className="px-3 py-1 rounded-full bg-accent text-primary-dark font-extrabold text-xs">
                  All 3 Packages
                </div>
              </div>
            </div>

            {/* Breakdown Table Card */}
            <div className="p-6 rounded-2xl bg-white border border-paper-border shadow-luxury space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-100">
                <span className="font-serif text-base font-bold text-primary">
                  Where Your R15,000 Grocery Relief Goes
                </span>
                <span className="text-xs text-slate-500">Representative Breakdown</span>
              </div>

              <div className="space-y-3">
                {GROCERY_BASKET_ITEMS.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800">{item.category}</span>
                      <span className="text-accent-dark font-bold">{item.share}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">{item.items}</p>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-accent h-full rounded-full"
                        style={{ width: item.share }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] text-slate-500 italic border-t border-slate-100">
                * Note: Voucher is redeemable for food and grocery essentials in accordance with supermarket voucher terms and PFP policy documentation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
