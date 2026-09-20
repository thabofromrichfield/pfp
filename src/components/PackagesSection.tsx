import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SUPPORT_PACKAGES } from '../data/pfpData';
import { AgeBand } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkgId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('18-64');

  return (
    <section id="packages" className="py-20 sm:py-28 bg-[#F5F2EB] editorial-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-gold-600" />
            <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest-2xl text-gold-700 uppercase">
              SCHEDULE OF PLANS &bull; PRACTICAL SUPPORT PACKAGES
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian-950 leading-[1.12]">
            Our Support Packages. Designed for real life, not fine print.
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.
          </p>

          {/* Editorial Age Band Filter */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">
              Principal Member Age:
            </span>
            <div className="inline-flex border border-sand-300 bg-white p-1">
              <button
                onClick={() => setSelectedAgeBand('18-64')}
                className={`px-6 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedAgeBand === '18-64'
                    ? 'bg-obsidian-950 text-white'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                18 – 64 Years
              </button>
              <button
                onClick={() => setSelectedAgeBand('65-75')}
                className={`px-6 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                  selectedAgeBand === '65-75'
                    ? 'bg-obsidian-950 text-white'
                    : 'text-stone-600 hover:text-stone-900'
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
                className={`bg-white border flex flex-col justify-between transition-all duration-300 ${
                  isPackage3
                    ? 'border-gold-600 shadow-md ring-1 ring-gold-600/30'
                    : 'border-sand-300 hover:border-sand-400'
                }`}
              >
                {/* Header */}
                <div className="p-8 sm:p-9 space-y-6">
                  {/* Package Meta */}
                  <div className="flex items-center justify-between border-b border-sand-200 pb-4">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-700">
                        PACKAGE 0{pkg.packageNumber}
                      </span>
                      <h3 className="font-serif text-2xl font-normal text-obsidian-950 mt-0.5">
                        {pkg.tagline}
                      </h3>
                    </div>
                    {isPackage3 && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-700 bg-gold-50 border border-gold-300 px-2 py-0.5">
                        Comprehensive
                      </span>
                    )}
                    {isPackage2 && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-700 bg-sand-100 border border-sand-300 px-2 py-0.5">
                        Most Selected
                      </span>
                    )}
                  </div>

                  {/* Headline & Description */}
                  <div className="space-y-2">
                    <div className="font-serif text-lg text-obsidian-950 font-medium">
                      {pkg.headline}
                    </div>
                    <p className="text-xs text-stone-600 leading-relaxed font-light">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div className="bg-sand-50 border border-sand-200 p-5 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-500">
                        Monthly Contribution
                      </span>
                      <span className="text-[11px] text-stone-500">
                        Age: {selectedAgeBand} yrs
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-4xl sm:text-5xl font-normal text-obsidian-950">
                        R{currentPremium}
                      </span>
                      <span className="text-xs text-stone-500 font-light">/ month</span>
                    </div>

                    <div className="pt-2 border-t border-sand-200/80 flex items-center justify-between text-[11px] text-stone-500">
                      <span>Age {alternateLabel}:</span>
                      <span className="font-semibold text-stone-700">R{alternatePremium} / month</span>
                    </div>
                  </div>

                  {/* Total Value */}
                  <div className="flex items-center justify-between text-xs py-1 border-b border-sand-200 pb-3">
                    <span className="text-stone-500 uppercase tracking-wider text-[10px] font-semibold">
                      Total Package Value
                    </span>
                    <span className="font-serif text-lg font-semibold text-gold-800">
                      R{pkg.totalValue.toLocaleString()}
                    </span>
                  </div>

                  {/* Catering Inclusions for Package 3 */}
                  {pkg.cateringIncludes && (
                    <div className="bg-gold-50/70 border border-gold-200 p-4 space-y-2">
                      <div className="text-[10px] font-semibold uppercase tracking-widest text-gold-800">
                        Catering Logistics Included:
                      </div>
                      <ul className="text-xs space-y-1.5 text-stone-700">
                        {pkg.cateringIncludes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-gold-700" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Features list */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-stone-400 block">
                      Coverage Details
                    </span>
                    <ul className="space-y-2.5 text-xs text-stone-700">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 text-gold-700 flex-shrink-0 mt-0.5" />
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
                    className={`w-full py-3.5 text-xs font-semibold uppercase tracking-widest-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                      isPackage3
                        ? 'bg-obsidian-950 hover:bg-obsidian-900 text-white border border-gold-600/50'
                        : 'bg-white hover:bg-sand-100 text-obsidian-950 border border-sand-300'
                    }`}
                  >
                    <span>Request {pkg.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-600" />
                  </button>
                  <div className="text-[10px] text-center text-stone-400 mt-2 font-serif italic">
                    48–72h Payout &bull; 6-Month Natural Waiting Period
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing Affirmation */}
        <div className="mt-16 text-center max-w-2xl mx-auto space-y-3">
          <p className="font-serif text-xl sm:text-2xl text-obsidian-950 italic">
            &ldquo;Plan ahead. Prepare your family. Let PFP support you when it matters most.&rdquo;
          </p>
          <p className="text-xs text-stone-500 font-light">
            Confirmed premiums and payment details are clearly stated in your membership policy documentation.
          </p>
        </div>
      </div>
    </section>
  );
};
