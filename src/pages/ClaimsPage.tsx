import React, { useState } from 'react';
import { Check, Clock, Printer, FileText } from 'lucide-react';
import { PAYMENTS_BENEFITS_TERMS } from '../data/pfpData';

export const ClaimsPage: React.FC = () => {
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  const toggleDoc = (doc: string) => {
    setCheckedDocs((prev) => ({ ...prev, [doc]: !prev[doc] }));
  };

  const docs = PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.documents;
  const completedCount = docs.filter((d) => checkedDocs[d]).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#20232B] pb-10">
        <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
          CLAIMS &bull; 48–72 HOUR RESOLUTION
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.heading}
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[#12141A] border border-gold-400/40 text-gold-300 text-sm font-serif">
          <Clock className="w-4 h-4 text-gold-400" />
          <span>{PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.payoutTime}</span>
        </div>
      </div>

      {/* Overview Card */}
      <div className="panel-dark p-8 sm:p-10 rounded-lg border border-[#222530] space-y-4">
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.paragraph1}
        </p>
        <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
          {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.paragraph2}
        </p>
        <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] text-xs text-stone-400 font-serif italic">
          {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.assistance}
        </div>
      </div>

      {/* Interactive Required Documents Checklist */}
      <div className="panel-dark p-8 sm:p-10 rounded-lg border border-[#222530] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E2028] pb-4">
          <div>
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
              SUPPORTING DOCUMENTATION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
              Required Claim Documents
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.introDocs}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gold-300 font-mono">
              {completedCount} of {docs.length} verified
            </span>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded bg-[#14161E] hover:bg-[#1E212B] text-stone-200 text-xs font-semibold uppercase tracking-wider border border-[#252834] flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5 text-gold-400" />
              <span>Print Checklist</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {docs.map((doc, idx) => {
            const isChecked = !!checkedDocs[doc];
            return (
              <div
                key={idx}
                onClick={() => toggleDoc(doc)}
                className={`p-5 rounded-lg border cursor-pointer transition-colors flex items-center gap-4 ${
                  isChecked
                    ? 'bg-[#141720] border-gold-400/60'
                    : 'bg-[#0A0B0E] border-[#1E2028] hover:border-[#2C303B]'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded flex items-center justify-center border text-xs font-bold transition-colors ${
                    isChecked
                      ? 'bg-gold-400 border-gold-400 text-black'
                      : 'border-[#2A2E3B] text-transparent'
                  }`}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
                <div className="text-sm font-medium text-white">
                  {doc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
