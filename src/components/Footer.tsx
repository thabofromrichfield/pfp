import React from 'react';
import { PageTab } from '../types';
import { EVERY_DETAIL_WITH_CARE, SUPPORT_PACKAGES, ABOUT_US } from '../data/pfpData';

interface FooterProps {
  onSelectTab: (tab: PageTab) => void;
  onOpenQuote: (pkgId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabNavigate = (tab: PageTab) => {
    onSelectTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#07080A] text-white border-t border-[#1C1F26]">
      {/* Top Banner */}
      <div className="border-b border-[#1C1F26] py-14 sm:py-16 bg-[#0B0C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-widest block">
                {EVERY_DETAIL_WITH_CARE.heading}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                {EVERY_DETAIL_WITH_CARE.paragraph2}
              </h3>
              <p className="text-stone-300 text-sm font-light max-w-2xl leading-relaxed">
                {EVERY_DETAIL_WITH_CARE.paragraph1}
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <button
                onClick={() => onOpenQuote()}
                className="px-6 py-3.5 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider text-center transition-colors shadow-sm"
              >
                Request a Support Plan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links */}
      <div className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTabNavigate('home')}
                  className="w-10 h-10 border border-gold-400/80 rounded bg-[#12141C] flex items-center justify-center font-serif text-lg font-bold text-gold-300"
                >
                  PFP
                </button>
                <div>
                  <div className="font-serif text-xl font-medium text-white tracking-wide leading-none">
                    PREMIUM FUNERAL PLANNING
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest text-gold-300 uppercase mt-1">
                    Every detail with Care.
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed max-w-md">
                {ABOUT_US.builtFromRealExperience.paragraph1}
              </p>

              <div className="text-xs text-stone-400 space-y-1 pt-2 font-light">
                <div>Claims turnaround: between 48-72 hours once verified.</div>
                <div>Standard 6-month natural death waiting period.</div>
              </div>
            </div>

            {/* Support Packages */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                Support Packages
              </span>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                {SUPPORT_PACKAGES.map((pkg) => (
                  <li key={pkg.id}>
                    <button
                      onClick={() => {
                        handleTabNavigate('packages');
                        onOpenQuote(pkg.id);
                      }}
                      className="hover:text-gold-300 transition-colors text-left"
                    >
                      <span className="text-white font-medium">{pkg.name}: {pkg.tagline}</span>
                      <span className="block text-[11px] text-stone-400">
                        {pkg.headline}
                      </span>
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    onClick={() => handleTabNavigate('catering')}
                    className="text-gold-300 hover:underline block"
                  >
                    500-Person Catering Full Details &rarr;
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabNavigate('grocery')}
                    className="text-gold-300 hover:underline block"
                  >
                    R15,000 Supermarket Voucher Relief &rarr;
                  </button>
                </li>
              </ul>
            </div>

            {/* Navigation & Governance */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                Navigation &amp; Governance
              </span>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li>
                  <button onClick={() => handleTabNavigate('about')} className="hover:text-gold-300 transition-colors">
                    About Us
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('packages')} className="hover:text-gold-300 transition-colors">
                    Our Support Packages
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('claims')} className="hover:text-gold-300 transition-colors">
                    Claims &amp; Payouts (48–72h)
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300 transition-colors">
                    Payments, Benefits &amp; Terms
                  </button>
                </li>
                <li className="pt-2">
                  <button
                    onClick={scrollToTop}
                    className="text-gold-300 hover:text-white inline-flex items-center gap-1 font-semibold"
                  >
                    Return to Top &uarr;
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Footer Disclosures */}
      <div className="bg-[#050608] border-t border-[#16181F] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3 text-stone-400 text-xs leading-relaxed font-light">
          <p>
            <strong className="text-stone-300">Notice:</strong> Benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status and claims requirements. The current PFP proposal provides for a 6-month waiting period for natural death, subject to final underwriting approval and policy wording. Where a benefit is subject to an insurer&apos;s assessment, PFP cannot guarantee that a claim will be approved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#16181F]">
            <div>
              &copy; {new Date().getFullYear()} PFP &bull; PREMIUM FUNERAL PLANNING. All Rights Reserved. At PFP, every detail with Care.
            </div>
            <div className="flex items-center gap-4 text-stone-400">
              <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300">Payments &amp; Terms</button>
              <span>&bull;</span>
              <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300">Privacy (POPIA)</button>
              <span>&bull;</span>
              <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300">Complaints</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
