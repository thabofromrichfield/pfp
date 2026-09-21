import React from 'react';
import { ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SUPPORT_PACKAGES } from '../data/pfpData';

interface GroceryPageProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const GroceryPage: React.FC<GroceryPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#20232B] pb-10">
        <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
          PRACTICAL RELIEF &bull; ALL PACKAGES
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Grocery Support up to R15,000
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          Receive grocery support of up to R15,000 through a voucher redeemable at your nearest supermarket, helping your family purchase essential food and supplies during the funeral period.
        </p>
      </div>

      {/* Hero Photographic Banner */}
      <div className="panel-dark rounded-lg overflow-hidden border border-[#20232B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <img
            src="/images/grocery-support.jpg"
            alt="Essential Food & Grocery Supplies Relief"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>
        <div className="lg:col-span-5 p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
              SUPERMARKET VOUCHER FULFILMENT
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              Essential Food &amp; Supplies
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              Up to R15,000 grocery support, provided through a voucher redeemable at the member’s nearest participating supermarket.
            </p>
          </div>

          <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] space-y-2 text-xs text-stone-300 font-light">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
              <span>Included in Package 1 (Grocery Support)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
              <span>Included in Package 2 (Grocery &amp; Cash Benefit)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
              <span>Included in Package 3 (Grocery &amp; Catering Support)</span>
            </div>
          </div>

          <button
            onClick={() => onOpenQuote('package-1')}
            className="w-full py-3.5 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Request Support Plan Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Package Comparison Grid */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
          Grocery Support Across Our Packages
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUPPORT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="panel-dark p-6 rounded-lg border border-[#222530] space-y-4"
            >
              <div className="flex justify-between items-center border-b border-[#1E2028] pb-3">
                <span className="text-gold-300 text-xs font-semibold uppercase">{pkg.name}</span>
                <span className="text-stone-400 text-xs">{pkg.tagline}</span>
              </div>
              <h4 className="font-serif text-xl text-white">{pkg.headline}</h4>
              <p className="text-xs text-stone-300 font-light">{pkg.description}</p>
              <div className="pt-2 border-t border-[#1E2028] flex justify-between text-xs">
                <span className="text-stone-400">Monthly:</span>
                <span className="text-white font-medium">From R{pkg.premiums.age18_64}/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
