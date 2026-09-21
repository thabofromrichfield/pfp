import React from 'react';
import { ArrowRight, Utensils, ShoppingBag, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { PageTab } from '../types';
import {
  ABOUT_US,
  SUPPORT_PACKAGES,
  EVERY_DETAIL_WITH_CARE,
} from '../data/pfpData';

interface HomePageProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenQuote: (pkgId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectTab, onOpenQuote }) => {
  return (
    <div className="space-y-24 pb-24">
      {/* Editorial Corporate Hero */}
      <section className="pt-12 sm:pt-20 border-b border-[#1E2028] pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-block border-b border-gold-400 pb-1 text-gold-300 text-xs font-semibold uppercase tracking-widest">
                PREMIUM FUNERAL PLANNING
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-[1.12]">
                Plan ahead. Prepare your family. Let PFP support you when it matters most.
              </h1>

              <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                {ABOUT_US.goal}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onSelectTab('packages')}
                  className="px-8 py-4 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                >
                  <span>View Support Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectTab('catering')}
                  className="px-7 py-4 rounded bg-[#12141C] hover:bg-[#1A1D27] text-gold-300 text-xs font-semibold tracking-wider uppercase text-center border border-[#252834] transition-colors"
                >
                  500-Person Catering Full Details
                </button>
              </div>

              {/* Assurance Line */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-400 border-t border-[#1C1F26]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>Claims Paid 48–72 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>6-Month Natural Death Waiting Period</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                  <span>POPIA Data Protection</span>
                </div>
              </div>
            </div>

            {/* Right Photo Framing */}
            <div className="lg:col-span-5">
              <div className="panel-dark rounded-lg overflow-hidden border border-[#242833] shadow-2xl">
                <div className="relative aspect-[4/3] sm:aspect-[16/11]">
                  <img
                    src="/images/hero-family.jpg"
                    alt="South African Family in Dignified Remembrance"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent" />
                </div>
                <div className="p-6 bg-[#0E1015] border-t border-[#20232B] space-y-2">
                  <div className="text-xs font-semibold text-gold-300 uppercase tracking-wider">
                    {ABOUT_US.ourPromise.heading}
                  </div>
                  <p className="font-serif text-lg text-white italic">
                    &ldquo;{ABOUT_US.ourPromise.motto}&rdquo;
                  </p>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    {ABOUT_US.ourPromise.commitment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="panel-dark p-6 rounded-lg space-y-2 border border-[#20232B]">
            <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>Grocery Support</span>
            </div>
            <div className="font-serif text-2xl text-white">Up to R15,000</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Voucher redeemable at your nearest supermarket to purchase essential food and supplies.
            </p>
          </div>

          <div className="panel-dark p-6 rounded-lg space-y-2 border border-[#20232B]">
            <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Utensils className="w-4 h-4" />
              <span>Full Catering</span>
            </div>
            <div className="font-serif text-2xl text-white">Up to 500 People</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Cooking team, serving stations, pots &amp; equipment, gas stoves, utensils, setup &amp; clean-up.
            </p>
          </div>

          <div className="panel-dark p-6 rounded-lg space-y-2 border border-[#20232B]">
            <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Claims Turnaround</span>
            </div>
            <div className="font-serif text-2xl text-white">48–72 Hours</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Claims will be paid out between 48-72 hours upon verification.
            </p>
          </div>

          <div className="panel-dark p-6 rounded-lg space-y-2 border border-[#20232B]">
            <div className="flex items-center gap-2 text-gold-300 text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Clear Governance</span>
            </div>
            <div className="font-serif text-2xl text-white">6 Months</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Waiting period for natural death, subject to final underwriting approval and policy wording.
            </p>
          </div>
        </div>
      </section>

      {/* Support Packages Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#20232B] pb-6">
          <div className="space-y-2">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
              OUR SUPPORT PACKAGES
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white">
              Every Detail With Care.
            </h2>
            <p className="text-stone-300 text-sm font-light max-w-xl">
              {EVERY_DETAIL_WITH_CARE.paragraph1}
            </p>
          </div>
          <button
            onClick={() => onSelectTab('packages')}
            className="text-gold-300 hover:text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
          >
            <span>Explore All Packages &rarr;</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SUPPORT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="panel-dark p-8 rounded-lg border border-[#222530] flex flex-col justify-between space-y-8 hover:border-gold-400/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#1E2028] pb-3">
                  <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
                    {pkg.tagline}
                  </span>
                  <span className="text-stone-400 text-xs font-mono">0{pkg.packageNumber}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-normal text-white">
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
                  <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] space-y-2">
                    <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
                      Catering support includes:
                    </span>
                    <ul className="text-xs text-stone-300 space-y-1 font-light">
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

              <div className="space-y-4 pt-4 border-t border-[#1E2028]">
                <div className="space-y-1 text-xs text-stone-300 font-light">
                  <div className="flex justify-between">
                    <span className="text-stone-400">{pkg.premiums.ageLabel1 || '18–64 years'}:</span>
                    <span className="font-serif text-lg font-bold text-white">
                      R{pkg.premiums.age18_64} / mo
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">65–75 years:</span>
                    <span className="font-serif text-lg font-bold text-white">
                      R{pkg.premiums.age65_75} / mo
                    </span>
                  </div>
                  {pkg.totalValue && (
                    <div className="flex justify-between pt-1 border-t border-[#181A22]">
                      <span className="text-stone-400">Total Benefit Value:</span>
                      <span className="text-gold-300 font-semibold">
                        R{pkg.totalValue.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onOpenQuote(pkg.id)}
                  className="w-full py-3 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                >
                  Request {pkg.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2 Feature Cards: Catering Logistics & Grocery Support */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Catering Feature Card */}
        <div className="panel-dark rounded-lg overflow-hidden border border-[#20232B] flex flex-col justify-between">
          <div className="relative aspect-[16/9]">
            <img
              src="/images/catering-setup.jpg"
              alt="Professional Funeral Catering Setup"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent" />
          </div>
          <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
                PACKAGE 3 CATERING HIGHLIGHT
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Catering Support for up to 500 People
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Shaped by working hand in hand with experienced catering companies with more than 10 years of experience in the catering industry.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onSelectTab('catering')}
                className="text-gold-300 hover:text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Read 500-Person Catering Details &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Grocery Support Card */}
        <div className="panel-dark rounded-lg overflow-hidden border border-[#20232B] flex flex-col justify-between">
          <div className="relative aspect-[16/9]">
            <img
              src="/images/grocery-support.jpg"
              alt="Grocery Support Voucher Relief"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent" />
          </div>
          <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
                PRACTICAL RELIEF ACROSS ALL PACKAGES
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Grocery Support up to R15,000
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                Receive grocery support of up to R15,000 through a voucher redeemable at your nearest supermarket, helping your family purchase essential food and supplies during the funeral period.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onSelectTab('grocery')}
                className="text-gold-300 hover:text-white text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <span>Read Grocery Support Details &rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Every Detail With Care Callout Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 sm:p-12 rounded-lg bg-[#12141A] border border-[#20232B] space-y-4">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            {EVERY_DETAIL_WITH_CARE.heading}
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-normal text-white">
            {EVERY_DETAIL_WITH_CARE.paragraph2}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
            {EVERY_DETAIL_WITH_CARE.paragraph1}
          </p>
          <div className="pt-2 flex gap-4">
            <button
              onClick={() => onSelectTab('terms')}
              className="px-6 py-3 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              Review Payments &amp; Terms
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
