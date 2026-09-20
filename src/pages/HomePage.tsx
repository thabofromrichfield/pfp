import React from 'react';
import { ArrowRight, ShieldCheck, Clock, Utensils, ShoppingBag, Banknote, CheckCircle2 } from 'lucide-react';
import { PageTab } from '../types';
import { COMPANY_INFO, SUPPORT_PACKAGES } from '../data/pfpData';

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
              <div className="inline-block border-b border-gold-500 pb-1 text-gold-500 text-xs font-semibold uppercase tracking-widest">
                PREMIUM FUNERAL PLANNING &bull; SOUTH AFRICA
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-[1.12]">
                Practical support that eases the financial and logistical pressure during difficult times.
              </h1>

              <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed max-w-2xl">
                Through our carefully structured support packages, families can receive assistance with groceries, catering and other meaningful benefits, depending on the package they choose.
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => onSelectTab('packages')}
                  className="btn-primary-gold px-8 py-4 rounded text-xs tracking-wider uppercase flex items-center justify-center gap-2.5 font-bold"
                >
                  <span>View Support Packages</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onSelectTab('catering')}
                  className="btn-secondary-dark px-7 py-4 rounded text-xs tracking-wider uppercase text-center font-medium"
                >
                  500-Person Catering Full Details
                </button>
              </div>

              {/* Assurance Line */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-400 border-t border-[#1C1F26]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>48–72h Claims Payouts</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>6-Month Natural Death Waiting Period</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span>POPIA Act Compliant</span>
                </div>
              </div>
            </div>

            {/* Right Photo Framing (Clean, dignified, NO AI plastic borders) */}
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
                  <div className="text-xs font-semibold text-gold-500 uppercase tracking-wider">
                    Our Promise
                  </div>
                  <p className="font-serif text-lg text-white italic">
                    &ldquo;At PFP, every detail with Care.&rdquo;
                  </p>
                  <p className="text-xs text-stone-400 font-light leading-relaxed">
                    We are committed to serving families with compassion, professionalism and respect, while creating practical solutions that help families feel more prepared for tomorrow.
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
          <div className="panel-dark p-6 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>Grocery Support</span>
            </div>
            <div className="font-serif text-2xl text-white">Up to R15,000</div>
            <p className="text-xs text-stone-400 font-light">
              Redeemable at your nearest supermarket (Checkers, Shoprite, Pick n Pay, SPAR, Boxer).
            </p>
          </div>

          <div className="panel-dark p-6 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-wider">
              <Utensils className="w-4 h-4" />
              <span>Full Catering</span>
            </div>
            <div className="font-serif text-2xl text-white">Up to 500 People</div>
            <p className="text-xs text-stone-400 font-light">
              Cooking team, serving stations, pots, gas stoves, and complete clean-up.
            </p>
          </div>

          <div className="panel-dark p-6 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-wider">
              <Banknote className="w-4 h-4" />
              <span>Cash Benefit</span>
            </div>
            <div className="font-serif text-2xl text-white">R10,000 Cash</div>
            <p className="text-xs text-stone-400 font-light">
              Paid directly into the client&apos;s verified bank account (Package 2).
            </p>
          </div>

          <div className="panel-dark p-6 rounded-lg space-y-2">
            <div className="flex items-center gap-2 text-gold-500 text-xs font-semibold uppercase tracking-wider">
              <Clock className="w-4 h-4" />
              <span>Fast Turnaround</span>
            </div>
            <div className="font-serif text-2xl text-white">48–72 Hours</div>
            <p className="text-xs text-stone-400 font-light">
              Prompt claims assessment and benefit fulfillment upon document receipt.
            </p>
          </div>
        </div>
      </section>

      {/* Built From Real Experience Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="panel-dark p-8 sm:p-12 rounded-lg border border-[#242833]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
                BUILT FROM REAL EXPERIENCE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                More Than 10 Years Working Hand in Hand With Funeral Caterers
              </h2>
              <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
                Through this experience, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and the practical details behind the scenes; <em>Catering is a responsibility that families often need help managing.</em>
              </p>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onSelectTab('about')}
                  className="text-gold-400 hover:text-gold-300 font-semibold text-xs tracking-wider uppercase inline-flex items-center gap-1.5"
                >
                  <span>Read our full founding story &rarr;</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 bg-[#090A0D] p-6 rounded border border-[#20232B] space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-300">
                PFP Core Belief
              </div>
              <blockquote className="font-serif text-lg text-white italic font-normal leading-relaxed">
                &ldquo;We don’t believe in waiting until a family is facing a difficult moment before thinking about what they may need. We believe in planning ahead.&rdquo;
              </blockquote>
              <div className="text-[11px] text-stone-400">
                Because when the unexpected happens, having a plan can make a difficult journey a little easier.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Teaser Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#20232B] pb-6">
          <div>
            <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
              OUR SUPPORT PACKAGES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mt-1">
              Structured Support for Every Family
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('packages')}
            className="btn-secondary-dark px-5 py-2.5 rounded text-xs tracking-wider uppercase self-start sm:self-auto"
          >
            View Full Package Details &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SUPPORT_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="panel-dark p-8 rounded-lg flex flex-col justify-between space-y-6 hover:border-gold-500/50 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#20232B] pb-3">
                  <span className="text-xs font-semibold text-gold-500 uppercase tracking-wider">
                    {pkg.name}
                  </span>
                  <span className="text-xs text-stone-400">
                    Total Value: <strong className="text-white">R{pkg.totalValue.toLocaleString()}</strong>
                  </span>
                </div>

                <div className="font-serif text-2xl text-white font-normal">
                  {pkg.tagline}
                </div>

                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {pkg.description}
                </p>

                <div className="bg-[#090A0D] p-4 rounded border border-[#1E2129] space-y-1">
                  <div className="text-[11px] uppercase tracking-wider text-stone-400">Monthly Premium</div>
                  <div className="font-serif text-3xl text-gold-400 font-bold">
                    R{pkg.premiums.age18_64}
                    <span className="text-xs font-sans font-normal text-stone-400"> / mo (18–64 yrs)</span>
                  </div>
                  <div className="text-[11px] text-stone-400">
                    65–75 yrs: R{pkg.premiums.age65_75} / month
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onSelectTab('packages');
                  onOpenQuote(pkg.id);
                }}
                className="w-full btn-secondary-dark py-3 rounded text-xs tracking-wider uppercase font-semibold text-center hover:btn-primary-gold hover:border-transparent transition-all"
              >
                Select {pkg.name} &rarr;
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Plan Ahead Affirmation */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8">
        <div className="panel-dark p-8 sm:p-12 rounded-lg text-center space-y-4 border border-[#242833]">
          <h3 className="font-serif text-3xl text-white font-normal">
            Plan ahead. Prepare your family. Let PFP support you when it matters most.
          </h3>
          <p className="text-stone-300 text-sm font-light max-w-xl mx-auto">
            At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenQuote()}
              className="btn-primary-gold px-8 py-3.5 rounded text-xs tracking-wider uppercase font-bold"
            >
              Get Started with PFP Today
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
