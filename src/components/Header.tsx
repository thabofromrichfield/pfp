import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';

interface HeaderProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Support Packages', href: '#packages' },
    { label: '500-Guest Catering', href: '#catering' },
    { label: 'Grocery Support', href: '#grocery' },
    { label: 'Plan Calculator', href: '#calculator' },
    { label: 'Claims (48–72h)', href: '#claims' },
    { label: 'Terms & Benefits', href: '#terms' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top Gold & Obsidian Notification Bar */}
      <div className="bg-[#050507] text-stone-300 text-[11px] tracking-wider py-2.5 border-b border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shadow-gold-glow animate-pulse" />
            <span className="uppercase font-semibold tracking-widest text-gold-300">
              South Africa&apos;s Premier Grocery &amp; 500-Guest Catering Funeral Support
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline-flex items-center gap-1.5 text-gold-400 font-serif italic">
              <Shield className="w-3.5 h-3.5 text-gold-500" />
              Guaranteed 48–72h Payouts
            </span>
            <span className="hidden md:inline text-stone-700">|</span>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-white hover:text-gold-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span className="font-semibold">24/7 Helpline: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Masthead Header */}
      <header className="sticky top-0 z-40 bg-[#0A0B0E]/95 backdrop-blur-md border-b border-gold-500/30 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* PFP Black & Gold Monogram Brand Mark */}
            <a href="#" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-[#1A1A20] to-[#0A0A0C] border-2 border-gold-500 rounded-sm flex items-center justify-center font-serif text-2xl font-bold tracking-tight text-gold-400 shadow-gold-glow group-hover:border-gold-400 transition-all">
                PFP
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none group-hover:text-gold-300 transition-colors">
                  PFP
                </span>
                <span className="text-[10px] font-bold tracking-widest-2xl gold-text-gradient uppercase mt-1">
                  PREMIUM FUNERAL PLANNING
                </span>
                <span className="text-[10px] text-gold-500/80 font-serif italic">
                  Every detail with Care.
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold text-stone-300 hover:text-gold-400 uppercase tracking-widest transition-colors py-1 relative group"
                >
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-200" />
                </a>
              ))}
            </nav>

            {/* CTA Action Button */}
            <div className="hidden sm:flex items-center gap-4">
              <button
                onClick={() => onOpenQuote()}
                className="btn-gold px-6 py-2.5 rounded-sm text-xs tracking-widest uppercase flex items-center gap-2"
              >
                <span>Get a Plan</span>
                <ArrowRight className="w-3.5 h-3.5 text-obsidian-950" />
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="flex sm:hidden items-center">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="p-2 text-stone-300 hover:text-gold-400"
                aria-label="Toggle navigation"
              >
                {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="xl:hidden bg-[#0A0B0E] border-b border-gold-500/30 px-6 py-6 space-y-4">
            <div className="grid grid-cols-1 divide-y divide-stone-800">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="py-3 text-xs font-semibold text-stone-200 hover:text-gold-400 uppercase tracking-widest"
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
                className="btn-gold w-full py-3.5 rounded-sm text-xs tracking-widest uppercase"
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
