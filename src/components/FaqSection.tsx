import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS, COMPANY_INFO } from '../data/pfpData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#08080A] border-b border-gold-500/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            MEMBER CLARIFICATIONS &bull; FREQUENT INQUIRIES
          </span>
        </div>

        {/* Headline */}
        <div className="mb-14">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-[1.12]">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            Direct answers on grocery vouchers, catering logistics, monthly contributions, waiting periods, and claims.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-stone-800 border-t border-b border-stone-800">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="py-6">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left flex items-start justify-between gap-6 group"
                >
                  <span className="font-serif text-xl sm:text-2xl text-white font-normal group-hover:text-gold-300 transition-colors">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 flex items-center justify-center text-gold-400 flex-shrink-0 mt-1">
                    {isOpen ? <Minus className="w-5 h-5 stroke-[2]" /> : <Plus className="w-5 h-5 stroke-[2]" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-4 text-xs sm:text-sm text-stone-300 font-light leading-relaxed pr-8">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Desk */}
        <div className="mt-12 bg-[#121318] border border-gold-500/30 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="font-serif text-lg font-medium text-white">
              Have a specific question not covered here?
            </div>
            <p className="text-xs text-stone-400 font-light">
              Our consultants are available 24/7 for compassionate assistance.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="btn-gold px-6 py-3 rounded-sm text-xs tracking-widest uppercase"
            >
              Call: {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
