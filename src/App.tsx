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
import { AgeBand } from './types';

export const App: React.FC = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedQuotePackage, setSelectedQuotePackage] = useState<string>('package-3');
  const [selectedQuoteAgeBand, setSelectedQuoteAgeBand] = useState<AgeBand>('18-64');

  const handleOpenQuote = (pkgId: string = 'package-3', ageBand: AgeBand = '18-64') => {
    setSelectedQuotePackage(pkgId);
    setSelectedQuoteAgeBand(ageBand);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1E1E] antialiased selection:bg-gold-600 selection:text-white">
      {/* Navigation Masthead */}
      <Header onOpenQuote={() => handleOpenQuote()} />

      {/* Main Editorial Flow */}
      <main className="flex-grow">
        {/* Dignified Hero Section */}
        <Hero onOpenQuote={() => handleOpenQuote('package-3')} />

        {/* About & The 10+ Years Catering Reality */}
        <AboutSection />

        {/* Schedule of Support Packages (1, 2, and 3 with 18-64 & 65-75 pricing) */}
        <PackagesSection onSelectPackage={(pkgId) => handleOpenQuote(pkgId)} />

        {/* Catering Logistics Spotlight for 500 Guests */}
        <CateringDeepDive onSelectPackage={(pkgId) => handleOpenQuote(pkgId)} />

        {/* Supermarket Grocery Voucher (Up to R15,000) */}
        <GroceryVoucherSection onSelectPackage={(pkgId) => handleOpenQuote(pkgId)} />

        {/* Transparent Premium & Benefit Calculator */}
        <CalculatorSection
          onApplyPlan={(pkgId, ageBand) => handleOpenQuote(pkgId, ageBand)}
        />

        {/* Claims Readiness Guide & 48-72h Payout Protocol */}
        <ClaimsChecklistTool />

        {/* Comprehensive Policy Terms, Governance & Disclosures */}
        <TermsAndBenefitsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Footer & Statutory Disclosures */}
      <Footer onOpenQuote={() => handleOpenQuote()} />

      {/* Membership Schedule Request Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialPackageId={selectedQuotePackage}
        initialAgeBand={selectedQuoteAgeBand}
      />
    </div>
  );
};

export default App;
