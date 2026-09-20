import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';
import { PageTab } from '../types';

interface HeaderProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenQuote: (pkgId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navTabs: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'packages', label: 'Packages & Pricing' },
    { id: 'catering', label: '500-Guest Catering' },
    { id: 'grocery', label: 'Grocery Support' },
    { id: 'claims', label: 'Claims (48–72h)' },
    { id: 'terms', label: 'Terms & Benefits' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Utility Bar */}
      <div className="bg-[#07080A] text-stone-400 text-xs border-b border-[#1E2028] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-gold-500 font-semibold uppercase tracking-wider text-[11px]">
              PREMIUM FUNERAL PLANNING &bull; SOUTH AFRICA
            </span>
          </div>

          <div className="flex items-center gap-5 text-[11px]">
            <span className="text-stone-400">Claims Payout: <strong className="text-stone-200">48–72 Hours</strong></span>
            <span className="text-stone-600">|</span>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 text-stone-300 hover:text-gold-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-gold-500" />
              <span>24/7 Bereavement Line: <strong>{COMPANY_INFO.phone}</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Corporate Header */}
      <header className="sticky top-0 z-40 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-[#1F222B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3.5 text-left group"
            >
              <div className="w-10 h-10 bg-[#14161D] border border-gold-500/60 rounded flex items-center justify-center font-serif text-xl font-bold text-gold-500 group-hover:border-gold-400 transition-colors">
                PFP
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white leading-none">
                  PFP
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-gold-500 uppercase mt-1">
                  PREMIUM FUNERAL PLANNING
                </span>
                <span className="text-[10px] text-stone-400 font-serif italic">
                  Every detail with Care.
                </span>
              </div>
            </button>

            {/* Clean Tab Navigation (Understated, NOT AI pills) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavClick(tab.id)}
                    className={`px-3.5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors relative ${
                      isActive
                        ? 'text-gold-400'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gold-500" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={() => onOpenQuote()}
                className="btn-primary-gold px-5 py-2.5 rounded text-xs tracking-wider uppercase flex items-center gap-2"
              >
                <span>Get a Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-stone-300 hover:text-white"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0F1116] border-b border-[#20232B] px-6 py-6 space-y-2">
            <div className="grid grid-cols-1 divide-y divide-[#1D2029]">
              {navTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleNavClick(tab.id)}
                    className={`py-3 text-left text-xs font-semibold uppercase tracking-wider flex items-center justify-between ${
                      isActive ? 'text-gold-400' : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && <span className="text-gold-500 font-bold">&bull;</span>}
                  </button>
                );
              })}
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="btn-primary-gold w-full py-3 rounded text-xs tracking-wider uppercase text-center"
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
