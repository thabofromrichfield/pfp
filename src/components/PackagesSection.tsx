import React, { useState } from 'react';
import { Check, Shield, Star, ShoppingBag, Banknote, Utensils, ArrowRight, Info } from 'lucide-react';
import { SUPPORT_PACKAGES } from '../data/pfpData';
import { AgeBand, SupportPackage } from '../types';

interface PackagesSectionProps {
  onSelectPackage: (pkgId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('18-64');

  return (
    <section id="packages" className="py-20 lg:py-28 bg-paper-soft relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-primary text-xs font-bold tracking-widest uppercase">
            <span>OUR SUPPORT PACKAGES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Every Detail With Care.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.
          </p>

          {/* Age Bracket Selector Toggle */}
          <div className="pt-4 flex flex-col items-center justify-center gap-3">
            <span className="text-xs uppercase font-bold tracking-wider text-slate-500">
              Select Principal Member Age Band:
            </span>
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-paper-border shadow-sm">
              <button
                onClick={() => setSelectedAgeBand('18-64')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all ${
                  selectedAgeBand === '18-64'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                18 – 64 Years
              </button>
              <button
                onClick={() => setSelectedAgeBand('65-75')}
                className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all ${
                  selectedAgeBand === '65-75'
                    ? 'bg-primary text-white shadow-md'
                    : 'text-slate-600 hover:text-primary hover:bg-slate-50'
                }`}
              >
                65 – 75 Years
              </button>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              Showing monthly premiums for principal members aged {selectedAgeBand} years
            </p>
          </div>
        </div>

        {/* 3 Package Cards */}
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
                className={`relative rounded-3xl transition-all duration-300 flex flex-col justify-between ${
                  isPackage3
                    ? 'bg-primary text-white shadow-2xl ring-2 ring-accent lg:-translate-y-2'
                    : isPackage2
                    ? 'bg-white text-slate-800 shadow-xl border-2 border-accent/40'
                    : 'bg-white text-slate-800 shadow-luxury border border-paper-border'
                }`}
              >
                {/* Popular / Comprehensive Badge */}
                {isPackage2 && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-primary-dark text-[11px] font-black uppercase tracking-wider shadow flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>Most Popular Choice</span>
                  </div>
                )}
                {isPackage3 && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-primary-dark text-[11px] font-black uppercase tracking-wider shadow flex items-center gap-1.5">
                    <Utensils className="w-3.5 h-3.5" />
                    <span>Complete 500-Guest Peace of Mind</span>
                  </div>
                )}

                {/* Card Top Section */}
                <div className="p-7 sm:p-8 space-y-5">
                  <div className="flex items-center justify-between border-b pb-4 border-slate-200/20">
                    <div>
                      <span
                        className={`text-xs font-bold uppercase tracking-widest ${
                          isPackage3 ? 'text-accent-light' : 'text-accent-dark'
                        }`}
                      >
                        {pkg.tagline}
                      </span>
                      <h3
                        className={`font-serif text-2xl font-bold mt-0.5 ${
                          isPackage3 ? 'text-white' : 'text-primary'
                        }`}
                      >
                        {pkg.name}
                      </h3>
                    </div>
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-serif font-bold text-lg ${
                        isPackage3
                          ? 'bg-white/10 text-accent border border-white/20'
                          : 'bg-paper-soft text-primary border border-paper-border'
                      }`}
                    >
                      0{pkg.packageNumber}
                    </div>
                  </div>

                  {/* Headline Benefit */}
                  <div>
                    <h4
                      className={`font-serif text-lg font-bold leading-snug ${
                        isPackage3 ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {pkg.headline}
                    </h4>
                    <p
                      className={`text-xs mt-2 leading-relaxed ${
                        isPackage3 ? 'text-slate-300' : 'text-slate-600'
                      }`}
                    >
                      {pkg.description}
                    </p>
                  </div>

                  {/* Pricing Box */}
                  <div
                    className={`p-4 rounded-2xl ${
                      isPackage3
                        ? 'bg-white/10 border border-white/15'
                        : 'bg-paper-soft border border-paper-border'
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider ${
                          isPackage3 ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        Monthly Premium
                      </span>
                      <span className="text-[11px] font-medium text-accent">
                        {selectedAgeBand} yrs
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1 mt-1">
                      <span
                        className={`font-serif text-4xl font-extrabold ${
                          isPackage3 ? 'text-accent' : 'text-primary'
                        }`}
                      >
                        R{currentPremium}
                      </span>
                      <span
                        className={`text-xs font-medium ${
                          isPackage3 ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        / month
                      </span>
                    </div>

                    <div
                      className={`text-[11px] pt-2 mt-2 border-t flex items-center justify-between ${
                        isPackage3
                          ? 'border-white/10 text-slate-300'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <span>Age {alternateLabel}:</span>
                      <span className="font-bold">R{alternatePremium} / month</span>
                    </div>
                  </div>

                  {/* Benefit Value Pill */}
                  <div className="flex items-center justify-between text-xs py-1">
                    <span
                      className={`font-semibold ${
                        isPackage3 ? 'text-slate-300' : 'text-slate-500'
                      }`}
                    >
                      Total Benefit Value:
                    </span>
                    <span
                      className={`font-serif font-bold text-base ${
                        isPackage3 ? 'text-accent' : 'text-accent-dark'
                      }`}
                    >
                      R{pkg.totalValue.toLocaleString()}
                    </span>
                  </div>

                  {/* Catering Inclusions specifically for Package 3 */}
                  {pkg.cateringIncludes && (
                    <div className="p-3.5 rounded-xl bg-accent/15 border border-accent/30 space-y-2">
                      <div className="text-xs font-bold text-accent-light uppercase tracking-wider flex items-center gap-1.5">
                        <Utensils className="w-3.5 h-3.5 text-accent" />
                        <span>Catering Support Includes:</span>
                      </div>
                      <ul className="text-xs space-y-1.5 text-slate-200">
                        {pkg.cateringIncludes.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Feature Checklist */}
                  <div className="space-y-2.5 pt-2">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block ${
                        isPackage3 ? 'text-slate-300' : 'text-slate-400'
                      }`}
                    >
                      Package Highlights
                    </span>
                    <ul className="space-y-2 text-xs">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check
                            className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                              isPackage3 ? 'text-accent' : 'text-accent-dark'
                            }`}
                          />
                          <span
                            className={isPackage3 ? 'text-slate-200' : 'text-slate-700'}
                          >
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Bottom */}
                <div className="p-7 sm:p-8 pt-0">
                  <button
                    onClick={() => onSelectPackage(pkg.id)}
                    className={`w-full py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                      isPackage3
                        ? 'bg-accent hover:bg-accent-hover text-primary-dark shadow-lg hover:shadow-gold-glow'
                        : isPackage2
                        ? 'bg-primary hover:bg-primary-light text-white shadow-md'
                        : 'bg-paper-soft hover:bg-slate-200 text-primary border border-paper-border'
                    }`}
                  >
                    <span>Choose {pkg.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p
                    className={`text-[10px] text-center mt-2 ${
                      isPackage3 ? 'text-slate-400' : 'text-slate-400'
                    }`}
                  >
                    48–72h Payout &bull; 6-Month Natural Waiting Period
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-16 p-8 rounded-3xl bg-primary text-white text-center space-y-4 max-w-4xl mx-auto shadow-xl border border-accent/30">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Plan ahead. Prepare your family. Let PFP support you when it matters most.
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm font-light max-w-2xl mx-auto">
            At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectPackage('package-3')}
              className="px-8 py-3 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-bold text-xs uppercase tracking-wider transition-all shadow"
            >
              Get Started with PFP Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
