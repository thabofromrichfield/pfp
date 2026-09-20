import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { PackagesSection } from './components/PackagesSection';
import { CateringDeepDive } from './components/CateringDeepDive';
import { GroceryVoucherSection } from './components/GroceryVoucherSection';
import { CalculatorSection } from './components/CalculatorSection';
import { ClaimsChecklistTool } from './components/ClaimsChecklistTool';
import { TermsAndBenefitsSection } from './components/TermsAndBenefitsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { ThemeCustomizerModal } from './components/ThemeCustomizerModal';
import { AgeBand } from './types';
import { Palette, HeartHandshake, PhoneCall } from 'lucide-react';
import { COMPANY_INFO } from './data/pfpData';

export const App: React.FC = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [selectedQuotePackage, setSelectedQuotePackage] = useState<string>('package-3');
  const [selectedQuoteAgeBand, setSelectedQuoteAgeBand] = useState<AgeBand>('18-64');

  const handleOpenQuote = (pkgId: string = 'package-3', ageBand: AgeBand = '18-64') => {
    setSelectedQuotePackage(pkgId);
    setSelectedQuoteAgeBand(ageBand);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-slate-800 antialiased selection:bg-accent selection:text-white">
      {/* Navigation */}
      <Header
        onOpenQuote={() => handleOpenQuote()}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero onOpenQuote={() => handleOpenQuote('package-3')} />

        {/* About Us & Built From Real Experience */}
        <AboutSection />

        {/* Our Support Packages */}
        <PackagesSection onSelectPackage={(pkgId) => handleOpenQuote(pkgId)} />

        {/* 500-Person Catering Deep-Dive */}
        <CateringDeepDive onSelectPackage={(pkgId) => handleOpenQuote(pkgId)} />

        {/* R15,000 Supermarket Grocery Voucher System */}
        <GroceryVoucherSection onSelectPackage={(pkgId) => handleOpenQuote(pkgId)} />

        {/* Interactive Pricing & Plan Calculator */}
        <CalculatorSection
          onApplyPlan={(pkgId, ageBand) => handleOpenQuote(pkgId, ageBand)}
        />

        {/* Interactive Claims Readiness & 48-72h Timeline */}
        <ClaimsChecklistTool />

        {/* Payments, Benefits & Policy Terms */}
        <TermsAndBenefitsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenQuote={() => handleOpenQuote()}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />

      {/* Quote / Application Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialPackageId={selectedQuotePackage}
        initialAgeBand={selectedQuoteAgeBand}
      />

      {/* Color Palette Customizer Modal */}
      <ThemeCustomizerModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
      />

      {/* Floating Quick Action Widget (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 items-end">
        <button
          onClick={() => setIsThemeModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-slate-700 shadow-lg border border-paper-border hover:border-accent hover:text-accent transition-all text-xs font-bold"
          title="Customize Theme & Colors"
        >
          <Palette className="w-4 h-4 text-accent" />
          <span className="hidden sm:inline">Theme Colors</span>
        </button>

        <button
          onClick={() => handleOpenQuote()}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-accent hover:bg-accent-hover text-primary-dark font-extrabold shadow-xl hover:shadow-gold-glow transition-all text-xs uppercase tracking-wider"
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Get a Plan</span>
        </button>
      </div>
    </div>
  );
};
export default App;
