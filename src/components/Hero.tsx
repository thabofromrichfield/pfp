import React from 'react';
import { ArrowRight, Utensils, ShoppingBag, ShieldCheck, Clock, CheckCircle2, Award } from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';

interface HeroProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative overflow-hidden bg-primary text-white pt-12 pb-20 lg:pt-16 lg:pb-28 transition-colors duration-500">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-light/40 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Messaging */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs tracking-wider uppercase font-semibold text-accent-light backdrop-blur-sm">
              <Award className="w-3.5 h-3.5 text-accent" />
              <span>PREMIUM FUNERAL PLANNING &bull; SOUTH AFRICA</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Every Detail With Care. <br />
              <span className="text-gold-light italic font-normal">
                Practical Support
              </span>{' '}
              When It Matters Most.
            </h1>

            {/* Sub-copy directly from prompt */}
            <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed font-light max-w-2xl">
              Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families receive guaranteed assistance with groceries, catering and cash benefits.
            </p>

            {/* Core Value Pillars - Quick Glance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Grocery Relief</span>
                </div>
                <div className="font-serif text-lg font-bold text-white">Up to R15,000</div>
                <p className="text-[11px] text-slate-300 mt-0.5">Voucher for nearest supermarket</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Utensils className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Full Catering</span>
                </div>
                <div className="font-serif text-lg font-bold text-white">Up to 500 People</div>
                <p className="text-[11px] text-slate-300 mt-0.5">Pots, team, stoves &amp; clean-up</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Fast Payout</span>
                </div>
                <div className="font-serif text-lg font-bold text-white">48–72 Hours</div>
                <p className="text-[11px] text-slate-300 mt-0.5">Prompt claims fulfillment</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="px-7 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-bold text-sm tracking-wider uppercase transition-all shadow-lg hover:shadow-gold-glow flex items-center justify-center gap-2 group"
              >
                <span>Choose a Support Package</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#calculator"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-sm tracking-wider uppercase text-center transition-all"
              >
                Calculate Premium (From R295/m)
              </a>
            </div>

            {/* Micro reassurance badges */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>10+ Years Catering Heritage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>POPIA Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>No Hidden Fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual & Experience Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative border */}
              <div className="relative p-2 rounded-2xl bg-gradient-to-b from-accent/40 via-white/10 to-transparent shadow-2xl">
                <div className="overflow-hidden rounded-xl bg-primary-dark relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                  <img
                    src="/images/hero-family.jpg"
                    alt="South African Family with Dignity and Care"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/20 to-transparent" />

                  {/* Overlaid Card on Image */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-primary/90 backdrop-blur-md border border-white/15 shadow-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-sm font-bold text-accent">PFP PROMISE</span>
                      <span className="text-[10px] uppercase tracking-wider text-slate-300">South Africa</span>
                    </div>
                    <p className="text-xs text-slate-200 italic font-light">
                      &ldquo;Because when the unexpected happens, having a plan can make a difficult journey a little easier.&rdquo;
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-300 border-t border-white/10">
                      <span>Principal Age Bands: 18–64 &bull; 65–75</span>
                      <span className="text-accent font-semibold">Clear &bull; Transparent</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-accent text-primary-dark font-bold px-4 py-3 rounded-xl shadow-xl border-2 border-white/40 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary-dark" />
                <div>
                  <div className="text-xs uppercase tracking-wider leading-none">Claims Payout</div>
                  <div className="font-serif text-base font-extrabold">{COMPANY_INFO.payoutTimeframe}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
