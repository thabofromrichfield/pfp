import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Check, Utensils, ShoppingBag, Banknote } from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';

interface HeroProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative bg-[#08080A] bg-radial-gold-glow pt-14 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-gold-500/20">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-gold-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Top Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-gradient-to-r from-gold-500 to-transparent" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            ESTABLISHED SPECIALIST IN BEREAVEMENT LOGISTICS &bull; SOUTH AFRICA
          </span>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-[70px] font-normal text-white leading-[1.08] tracking-tight">
              When tomorrow arrives unexpectedly, your family deserves{' '}
              <span className="gold-text-gradient italic font-normal">quiet dignity,</span> not logistical exhaustion.
            </h1>

            <div className="border-l-2 border-gold-500 pl-6 space-y-3">
              <p className="text-base sm:text-lg text-stone-300 font-light leading-relaxed">
                Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families receive guaranteed assistance with groceries, catering and cash benefits.
              </p>
              <p className="text-xs sm:text-sm text-gold-400 font-serif italic">
                &ldquo;Because when the unexpected happens, having a plan can make a difficult journey a little easier.&rdquo;
              </p>
            </div>

            {/* Practical Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="btn-gold px-8 py-4 rounded-sm text-xs tracking-widest-xl uppercase flex items-center justify-center gap-3 group"
              >
                <span>Select a Support Package</span>
                <ArrowRight className="w-4 h-4 text-obsidian-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#calculator"
                className="px-7 py-4 bg-[#121318] hover:bg-[#1A1C23] text-gold-300 font-semibold text-xs tracking-widest-xl uppercase transition-all duration-200 border border-gold-500/40 text-center"
              >
                Calculate Monthly Premium
              </a>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-stone-400 border-t border-stone-800">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="text-stone-300">6-Month Natural Death Waiting Period</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="text-stone-300">POPIA Act Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                <span className="text-stone-300">Clear &bull; Simple &bull; Transparent</span>
              </div>
            </div>
          </div>

          {/* Right Column: Schedule Ledger in Black & Gold */}
          <div className="lg:col-span-5">
            <div className="dark-glass-card p-8 sm:p-10 relative">
              {/* Corner Gold Accent Line */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-gold-500 pointer-events-none" />

              <div className="space-y-6">
                <div className="border-b border-stone-800 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                    PFP SUMMARY SCHEDULE
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white mt-1">
                    What Practical Relief Delivers
                  </h3>
                </div>

                {/* Practical Deliverables List */}
                <div className="divide-y divide-stone-800 text-xs sm:text-sm">
                  <div className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4 text-gold-400" />
                        <span>Supermarket Grocery Relief</span>
                      </div>
                      <p className="text-stone-400 text-xs font-light">
                        Voucher redeemable at nearest participating supermarket
                      </p>
                    </div>
                    <span className="font-serif text-xl font-bold gold-text-gradient whitespace-nowrap">
                      Up to R15,000
                    </span>
                  </div>

                  <div className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                        <Utensils className="w-4 h-4 text-gold-400" />
                        <span>Full Catering Support</span>
                      </div>
                      <p className="text-stone-400 text-xs font-light">
                        Cooking team, pots, gas stoves, dishing &amp; clean-up
                      </p>
                    </div>
                    <span className="font-serif text-xl font-bold gold-text-gradient whitespace-nowrap">
                      500 Guests
                    </span>
                  </div>

                  <div className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-gold-400" />
                        <span>Direct Cash Benefit</span>
                      </div>
                      <p className="text-stone-400 text-xs font-light">
                        Paid directly into claimant&apos;s verified bank account
                      </p>
                    </div>
                    <span className="font-serif text-xl font-bold gold-text-gradient whitespace-nowrap">
                      R10,000 Cash
                    </span>
                  </div>

                  <div className="py-4 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gold-400" />
                        <span>Claims Payout Turnaround</span>
                      </div>
                      <p className="text-stone-400 text-xs font-light">
                        Expedited assessment upon document receipt
                      </p>
                    </div>
                    <span className="font-serif text-xl font-bold gold-text-gradient whitespace-nowrap">
                      48–72 Hours
                    </span>
                  </div>
                </div>

                {/* Footnote Card */}
                <div className="bg-[#0A0A0E] p-4 border border-gold-500/20 text-xs text-stone-300 space-y-1">
                  <div className="font-serif font-semibold text-gold-300">
                    Built From 10+ Years Catering Experience
                  </div>
                  <p className="text-[11px] leading-relaxed text-stone-400 font-light">
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
