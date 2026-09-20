import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/pfpData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#F5F2EB] editorial-border-b">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold-600" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest-2xl text-gold-700 uppercase">
            MEMBER CLARIFICATIONS &bull; FREQUENT INQUIRIES
          </span>
        </div>

        {/* Headline */}
        <div className="mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-obsidian-950 leading-[1.12]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-stone-600 text-base sm:text-lg font-light leading-relaxed">
            Direct answers on grocery vouchers, catering logistics, monthly contributions, waiting periods, and claims.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-sand-300 border-t border-b border-sand-300">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left flex items-start justify-between gap-6 group"
                >
                  <span className="font-serif text-xl sm:text-2xl text-obsidian-950 font-normal group-hover:text-gold-700 transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center text-gold-700 flex-shrink-0 mt-1">
                    {isOpen ? <Minus className="w-5 h-5 stroke-[1.5]" /> : <Plus className="w-5 h-5 stroke-[1.5]" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 text-xs sm:text-sm text-stone-600 font-light leading-relaxed pr-8">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Desk */}
        <div className="mt-12 bg-white border border-sand-300 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif text-lg font-medium text-obsidian-950">
              Have a specific question not covered here?
            </div>
            <p className="text-xs text-stone-500 font-light">
              Our consultants are available 24/7 for compassionate assistance.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="px-6 py-3 bg-obsidian-950 hover:bg-obsidian-900 text-white font-medium text-xs tracking-widest-xl uppercase border border-gold-600/40 transition-colors"
            >
              Call: {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
