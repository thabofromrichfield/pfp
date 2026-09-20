import React, { useState } from 'react';
import { ArrowRight, Check, Utensils, ShoppingBag, Banknote } from 'lucide-react';
import { SUPPORT_PACKAGES } from '../data/pfpData';
import { AgeBand, SupportPackage } from '../types';

interface PackagesPageProps {
  onSelectPackage: (pkgId: string, ageBand?: AgeBand) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onSelectPackage }) => {
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('18-64');

  // Calculator State
  const [calcAge, setCalcAge] = useState<AgeBand>('18-64');
  const [calcPkgId, setCalcPkgId] = useState<string>('package-3');

  const calcPackage =
    SUPPORT_PACKAGES.find((p) => p.id === calcPkgId) || SUPPORT_PACKAGES[2];

  const calcPremium =
    calcAge === '18-64' ? calcPackage.premiums.age18_64 : calcPackage.premiums.age65_75;

  const calcDaily = (calcPremium / 30).toFixed(2);

  return (
    <div className="py-12 sm:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#1E2028] pb-10">
        <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
          OUR SUPPORT PACKAGES &bull; MEMBERSHIP SCHEDULE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Practical Support Structured for Every Family.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.
        </p>

        {/* Age Band Selector Toggle */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            View Rates by Principal Member Age:
          </span>
          <div className="inline-flex bg-[#12141A] p-1 rounded border border-[#232630]">
            <button
              onClick={() => setSelectedAgeBand('18-64')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                selectedAgeBand === '18-64'
                  ? 'btn-primary-gold font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              18 – 64 Years
            </button>
            <button
              onClick={() => setSelectedAgeBand('65-75')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                selectedAgeBand === '65-75'
                  ? 'btn-primary-gold font-bold'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              65 – 75 Years
            </button>
          </div>
        </div>
      </div>

      {/* 3 Packages Display (Clean, non-AI corporate presentation) */}
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
              className={`panel-dark rounded-lg p-8 flex flex-col justify-between space-y-6 ${
                isPackage3
                  ? 'border-gold-500/80 bg-[#12141B] shadow-2xl'
                  : isPackage2
                  ? 'border-[#2D313F]'
                  : 'border-[#20232B]'
              }`}
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="border-b border-[#20232B] pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-gold-500 uppercase tracking-widest block">
                      {pkg.name}
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-white mt-1">
                      {pkg.tagline}
                    </h3>
                  </div>
                  {isPackage3 && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 px-2 py-0.5 rounded">
                      Comprehensive
                    </span>
                  )}
                  {isPackage2 && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider bg-[#1B1E27] text-stone-300 border border-stone-700 px-2 py-0.5 rounded">
                      Popular
                    </span>
                  )}
                </div>

                {/* Headline & Description */}
                <div className="space-y-2">
                  <div className="font-serif text-lg text-white font-medium">
                    {pkg.headline}
                  </div>
                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                {/* Pricing Box */}
                <div className="bg-[#090A0D] p-5 rounded border border-[#1E2129] space-y-2">
                  <div className="flex items-baseline justify-between text-xs text-stone-400">
                    <span className="uppercase tracking-wider text-[10px]">Monthly Premium</span>
                    <span>Age {selectedAgeBand} yrs</span>
                  </div>

                  <div className="flex items-baseline gap-1.5">
                    <span className="font-serif text-4xl text-gold-400 font-bold">
                      R{currentPremium}
                    </span>
                    <span className="text-xs text-stone-400 font-light">/ month</span>
                  </div>

                  <div className="pt-2 border-t border-[#1C1F27] flex items-center justify-between text-[11px] text-stone-400">
                    <span>Age {alternateLabel}:</span>
                    <span className="text-stone-300 font-medium">R{alternatePremium} / month</span>
                  </div>
                </div>

                {/* Total Value */}
                <div className="flex items-center justify-between text-xs border-b border-[#20232B] pb-3">
                  <span className="text-stone-400 uppercase tracking-wider text-[10px]">
                    Total Package Value
                  </span>
                  <span className="font-serif text-xl font-bold text-white">
                    R{pkg.totalValue.toLocaleString()}
                  </span>
                </div>

                {/* Catering Inclusions for Package 3 */}
                {pkg.cateringIncludes && (
                  <div className="bg-[#151720] p-4 rounded border border-gold-500/30 space-y-2">
                    <div className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Catering Support Includes:</span>
                    </div>
                    <ul className="text-xs space-y-1.5 text-stone-300">
                      {pkg.cateringIncludes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Checklist */}
                <div className="space-y-2.5 pt-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500 block">
                    What is Covered
                  </span>
                  <ul className="space-y-2 text-xs text-stone-300">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-gold-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#20232B]">
                <button
                  onClick={() => onSelectPackage(pkg.id, selectedAgeBand)}
                  className={`w-full py-3.5 rounded text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2 transition-colors ${
                    isPackage3
                      ? 'btn-primary-gold'
                      : 'btn-secondary-dark hover:btn-primary-gold hover:border-transparent'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-[10px] text-center text-stone-500 mt-2">
                  48–72h Payout &bull; 6-Month Natural Waiting Period
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plan & Premium Calculator */}
      <div className="panel-dark p-8 sm:p-12 rounded-lg border border-[#242833] space-y-8">
        <div className="border-b border-[#20232B] pb-4">
          <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
            CALCULATOR
          </span>
          <h2 className="font-serif text-3xl text-white font-normal mt-1">
            Calculate Your Confirmed Monthly Contribution
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 font-light mt-1">
            Select your age and package below to review instant contributions and benefit values.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Inputs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
                1. Select Age Band:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setCalcAge('18-64')}
                  className={`p-4 rounded border text-left transition-colors ${
                    calcAge === '18-64'
                      ? 'border-gold-500 bg-[#161822] text-white'
                      : 'border-[#222530] bg-[#0A0B0E] text-stone-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] uppercase font-semibold text-gold-500">Principal</div>
                  <div className="font-serif text-xl font-normal mt-0.5">18 – 64 Years</div>
                </button>

                <button
                  onClick={() => setCalcAge('65-75')}
                  className={`p-4 rounded border text-left transition-colors ${
                    calcAge === '65-75'
                      ? 'border-gold-500 bg-[#161822] text-white'
                      : 'border-[#222530] bg-[#0A0B0E] text-stone-400 hover:text-white'
                  }`}
                >
                  <div className="text-[10px] uppercase font-semibold text-gold-500">Principal</div>
                  <div className="font-serif text-xl font-normal mt-0.5">65 – 75 Years</div>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-stone-400">
                2. Select Package:
              </label>
              <div className="space-y-3">
                {SUPPORT_PACKAGES.map((pkg) => {
                  const isSelected = calcPkgId === pkg.id;
                  const price =
                    calcAge === '18-64' ? pkg.premiums.age18_64 : pkg.premiums.age65_75;

                  return (
                    <button
                      key={pkg.id}
                      onClick={() => setCalcPkgId(pkg.id)}
                      className={`w-full p-4 rounded border flex items-center justify-between text-left transition-colors ${
                        isSelected
                          ? 'border-gold-500 bg-[#161822] text-white'
                          : 'border-[#222530] bg-[#0A0B0E] text-stone-400 hover:text-white'
                      }`}
                    >
                      <div>
                        <div className="font-serif text-lg font-normal text-white">
                          {pkg.name}: {pkg.tagline}
                        </div>
                        <div className="text-xs text-stone-400">{pkg.headline}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-serif text-2xl font-bold text-gold-400">
                          R{price} <span className="text-xs font-sans font-normal text-stone-400">/mo</span>
                        </div>
                        <div className="text-[10px] text-stone-500">Value: R{pkg.totalValue.toLocaleString()}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 bg-[#090A0D] p-8 rounded border border-[#20232B] space-y-6">
            <div className="border-b border-[#1E2028] pb-4">
              <span className="text-[10px] uppercase tracking-wider text-gold-500 font-semibold block">
                Confirmed Monthly Premium
              </span>
              <div className="font-serif text-5xl text-gold-400 font-bold mt-2">
                R{calcPremium}
                <span className="text-xs font-sans font-normal text-stone-400"> / month</span>
              </div>
              <div className="text-xs text-stone-400 mt-1">
                Equates to approximately R{calcDaily} per day.
              </div>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex justify-between">
                <span>Selected Plan:</span>
                <strong className="text-white">{calcPackage.name}</strong>
              </div>
              <div className="flex justify-between">
                <span>Principal Age:</span>
                <span className="text-white">{calcAge} years</span>
              </div>
              <div className="flex justify-between">
                <span>Grocery Voucher:</span>
                <span className="text-gold-400 font-semibold">Up to R15,000</span>
              </div>
              <div className="flex justify-between">
                <span>Cash Benefit:</span>
                <span className="text-gold-400 font-semibold">
                  {calcPackage.cashBenefit ? `R${calcPackage.cashBenefit.toLocaleString()}` : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>500-Guest Catering:</span>
                <span className="text-gold-400 font-semibold">
                  {calcPackage.cateringGuests ? 'Fully Included' : '—'}
                </span>
              </div>
              <div className="pt-2 border-t border-[#1E2028] flex justify-between font-serif text-lg text-white">
                <span>Total Package Value:</span>
                <span className="text-gold-400 font-bold">R{calcPackage.totalValue.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectPackage(calcPackage.id, calcAge)}
              className="btn-primary-gold w-full py-3.5 rounded text-xs tracking-wider uppercase font-bold"
            >
              Apply with this Plan &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
