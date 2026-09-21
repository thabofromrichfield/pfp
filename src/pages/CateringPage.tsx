import React from 'react';
import { Utensils, CheckCircle2, ArrowRight } from 'lucide-react';
import { SUPPORT_PACKAGES, ABOUT_US } from '../data/pfpData';

interface CateringPageProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const CateringPage: React.FC<CateringPageProps> = ({ onOpenQuote }) => {
  const pkg3 = SUPPORT_PACKAGES[2];

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#20232B] pb-10">
        <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
          PACKAGE 3 &bull; SPECIALIZED LOGISTICS
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Catering Support for up to 500 People
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          {pkg3.description}
        </p>
      </div>

      {/* Hero Photographic Banner */}
      <div className="panel-dark rounded-lg overflow-hidden border border-[#20232B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7">
          <img
            src="/images/catering-setup.jpg"
            alt="Funeral Catering Infrastructure Setup"
            className="w-full h-80 sm:h-96 object-cover"
          />
        </div>
        <div className="lg:col-span-5 p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
              10+ YEARS CATERING BACKGROUND
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              Built From Real Experience
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              {ABOUT_US.builtFromRealExperience.paragraph1}
            </p>
          </div>

          <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] space-y-2">
            <div className="flex justify-between text-xs text-stone-400">
              <span>Total Package Value:</span>
              <span className="text-gold-300 font-semibold text-sm">R30,000</span>
            </div>
            <div className="flex justify-between text-xs text-stone-300 font-light">
              <span>18–65 years:</span>
              <span className="text-white font-medium">R445 / month</span>
            </div>
            <div className="flex justify-between text-xs text-stone-300 font-light">
              <span>65–75 years:</span>
              <span className="text-white font-medium">R645 / month</span>
            </div>
          </div>

          <button
            onClick={() => onOpenQuote('package-3')}
            className="w-full py-3.5 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <span>Request Package 3 Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Inclusions Grid */}
      <div className="space-y-6">
        <div className="max-w-2xl space-y-1">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
            AGREED CATERING SERVICES &amp; EQUIPMENT
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
            Catering Support Includes:
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pkg3.cateringIncludes?.map((item, idx) => (
            <div
              key={idx}
              className="panel-dark p-6 rounded-lg border border-[#222530] space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-gold-300 font-mono text-sm">0{idx + 1}</span>
                <CheckCircle2 className="w-4 h-4 text-gold-400" />
              </div>
              <h4 className="font-serif text-xl text-white font-medium">
                {item}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Responsibility Note */}
      <div className="p-8 rounded-lg bg-[#12141A] border border-[#20232B] space-y-3">
        <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
          PRACTICAL RESPONSIBILITY
        </span>
        <p className="text-stone-300 text-sm font-light leading-relaxed">
          {ABOUT_US.builtFromRealExperience.paragraph2}
        </p>
        <p className="font-serif text-lg text-white italic">
          &ldquo;{ABOUT_US.builtFromRealExperience.belief}&rdquo;
        </p>
      </div>
    </div>
  );
};
