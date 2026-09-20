import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CateringDeepDiveProps {
  onSelectPackage: (pkgId: string) => void;
}

export const CateringDeepDive: React.FC<CateringDeepDiveProps> = ({ onSelectPackage }) => {
  const pillars = [
    {
      number: '01',
      title: 'Professional Cooking Team',
      desc: 'Trained, respectful kitchen personnel take full command of meal preparation, timing, and traditional recipes so immediate family never have to stand over smoke and fires.'
    },
    {
      number: '02',
      title: 'Dedicated Serving Stations',
      desc: 'Hygienic buffet lines, structured dishing points, and crowd-flow management ensuring that 500 guests and community members are served smoothly and respectfully.'
    },
    {
      number: '03',
      title: 'Pots & Heavy Equipment',
      desc: 'Commercial-grade large cauldrons, heavy-duty pots, food prep stations, and storage vessels — eliminating the stress and expense of hiring private equipment.'
    },
    {
      number: '04',
      title: 'Gas Stoves & Burners',
      desc: 'Independent, high-output industrial gas cooking units that operate with zero dependence on municipal power grids, load-shedding schedules, or wet firewood.'
    },
    {
      number: '05',
      title: 'Serving Utensils & Food Pans',
      desc: 'Full compliment of stainless steel dishing ladles, tongs, carvers, deep food pans, and protective shields provided directly on site.'
    },
    {
      number: '06',
      title: 'Setup & Service Clean-Up',
      desc: 'Our team arrives before dawn to stage the catering area and remains until all equipment is packed down, pots are scrubbed, and the family grounds are restored.'
    }
  ];

  return (
    <section id="catering" className="py-20 sm:py-28 bg-[#FAF8F5] editorial-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold-600" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest-2xl text-gold-700 uppercase">
            10+ YEARS CATERING FOUNDATION &bull; PACKAGE 3 SPOTLIGHT
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian-950 leading-[1.12]">
            Why catering is the responsibility families need the most help managing.
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            During a funeral, feeding up to 500 family members and community mourners is an enormous physical and logistical undertaking. From sourcing industrial pots to standing over fires for 48 hours, the burden almost always falls on grieving grandmothers, aunts, and siblings.
          </p>
        </div>

        {/* 6 Logistical Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {pillars.map((pillar) => (
            <div
              key={pillar.number}
              className="bg-white border border-sand-300 p-8 space-y-3 relative group hover:border-gold-600 transition-colors"
            >
              <div className="font-serif text-3xl text-gold-700 font-normal">
                {pillar.number}
              </div>
              <h3 className="font-serif text-xl font-medium text-obsidian-950">
                {pillar.title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Contrast Table: Traditional Burden vs PFP Practical Support */}
        <div className="bg-[#F5F2EB] border border-sand-300 p-8 sm:p-12">
          <div className="max-w-2xl mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-700 block">
              THE LOGISTICAL DIFFERENCE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-obsidian-950 mt-1">
              Conventional Funeral Cover vs PFP Package 3
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-sand-300">
            {/* The Old Burden */}
            <div className="space-y-4 md:pr-8 pt-4 md:pt-0">
              <div className="font-serif text-lg text-stone-900 font-medium">
                The Conventional Reality (Cash Only)
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-600 font-light">
                <li className="flex items-start gap-2.5">
                  <span className="text-stone-400 font-serif">—</span>
                  <span>A cash payout requires the grieving family to frantically locate, interview, and negotiate with private caterers under intense emotional distress.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-stone-400 font-serif">—</span>
                  <span>Close relatives spend the vigil and funeral days peeling vegetables, tending wood smoke, and washing giant pots instead of mourning peacefully.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-stone-400 font-serif">—</span>
                  <span>The family must locate and rent gas bottles, cauldrons, and serving tables separately, paying steep short-notice deposits.</span>
                </li>
              </ul>
            </div>

            {/* The PFP Way */}
            <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
              <div className="font-serif text-lg text-gold-800 font-medium">
                The PFP Practical Relief Model
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-800">
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-700 font-serif font-bold">&bull;</span>
                  <span><strong>Full Turnkey Catering:</strong> A professional culinary team arrives equipped to feed up to 500 mourners with dignity and hygiene.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-700 font-serif font-bold">&bull;</span>
                  <span><strong>Family Sits in Remembrance:</strong> Your family members spend the funeral remembering their loved one, not carrying pots or queuing at stoves.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-gold-700 font-serif font-bold">&bull;</span>
                  <span><strong>Complete Equipment &amp; Clean-Up:</strong> Industrial gas burners, pots, serving utensils, and full post-service site clean-up included.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-sand-300 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-stone-500 font-serif italic">
              Total Package 3 Value: R30,000 &bull; Premiums from R445/month
            </span>
            <button
              onClick={() => onSelectPackage('package-3')}
              className="px-6 py-3 bg-obsidian-950 text-white font-medium text-xs tracking-widest-xl uppercase border border-gold-600/40 hover:bg-obsidian-900 transition-colors flex items-center gap-2"
            >
              <span>Choose Package 3 (Grocery + Catering)</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
