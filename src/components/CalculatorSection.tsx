import React, { useState } from 'react';
import { Calculator, Check, ArrowRight, Shield, Sparkles, ShoppingBag, Banknote, Utensils } from 'lucide-react';
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
    <section id="calculator" className="py-20 lg:py-28 bg-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold tracking-widest uppercase">
            <Calculator className="w-3.5 h-3.5 text-accent" />
            <span>TRANSPARENT PRICING CALCULATOR</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Clear. Simple. Transparent.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Choose your age band and preferred support package below to see your confirmed monthly premium and complete schedule of benefits.
          </p>
        </div>

        {/* Interactive Box */}
        <div className="max-w-5xl mx-auto bg-paper-soft rounded-3xl border border-paper-border p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls: Age & Package selection */}
            <div className="lg:col-span-7 space-y-8">
              {/* Step 1: Age Band */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Step 1: Select Principal Member Age Band
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedAgeBand('18-64')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      selectedAgeBand === '18-64'
                        ? 'border-accent bg-white shadow-md text-primary'
                        : 'border-paper-border bg-white/50 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs uppercase font-bold text-slate-400">Category A</div>
                    <div className="font-serif text-lg font-bold text-primary">18 – 64 Years</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Standard working age cover</div>
                  </button>

                  <button
                    onClick={() => setSelectedAgeBand('65-75')}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      selectedAgeBand === '65-75'
                        ? 'border-accent bg-white shadow-md text-primary'
                        : 'border-paper-border bg-white/50 text-slate-600 hover:bg-white'
                    }`}
                  >
                    <div className="text-xs uppercase font-bold text-slate-400">Category B</div>
                    <div className="font-serif text-lg font-bold text-primary">65 – 75 Years</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Senior member cover</div>
                  </button>
                </div>
              </div>

              {/* Step 2: Package Selection */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Step 2: Choose Your Support Package
                </label>
                <div className="space-y-2.5">
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
                        className={`w-full p-4 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-primary bg-white shadow-md'
                            : 'border-paper-border bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div className="space-y-0.5 pr-4">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-base text-primary">
                              {pkg.name}
                            </span>
                            <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                              &bull; {pkg.tagline}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 line-clamp-1">{pkg.headline}</p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="font-serif text-xl font-bold text-primary">
                            R{price}
                            <span className="text-xs font-normal text-slate-500">/mo</span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Value: R{pkg.totalValue.toLocaleString()}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Card: Instant Calculation Summary */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-primary text-white p-6 sm:p-8 shadow-2xl border-2 border-accent/40 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/15 rounded-full blur-xl" />

                <div className="relative border-b border-white/10 pb-5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    ESTIMATED MONTHLY CONTRIBUTION
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-serif text-5xl font-black text-accent">
                      R{premium}
                    </span>
                    <span className="text-sm text-slate-300 font-medium">/ month</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Equates to only <strong className="text-white">R{dailyCost}</strong> per day for full peace of mind.
                  </p>
                </div>

                {/* Breakdown List */}
                <div className="relative space-y-3 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <ShoppingBag className="w-3.5 h-3.5 text-accent" />
                      <span>Grocery Support Voucher:</span>
                    </span>
                    <span className="font-bold text-white">Up to R15,000</span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Banknote className="w-3.5 h-3.5 text-accent" />
                      <span>Cash Benefit Payout:</span>
                    </span>
                    <span className="font-bold text-white">
                      {selectedPackage.cashBenefit
                        ? `R${selectedPackage.cashBenefit.toLocaleString()}`
                        : '—'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-accent" />
                      <span>500-Person Catering:</span>
                    </span>
                    <span className="font-bold text-white">
                      {selectedPackage.cateringGuests ? 'Fully Included' : '—'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-accent font-serif font-bold text-sm">
                    <span>Total Benefit Value:</span>
                    <span>R{selectedPackage.totalValue.toLocaleString()}</span>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="relative pt-2">
                  <button
                    onClick={() => onApplyPlan(selectedPackage.id, selectedAgeBand)}
                    className="w-full py-4 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Apply for {selectedPackage.name}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Guaranteed 48–72h turnaround on approved claims
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
