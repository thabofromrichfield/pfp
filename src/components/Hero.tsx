import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';

interface HeroProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative bg-[#FAF8F5] editorial-border-b pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold-600" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest-2xl text-gold-700 uppercase">
            ESTABLISHED SPECIALIST IN BEREAVEMENT LOGISTICS &bull; SOUTH AFRICA
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-normal text-obsidian-950 leading-[1.08] tracking-tight">
              When tomorrow arrives unexpectedly, your family deserves{' '}
              <span className="italic font-normal text-gold-700">quiet dignity,</span> not logistical exhaustion.
            </h1>

            <div className="border-l border-gold-600/40 pl-6 space-y-3">
              <p className="text-base sm:text-lg text-stone-700 font-light leading-relaxed">
                Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families can receive assistance with groceries, catering and other meaningful benefits, depending on the package they choose.
              </p>
              <p className="text-xs sm:text-sm text-stone-500 font-serif italic">
                &ldquo;Because when the unexpected happens, having a plan can make a difficult journey a little easier.&rdquo;
              </p>
            </div>

            {/* Practical Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="px-8 py-4 bg-obsidian-900 hover:bg-obsidian-950 text-white font-medium text-xs tracking-widest-xl uppercase transition-all duration-300 border border-gold-600/50 flex items-center justify-center gap-3 group"
              >
                <span>Select a Support Package</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#calculator"
                className="px-7 py-4 bg-transparent hover:bg-sand-100 text-stone-800 font-medium text-xs tracking-widest-xl uppercase transition-all duration-200 border border-sand-300 text-center"
              >
                Calculate Monthly Premium
              </a>
            </div>

            {/* Understated Assurance Notice */}
            <div className="pt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-stone-600 border-t border-sand-200">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                <span>6-Month Natural Death Waiting Period</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                <span>POPIA Act Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600" />
                <span>Clear &bull; Simple &bull; Transparent</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Schedule Ledger */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-sand-300 p-8 sm:p-10 shadow-xs relative">
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-gold-600/60 pointer-events-none" />

              <div className="space-y-6">
                <div className="border-b border-sand-200 pb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-700 block">
                    PFP SUMMARY SCHEDULE
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-obsidian-950 mt-1">
                    What Practical Relief Delivers
                  </h3>
                </div>

                {/* Practical Deliverables List */}
                <div className="divide-y divide-sand-200 text-xs sm:text-sm">
                  <div className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="font-serif text-base font-medium text-obsidian-950">
                        Supermarket Grocery Relief
                      </div>
                      <p className="text-stone-500 text-xs">
                        Voucher redeemable at nearest participating supermarket
                      </p>
                    </div>
                    <span className="font-serif text-lg font-semibold text-gold-700 whitespace-nowrap">
                      Up to R15,000
                    </span>
                  </div>

                  <div className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="font-serif text-base font-medium text-obsidian-950">
                        Full Catering Support
                      </div>
                      <p className="text-stone-500 text-xs">
                        Pots, cooking team, gas burners, serving &amp; clean-up
                      </p>
                    </div>
                    <span className="font-serif text-lg font-semibold text-gold-700 whitespace-nowrap">
                      Up to 500 Guests
                    </span>
                  </div>

                  <div className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="font-serif text-base font-medium text-obsidian-950">
                        Direct Cash Benefit
                      </div>
                      <p className="text-stone-500 text-xs">
                        Paid directly into claimant’s account (Package 2)
                      </p>
                    </div>
                    <span className="font-serif text-lg font-semibold text-gold-700 whitespace-nowrap">
                      R10,000 Cash
                    </span>
                  </div>

                  <div className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-0.5">
                      <div className="font-serif text-base font-medium text-obsidian-950">
                        Claims Payout Turnaround
                      </div>
                      <p className="text-stone-500 text-xs">
                        Expedited assessment upon document receipt
                      </p>
                    </div>
                    <span className="font-serif text-lg font-semibold text-gold-700 whitespace-nowrap">
                      48–72 Hours
                    </span>
                  </div>
                </div>

                {/* Footnote Card */}
                <div className="bg-sand-50 p-4 border border-sand-200 text-xs text-stone-600 space-y-1">
                  <div className="font-serif font-semibold text-obsidian-950">
                    Built From 10+ Years Catering Experience
                  </div>
                  <p className="text-[11px] leading-relaxed text-stone-500">
                    We understand the heavy behind-the-scenes burden of feeding mourning families and large gatherings.
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
