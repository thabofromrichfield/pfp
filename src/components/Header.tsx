import React, { useState } from 'react';
import { Phone, Shield, Palette, Menu, X, ArrowRight, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onOpenQuote: (packageId?: string) => void;
  onOpenThemeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuote, onOpenThemeModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { themes, activeThemeId, isCustomActive } = useTheme();

  const currentThemeName = isCustomActive
    ? 'Custom Palette'
    : themes.find((t) => t.id === activeThemeId)?.name.split('&')[0] || 'Midnight';

  const navLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Our Packages', href: '#packages' },
    { label: '500-Guest Catering', href: '#catering' },
    { label: 'Grocery Support', href: '#grocery' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Claims (48–72h)', href: '#claims' },
    { label: 'Terms & Benefits', href: '#terms' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Top Banner Strip */}
      <div className="bg-primary text-white text-xs border-b border-white/10 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-accent text-primary-dark">
              <Shield className="w-3 h-3" /> Guaranteed 48–72h Payouts
            </span>
            <span className="hidden md:inline text-white/80">
              South Africa’s premier grocery &amp; professional catering funeral plan
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/90">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="flex items-center gap-1.5 hover:text-accent transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>Claims &amp; Support: {COMPANY_INFO.phone}</span>
            </a>

            {/* Quick theme pill */}
            <button
              onClick={onOpenThemeModal}
              className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded border border-white/20 bg-white/5 hover:bg-white/15 hover:border-accent text-[11px] transition-all"
              title="Customize website colors"
            >
              <Palette className="w-3 h-3 text-accent" />
              <span>Palette: {currentThemeName}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-paper-border shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center font-serif text-2xl font-bold tracking-tight shadow-md border border-accent/30 group-hover:scale-105 transition-transform duration-300">
                PFP
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-primary leading-none">
                  PFP
                </span>
                <span className="text-[10px] sm:text-[11px] font-bold tracking-widest text-accent uppercase mt-1">
                  PREMIUM FUNERAL PLANNING
                </span>
                <span className="text-[9px] text-slate-500 tracking-wide hidden sm:block">
                  Every Detail With Care
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold text-slate-700 hover:text-accent tracking-wide uppercase transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={onOpenThemeModal}
                className="p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:text-accent hover:border-accent bg-paper-soft/50 transition-all flex items-center gap-1.5 text-xs font-semibold"
                title="Change website color theme"
              >
                <Palette className="w-4 h-4 text-accent" />
                <span className="hidden md:inline">Colors</span>
              </button>

              <button
                onClick={() => onOpenQuote()}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary-light text-white font-medium text-xs tracking-wider uppercase shadow-md hover:shadow-lg transition-all duration-200 border border-accent/20"
              >
                <span>Get a Plan</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={onOpenThemeModal}
                className="p-2 rounded-lg border border-slate-200 text-slate-600"
                aria-label="Colors"
              >
                <Palette className="w-4 h-4 text-accent" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-primary hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-paper-border px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded text-xs font-semibold text-slate-700 hover:bg-paper-soft hover:text-accent uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary text-white text-xs font-semibold uppercase tracking-wider shadow"
              >
                <HeartHandshake className="w-4 h-4 text-accent" />
                <span>Join PFP / Request Quote</span>
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-200 text-slate-700 text-xs font-semibold"
              >
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>Call Emergency Line: {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
