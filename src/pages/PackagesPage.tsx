import React, { useState } from 'react';
import { CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { SUPPORT_PACKAGES, PAYMENTS_BENEFITS_TERMS, EVERY_DETAIL_WITH_CARE } from '../data/pfpData';
import { AgeBand } from '../types';

interface PackagesPageProps {
  onSelectPackage: (pkgId: string, ageBand: AgeBand) => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onSelectPackage }) => {
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('18-64');

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#20232B] pb-10">
        <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
          OUR SUPPORT PACKAGES
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Every Detail With Care.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          {EVERY_DETAIL_WITH_CARE.paragraph1}
        </p>

        {/* Age Band Selector */}
        <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Select Principal Member Age Band:
          </span>
          <div className="inline-flex rounded border border-[#222530] bg-[#12141A] p-1">
            <button
              onClick={() => setSelectedAgeBand('18-64')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                selectedAgeBand === '18-64'
                  ? 'bg-gold-400 text-[#0B0C0E]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              18–64 / 18–65 Years
            </button>
            <button
              onClick={() => setSelectedAgeBand('65-75')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                selectedAgeBand === '65-75'
                  ? 'bg-gold-400 text-[#0B0C0E]'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              65–75 Years
            </button>
          </div>
        </div>
      </div>

      {/* 3 Package Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {SUPPORT_PACKAGES.map((pkg) => {
          const currentPremium =
            selectedAgeBand === '18-64' ? pkg.premiums.age18_64 : pkg.premiums.age65_75;
          const ageLabel =
            selectedAgeBand === '18-64'
              ? pkg.premiums.ageLabel1 || '18–64 years'
              : '65–75 years';

          return (
            <div
              key={pkg.id}
              className="panel-dark p-8 rounded-lg border border-[#222530] flex flex-col justify-between space-y-8 hover:border-gold-400/40 transition-colors"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#1E2028] pb-4">
                  <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
                    {pkg.tagline}
                  </span>
                  <span className="text-stone-400 text-xs font-mono">0{pkg.packageNumber}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-3xl font-normal text-white">
                    {pkg.name}
                  </h3>
                  <div className="font-serif text-lg text-gold-300 font-medium">
                    {pkg.headline}
                  </div>
                </div>

                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {pkg.description}
                </p>

                {/* Catering Inclusions for Package 3 */}
                {pkg.cateringIncludes && (
                  <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] space-y-2">
                    <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
                      Catering support includes:
                    </span>
                    <ul className="text-xs text-stone-300 space-y-1.5 font-light">
                      {pkg.cateringIncludes.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Price Box */}
              <div className="space-y-5 pt-6 border-t border-[#1E2028]">
                <div className="p-4 rounded bg-[#0A0B0E] border border-[#1E2028] space-y-2">
                  <span className="text-xs text-stone-400 uppercase tracking-wider block">
                    Monthly Premium &bull; {ageLabel}
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-4xl font-bold text-white">
                      R{currentPremium}
                    </span>
                    <span className="text-xs text-stone-400">/ month</span>
                  </div>

                  {pkg.totalValue && (
                    <div className="flex justify-between items-center text-xs pt-2 border-t border-[#181A22] text-stone-400">
                      <span>Total Benefit Value:</span>
                      <span className="text-gold-300 font-semibold text-sm">
                        R{pkg.totalValue.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onSelectPackage(pkg.id, selectedAgeBand)}
                  className="w-full py-3.5 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Request {pkg.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefit Fulfilment Schedule Table */}
      <div className="panel-dark p-8 sm:p-10 rounded-lg border border-[#222530] space-y-6">
        <div>
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            HOW YOUR BENEFITS WORK
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
            Benefit Fulfilment Schedule
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
            {PAYMENTS_BENEFITS_TERMS.howYourBenefitsWork.intro}
          </p>
        </div>

        <div className="overflow-x-auto border border-[#1E2028] rounded">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="bg-[#0A0B0E] border-b border-[#1E2028] text-gold-300 font-serif font-semibold">
                <th className="p-4 w-1/3">PACKAGE</th>
                <th className="p-4 w-2/3">BENEFIT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2028]">
              {PAYMENTS_BENEFITS_TERMS.howYourBenefitsWork.table.map((row, idx) => (
                <tr key={idx}>
                  <td className="p-4 align-top font-serif text-base text-white">
                    {row.package}
                  </td>
                  <td className="p-4 text-stone-300 font-light leading-relaxed">
                    {row.benefit}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-stone-400 font-serif italic">
          {PAYMENTS_BENEFITS_TERMS.howYourBenefitsWork.footer}
        </p>
      </div>
    </div>
  );
};
