import React, { useState } from 'react';
import { ArrowRight, Check, Star, Utensils, Calculator, ShoppingBag, Banknote } from 'lucide-react';
import { SUPPORT_PACKAGES } from '../data/pfpData';
import { AgeBand, SupportPackage } from '../types';

interface PackagesPageProps {
  onSelectPackage: (pkgId: string, ageBand?: AgeBand) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onSelectPackage }) => {
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('18-64');

  // Calculator state
  const [calcAgeBand, setCalcAgeBand] = useState<AgeBand>('18-64');
  const [calcPkgId, setCalcPkgId] = useState<string>('package-3');

  const calcPackage =
    SUPPORT_PACKAGES.find((p) => p.id === calcPkgId) || SUPPORT_PACKAGES[2];

  const calcPremium =
    calcAgeBand === '18-64'
      ? calcPackage.premiums.age18_64
      : calcPackage.premiums.age65_75;

  const calcDailyCost = (calcPremium / 30).toFixed(2);

  return (
    <div className="py-12 sm:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            OUR SUPPORT PACKAGES &bull; MEMBERSHIP TIERS
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Carefully Structured Packages Designed For Meaningful Relief.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.
        </p>

        {/* Smooth Age Band Filter */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
            Select Principal Member Age Band:
          </span>
          <div className="inline-flex bg-[#121319] p-1.5 rounded-full border border-gold-500/30">
            <button
              onClick={() => setSelectedAgeBand('18-64')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedAgeBand === '18-64'
                  ? 'btn-gold shadow-gold-glow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              18 – 64 Years
            </button>
            <button
              onClick={() => setSelectedAgeBand('65-75')}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                selectedAgeBand === '65-75'
                  ? 'btn-gold shadow-gold-glow'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              65 – 75 Years
            </button>
          </div>
        </div>
      </div>

      {/* 3 Packages Display in Smooth Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {SUPPORT_PACKAGES.map((pkg: SupportPackage) => {
          const currentPremium =
            selectedAgeBand === '18-64' ? pkg.premiums.age18_64 : pkg.premiums.age65_75;
          const alternatePremium =
            selectedAgeBand === '18-64' ? pkg.premiums.age65_75 : pkg.premiums.age18_64;
          const alternateLabel = selectedAgeBand === '18-64' ? '65–75 yrs' : '18–64 yrs';

          const isPackage3 = pkg.packageNumber === 3;
          const isPackage2 = pkg.packageNumber === 2;

          return (
            <div
              key={pkg.id}
              className={`flex flex-col justify-between transition-all duration-300 relative ${
                isPackage3
                  ? 'smooth-card-featured lg:-translate-y-2'
                  : 'smooth-card'
              }`}
            >
              {/* Badges */}
              {isPackage3 && (
                <div className="bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-obsidian-950 font-black text-[10px] tracking-widest-xl uppercase py-2 px-4 rounded-t-3xl text-center flex items-center justify-center gap-1.5 shadow-md">
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Comprehensive 500-Guest Peace of Mind</span>
                </div>
              )}
              {isPackage2 && (
                <div className="bg-gold-500/15 border-b border-gold-500/30 text-gold-300 font-bold text-[10px] tracking-widest-xl uppercase py-1.5 px-4 rounded-t-3xl text-center flex items-center justify-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-current text-gold-400" />
                  <span>Most Popular Choice</span>
                </div>
              )}

              {/* Package Content */}
              <div className="p-8 sm:p-9 space-y-6">
                {/* Meta */}
                <div className="flex items-center justify-between border-b border-stone-800 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient">
                      PACKAGE 0{pkg.packageNumber}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-white mt-0.5">
                      {pkg.tagline}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl border border-gold-500/30 bg-[#0A0A0E] flex items-center justify-center font-serif text-lg text-gold-400">
                    0{pkg.packageNumber}
                  </div>
                </div>

                {/* Headline & Description */}
                <div className="space-y-2">
                  <div className="font-serif text-lg text-gold-300 font-medium">
                    {pkg.headline}
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-light">
                    {pkg.description}
                  </p>
                </div>

                {/* Premium Box */}
                <div className="bg-[#090A0E] rounded-2xl border border-gold-500/30 p-5 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                      Monthly Contribution
                    </span>
                    <span className="text-[11px] font-medium text-gold-400">
                      Age: {selectedAgeBand} yrs
                    </span>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl sm:text-5xl font-bold gold-text-gradient">
                      R{currentPremium}
                    </span>
                    <span className="text-xs text-stone-400 font-light">/ month</span>
                  </div>

                  <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
                    <span>Age {alternateLabel}:</span>
                    <span className="font-semibold text-gold-300">R{alternatePremium} / month</span>
                  </div>
                </div>

                {/* Total Value */}
                <div className="flex items-center justify-between text-xs py-1 border-b border-stone-800 pb-3">
                  <span className="text-stone-400 uppercase tracking-wider text-[10px] font-semibold">
                    Total Package Value
                  </span>
                  <span className="font-serif text-xl font-bold text-gold-400">
                    R{pkg.totalValue.toLocaleString()}
                  </span>
                </div>

                {/* Catering Inclusions for Package 3 */}
                {pkg.cateringIncludes && (
                  <div className="bg-[#181924] rounded-2xl border border-gold-500/40 p-4 space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gold-300 flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-gold-400" />
                      <span>Catering Support Includes:</span>
                    </div>
                    <ul className="text-xs space-y-1.5 text-stone-200">
                      {pkg.cateringIncludes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Feature List */}
                <div className="space-y-3 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                    Key Deliverables
                  </span>
                  <ul className="space-y-2.5 text-xs text-stone-300">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-3.5 h-3.5 text-gold-400 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-8 sm:p-9 pt-0">
                <button
                  onClick={() => onSelectPackage(pkg.id, selectedAgeBand)}
                  className={`w-full py-4 text-xs font-bold uppercase tracking-widest-xl rounded-full transition-all duration-300 flex items-center justify-center gap-2 ${
                    isPackage3
                      ? 'btn-gold'
                      : 'bg-[#181920] hover:bg-gold-500 hover:text-obsidian-950 text-gold-300 border border-gold-500/40'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-[10px] text-center text-stone-500 mt-2 font-serif italic">
                  48–72h Payout &bull; 6-Month Natural Waiting Period
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Plan & Premium Calculator Section */}
      <div className="space-y-8 pt-8">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="h-px w-8 bg-gold-500" />
            <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
              INTERACTIVE TOOL &bull; INSTANT QUOTE GENERATOR
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Calculate Your Confirmed Monthly Contribution
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm font-light">
            Adjust your age band and preferred package to see real-time contribution breakdowns and apply instantly.
          </p>
        </div>

        <div className="smooth-card p-8 sm:p-12 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Age */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 block">
                  1. Principal Member Age Band
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setCalcAgeBand('18-64')}
                    className={`p-5 rounded-2xl text-left border transition-all ${
                      calcAgeBand === '18-64'
                        ? 'border-gold-500 bg-[#1C1E26] shadow-gold-glow'
                        : 'border-stone-800 bg-[#0A0A0E] hover:border-stone-700'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-gold-400">Principal Member</div>
                    <div className="font-serif text-2xl font-normal text-white mt-1">18 – 64 Years</div>
                    <p className="text-xs text-stone-400 mt-0.5 font-light">Standard working age cover</p>
                  </button>

                  <button
                    onClick={() => setCalcAgeBand('65-75')}
                    className={`p-5 rounded-2xl text-left border transition-all ${
                      calcAgeBand === '65-75'
                        ? 'border-gold-500 bg-[#1C1E26] shadow-gold-glow'
                        : 'border-stone-800 bg-[#0A0A0E] hover:border-stone-700'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-bold text-gold-400">Principal Member</div>
                    <div className="font-serif text-2xl font-normal text-white mt-1">65 – 75 Years</div>
                    <p className="text-xs text-stone-400 mt-0.5 font-light">Senior member coverage</p>
                  </button>
                </div>
              </div>

              {/* Step 2: Package */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-400 block">
                  2. Choose Support Package
                </span>
                <div className="space-y-3">
                  {SUPPORT_PACKAGES.map((pkg) => {
                    const isSelected = calcPkgId === pkg.id;
                    const price =
                      calcAgeBand === '18-64' ? pkg.premiums.age18_64 : pkg.premiums.age65_75;

                    return (
                      <button
                        key={pkg.id}
                        onClick={() => setCalcPkgId(pkg.id)}
                        className={`w-full p-5 rounded-2xl text-left border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-gold-500 bg-[#1C1E26] shadow-gold-glow'
                            : 'border-stone-800 bg-[#0A0A0E] hover:border-stone-700'
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <div className="font-serif text-lg font-medium text-white">
                            {pkg.name}: {pkg.tagline}
                          </div>
                          <p className="text-xs text-stone-400 line-clamp-1 font-light">
                            {pkg.headline}
                          </p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="font-serif text-2xl text-gold-400 font-bold">
                            R{price}
                            <span className="text-xs text-stone-400 font-sans font-normal">/mo</span>
                          </div>
                          <span className="text-[10px] text-stone-400 tracking-wider uppercase">
                            Value R{pkg.totalValue.toLocaleString()}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#050508] rounded-3xl border-2 border-gold-500/50 p-8 space-y-6 shadow-2xl">
                <div className="border-b border-stone-800 pb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                    MONTHLY PREMIUM BREAKDOWN
                  </span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif text-5xl sm:text-6xl gold-text-gradient font-bold">
                      R{calcPremium}
                    </span>
                    <span className="text-xs text-stone-400 font-light">/ month</span>
                  </div>
                  <div className="text-xs text-stone-400 mt-2 font-serif italic">
                    Equates to approximately R{calcDailyCost} per day.
                  </div>
                </div>

                <div className="space-y-3.5 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span>Selected Plan:</span>
                    <span className="font-medium text-white">{calcPackage.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Band:</span>
                    <span className="font-medium text-white">{calcAgeBand} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Grocery Voucher:</span>
                    <span className="font-bold text-gold-400">Up to R15,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash Benefit:</span>
                    <span className="font-bold text-gold-400">
                      {calcPackage.cashBenefit ? `R${calcPackage.cashBenefit.toLocaleString()}` : '—'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>500-Person Catering:</span>
                    <span className="font-bold text-gold-400">
                      {calcPackage.cateringGuests ? 'Fully Included' : '—'}
                    </span>
                  </div>
                  <div className="pt-3 border-t border-stone-800 flex justify-between font-serif text-lg text-gold-300 font-bold">
                    <span>Total Package Value:</span>
                    <span>R{calcPackage.totalValue.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPackage(calcPackage.id, calcAgeBand)}
                  className="btn-gold w-full py-4 text-xs tracking-widest-xl uppercase flex items-center justify-center gap-2"
                >
                  <span>Apply with {calcPackage.name}</span>
                  <ArrowRight className="w-4 h-4 text-obsidian-950" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
