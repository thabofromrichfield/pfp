import React from 'react';
import { ArrowUp } from 'lucide-react';
import { COMPANY_INFO, SUPPORT_PACKAGES } from '../data/pfpData';

interface FooterProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#121316] text-white border-t border-white/10">
      {/* Top Banner Statement */}
      <div className="border-b border-white/10 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-400 block">
                AT PFP, EVERY DETAIL WITH CARE.
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
                Plan ahead. Prepare your family. Let PFP support you when it matters most.
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 font-light max-w-2xl leading-relaxed">
                Practical funeral grocery relief of up to R15,000, professional catering for up to 500 mourners, and cash benefits to ease financial and logistical pressure.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={() => onOpenQuote()}
                className="px-8 py-4 bg-gold-600 hover:bg-gold-500 text-obsidian-950 font-semibold text-xs tracking-widest-xl uppercase transition-colors text-center"
              >
                Request a Support Plan
              </button>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="px-8 py-3.5 bg-transparent hover:bg-white/5 text-white font-medium text-xs tracking-widest-xl uppercase text-center border border-white/20 transition-colors"
              >
                24/7 Helpline: {COMPANY_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 border border-gold-600/60 bg-black/40 flex items-center justify-center font-serif text-lg text-white">
                  PFP
                </div>
                <div>
                  <div className="font-serif text-xl font-normal text-white leading-none">
                    PFP
                  </div>
                  <div className="text-[9px] font-medium tracking-widest-2xl text-gold-400 uppercase mt-1">
                    PREMIUM FUNERAL PLANNING
                  </div>
                </div>
              </div>

              <p className="text-xs text-stone-400 font-light leading-relaxed">
                Built from real experience and over 10 years working hand in hand with catering companies in the funeral industry. Committed to serving families with compassion, professionalism, and respect.
              </p>

              <div className="text-xs text-stone-400 space-y-1.5 pt-2 font-light">
                <div>Sandton City Office Tower, 5th Floor, Johannesburg</div>
                <div>Helpline: {COMPANY_INFO.phone} | Office: {COMPANY_INFO.phoneDirect}</div>
                <div>General: {COMPANY_INFO.email}</div>
                <div>Complaints: {COMPANY_INFO.complaintsEmail}</div>
              </div>
            </div>

            {/* Support Packages */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-400 block">
                Support Packages
              </span>
              <ul className="space-y-2.5 text-xs text-stone-400 font-light">
                {SUPPORT_PACKAGES.map((pkg) => (
                  <li key={pkg.id}>
                    <button
                      onClick={() => onOpenQuote(pkg.id)}
                      className="hover:text-white transition-colors text-left"
                    >
                      <span className="text-stone-200">{pkg.name}: {pkg.tagline}</span>
                      <span className="block text-[11px] text-stone-500">
                        From R{pkg.premiums.age18_64}/mo &bull; Value R{pkg.totalValue.toLocaleString()}
                      </span>
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <a href="#catering" className="text-gold-400 hover:underline">
                    500-Person Catering Full Details &rarr;
                  </a>
                </li>
                <li>
                  <a href="#grocery" className="text-gold-400 hover:underline">
                    R15,000 Supermarket Voucher Guide &rarr;
                  </a>
                </li>
              </ul>
            </div>

            {/* Governance & Information */}
            <div className="lg:col-span-3 space-y-3">
              <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-400 block">
                Policy Governance
              </span>
              <ul className="space-y-2.5 text-xs text-stone-400 font-light">
                <li><a href="#claims" className="hover:text-white transition-colors">Claims &amp; 48–72h Payouts</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">6-Month Natural Death Waiting Period</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Missed Payments &amp; Grace Period</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Cancellation &amp; Statutory Cooling-off</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Member vs PFP Responsibilities</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">POPIA Privacy &amp; Data Rights</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Official Complaints Channel</a></li>
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-400 block">
                Navigation
              </span>
              <button
                onClick={scrollToTop}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-xs text-stone-300 flex items-center justify-between w-full transition-colors"
              >
                <span>Return to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-gold-400" />
              </button>

              <div className="p-3 bg-white/5 border border-white/10 text-[11px] text-stone-400 font-light">
                <div className="text-white font-medium mb-1">POPIA Protection</div>
                Handled in accordance with South Africa&apos;s Protection of Personal Information Act.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statutory Footer Disclosures */}
      <div className="bg-black/60 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-stone-500 text-[11px] leading-relaxed font-light">
          <p>
            <strong>Underwriting &amp; Regulatory Notice:</strong> Premium Funeral Planning (PFP) brings together advance planning, supermarket grocery vouchers, and professional funeral catering services. Membership benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status, and claims documentation requirements. The current PFP proposal provides for a 6-month waiting period for natural death, subject to final underwriting approval and policy wording. Where a benefit is subject to an insurer&apos;s assessment, PFP cannot guarantee that a claim will be approved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
            <div>
              &copy; {new Date().getFullYear()} PFP &bull; PREMIUM FUNERAL PLANNING. All Rights Reserved. Every detail with Care.
            </div>
            <div className="flex items-center gap-4 text-stone-400">
              <a href="#terms" className="hover:text-gold-400">Policy Terms</a>
              <span>&bull;</span>
              <a href="#terms" className="hover:text-gold-400">POPIA Privacy</a>
              <span>&bull;</span>
              <a href="#terms" className="hover:text-gold-400">Complaints</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
