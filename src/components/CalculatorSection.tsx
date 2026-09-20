import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { SUPPORT_PACKAGES } from '../data/pfpData';
import { AgeBand } from '../types';

interface CalculatorSectionProps {
  onApplyPlan: (pkgId: string, ageBand: AgeBand) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onApplyPlan }) => {
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('18-64');
  const [selectedPackageId, setSelectedPackageId] = useState<string>('package-3');

  const selectedPackage =
    SUPPORT_PACKAGES.find((p) => p.id === selectedPackageId) || SUPPORT_PACKAGES[2];

  const premium =
    selectedAgeBand === '18-64'
      ? selectedPackage.premiums.age18_64
      : selectedPackage.premiums.age65_75;

  const dailyCost = (premium / 30).toFixed(2);

  return (
    <section id="calculator" className="py-20 sm:py-28 bg-[#FAF8F5] editorial-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold-600" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest-2xl text-gold-700 uppercase">
            CLEAR. SIMPLE. TRANSPARENT. &bull; MONTHLY PREMIUM CALCULATOR
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian-950 leading-[1.12]">
            Calculate Your Monthly Contribution
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Choose the principal member age band and support package below to see your confirmed monthly premium and schedule of benefits.
          </p>
        </div>

        {/* Calculator Main Layout */}
        <div className="bg-white border border-sand-300 p-8 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Age Band */}
              <div className="space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-stone-500 block">
                  Step 1 &bull; Select Principal Member Age Band
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => setSelectedAgeBand('18-64')}
                    className={`p-5 text-left border transition-all ${
                      selectedAgeBand === '18-64'
                        ? 'border-obsidian-950 bg-sand-50/80 ring-1 ring-obsidian-950'
                        : 'border-sand-300 bg-white hover:border-sand-400'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                      Principal Age Group
                    </div>
                    <div className="font-serif text-2xl font-normal text-obsidian-950 mt-1">
                      18 – 64 Years
                    </div>
                    <p className="text-xs text-stone-500 mt-1 font-light">
                      Standard working age membership
                    </p>
                  </button>

                  <button
                    onClick={() => setSelectedAgeBand('65-75')}
                    className={`p-5 text-left border transition-all ${
                      selectedAgeBand === '65-75'
                        ? 'border-obsidian-950 bg-sand-50/80 ring-1 ring-obsidian-950'
                        : 'border-sand-300 bg-white hover:border-sand-400'
                    }`}
                  >
                    <div className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">
                      Principal Age Group
                    </div>
                    <div className="font-serif text-2xl font-normal text-obsidian-950 mt-1">
                      65 – 75 Years
                    </div>
                    <p className="text-xs text-stone-500 mt-1 font-light">
                      Senior member coverage
                    </p>
                  </button>
                </div>
              </div>

              {/* Step 2: Package Choice */}
              <div className="space-y-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-stone-500 block">
                  Step 2 &bull; Select Support Package
                </span>
                <div className="space-y-3">
                  {SUPPORT_PACKAGES.map((pkg) => {
                    const isSelected = selectedPackageId === pkg.id;
                    const price =
                      selectedAgeBand === '18-64'
                        ? pkg.premiums.age18_64
                        : pkg.premiums.age65_75;

                    return (
                      <button
                        key={pkg.id}
                        onClick={() => setSelectedPackageId(pkg.id)}
                        className={`w-full p-5 text-left border flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-obsidian-950 bg-sand-50/80 ring-1 ring-obsidian-950'
                            : 'border-sand-300 bg-white hover:border-sand-400'
                        }`}
                      >
                        <div className="space-y-1 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-serif text-lg font-medium text-obsidian-950">
                              {pkg.name}: {pkg.tagline}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500 line-clamp-1 font-light">
                            {pkg.headline}
                          </p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="font-serif text-2xl text-obsidian-950 font-normal">
                            R{price}
                            <span className="text-xs text-stone-400 font-sans">/mo</span>
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

            {/* Right Summary Ledger */}
            <div className="lg:col-span-5">
              <div className="bg-[#17181C] text-white p-8 sm:p-10 space-y-6">
                <div className="border-b border-white/10 pb-6">
                  <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-400 block">
                    CONFIRMED MONTHLY PREMIUM
                  </span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-serif text-5xl sm:text-6xl text-gold-400 font-normal">
                      R{premium}
                    </span>
                    <span className="text-xs text-stone-400 font-light">/ month</span>
                  </div>
                  <div className="text-xs text-stone-400 mt-2 font-serif italic">
                    Equates to approximately R{dailyCost} per day for total peace of mind.
                  </div>
                </div>

                {/* Schedule Breakdown */}
                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between text-stone-300">
                    <span>Package:</span>
                    <span className="font-medium text-white">{selectedPackage.name}</span>
                  </div>

                  <div className="flex items-center justify-between text-stone-300">
                    <span>Principal Age:</span>
                    <span className="font-medium text-white">{selectedAgeBand} years</span>
                  </div>

                  <div className="flex items-center justify-between text-stone-300">
                    <span>Grocery Support Voucher:</span>
                    <span className="font-medium text-white">Up to R15,000</span>
                  </div>

                  <div className="flex items-center justify-between text-stone-300">
                    <span>Cash Benefit Payout:</span>
                    <span className="font-medium text-white">
                      {selectedPackage.cashBenefit ? `R${selectedPackage.cashBenefit.toLocaleString()}` : '—'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-stone-300">
                    <span>500-Person Catering Support:</span>
                    <span className="font-medium text-white">
                      {selectedPackage.cateringGuests ? 'Fully Included' : '—'}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between font-serif text-base text-gold-400">
                    <span>Total Benefit Value:</span>
                    <span>R{selectedPackage.totalValue.toLocaleString()}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onApplyPlan(selectedPackage.id, selectedAgeBand)}
                    className="w-full py-4 bg-gold-600 hover:bg-gold-500 text-obsidian-950 font-semibold text-xs tracking-widest-xl uppercase transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Apply for {selectedPackage.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <p className="text-[10px] text-center text-stone-400 mt-3 font-serif italic">
                    48–72 hour claim turnaround &bull; 6-month natural death waiting period
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
