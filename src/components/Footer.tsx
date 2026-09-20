import React from 'react';
import { Shield, Phone, Mail, MapPin, HeartHandshake, Lock, ArrowUp } from 'lucide-react';
import { COMPANY_INFO, SUPPORT_PACKAGES } from '../data/pfpData';

interface FooterProps {
  onOpenQuote: (pkgId?: string) => void;
  onOpenThemeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onOpenThemeModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-primary-dark text-white border-t border-white/10 relative transition-colors duration-500">
      {/* Top Banner */}
      <div className="border-b border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-accent">
                EVERY DETAIL WITH CARE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Plan ahead. Prepare your family. Let PFP support you when it matters most.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-light max-w-2xl leading-relaxed">
                Practical funeral grocery vouchers, professional catering for up to 500 mourners, and cash benefits designed to lift the heaviest burdens.
              </p>
            </div>
            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-end">
              <button
                onClick={() => onOpenQuote()}
                className="px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-extrabold text-xs uppercase tracking-wider transition-all shadow text-center"
              >
                Join PFP / Request Quote
              </button>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs tracking-wider uppercase text-center border border-white/15 transition-all"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-accent text-primary-dark flex items-center justify-center font-serif text-2xl font-bold shadow-md">
                  PFP
                </div>
                <div>
                  <div className="font-serif text-xl font-bold text-white leading-none">
                    PFP
                  </div>
                  <div className="text-[10px] font-bold tracking-widest text-accent uppercase mt-1">
                    PREMIUM FUNERAL PLANNING
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Built from over 10 years of hands-on catering experience. Providing South African families with compassionate, dignified, and practical funeral support when they need it most.
              </p>

              <div className="text-xs text-slate-400 space-y-2 pt-2">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>Toll-Free: {COMPANY_INFO.phone} | Direct: {COMPANY_INFO.phoneDirect}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  <span>General: {COMPANY_INFO.email}</span>
                </div>
              </div>
            </div>

            {/* Support Packages */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif font-bold text-sm text-accent uppercase tracking-wider">
                Support Packages
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-300">
                {SUPPORT_PACKAGES.map((pkg) => (
                  <li key={pkg.id}>
                    <button
                      onClick={() => onOpenQuote(pkg.id)}
                      className="hover:text-accent transition-colors text-left"
                    >
                      <span className="font-semibold text-white">{pkg.name}: {pkg.tagline}</span>
                      <span className="block text-[11px] text-slate-400">
                        From R{pkg.premiums.age18_64}/mo &bull; Value R{pkg.totalValue.toLocaleString()}
                      </span>
                    </button>
                  </li>
                ))}
                <li className="pt-2">
                  <a href="#catering" className="text-accent hover:underline text-xs flex items-center gap-1">
                    <span>500-Person Catering Full Details &rarr;</span>
                  </a>
                </li>
                <li>
                  <a href="#grocery" className="text-accent hover:underline text-xs flex items-center gap-1">
                    <span>R15,000 Supermarket Voucher Guide &rarr;</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Governance & Information */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="font-serif font-bold text-sm text-accent uppercase tracking-wider">
                Policy Governance
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li>
                  <a href="#claims" className="hover:text-accent transition-colors">
                    Claims &amp; 48–72h Payouts
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-accent transition-colors">
                    Waiting Period (6 Months Natural Death)
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-accent transition-colors">
                    Grace Period &amp; Missed Payments
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-accent transition-colors">
                    Cancellation &amp; Cooling-Off
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-accent transition-colors">
                    Member vs PFP Responsibilities
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-accent transition-colors">
                    POPIA Privacy &amp; Data Rights
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:text-accent transition-colors">
                    Official Complaints Channel
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Actions & Theme */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-serif font-bold text-sm text-accent uppercase tracking-wider">
                Preferences
              </h4>
              <div className="space-y-2">
                <button
                  onClick={onOpenThemeModal}
                  className="w-full px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-semibold text-white flex items-center justify-between transition-colors"
                >
                  <span>Color Theme</span>
                  <span className="text-accent font-mono text-[11px]">&bull; Switch</span>
                </button>

                <button
                  onClick={scrollToTop}
                  className="w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 flex items-center justify-between transition-colors"
                >
                  <span>Back to Top</span>
                  <ArrowUp className="w-3.5 h-3.5 text-accent" />
                </button>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 space-y-1">
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <Lock className="w-3 h-3 text-accent" />
                  <span>POPIA Protected</span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Member data is safely safeguarded under RSA privacy legislation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legal & Regulatory Disclaimer Bar */}
      <div className="bg-black/40 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-slate-400 text-[11px] leading-relaxed">
          <p>
            <strong>Regulatory &amp; Underwriting Notice:</strong> Premium Funeral Planning (PFP) brings together funeral planning, supermarket grocery vouchers, and professional catering services. Membership benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status, and claims documentation requirements. The current PFP proposal provides for a 6-month waiting period for natural death, subject to final underwriting approval and policy wording. Where a benefit is subject to an insurer’s assessment, PFP cannot guarantee that a claim will be approved.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5 text-[11px]">
            <div>
              &copy; {new Date().getFullYear()} PFP — Premium Funeral Planning. All Rights Reserved. Every Detail With Care.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#terms" className="hover:text-accent">Terms &amp; Conditions</a>
              <span>&bull;</span>
              <a href="#terms" className="hover:text-accent">POPIA Privacy</a>
              <span>&bull;</span>
              <a href="#terms" className="hover:text-accent">Complaints</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
