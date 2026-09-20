import React from 'react';
import { ArrowRight, Utensils, Flame, ChefHat, CheckCircle2 } from 'lucide-react';

interface CateringPageProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const CateringPage: React.FC<CateringPageProps> = ({ onOpenQuote }) => {
  const pillars = [
    {
      number: '01',
      title: 'Professional Cooking Team',
      desc: 'Trained, respectful kitchen personnel take complete charge of meal preparation, timing, and traditional recipes so immediate family never have to stand over smoke and fires.'
    },
    {
      number: '02',
      title: 'Dedicated Serving Stations',
      desc: 'Hygienic buffet lines, structured dishing points, and crowd-flow management ensuring that up to 500 guests and community members are served smoothly and respectfully.'
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
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#1E2028] pb-10">
        <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
          LOGISTICAL CARE &bull; PACKAGE 3 SPOTLIGHT
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Catering For Up to 500 People. <br />
          <span className="italic text-gold-400">Every Behind-the-Scenes Detail Handled.</span>
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          Through more than 10 years working hand in hand with catering companies in the funeral industry, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and clean-up; Catering is a responsibility that families often need help managing.
        </p>
      </div>

      {/* Real Photo + Inclusions Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Photo Card */}
        <div className="lg:col-span-5">
          <div className="panel-dark rounded-lg overflow-hidden border border-[#242833] shadow-xl">
            <div className="aspect-[4/3]">
              <img
                src="/images/catering-setup.jpg"
                alt="PFP Professional Catering Operations"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="p-6 bg-[#0E1015] border-t border-[#20232B] space-y-3">
              <div className="font-serif text-xl text-white font-normal">
                Capacity For Up to 500 Mourners
              </div>
              <p className="text-xs text-stone-400 font-light leading-relaxed">
                We bring industrial pots, gas burners, full serving stations, and dedicated cooking teams directly to the family homestead or service marquee.
              </p>
              <div className="pt-2 border-t border-[#1E2028] text-xs text-gold-400 font-semibold">
                Included in Package 3 &bull; Total Value: R30,000
              </div>
            </div>
          </div>
        </div>

        {/* Right 6 Inclusions List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
            The 6 Tangible Logistical Inclusions:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="panel-dark p-6 rounded border border-[#20232B] space-y-2 hover:border-[#2E3342] transition-colors"
              >
                <div className="font-serif text-xl text-gold-500 font-bold">
                  {pillar.number}
                </div>
                <h3 className="font-serif text-base text-white font-medium">
                  {pillar.title}
                </h3>
                <p className="text-xs text-stone-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison: Cash-Only Policy vs PFP Package 3 */}
      <div className="panel-dark p-8 sm:p-12 rounded-lg border border-[#242833] space-y-8">
        <div>
          <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
            THE PRACTICAL REALITY
          </span>
          <h2 className="font-serif text-3xl text-white font-normal mt-1">
            Why Cash Alone Does Not Solve the Catering Burden
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#20232B]">
          {/* Cash Only */}
          <div className="space-y-4 md:pr-8 pt-4 md:pt-0">
            <div className="text-base font-semibold text-stone-300">
              Typical Cash-Only Funeral Policies
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-stone-500 font-bold">—</span>
                <span>A cash payout requires the grieving family to frantically locate, interview, and negotiate with private caterers under intense emotional distress.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-stone-500 font-bold">—</span>
                <span>Close relatives spend the vigil and funeral days peeling vegetables, tending wood smoke, and washing giant pots instead of mourning peacefully.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-stone-500 font-bold">—</span>
                <span>The family must locate and rent gas bottles, cauldrons, and serving tables separately, paying steep short-notice deposits.</span>
              </li>
            </ul>
          </div>

          {/* PFP Model */}
          <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
            <div className="text-base font-semibold text-gold-400">
              The PFP Package 3 Practical Model
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-stone-200 leading-relaxed">
              <li className="flex items-start gap-2.5">
                <span className="text-gold-500 font-bold">&bull;</span>
                <span><strong>Full Turnkey Catering:</strong> A professional culinary team arrives equipped to feed up to 500 mourners with dignity and hygiene.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold-500 font-bold">&bull;</span>
                <span><strong>Family Sits in Remembrance:</strong> Your family members spend the funeral remembering their loved one, not carrying pots or queuing at stoves.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-gold-500 font-bold">&bull;</span>
                <span><strong>Complete Equipment &amp; Clean-Up:</strong> Industrial gas burners, pots, serving utensils, and full post-service site clean-up included.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#20232B] flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-stone-400">
            Monthly Premium: 18–65 yrs: R445 | 65–75 yrs: R645 &bull; Total Value: R30,000
          </span>
          <button
            onClick={() => onOpenQuote('package-3')}
            className="btn-primary-gold px-8 py-3.5 rounded text-xs tracking-wider uppercase font-bold"
          >
            Choose Package 3 (Grocery + Catering)
          </button>
        </div>
      </div>
    </div>
  );
};
