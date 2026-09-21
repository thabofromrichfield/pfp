import React, { useState } from 'react';
import { PageTab } from '../types';

interface HeaderProps {
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onOpenQuote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'packages', label: 'Support Packages' },
    { id: 'catering', label: '500-Guest Catering' },
    { id: 'grocery', label: 'Grocery Support' },
    { id: 'claims', label: 'Claims (48–72h)' },
    { id: 'terms', label: 'Payments & Terms' },
  ];

  const handleNavClick = (tab: PageTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B0C0E]/95 backdrop-blur-md border-b border-[#20232B]">
      {/* Top Promise Strip */}
      <div className="bg-[#07080A] border-b border-[#181A22] py-2 px-4 sm:px-8 text-center">
        <span className="text-[11px] font-medium tracking-widest uppercase text-gold-300">
          At PFP, every detail with Care.
        </span>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group"
          >
            <div className="w-10 h-10 rounded border border-gold-400/80 bg-[#12141C] flex items-center justify-center font-serif text-lg font-bold text-gold-300 transition-colors group-hover:border-gold-300">
              PFP
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-normal text-white tracking-wide leading-none">
                PREMIUM FUNERAL PLANNING
              </div>
              <div className="text-[10px] tracking-widest text-gold-300 uppercase mt-1">
                Every detail with Care.
              </div>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all relative whitespace-nowrap ${
                    isActive
                      ? 'text-gold-300 font-bold'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-gold-400" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="px-5 py-2.5 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm font-sans"
            >
              Request a Plan
            </button>
          </div>

          {/* Mobile / Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-stone-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-gold-400 transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`h-0.5 w-full bg-gold-400 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`h-0.5 w-full bg-gold-400 transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0E1015] border-b border-[#222530] px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded ${
                  isActive
                    ? 'bg-[#181B24] text-gold-300'
                    : 'text-stone-300 hover:bg-[#14161E] hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="pt-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3 rounded bg-gold-400 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider text-center"
            >
              Request a Plan
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
