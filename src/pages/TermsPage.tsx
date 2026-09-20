import React, { useState } from 'react';
import { TERMS_CONTENT } from '../data/pfpData';

export const TermsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'benefits' | 'payments' | 'claims' | 'waiting' | 'missed' | 'responsibilities' | 'privacy'
  >('benefits');

  const tabs = [
    { id: 'benefits', label: 'How Benefits Work' },
    { id: 'payments', label: 'Your Monthly Payment' },
    { id: 'claims', label: 'Claims & Payouts (48–72h)' },
    { id: 'waiting', label: 'Waiting Period & Exclusions' },
    { id: 'missed', label: 'Missed Payments & Cancellation' },
    { id: 'responsibilities', label: 'Mutual Responsibilities' },
    { id: 'privacy', label: 'Privacy (POPIA) & Complaints' },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#20232B] pb-10">
        <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
          POLICY GOVERNANCE &bull; STATUTORY SCHEDULE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          {TERMS_CONTENT.header.subtitle}
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          {TERMS_CONTENT.header.intro}
        </p>
      </div>

      {/* Directory Layout */}
      <div className="space-y-8">
        {/* Navigation Tabs */}
        <div className="flex items-center overflow-x-auto pb-2 gap-1 border-b border-[#20232B] no-scrollbar">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  isActive
                    ? 'border-gold-400 text-gold-300 bg-[#12141C]'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="panel-dark p-8 sm:p-12 rounded-lg border border-[#222530] min-h-[440px]">
          {/* 1. HOW YOUR BENEFITS WORK */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  FULFILMENT SCHEDULE
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  {TERMS_CONTENT.benefitFulfilment.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
                  {TERMS_CONTENT.benefitFulfilment.intro}
                </p>
              </div>

              <div className="overflow-x-auto border border-[#1E2028] rounded">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0A0B0E] border-b border-[#1E2028] text-gold-300 font-serif font-semibold">
                      <th className="p-4 w-1/3">PACKAGE</th>
                      <th className="p-4 w-2/3">BENEFIT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2028]">
                    {TERMS_CONTENT.benefitFulfilment.table.map((row, idx) => (
                      <tr key={idx}>
                        <td className="p-4 align-top font-serif text-base text-white">
                          {row.package}
                        </td>
                        <td className="p-4 text-stone-300 font-light leading-relaxed">
                          {row.benefit}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] text-xs text-stone-400 font-serif italic">
                {TERMS_CONTENT.benefitFulfilment.footnote}
              </div>
            </div>
          )}

          {/* 2. YOUR MONTHLY PAYMENT */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  PREMIUM CRITERIA
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  {TERMS_CONTENT.monthlyPayment.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
                  {TERMS_CONTENT.monthlyPayment.intro}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {TERMS_CONTENT.monthlyPayment.points.map((point, idx) => (
                  <div key={idx} className="p-5 rounded bg-[#0A0B0E] border border-[#1E2028] space-y-1">
                    <div className="text-gold-300 font-serif text-xl font-bold">0{idx + 1}</div>
                    <div className="font-semibold text-white text-sm">{point}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {TERMS_CONTENT.monthlyPayment.notes.map((note, idx) => (
                  <p key={idx}>&bull; {note}</p>
                ))}
              </div>
            </div>
          )}

          {/* 3. CLAIMS & PAYOUTS */}
          {activeTab === 'claims' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  48–72 HOUR RESOLUTION
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  {TERMS_CONTENT.claimsAndPayouts.title}
                </h2>
                <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] mt-3">
                  <span className="font-serif text-xl text-gold-300 font-medium">
                    {TERMS_CONTENT.claimsAndPayouts.payoutNote}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                {TERMS_CONTENT.claimsAndPayouts.intro}
              </p>

              <div className="space-y-3">
                <h3 className="font-serif text-xl text-white font-medium">
                  {TERMS_CONTENT.claimsAndPayouts.docsIntro}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-300 font-light">
                  {TERMS_CONTENT.claimsAndPayouts.requiredDocs.map((doc, idx) => (
                    <li key={idx} className="p-3 bg-[#0A0B0E] rounded border border-[#1E2028] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] text-xs text-stone-400 font-serif italic">
                {TERMS_CONTENT.claimsAndPayouts.roleNote}
              </div>
            </div>
          )}

          {/* 4. WAITING PERIOD & EXCLUSIONS */}
          {activeTab === 'waiting' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  UNDERWRITING CONDITIONS
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  Waiting Period &amp; Important Exclusions
                </h2>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-xl text-white font-medium">
                  {TERMS_CONTENT.waitingPeriod.title}
                </h3>
                {TERMS_CONTENT.waitingPeriod.points.map((pt, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    &bull; {pt}
                  </p>
                ))}
              </div>

              <div className="border-t border-[#1E2028] pt-6 space-y-3">
                <h3 className="font-serif text-xl text-white font-medium">
                  {TERMS_CONTENT.exclusions.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {TERMS_CONTENT.exclusions.intro}
                </p>
                <p className="text-xs text-stone-400 font-serif italic pt-1">
                  {TERMS_CONTENT.exclusions.note}
                </p>
              </div>
            </div>
          )}

          {/* 5. MISSED PAYMENTS & CANCELLATION */}
          {activeTab === 'missed' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  MEMBERSHIP CONTINUITY
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  If Your Payment Is Missed &amp; Cancellation
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-white font-medium">
                    {TERMS_CONTENT.missedPayment.title}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {TERMS_CONTENT.missedPayment.points.map((pt, idx) => (
                      <p key={idx}>&bull; {pt}</p>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-white font-medium">
                    {TERMS_CONTENT.cancellation.title}
                  </h3>
                  <div className="space-y-2 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {TERMS_CONTENT.cancellation.points.map((pt, idx) => (
                      <p key={idx}>&bull; {pt}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. MUTUAL RESPONSIBILITIES */}
          {activeTab === 'responsibilities' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  GOVERNANCE PARTNERSHIP
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  Mutual Responsibilities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#1E2028]">
                <div className="space-y-4 md:pr-6">
                  <h3 className="font-serif text-xl text-white font-medium">
                    {TERMS_CONTENT.memberResponsibilities.title}
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {TERMS_CONTENT.memberResponsibilities.items.map((item, idx) => (
                      <li key={idx}>
                        <strong className="text-white">{item.label}:</strong> {item.detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
                  <h3 className="font-serif text-xl text-gold-300 font-medium">
                    {TERMS_CONTENT.companyResponsibilities.title}
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {TERMS_CONTENT.companyResponsibilities.points.map((pt, idx) => (
                      <li key={idx}>&bull; {pt}</li>
                    ))}
                    <li className="text-xs text-stone-400 font-serif italic pt-2">
                      {TERMS_CONTENT.companyResponsibilities.footnote}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 7. PRIVACY & COMPLAINTS */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  STATUTORY COMPLIANCE &amp; DISPUTE RESOLUTION
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  Privacy (POPIA) &amp; Complaints
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-white font-medium">
                    {TERMS_CONTENT.privacy.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {TERMS_CONTENT.privacy.body}
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-white font-medium">
                    {TERMS_CONTENT.complaints.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {TERMS_CONTENT.complaints.body}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
