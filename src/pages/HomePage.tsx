import React from 'react';
import { PageTab } from '../types';
import { COMPANY_INFO, SUPPORT_PACKAGES, ABOUT_CONTENT } from '../data/pfpData';

interface HomePageProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenQuote: (pkgId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectTab,
  onOpenQuote,
}) => {
  return (
    <div className="space-y-24 py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Editorial Corporate Hero */}
      <section className="space-y-8 max-w-4xl border-b border-[#20232B] pb-16">
        <div className="space-y-3">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            {COMPANY_INFO.fullName}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight">
            Plan ahead. Prepare your family. Let PFP support you when it matters most.
          </h1>
        </div>

        <p className="text-stone-300 text-lg sm:text-xl font-light leading-relaxed max-w-3xl">
          {COMPANY_INFO.goal}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onOpenQuote('package-3')}
            className="px-8 py-4 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Request a Support Plan
          </button>
          <button
            onClick={() => onSelectTab('packages')}
            className="px-8 py-4 rounded bg-[#12141C] hover:bg-[#1A1D27] text-gold-300 text-xs font-semibold uppercase tracking-wider border border-[#252834] transition-colors"
          >
            View Our Support Packages
          </button>
        </div>

        {/* Core Commitments Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#1C1F28]">
          <div className="space-y-1">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
              Real Experience
            </span>
            <div className="font-serif text-2xl text-white">10+ Years</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Working hand in hand with experienced catering companies in the funeral industry.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
              Claims Turnaround
            </span>
            <div className="font-serif text-2xl text-white">48–72 Hours</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Prompt claims assistance and payout turnaround upon receipt of required documentation.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
              Waiting Period
            </span>
            <div className="font-serif text-2xl text-white">6 Months</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Standard 6-month waiting period for natural death under the PFP proposal.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Summary */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-[#20232B] pb-20">
        <div className="lg:col-span-5 space-y-4">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            ABOUT US &bull; OUR PURPOSE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
            {ABOUT_CONTENT.builtFromRealExperience.title}
          </h2>
          <div className="p-4 rounded bg-[#12141A] border-l-2 border-gold-400">
            <p className="font-serif text-lg text-gold-300 italic">
              &ldquo;{COMPANY_INFO.promise}&rdquo;
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-5 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
          <p>
            {ABOUT_CONTENT.builtFromRealExperience.paragraph1}
          </p>
          <p>
            {ABOUT_CONTENT.builtFromRealExperience.paragraph2}
          </p>
          <p className="text-white font-normal">
            {ABOUT_CONTENT.builtFromRealExperience.belief}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectTab('about')}
              className="text-gold-300 hover:text-gold-200 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5"
            >
              Read More About Us &rarr;
            </button>
          </div>
        </div>
      </section>

      {/* Support Packages Overview */}
      <section className="space-y-10 border-b border-[#20232B] pb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
              OUR SUPPORT PACKAGES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Structured to Support Your Family
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('packages')}
            className="text-gold-300 hover:text-gold-200 text-xs font-semibold uppercase tracking-wider"
          >
            Explore Full Package Schedule &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUPPORT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="panel-dark p-7 rounded-lg border border-[#222530] flex flex-col justify-between space-y-6 hover:border-gold-400/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E2028] pb-3">
                  <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
                    {pkg.tagline}
                  </span>
                  <span className="text-stone-400 text-xs">0{pkg.packageNumber}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl text-white font-normal">
                    {pkg.name}
                  </h3>
                  <div className="font-serif text-lg text-gold-300 font-medium">
                    {pkg.headline}
                  </div>
                </div>

                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {pkg.description}
                </p>

                {pkg.cateringIncludes && (
                  <div className="p-3 bg-[#0C0E12] rounded border border-[#1E2028] space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-gold-300 block">
                      Catering Support Includes:
                    </span>
                    <ul className="text-xs text-stone-300 space-y-1 font-light">
                      {pkg.cateringIncludes.map((item, idx) => (
                        <li key={idx}>&bull; {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-4 border-t border-[#1E2028]">
                <div className="space-y-1">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-stone-400">Age 18–64:</span>
                    <span className="font-serif text-xl font-bold text-white">
                      R{pkg.premiums.age18_64} <span className="text-xs font-normal text-stone-400">/ mo</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-stone-400">Age 65–75:</span>
                    <span className="font-serif text-xl font-bold text-white">
                      R{pkg.premiums.age65_75} <span className="text-xs font-normal text-stone-400">/ mo</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs pt-1 border-t border-[#181A22]">
                    <span className="text-stone-400">Total Value:</span>
                    <span className="text-gold-300 font-semibold">
                      R{pkg.totalValue.toLocaleString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenQuote(pkg.id)}
                  className="w-full py-2.5 rounded bg-[#161922] hover:bg-gold-400 hover:text-[#0B0C0E] text-stone-200 text-xs font-semibold uppercase tracking-wider transition-colors border border-[#252834]"
                >
                  Select {pkg.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Governance & Transparency Banner */}
      <section className="panel-dark p-8 sm:p-12 rounded-lg border border-[#222530] space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            PAYMENTS, BENEFITS &amp; TERMS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Clear. Simple. Transparent.
          </h2>
          <p className="text-stone-300 text-sm font-light leading-relaxed">
            At Premium Funeral Planning, we believe our members should understand exactly how their membership works. From monthly payments to benefit fulfilment and claims, we aim to make the process as clear and straightforward as possible.
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => onSelectTab('terms')}
            className="px-6 py-3 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Review Governance, Waiting Periods &amp; Terms
          </button>
        </div>
      </section>
    </div>
  );
};
