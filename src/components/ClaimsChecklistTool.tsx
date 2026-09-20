import React, { useState } from 'react';
import { ClipboardCheck, CheckSquare, Square, Printer, Clock, Phone, AlertCircle, ShieldCheck } from 'lucide-react';
import { CLAIM_DOCUMENTS, COMPANY_INFO } from '../data/pfpData';

export const ClaimsChecklistTool: React.FC = () => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedDocs((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const checkedCount = Object.values(checkedDocs).filter(Boolean).length;
  const progressPercent = Math.round((checkedCount / CLAIM_DOCUMENTS.length) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="claims" className="py-20 lg:py-28 bg-white relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold tracking-widest uppercase">
            <ClipboardCheck className="w-3.5 h-3.5 text-accent" />
            <span>INTERACTIVE CLAIMS READINESS &amp; 48–72H TIMELINE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Guidance &amp; Clarity When You Need It Most
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We understand that when a family contacts us after losing a loved one, they need guidance, clarity and support. Use this checklist to ensure all documents are ready for 48–72 hour expedited payout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Checklist */}
          <div className="lg:col-span-7 bg-paper-soft rounded-3xl p-6 sm:p-8 border border-paper-border shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b pb-4 border-slate-200">
              <div>
                <span className="font-serif text-lg font-bold text-primary">
                  Document Readiness Checklist
                </span>
                <p className="text-xs text-slate-500">
                  Click each item as you locate it for your submission
                </p>
              </div>
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 shadow-xs"
                title="Print this checklist for family members"
              >
                <Printer className="w-3.5 h-3.5 text-accent" />
                <span>Print Checklist</span>
              </button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 bg-white p-4 rounded-2xl border border-paper-border">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-primary">
                  Readiness: {checkedCount} of {CLAIM_DOCUMENTS.length} Documents Prepared
                </span>
                <span className="text-accent-dark">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-300 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Checklist Items */}
            <div className="space-y-3">
              {CLAIM_DOCUMENTS.map((doc) => {
                const isChecked = !!checkedDocs[doc.id];
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleCheck(doc.id)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked
                        ? 'bg-emerald-50/60 border-emerald-300 text-slate-800'
                        : 'bg-white border-paper-border hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 text-accent flex-shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300" />
                      )}
                    </div>
                    <div className="space-y-0.5 flex-1">
                      <div className="font-serif font-bold text-sm text-primary flex items-center justify-between">
                        <span>{doc.name}</span>
                        {doc.requiredFor === 'cash' && (
                          <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                            Package 2 Only
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
              <span>
                <strong>Note on promptness:</strong> The family should notify PFP as soon as reasonably possible after the death of an insured person. PFP will assist the family with the claims process.
              </span>
            </div>
          </div>

          {/* Right Column: 48–72h Payout Timeline */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-primary text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-accent/30 space-y-6">
              <div className="space-y-1 border-b border-white/10 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                  STEP-BY-STEP WORKFLOW
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  The 48–72 Hour Claims Journey
                </h3>
                <p className="text-xs text-slate-300">
                  From initial notification to benefit fulfillment in your family’s hands.
                </p>
              </div>

              {/* Timeline Steps */}
              <div className="space-y-5 text-xs">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-accent text-primary-dark font-black flex items-center justify-center font-serif text-sm">
                      1
                    </div>
                    <div className="w-0.5 h-full bg-white/20 mt-1" />
                  </div>
                  <div className="space-y-1 pb-4">
                    <div className="font-serif font-bold text-sm text-accent">
                      Step 1: Immediate Notification
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Call PFP 24/7 at <strong>{COMPANY_INFO.phone}</strong> or send WhatsApp to notify us of the bereavement. A dedicated claims officer is assigned.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-accent text-primary-dark font-black flex items-center justify-center font-serif text-sm">
                      2
                    </div>
                    <div className="w-0.5 h-full bg-white/20 mt-1" />
                  </div>
                  <div className="space-y-1 pb-4">
                    <div className="font-serif font-bold text-sm text-accent">
                      Step 2: Document Submission
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Submit certified copies of the death certificate, IDs, DHA-1663, and bank details via email or at our office.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-accent text-primary-dark font-black flex items-center justify-center font-serif text-sm">
                      3
                    </div>
                    <div className="w-0.5 h-full bg-white/20 mt-1" />
                  </div>
                  <div className="space-y-1 pb-4">
                    <div className="font-serif font-bold text-sm text-accent">
                      Step 3: Fast-Track Assessment
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Our claims verification team validates documentation against the 6-month natural death waiting period and policy terms.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-accent text-primary-dark font-black flex items-center justify-center font-serif text-sm">
                      4
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="font-serif font-bold text-sm text-accent">
                      Step 4: Payout &amp; Benefit Delivery
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      Within <strong>48–72 hours</strong>: R15k supermarket grocery voucher dispatched; R10k cash transferred (Package 2); or 500-person catering team confirmed and scheduled (Package 3).
                    </p>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="pt-2 border-t border-white/10">
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                  className="w-full py-3.5 px-4 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 24/7 Claims Desk: {COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
