import React from 'react';
import { ArrowRight, Utensils, ShoppingBag, Banknote, Clock, Award, Shield, CheckCircle2 } from 'lucide-react';
import { PageTab } from '../types';
import { COMPANY_INFO, SUPPORT_PACKAGES } from '../data/pfpData';

interface HomePageProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenQuote: (pkgId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTab, onOpenQuote }) => {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section with Smooth Curved Components */}
      <section className="relative bg-radial-gold-glow pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Pill Tag */}
          <div className="flex items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-xs tracking-widest uppercase font-semibold text-gold-300">
              <Award className="w-3.5 h-3.5 text-gold-400" />
              <span>PREMIUM FUNERAL PLANNING &bull; SOUTH AFRICA</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-8">
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-[68px] font-normal text-white leading-[1.08] tracking-tight">
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

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onSelectTab('packages')}
                  className="btn-gold px-8 py-4 text-xs tracking-widest-xl uppercase flex items-center justify-center gap-3 group"
                >
                  <span>Explore Support Packages</span>
                  <ArrowRight className="w-4 h-4 text-obsidian-950 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectTab('catering')}
                  className="px-7 py-4 rounded-full bg-[#14151D] hover:bg-[#1E202B] text-gold-300 font-semibold text-xs tracking-widest-xl uppercase transition-all duration-200 border border-gold-500/30 text-center"
                >
                  500-Guest Catering &amp; Groceries
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-stone-400 border-t border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  <span className="text-stone-300">48–72h Claims Payouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  <span className="text-stone-300">6-Month Natural Death Waiting Period</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold-400" />
                  <span className="text-stone-300">POPIA Act Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Column: Smooth Summary Ledger Card */}
            <div className="lg:col-span-5">
              <div className="smooth-card p-8 sm:p-10 space-y-6 relative overflow-hidden">
                <div className="border-b border-stone-800 pb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                    PFP SUMMARY SCHEDULE
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-white mt-1">
                    What Practical Relief Delivers
                  </h3>
                </div>

                <div className="divide-y divide-stone-800/80 text-xs sm:text-sm">
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

                <div className="bg-[#0B0C10] p-4 rounded-xl border border-gold-500/20 text-xs text-stone-300 space-y-1">
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
      </section>

      {/* Category Discovery Portals (Smooth Navigation Gateway) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient">
            EXPLORE OUR SERVICE CATEGORIES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
            Comprehensive Funeral Planning, Logistical Care &amp; Support
          </h2>
          <p className="text-stone-400 text-xs sm:text-sm font-light">
            Select a category below to explore full details, terms, and interactive tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portal 1: Support Packages */}
          <div
            onClick={() => onSelectTab('packages')}
            className="smooth-card p-8 space-y-4 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                <Banknote className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white group-hover:text-gold-300 transition-colors">
                Support Packages &amp; Pricing
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Review Package 1 (Grocery), Package 2 (Grocery &amp; Cash), and Package 3 (Grocery &amp; Catering) with our interactive age-band pricing calculator.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-gold-400 font-semibold uppercase tracking-wider">
              <span>View Packages &rarr;</span>
              <span className="text-stone-500 text-[11px]">From R295/mo</span>
            </div>
          </div>

          {/* Portal 2: 500-Guest Catering & Groceries */}
          <div
            onClick={() => onSelectTab('catering')}
            className="smooth-card p-8 space-y-4 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white group-hover:text-gold-300 transition-colors">
                500-Guest Catering &amp; Groceries
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Explore our turnkey catering equipment, cooking teams, gas burners, dishing stations, and R15,000 supermarket voucher network.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-gold-400 font-semibold uppercase tracking-wider">
              <span>Catering Logistics &rarr;</span>
              <span className="text-stone-500 text-[11px]">Up to 500 people</span>
            </div>
          </div>

          {/* Portal 3: Claims & 48-72h Payouts */}
          <div
            onClick={() => onSelectTab('claims')}
            className="smooth-card p-8 space-y-4 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white group-hover:text-gold-300 transition-colors">
                Claims &amp; 48–72h Payouts
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Interactive document readiness checklist (IDs, Death Certificates, BI-1663), printable family guide, and fast turnaround timeline.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-gold-400 font-semibold uppercase tracking-wider">
              <span>Claims Guide &rarr;</span>
              <span className="text-stone-500 text-[11px]">48–72 Hours</span>
            </div>
          </div>

          {/* Portal 4: About Us & Heritage */}
          <div
            onClick={() => onSelectTab('about')}
            className="smooth-card p-8 space-y-4 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white group-hover:text-gold-300 transition-colors">
                About Us &amp; Real Experience
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Learn why PFP was founded from 10+ years of catering insight to relieve families of logistical stress during difficult times.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-gold-400 font-semibold uppercase tracking-wider">
              <span>Our Story &rarr;</span>
              <span className="text-stone-500 text-[11px]">Every Detail with Care</span>
            </div>
          </div>

          {/* Portal 5: Terms & Benefits */}
          <div
            onClick={() => onSelectTab('terms')}
            className="smooth-card p-8 space-y-4 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white group-hover:text-gold-300 transition-colors">
                Terms, Governance &amp; POPIA
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Clear, simple, and transparent terms: waiting periods, missed payments, grace periods, exclusions, and complaints channel.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-gold-400 font-semibold uppercase tracking-wider">
              <span>Policy Terms &rarr;</span>
              <span className="text-stone-500 text-[11px]">POPIA Compliant</span>
            </div>
          </div>

          {/* Portal 6: FAQ & Contact */}
          <div
            onClick={() => onSelectTab('faq')}
            className="smooth-card p-8 space-y-4 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white group-hover:text-gold-300 transition-colors">
                FAQ &amp; 24/7 Helpline
              </h3>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Frequently asked questions on vouchers, catering, claims, debit orders, and direct lines to our Sandton office.
              </p>
            </div>
            <div className="pt-4 border-t border-stone-800 flex items-center justify-between text-xs text-gold-400 font-semibold uppercase tracking-wider">
              <span>Get Answers &rarr;</span>
              <span className="text-stone-500 text-[11px]">0800 737 466</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="smooth-card p-8 sm:p-12 text-center space-y-4 border-2 border-gold-500/40 shadow-gold-glow">
          <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient">
            AT PFP, EVERY DETAIL WITH CARE.
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-white italic font-normal leading-relaxed">
            &ldquo;We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.&rdquo;
          </p>
          <div className="pt-3">
            <button
              onClick={() => onOpenQuote()}
              className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase inline-flex items-center gap-2"
            >
              <span>Join PFP Today</span>
              <ArrowRight className="w-3.5 h-3.5 text-obsidian-950" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
