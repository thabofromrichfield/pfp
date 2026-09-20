import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';

interface HeaderProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { label: 'About & Heritage', href: '#about' },
    { label: 'Support Packages', href: '#packages' },
    { label: '500-Guest Catering', href: '#catering' },
    { label: 'Grocery Support', href: '#grocery' },
    { label: 'Plan Calculator', href: '#calculator' },
    { label: 'Claims (48–72h)', href: '#claims' },
    { label: 'Terms & Governance', href: '#terms' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Editorial Top Notification Bar */}
      <div className="bg-obsidian-950 text-sand-200 text-[11px] tracking-wider py-2 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
            <span className="uppercase font-medium text-sand-300">
              South Africa’s Premier Funeral Grocery &amp; 500-Guest Catering Support
            </span>
          </div>

          <div className="flex items-center gap-4 text-sand-300">
            <span className="hidden md:inline text-gold-400/80 font-serif italic text-xs">
              48–72 Hour Claim Payouts
            </span>
            <span className="hidden md:inline text-sand-500">|</span>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:text-gold-300 transition-colors"
            >
              <Phone className="w-3 h-3 text-gold-400" />
              <span className="font-semibold text-white">24/7 Helpline: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Masthead Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-sand-200 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* Monogram Brand Mark */}
            <a href="#" className="flex items-center gap-4 group">
              <div className="w-11 h-11 border border-sand-300 group-hover:border-gold-600 bg-white flex items-center justify-center font-serif text-xl font-medium tracking-tight text-obsidian-950 transition-colors">
                PFP
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-obsidian-950 leading-none">
                  PFP
                </span>
                <span className="text-[9px] font-medium tracking-widest-2xl text-gold-700 uppercase mt-1">
                  PREMIUM FUNERAL PLANNING
                </span>
                <span className="text-[10px] text-stone-500 font-serif italic">
                  Every detail with Care.
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-semibold text-stone-700 hover:text-gold-700 uppercase tracking-widest transition-colors py-1 relative group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gold-600 group-hover:w-full transition-all duration-200" />
                </a>
              ))}
            </nav>

            {/* Action Button */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="px-6 py-2.5 bg-obsidian-900 hover:bg-obsidian-950 text-white font-medium text-[11px] tracking-widest uppercase transition-all duration-200 border border-gold-600/40 hover:border-gold-500 flex items-center gap-2"
              >
                <span>Request Plan</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
              </button>
            </div>

            {/* Mobile Nav Button */}
            <div className="flex sm:hidden items-center">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="p-2 text-stone-700 hover:text-obsidian-950"
                aria-label="Toggle navigation"
              >
                {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="xl:hidden bg-[#FAF8F5] border-b border-sand-300 px-6 py-6 space-y-4">
            <div className="grid grid-cols-1 divide-y divide-sand-200">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="py-3 text-xs font-semibold text-stone-800 hover:text-gold-700 uppercase tracking-widest"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-3 bg-obsidian-900 text-white font-medium text-xs tracking-widest uppercase border border-gold-600/50"
              >
                Request a Support Plan
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
