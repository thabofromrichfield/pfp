import React from 'react';
import { ABOUT_US, EVERY_DETAIL_WITH_CARE } from '../data/pfpData';

interface AboutPageProps {
  onOpenQuote: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#20232B] pb-10">
        <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
          ABOUT US
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Practical Support for Families
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          {ABOUT_US.goal}
        </p>
      </div>

      {/* Built From Real Experience Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-b border-[#20232B] pb-16">
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
              10+ YEARS CATERING BACKGROUND
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white">
              {ABOUT_US.builtFromRealExperience.heading}
            </h2>
          </div>

          <div className="panel-dark rounded-lg overflow-hidden border border-[#20232B]">
            <img
              src="/images/hero-family.jpg"
              alt="Honoring Family Memories"
              className="w-full h-56 object-cover"
            />
          </div>

          <div className="p-5 rounded bg-[#12141A] border border-[#20232B] space-y-2">
            <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
              OUR BELIEF
            </span>
            <p className="font-serif text-lg text-white font-normal italic leading-relaxed">
              &ldquo;{ABOUT_US.builtFromRealExperience.belief}&rdquo;
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
          <p className="text-lg text-white font-normal">
            {ABOUT_US.builtFromRealExperience.paragraph1}
          </p>
          <p>
            {ABOUT_US.builtFromRealExperience.paragraph2}
          </p>
          <div className="p-6 bg-[#0E1015] rounded border border-[#1E2028] space-y-2">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
              RESPONSIBILITY MANAGEMENT
            </span>
            <p className="text-xs sm:text-sm text-stone-300 font-light">
              Catering is a responsibility that families often need help managing.
            </p>
          </div>
        </div>
      </div>

      {/* What We Do & Our Promise */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#20232B] pb-16">
        {/* What We Do */}
        <div className="panel-dark p-8 sm:p-10 rounded-lg border border-[#222530] space-y-4">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
            PRACTICAL PREPARATION
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            {ABOUT_US.whatWeDo.heading}
          </h3>
          <p className="text-stone-300 text-sm leading-relaxed font-light">
            {ABOUT_US.whatWeDo.paragraph1}
          </p>
          <p className="text-stone-300 text-sm leading-relaxed font-light">
            {ABOUT_US.whatWeDo.paragraph2}
          </p>

          <div className="pt-4 border-t border-[#1E2028] space-y-2 text-xs sm:text-sm text-stone-300 font-light">
            <p>&bull; {ABOUT_US.whatWeDo.belief1}</p>
            <p className="text-white font-medium">&bull; {ABOUT_US.whatWeDo.belief2}</p>
            <p>&bull; {ABOUT_US.whatWeDo.belief3}</p>
          </div>
        </div>

        {/* Our Promise */}
        <div className="panel-dark p-8 sm:p-10 rounded-lg border border-[#222530] space-y-4">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
            SACRED COMMITMENT
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
            {ABOUT_US.ourPromise.heading}
          </h3>
          <div className="p-4 bg-[#0C0E12] rounded border border-gold-400/40 text-gold-300 font-serif text-xl font-medium">
            &ldquo;{ABOUT_US.ourPromise.motto}&rdquo;
          </div>
          <p className="text-stone-300 text-sm leading-relaxed font-light">
            {ABOUT_US.ourPromise.commitment}
          </p>
        </div>
      </div>

      {/* Bottom Callout */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-lg bg-[#12141A] border border-[#20232B]">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif text-xl sm:text-2xl text-white font-normal">
            {EVERY_DETAIL_WITH_CARE.paragraph2}
          </h4>
          <p className="text-xs text-stone-400 font-light">
            {EVERY_DETAIL_WITH_CARE.paragraph1}
          </p>
        </div>
        <button
          onClick={onOpenQuote}
          className="px-6 py-3 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
        >
          Request a Plan
        </button>
      </div>
    </div>
  );
};
