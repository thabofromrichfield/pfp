import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/pfpData';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'packages' | 'payments' | 'claims' | 'compliance'>('all');

  const filteredFaqs = activeFilter === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === activeFilter);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold tracking-widest uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-accent" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Answers You Can Count On
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about PFP support packages, grocery vouchers, catering logistics, monthly payments, and claims.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'packages', label: 'Support Packages' },
            { id: 'payments', label: 'Payments & Premiums' },
            { id: 'claims', label: 'Claims & Payouts' },
            { id: 'compliance', label: 'Waiting Period & Terms' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === cat.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-paper-soft text-slate-600 hover:text-primary hover:bg-slate-200 border border-paper-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-paper-border bg-paper-soft overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-base text-primary hover:text-accent transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-7 h-7 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-transform duration-300 shadow-xs ${
                      isOpen ? 'rotate-180 bg-accent text-primary' : 'text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-paper-border/50 pt-3 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-6 rounded-2xl bg-paper-soft border border-paper-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif font-bold text-sm text-primary">Still have questions?</div>
            <p className="text-xs text-slate-500">
              Our compassionate customer care consultants are ready to walk you through any detail.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 shadow"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs shadow"
            >
              <span>Call: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
