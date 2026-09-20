import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('top');

  // Handle URL hash changes and smooth scrolling
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      window.history.pushState(null, '', ' ');
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash);
        }
      }, 100);
    }

    // Scroll spy to update active section in header
    const handleScroll = () => {
      const sections = ['terms', 'packages', 'about'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(section);
          return;
        }
      }
      setActiveSection('top');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0C0E] text-[#F1F5F9] antialiased selection:bg-[#E2C172] selection:text-black">
      {/* Editorial Corporate Masthead */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Website Flow */}
      <main className="flex-grow">
        <HomePage onNavigate={scrollToSection} />
      </main>

      {/* Corporate Structured Footer */}
      <Footer onNavigate={scrollToSection} />
    </div>
  );
};

export default App;
