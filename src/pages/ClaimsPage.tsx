import React, { useState } from 'react';
import { Printer, Check, Phone, Clock } from 'lucide-react';
import { CLAIM_DOCUMENTS, COMPANY_INFO } from '../data/pfpData';

export const ClaimsPage: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#1E2028] pb-10">
        <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
          CLAIMS &amp; BENEFIT FULFILMENT &bull; 48–72 HOUR COMMITMENT
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Guidance, Clarity and Support When You Need It Most.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          We understand that when a family contacts us after losing a loved one, they need guidance, clarity and support. The family should notify PFP as soon as reasonably possible after the death of an insured person. PFP will assist the family with the claims process where this forms part of our agreed role.
        </p>
        <div className="inline-block border border-gold-500/50 bg-[#12141C] text-gold-400 px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider">
          Claims will be paid out between 48–72 hours
        </div>
      </div>

      {/* Grid: Document Checklist Left, 4-Step Process Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Checklist */}
        <div className="lg:col-span-7 panel-dark p-8 sm:p-10 rounded-lg border border-[#242833] space-y-6">
          <div className="flex items-center justify-between border-b border-[#20232B] pb-4">
            <div>
              <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                DOCUMENTATION REQUIRED
              </span>
              <h2 className="font-serif text-2xl text-white font-normal mt-1">
                Required Supporting Documents
              </h2>
            </div>
            <button
              onClick={handlePrint}
              className="btn-secondary-dark px-3 py-1.5 rounded text-xs uppercase tracking-wider flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5 text-gold-500" />
              <span>Print Checklist</span>
            </button>
          </div>

          <p className="text-xs text-stone-300 font-light leading-relaxed">
            The claimant will be required to complete the applicable claim documentation and provide the supporting documents required for the assessment of the claim. Mark items as you assemble them:
          </p>

          <div className="divide-y divide-[#1E2028]">
            {CLAIM_DOCUMENTS.map((doc) => {
              const isChecked = !!checkedIds[doc.id];
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleCheck(doc.id)}
                  className="py-4 flex items-start gap-4 cursor-pointer group"
                >
                  <div
                    className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-colors flex-shrink-0 ${
                      isChecked
                        ? 'border-gold-500 bg-gold-500 text-obsidian-950 font-bold'
                        : 'border-[#2D313F] bg-[#0A0B0E] group-hover:border-gold-500'
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-semibold text-white text-sm flex items-center gap-2 group-hover:text-gold-400 transition-colors">
                      <span>{doc.name}</span>
                      {doc.requiredFor === 'cash' && (
                        <span className="text-[10px] font-normal uppercase bg-[#181B24] text-stone-300 px-1.5 py-0.5 rounded border border-[#262A38]">
                          Package 2
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

          <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] text-xs text-stone-300 font-light leading-relaxed">
            <strong className="text-white">Agreed Role:</strong> PFP will assist the family with the claims process where this forms part of our agreed role. Claims will be paid out between 48–72 hours upon verified documentation.
          </div>
        </div>

        {/* Right: Step-by-Step Payout Workflow */}
        <div className="lg:col-span-5 panel-dark p-8 sm:p-10 rounded-lg border border-[#242833] space-y-6">
          <div className="border-b border-[#20232B] pb-4">
            <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-widest block">
              PROCESS OVERVIEW
            </span>
            <h2 className="font-serif text-2xl text-white font-normal mt-1">
              48–72h Claims Assessment
            </h2>
          </div>

          <div className="space-y-6 text-xs sm:text-sm">
            <div className="space-y-1">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="text-gold-500 font-bold">1.</span>
                <span>Immediate Notification</span>
              </div>
              <p className="text-stone-400 font-light pl-5 leading-relaxed text-xs">
                Notify PFP as soon as reasonably possible after the death of an insured person via our 24/7 line <strong>{COMPANY_INFO.phone}</strong>.
              </p>
            </div>

            <div className="space-y-1 border-t border-[#1E2028] pt-4">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="text-gold-500 font-bold">2.</span>
                <span>Document Submission</span>
              </div>
              <p className="text-stone-400 font-light pl-5 leading-relaxed text-xs">
                Submit certified copies of IDs, official death certificate (DHA-5), BI-1663, and banking details.
              </p>
            </div>

            <div className="space-y-1 border-t border-[#1E2028] pt-4">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="text-gold-500 font-bold">3.</span>
                <span>Underwriting Assessment</span>
              </div>
              <p className="text-stone-400 font-light pl-5 leading-relaxed text-xs">
                PFP validates the policy status, premium standing, and 6-month natural death waiting period.
              </p>
            </div>

            <div className="space-y-1 border-t border-[#1E2028] pt-4">
              <div className="font-semibold text-white flex items-center gap-2">
                <span className="text-gold-500 font-bold">4.</span>
                <span>Fulfillment (48–72 Hours)</span>
              </div>
              <p className="text-stone-400 font-light pl-5 leading-relaxed text-xs">
                Supermarket voucher issued; R10,000 cash deposited into client&apos;s account (Package 2); or 500-person catering cooking team scheduled (Package 3).
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="btn-primary-gold w-full py-3.5 rounded text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Claims Desk: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
