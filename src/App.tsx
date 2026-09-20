import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PackagesPage } from './pages/PackagesPage';
import { CateringPage } from './pages/CateringPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { TermsPage } from './pages/TermsPage';
import { FaqContactPage } from './pages/FaqContactPage';
import { PageTab, AgeBand } from './types';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedQuotePackage, setSelectedQuotePackage] = useState<string>('package-3');
  const [selectedQuoteAgeBand, setSelectedQuoteAgeBand] = useState<AgeBand>('18-64');

  // Sync with URL hash if present
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageTab;
      const validTabs: PageTab[] = ['home', 'about', 'packages', 'catering', 'claims', 'terms', 'faq'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectTab = (tab: PageTab) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (pkgId: string = 'package-3', ageBand: AgeBand = '18-64') => {
    setSelectedQuotePackage(pkgId);
    setSelectedQuoteAgeBand(ageBand);
    setIsQuoteOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#070709] text-[#F1F5F9] antialiased selection:bg-[#D4AF37] selection:text-black">
      {/* Navigation Masthead with Category Tabs */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Dynamic Category View */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <HomePage
            onSelectTab={handleSelectTab}
            onOpenQuote={handleOpenQuote}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage onOpenQuote={handleOpenQuote} />
        )}

        {activeTab === 'packages' && (
          <PackagesPage onSelectPackage={handleOpenQuote} />
        )}

        {activeTab === 'catering' && (
          <CateringPage onOpenQuote={handleOpenQuote} />
        )}

        {activeTab === 'claims' && (
          <ClaimsPage />
        )}

        {activeTab === 'terms' && (
          <TermsPage />
        )}

        {activeTab === 'faq' && (
          <FaqContactPage />
        )}
      </main>

      {/* Structured Category Footer */}
      <Footer
        onSelectTab={handleSelectTab}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Membership Application / Schedule Request Modal */}
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
