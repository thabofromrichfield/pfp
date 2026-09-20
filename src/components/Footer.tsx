import React from 'react';
import { COMPANY_INFO, SUPPORT_PACKAGES } from '../data/pfpData';
import { PageTab } from '../types';

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
      {/* Top Banner Statement */}
      <div className="border-b border-[#1C1F26] py-14 sm:py-16 bg-[#0B0C0F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-widest block">
                {COMPANY_INFO.promise}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                {COMPANY_INFO.motto}
              </h3>
              <p className="text-stone-300 text-sm font-light max-w-2xl leading-relaxed">
                {COMPANY_INFO.goal}
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
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

      {/* Main Footer Links */}
      <div className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTabNavigate('home')}
                  className="w-10 h-10 border border-gold-400/80 rounded bg-[#12141C] flex items-center justify-center font-serif text-lg font-bold text-gold-300"
                >
                  PFP
                </button>
                <div>
                  <div className="font-serif text-xl font-medium text-white tracking-wide leading-none">
                    {COMPANY_INFO.fullName}
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest text-gold-300 uppercase mt-1">
                    Every detail with Care.
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed max-w-md">
                Built from real experience and working hand in hand with experienced catering companies with more than 10 years of experience in the catering industry.
              </p>

              <div className="text-xs text-stone-400 space-y-1 pt-2 font-light">
                <div>Standard 6-month natural death waiting period under current proposal.</div>
                <div>Claims turnaround: 48–72 hours upon verified documentation.</div>
              </div>
            </div>

            {/* Support Packages */}
            <div className="lg:col-span-4 space-y-3">
              <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                Support Packages
              </span>
              <ul className="space-y-2.5 text-xs text-stone-300 font-light">
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
                        18–64: R{pkg.premiums.age18_64}/mo &bull; 65–75: R{pkg.premiums.age65_75}/mo &bull; Total Value R{pkg.totalValue.toLocaleString()}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation & Governance */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                Policy Governance
              </span>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300 transition-colors">
                    Benefit Fulfilment Schedule
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300 transition-colors">
                    Monthly Payment Rules
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300 transition-colors">
                    Claims &amp; 48–72h Payouts
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300 transition-colors">
                    6-Month Waiting Period &amp; Exclusions
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300 transition-colors">
                    Missed Payments &amp; Cancellation
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300 transition-colors">
                    Member vs PFP Responsibilities
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300 transition-colors">
                    Privacy (POPIA) &amp; Complaints
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
            <strong className="text-stone-300">Statutory Notice:</strong> Benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status and claims requirements. The current PFP proposal provides for a 6-month waiting period for natural death, subject to final underwriting approval and policy wording. Where a benefit is subject to an insurer&apos;s assessment, PFP cannot guarantee that a claim will be approved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#16181F]">
            <div>
              &copy; {new Date().getFullYear()} PFP &bull; PREMIUM FUNERAL PLANNING. All Rights Reserved. Every detail with Care.
            </div>
            <div className="flex items-center gap-4 text-stone-400">
              <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300">Policy Terms</button>
              <span>&bull;</span>
              <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300">POPIA Privacy</button>
              <span>&bull;</span>
              <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-300">Complaints</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
