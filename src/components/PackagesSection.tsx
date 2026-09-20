import React, { useState } from 'react';
import { ArrowRight, Check, Star, Utensils } from 'lucide-react';
import { SUPPORT_PACKAGES } from '../data/pfpData';
import { AgeBand } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkgId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('18-64');

  return (
    <section id="packages" className="py-20 sm:py-28 bg-[#08080A] bg-radial-gold-center border-b border-gold-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-10 bg-gold-500" />
            <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
              SCHEDULE OF PLANS &bull; OUR SUPPORT PACKAGES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-[1.12]">
            Every Detail With Care. <br />
            <span className="gold-text-gradient italic">Guaranteed Practical Support.</span>
          </h2>
          <p className="mt-4 text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.
          </p>

          {/* Luxury Age Band Selector */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-widest text-gold-400">
              Select Principal Member Age Band:
            </span>
            <div className="inline-flex border border-gold-500/30 bg-[#121318] p-1 rounded-sm shadow-inner">
              <button
                onClick={() => setSelectedAgeBand('18-64')}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                  selectedAgeBand === '18-64'
                    ? 'btn-gold shadow-gold-glow'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                18 – 64 Years
              </button>
              <button
                onClick={() => setSelectedAgeBand('65-75')}
                className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
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

        {/* 3 Packages Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {SUPPORT_PACKAGES.map((pkg) => {
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
                className={`bg-[#121318] border flex flex-col justify-between transition-all duration-300 relative ${
                  isPackage3
                    ? 'border-gold-500 shadow-gold-glow-lg lg:-translate-y-2 bg-gradient-to-b from-[#181922] to-[#101116]'
                    : isPackage2
                    ? 'border-gold-500/40 hover:border-gold-400 shadow-xl'
                    : 'border-stone-800 hover:border-gold-500/40 shadow-lg'
                }`}
              >
                {/* Header Badges */}
                {isPackage3 && (
                  <div className="bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 text-obsidian-950 font-black text-[10px] tracking-widest-xl uppercase py-1.5 px-4 text-center shadow-md flex items-center justify-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Comprehensive 500-Guest Peace of Mind</span>
                  </div>
                )}
                {isPackage2 && (
                  <div className="bg-gold-500/15 border-b border-gold-500/30 text-gold-300 font-bold text-[10px] tracking-widest-xl uppercase py-1 px-4 text-center flex items-center justify-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current text-gold-400" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                {/* Card Main Body */}
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
                    <div className="w-10 h-10 border border-gold-500/30 bg-[#0A0A0E] flex items-center justify-center font-serif text-lg text-gold-400">
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

                  {/* Pricing Box in Black & Gold */}
                  <div className="bg-[#0A0B0E] border border-gold-500/30 p-5 space-y-2 shadow-inner">
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
                    <div className="bg-[#181924] border border-gold-500/40 p-4 space-y-2 shadow-sm">
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

                  {/* Features list */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 block">
                      Package Coverage Details
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

                {/* Footer Action */}
                <div className="p-8 sm:p-9 pt-0">
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-widest-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                      isPackage3
                        ? 'btn-gold shadow-gold-glow'
                        : 'bg-[#181920] hover:bg-gold-500 hover:text-obsidian-950 text-gold-300 border border-gold-500/40'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
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

        {/* Bottom Callout Banner */}
        <div className="mt-16 bg-[#121318] border border-gold-500/30 p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4 shadow-gold-glow">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Plan ahead. Prepare your family. Let PFP support you when it matters most.
          </h3>
          <p className="text-stone-300 text-xs sm:text-sm font-light max-w-2xl mx-auto">
            At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectPackage('package-3')}
              className="btn-gold px-8 py-3.5 rounded-sm text-xs tracking-widest uppercase"
            >
              Get Started with PFP Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
