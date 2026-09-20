import React, { useState } from 'react';
import { Printer, Check, Phone } from 'lucide-react';
import { CLAIM_DOCUMENTS, COMPANY_INFO } from '../data/pfpData';

export const ClaimsChecklistTool: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="claims" className="py-20 sm:py-28 bg-[#08080A] border-b border-gold-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            BEREAVEMENT PROTOCOL &bull; 48–72 HOUR EXPEDITED CLAIMS
          </span>
        </div>

        {/* Headline */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-[1.12]">
            Guidance, clarity and calm support during your difficult hours.
          </h2>
          <p className="mt-4 text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            We understand that when a family contacts us after losing a loved one, they need guidance, clarity and support. The family should notify PFP as soon as reasonably possible after the death of an insured person.
          </p>
        </div>

        {/* 2-Column Claims Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Document Readiness Checklist */}
          <div className="lg:col-span-7 dark-glass-card p-8 sm:p-10 space-y-6">
            <div className="flex items-center justify-between border-b border-stone-800 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  SUPPORTING DOCUMENTATION
                </span>
                <h3 className="font-serif text-2xl font-normal text-white mt-1">
                  Claim Assessment Checklist
                </h3>
              </div>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 border border-gold-500/40 text-[11px] uppercase tracking-wider font-semibold text-gold-300 hover:bg-gold-500/10 transition-colors"
                title="Print checklist for family reference"
              >
                <Printer className="w-3.5 h-3.5 text-gold-400" />
                <span>Print Checklist</span>
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed font-light">
              The claimant will be required to complete the applicable claim documentation and provide the supporting documents required for the assessment of the claim:
            </p>

            {/* Checklist */}
            <div className="divide-y divide-stone-800">
              {CLAIM_DOCUMENTS.map((doc) => {
                const isChecked = !!checkedIds[doc.id];
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleCheck(doc.id)}
                    className="py-4 flex items-start gap-4 cursor-pointer group"
                  >
                    <div
                      className={`w-5 h-5 mt-0.5 border flex items-center justify-center transition-colors flex-shrink-0 ${
                        isChecked
                          ? 'border-gold-400 bg-gold-500 text-obsidian-950 shadow-gold-glow'
                          : 'border-stone-700 bg-[#0A0A0E] group-hover:border-gold-500'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-serif text-base font-medium text-white flex items-center gap-2 group-hover:text-gold-300 transition-colors">
                        <span>{doc.name}</span>
                        {doc.requiredFor === 'cash' && (
                          <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-1.5 py-0.5 border border-gold-500/30">
                            Package 2 Only
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-400 font-light leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-[#0A0A0E] p-4 border border-gold-500/20 text-xs text-stone-300 font-light leading-relaxed">
              <strong className="text-gold-300">PFP Assistance Role:</strong> PFP will assist the family with the claims process where this forms part of our agreed role. Once verified, claims will be paid out between <strong>48–72 hours</strong>.
            </div>
          </div>

          {/* Right Column: 4-Step Turnaround Protocol */}
          <div className="lg:col-span-5 dark-glass-card p-8 sm:p-10 space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                BENEFIT DISPATCH
              </span>
              <h3 className="font-serif text-2xl font-normal text-white mt-1">
                The 48–72 Hour Payout Process
              </h3>
            </div>

            <div className="space-y-6 text-xs sm:text-sm">
              <div className="space-y-1">
                <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                  <span className="font-serif text-gold-400 font-bold">01.</span>
                  <span>Notify PFP Promptly</span>
                </div>
                <p className="text-stone-400 font-light pl-6 leading-relaxed text-xs">
                  Notify PFP as soon as reasonably possible after the death of an insured person via our 24/7 helpline <strong className="text-gold-300">{COMPANY_INFO.phone}</strong>.
                </p>
              </div>

              <div className="space-y-1 border-t border-stone-800 pt-4">
                <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                  <span className="font-serif text-gold-400 font-bold">02.</span>
                  <span>Document Lodgement</span>
                </div>
                <p className="text-stone-400 font-light pl-6 leading-relaxed text-xs">
                  Supply certified IDs, official DHA-5 Death Certificate, BI-1663, and banking details (where applicable).
                </p>
              </div>

              <div className="space-y-1 border-t border-stone-800 pt-4">
                <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                  <span className="font-serif text-gold-400 font-bold">03.</span>
                  <span>Underwriting Verification</span>
                </div>
                <p className="text-stone-400 font-light pl-6 leading-relaxed text-xs">
                  PFP verifies membership status against the 6-month natural death waiting period and policy terms.
                </p>
              </div>

              <div className="space-y-1 border-t border-stone-800 pt-4">
                <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                  <span className="font-serif text-gold-400 font-bold">04.</span>
                  <span>Fulfillment Within 48–72 Hours</span>
                </div>
                <p className="text-stone-400 font-light pl-6 leading-relaxed text-xs">
                  R15,000 grocery vouchers issued; R10,000 cash benefit transferred (Package 2); or 500-person catering logistics and cooking team scheduled (Package 3).
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                className="btn-gold w-full py-4 rounded-sm text-xs tracking-widest-xl uppercase flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-obsidian-950" />
                <span>Call Claims Assistance: {COMPANY_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
