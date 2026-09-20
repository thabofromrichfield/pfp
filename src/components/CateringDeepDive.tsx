import React from 'react';
import { Utensils, Users, ChefHat, Flame, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, XCircle } from 'lucide-react';
import { CATERING_PILLARS } from '../data/pfpData';

interface CateringDeepDiveProps {
  onSelectPackage: (pkgId: string) => void;
}

export const CateringDeepDive: React.FC<CateringDeepDiveProps> = ({ onSelectPackage }) => {
  return (
    <section id="catering" className="py-20 lg:py-28 bg-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold tracking-widest uppercase">
            <span>10+ YEARS CATERING EXPERTISE &bull; PACKAGE 3 SPOTLIGHT</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Catering For Up to 500 People. <br />
            <span className="text-accent italic font-normal">Every Practical Detail Handled.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light">
            We have seen firsthand how much goes into feeding family members and guests during a funeral. From preparing large quantities of food to organizing cooking teams and heavy equipment, catering is a responsibility families shouldn’t have to carry alone.
          </p>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Left Column: Catering Photo & Visual Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              <img
                src="/images/catering-setup.jpg"
                alt="PFP Professional Funeral Catering Setup"
                className="w-full h-full object-cover object-center aspect-[4/3] sm:aspect-[16/10] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <div className="flex items-center gap-2 text-accent font-serif font-bold text-sm">
                  <ChefHat className="w-4 h-4" />
                  <span>Professional Kitchen Squad</span>
                </div>
                <div className="font-serif text-xl font-bold">500 Guests Catered With Dignity</div>
                <p className="text-xs text-slate-300 font-light">
                  Complete equipment, gas burners, pots, dishing and clean-up.
                </p>
              </div>
            </div>

            {/* Float Highlight Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white p-4 rounded-2xl shadow-xl border border-paper-border flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-accent/20 text-accent flex items-center justify-center font-bold">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Capacity</div>
                <div className="font-serif text-lg font-bold text-primary">500 Mourners</div>
              </div>
            </div>
          </div>

          {/* Right Column: 6 Inclusions Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border hover:border-accent transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center mb-3">
                  <ChefHat className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-primary mb-1">
                  1. Professional Cooking Team
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Trained cooks and kitchen hands prepare meals with hygiene, traditional recipes, and punctual timing.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border hover:border-accent transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center mb-3">
                  <Utensils className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-primary mb-1">
                  2. Dedicated Serving Stations
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Clean, well-organized buffet serving stations and dishing points to respectfully feed up to 500 guests.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border hover:border-accent transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center mb-3">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-primary mb-1">
                  3. Heavy-Duty Pots &amp; Equipment
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Commercial-grade cooking pots, cauldrons, cutting boards, food prep tables, and heating chafers.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border hover:border-accent transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-primary mb-1">
                  4. Gas Stoves &amp; Burners
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Self-contained industrial gas cooking units. No dependency on power cuts, load shedding, or firewood.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border hover:border-accent transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center mb-3">
                  <Utensils className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-primary mb-1">
                  5. Full Serving Utensils
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Serving spoons, tongs, ladles, deep food trays, dishing basins, and hygienic food shields provided.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border hover:border-accent transition-all">
                <div className="w-10 h-10 rounded-xl bg-primary text-accent flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="font-serif font-bold text-base text-primary mb-1">
                  6. Setup &amp; Service Clean-Up
                </h4>
                <p className="text-slate-600 text-xs leading-relaxed">
                  We handle the early morning kitchen staging and conduct post-service washing, packing, and grounds clearing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison: Cash-Only Policy vs PFP Package 3 */}
        <div className="rounded-3xl bg-paper-soft border border-paper-border p-6 sm:p-10 shadow-lg">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs uppercase font-bold tracking-widest text-accent-dark">
              WHY SOUTH AFRICAN FAMILIES PREFER PFP
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary mt-1">
              Standard Funeral Policy vs PFP Package 3
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              See why practical assistance eliminates the stress that money alone cannot resolve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Typical Funeral Cover */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-sm uppercase tracking-wider">
                <XCircle className="w-5 h-5" />
                <span>Typical Cash-Only Policies</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Gives cash only — family must find and negotiate with caterers under stress.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Mourning aunts and grandmothers forced to spend days cooking in smoke and heat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Family must rent expensive pots, gas cylinders, and serving stations separately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>No grocery voucher — all groceries bought in chaos with cash shortages.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">&times;</span>
                  <span>Grieving family left to wash giant pots and clean the yard after the funeral.</span>
                </li>
              </ul>
            </div>

            {/* PFP Package 3 */}
            <div className="p-6 rounded-2xl bg-primary text-white border-2 border-accent space-y-4 shadow-xl">
              <div className="flex items-center gap-2 text-accent font-bold text-sm uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5 text-accent" />
                <span>PFP Package 3 (Grocery + Catering)</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">&radic;</span>
                  <span><strong>Turnkey Catering:</strong> Professional cooking team arrives with all equipment.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">&radic;</span>
                  <span><strong>Family Rests:</strong> Loved ones can focus purely on honouring and remembering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">&radic;</span>
                  <span><strong>All-Inclusive:</strong> Industrial pots, gas stoves, dishing stations provided.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">&radic;</span>
                  <span><strong>R15,000 Grocery Voucher:</strong> Direct relief for fresh food &amp; bulk staples.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">&radic;</span>
                  <span><strong>Full Clean-Up:</strong> Team scrubs pots, cleans stations, and restores order.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onSelectPackage('package-3')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-bold text-xs uppercase tracking-wider transition-all shadow-md"
            >
              <span>Choose Package 3 (From R445/month)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
