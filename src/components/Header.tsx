import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight, Shield } from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';
import { PageTab } from '../types';

interface HeaderProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenQuote: (pkgId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenQuote }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const tabs: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'packages', label: 'Support Packages' },
    { id: 'catering', label: 'Catering & Groceries' },
    { id: 'claims', label: 'Claims (48–72h)' },
    { id: 'terms', label: 'Terms & Benefits' },
    { id: 'faq', label: 'FAQ & Contact' },
  ];

  const handleTabClick = (tabId: PageTab) => {
    onSelectTab(tabId);
    setMobileNavOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Gold & Obsidian Notification Bar */}
      <div className="bg-[#050507] text-stone-300 text-[11px] tracking-wider py-2.5 border-b border-gold-500/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-400 shadow-gold-glow animate-pulse" />
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

      {/* Main Luxury Masthead Header with Smooth Pill Navigation */}
      <header className="sticky top-0 z-40 bg-[#0A0B0E]/95 backdrop-blur-md border-b border-gold-500/20 shadow-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            {/* PFP Smooth Monogram Brand Mark */}
            <button
              onClick={() => handleTabClick('home')}
              className="flex items-center gap-3.5 group text-left"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#1C1D24] to-[#0A0A0C] border-2 border-gold-500/80 rounded-2xl flex items-center justify-center font-serif text-2xl font-bold tracking-tight text-gold-400 shadow-gold-glow group-hover:border-gold-400 transition-all duration-300">
                PFP
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none group-hover:text-gold-300 transition-colors">
                  PFP
                </span>
                <span className="text-[10px] font-bold tracking-widest-2xl gold-text-gradient uppercase mt-1">
                  PREMIUM FUNERAL PLANNING
                </span>
                <span className="text-[10px] text-gold-400/80 font-serif italic">
                  Every detail with Care.
                </span>
              </div>
            </button>

            {/* Desktop Smooth Tab Navigation */}
            <nav className="hidden xl:flex items-center gap-1.5 bg-[#121319]/80 p-1.5 rounded-full border border-gold-500/20">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-full ${
                      isActive
                        ? 'pill-tab-active'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </nav>

            {/* CTA Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => onOpenQuote()}
                className="btn-gold px-6 py-2.5 text-xs tracking-wider uppercase flex items-center gap-2"
              >
                <span>Get a Plan</span>
                <ArrowRight className="w-3.5 h-3.5 text-obsidian-950" />
              </button>
            </div>

            {/* Mobile Nav Toggle */}
            <div className="flex xl:hidden items-center">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="p-2.5 rounded-xl bg-white/5 border border-gold-500/20 text-stone-200 hover:text-gold-400"
                aria-label="Toggle navigation"
              >
                {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileNavOpen && (
          <div className="xl:hidden bg-[#0D0E14] border-b border-gold-500/20 px-6 py-6 space-y-4">
            <div className="grid grid-cols-1 gap-1.5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`w-full py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider rounded-xl transition-all ${
                      isActive
                        ? 'bg-gold-500 text-obsidian-950 font-bold shadow-gold-glow'
                        : 'text-stone-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  onOpenQuote();
                }}
                className="btn-gold w-full py-3.5 rounded-xl text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <span>Request a Support Plan</span>
                <ArrowRight className="w-4 h-4 text-obsidian-950" />
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
