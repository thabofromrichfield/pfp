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
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-widest block">
                AT PFP, EVERY DETAIL WITH CARE.
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                Plan ahead. Prepare your family. Let PFP support you when it matters most.
              </h3>
              <p className="text-stone-300 text-sm font-light max-w-2xl leading-relaxed">
                Practical funeral grocery relief of up to R15,000, professional catering for up to 500 mourners, and cash benefits to ease financial and logistical pressure.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onOpenQuote()}
                className="px-6 py-3.5 rounded bg-gold-500 hover:bg-gold-600 text-black text-xs font-semibold uppercase tracking-wider text-center transition-colors shadow-sm"
              >
                Request a Support Plan
              </button>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="px-6 py-3.5 rounded bg-[#15171E] hover:bg-[#1D202A] text-gold-400 font-semibold text-xs tracking-wider uppercase text-center border border-[#252936] transition-colors"
              >
                24/7 Helpline: {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleTabNavigate('home')}
                  className="w-10 h-10 border border-gold-500/80 rounded bg-black flex items-center justify-center font-serif text-lg font-bold text-gold-400"
                >
                  PFP
                </button>
                <div>
                  <div className="font-serif text-xl font-medium text-white tracking-wide leading-none">
                    PFP
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest text-stone-400 uppercase mt-1">
                    PREMIUM FUNERAL PLANNING
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Built from real experience and over 10 years working hand in hand with catering companies in the funeral industry. Committed to serving families with compassion, professionalism, and respect.
              </p>

              <div className="text-xs text-stone-400 space-y-1 pt-2 font-light">
                <div>Sandton Financial District, Rivonia Road, Johannesburg</div>
                <div>Helpline: <strong className="text-white font-medium">{COMPANY_INFO.phone}</strong></div>
                <div>Claims: <span className="text-gold-400">{COMPANY_INFO.claimsEmail}</span></div>
              </div>
            </div>

            {/* Support Packages */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
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
                      className="hover:text-gold-400 transition-colors text-left"
                    >
                      <span className="text-white font-medium">{pkg.name}: {pkg.tagline}</span>
                      <span className="block text-[11px] text-stone-400">
                        From R{pkg.premiums.age18_64}/mo &bull; Value R{pkg.totalValue.toLocaleString()}
                      </span>
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <button
                    onClick={() => handleTabNavigate('catering')}
                    className="text-gold-400 hover:underline block"
                  >
                    500-Person Catering Full Details &rarr;
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleTabNavigate('grocery')}
                    className="text-gold-400 hover:underline block"
                  >
                    R15,000 Supermarket Voucher Guide &rarr;
                  </button>
                </li>
              </ul>
            </div>

            {/* Governance & Information */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                Policy Governance
              </span>
              <ul className="space-y-2 text-xs text-stone-300 font-light">
                <li>
                  <button onClick={() => handleTabNavigate('claims')} className="hover:text-gold-400 transition-colors">
                    Claims &amp; 48–72h Payouts
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-400 transition-colors">
                    6-Month Natural Death Waiting Period
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-400 transition-colors">
                    Missed Payments &amp; Grace Period
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-400 transition-colors">
                    Cancellation &amp; Statutory Cooling-off
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-400 transition-colors">
                    Member vs PFP Responsibilities
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-400 transition-colors">
                    POPIA Privacy &amp; Data Rights
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-400 transition-colors">
                    Official Complaints Channel
                  </button>
                </li>
              </ul>
            </div>

            {/* Navigation & POPIA */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                Quick Actions
              </span>
              <button
                onClick={scrollToTop}
                className="px-4 py-2 bg-[#12141A] hover:bg-[#1A1C24] border border-[#20232B] text-xs text-stone-300 hover:text-white flex items-center justify-between w-full transition-colors rounded"
              >
                <span>Return to Top</span>
                <span className="text-gold-400">&uarr;</span>
              </button>

              <div className="p-3.5 bg-[#0F1014] rounded border border-[#1E2028] text-[11px] text-stone-400 font-light">
                <div className="text-white font-medium mb-1">POPIA Protection</div>
                Member data strictly governed under the Protection of Personal Information Act.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Footer Disclosures */}
      <div className="bg-[#050608] border-t border-[#16181F] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-3 text-stone-400 text-xs leading-relaxed font-light">
          <p>
            <strong className="text-stone-300">Underwriting &amp; Regulatory Notice:</strong> Premium Funeral Planning (PFP) brings together advance planning, supermarket grocery vouchers, and professional funeral catering services. Membership benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status, and claims documentation requirements. The current PFP proposal provides for a 6-month waiting period for natural death, subject to final underwriting approval and policy wording. Where a benefit is subject to an insurer&apos;s assessment, PFP cannot guarantee that a claim will be approved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-[#16181F]">
            <div>
              &copy; {new Date().getFullYear()} PFP &bull; PREMIUM FUNERAL PLANNING. All Rights Reserved. Every detail with Care.
            </div>
            <div className="flex items-center gap-4 text-stone-400">
              <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-400">Policy Terms</button>
              <span>&bull;</span>
              <button onClick={() => handleTabNavigate('terms')} className="hover:text-gold-400">POPIA Privacy</button>
              <span>&bull;</span>
              <button onClick={() => handleTabNavigate('contact')} className="hover:text-gold-400">Complaints Desk</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
