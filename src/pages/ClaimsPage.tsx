import React, { useState } from 'react';
import { Printer, Check, Phone, Clock, FileText, AlertCircle, ShieldCheck } from 'lucide-react';
import { CLAIM_DOCUMENTS, COMPANY_INFO } from '../data/pfpData';

export const ClaimsPage: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const checkedCount = Object.values(checkedIds).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / CLAIM_DOCUMENTS.length) * 100);

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            BEREAVEMENT PROTOCOL &bull; CLAIMS &amp; 48–72H PAYOUTS
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Guidance, Clarity and Calm Support When You Need It Most.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          We understand that when a family contacts us after losing a loved one, they need guidance, clarity and support. The family should notify PFP as soon as reasonably possible after the death of an insured person. PFP will assist the family with the claims process where this forms part of our agreed role.
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-300 text-xs font-bold tracking-wider uppercase">
          <Clock className="w-4 h-4 text-gold-400" />
          <span>Claims will be paid out between 48–72 hours</span>
        </div>
      </div>

      {/* Main 2-Column Claims Layout with Smooth Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Document Readiness Checklist */}
        <div className="lg:col-span-7 smooth-card p-8 sm:p-10 space-y-6">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                SUPPORTING DOCUMENTS REQUIRED
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                Claim Assessment Checklist
              </h2>
            </div>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gold-500/40 text-xs uppercase tracking-wider font-semibold text-gold-300 hover:bg-gold-500/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-gold-400" />
              <span>Print Checklist</span>
            </button>
          </div>

          {/* Progress bar */}
          <div className="bg-[#0B0C10] p-4 rounded-2xl border border-stone-800 space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-stone-300">Document Readiness Progress:</span>
              <span className="text-gold-400">{checkedCount} of {CLAIM_DOCUMENTS.length} Prepared ({progressPercent}%)</span>
            </div>
            <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gold-500 h-full rounded-full transition-all duration-300 shadow-gold-glow"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <p className="text-xs text-stone-300 font-light leading-relaxed">
            The claimant will be required to complete the applicable claim documentation and provide the supporting documents required for the assessment of the claim. Click to mark off items ready in your file:
          </p>

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
                    className={`w-6 h-6 mt-0.5 rounded-lg border flex items-center justify-center transition-all flex-shrink-0 ${
                      isChecked
                        ? 'border-gold-400 bg-gold-500 text-obsidian-950 shadow-gold-glow'
                        : 'border-stone-700 bg-[#0B0C10] group-hover:border-gold-500'
                    }`}
                  >
                    {isChecked && <Check className="w-4 h-4 stroke-[3]" />}
                  </div>
                  <div className="space-y-0.5">
                    <div className="font-serif text-base font-medium text-white flex items-center gap-2 group-hover:text-gold-300 transition-colors">
                      <span>{doc.name}</span>
                      {doc.requiredFor === 'cash' && (
                        <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/30">
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

          <div className="bg-[#0B0C10] p-4 rounded-xl border border-gold-500/20 text-xs text-stone-300 font-light leading-relaxed">
            <strong className="text-gold-300">PFP Assistance Commitment:</strong> PFP will assist the family with the claims process where this forms part of our agreed role. Claims will be paid out between <strong>48–72 hours</strong>.
          </div>
        </div>

        {/* Right Column: 4-Step Turnaround Protocol */}
        <div className="lg:col-span-5 smooth-card p-8 sm:p-10 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
              BENEFIT DISPATCH PROTOCOL
            </span>
            <h2 className="font-serif text-2xl font-normal text-white mt-1">
              The 48–72 Hour Claims Journey
            </h2>
          </div>

          <div className="space-y-6 text-xs sm:text-sm">
            <div className="space-y-1">
              <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                <span className="font-serif text-gold-400 font-bold">01.</span>
                <span>Notify PFP Promptly</span>
              </div>
              <p className="text-stone-400 font-light pl-6 leading-relaxed text-xs">
                The family should notify PFP as soon as reasonably possible after the death of an insured person via our 24/7 line <strong className="text-gold-300">{COMPANY_INFO.phone}</strong>.
              </p>
            </div>

            <div className="space-y-1 border-t border-stone-800 pt-4">
              <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                <span className="font-serif text-gold-400 font-bold">02.</span>
                <span>Document Lodgement</span>
              </div>
              <p className="text-stone-400 font-light pl-6 leading-relaxed text-xs">
                Supply certified IDs, official DHA-5 Death Certificate, BI-1663, and banking details (where cash benefit applies).
              </p>
            </div>

            <div className="space-y-1 border-t border-stone-800 pt-4">
              <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                <span className="font-serif text-gold-400 font-bold">03.</span>
                <span>Underwriting Assessment</span>
              </div>
              <p className="text-stone-400 font-light pl-6 leading-relaxed text-xs">
                PFP verifies membership status, underwriting terms, and the 6-month natural death waiting period.
              </p>
            </div>

            <div className="space-y-1 border-t border-stone-800 pt-4">
              <div className="font-serif text-base font-medium text-white flex items-center gap-2">
                <span className="font-serif text-gold-400 font-bold">04.</span>
                <span>Payout &amp; Benefit Delivery</span>
              </div>
              <p className="text-stone-400 font-light pl-6 leading-relaxed text-xs">
                Claims will be paid out between <strong>48–72 hours</strong>: Supermarket voucher issued; R10,000 cash paid into client&apos;s account (Package 2); or 500-person catering cooking team scheduled (Package 3).
              </p>
            </div>
          </div>

          <div className="pt-2">
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
              className="btn-gold w-full py-4 text-xs tracking-widest-xl uppercase flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-obsidian-950" />
              <span>Call Claims Desk: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
