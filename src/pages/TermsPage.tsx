import React, { useState } from 'react';
import { PAYMENTS_BENEFITS_TERMS } from '../data/pfpData';

export const TermsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'benefits' | 'payments' | 'waiting' | 'missed' | 'responsibilities' | 'privacy'
  >('benefits');

  const tabs = [
    { id: 'benefits', label: 'How Your Benefits Work' },
    { id: 'payments', label: 'Your Monthly Payment' },
    { id: 'waiting', label: 'Waiting Period & Exclusions' },
    { id: 'missed', label: 'Missed Payments & Cancellation' },
    { id: 'responsibilities', label: 'Mutual Responsibilities' },
    { id: 'privacy', label: 'Privacy & Complaints' },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#20232B] pb-10">
        <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
          {PAYMENTS_BENEFITS_TERMS.heading}
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          {PAYMENTS_BENEFITS_TERMS.subheading}
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          {PAYMENTS_BENEFITS_TERMS.intro}
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
                <h3 className="font-serif text-3xl font-normal text-white mt-1">
                  {PAYMENTS_BENEFITS_TERMS.howYourBenefitsWork.heading}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
                  {PAYMENTS_BENEFITS_TERMS.howYourBenefitsWork.intro}
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
                    {PAYMENTS_BENEFITS_TERMS.howYourBenefitsWork.table.map((row, idx) => (
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
                {PAYMENTS_BENEFITS_TERMS.howYourBenefitsWork.footer}
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
                <h3 className="font-serif text-3xl font-normal text-white mt-1">
                  {PAYMENTS_BENEFITS_TERMS.yourMonthlyPayment.heading}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
                  {PAYMENTS_BENEFITS_TERMS.yourMonthlyPayment.intro}
                </p>
              </div>

              <div className="p-5 rounded bg-[#0A0B0E] border border-[#1E2028] space-y-2">
                {PAYMENTS_BENEFITS_TERMS.yourMonthlyPayment.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-white">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                <p>&bull; {PAYMENTS_BENEFITS_TERMS.yourMonthlyPayment.paragraph1}</p>
                <p>&bull; {PAYMENTS_BENEFITS_TERMS.yourMonthlyPayment.paragraph2}</p>
                <p>&bull; {PAYMENTS_BENEFITS_TERMS.yourMonthlyPayment.paragraph3}</p>
              </div>
            </div>
          )}

          {/* 3. WAITING PERIOD & EXCLUSIONS */}
          {activeTab === 'waiting' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  POLICY CRITERIA
                </span>
                <h3 className="font-serif text-3xl font-normal text-white mt-1">
                  {PAYMENTS_BENEFITS_TERMS.waitingPeriod.heading}
                </h3>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                <p>&bull; {PAYMENTS_BENEFITS_TERMS.waitingPeriod.paragraph1}</p>
                <p>&bull; {PAYMENTS_BENEFITS_TERMS.waitingPeriod.paragraph2}</p>
              </div>

              <div className="border-t border-[#1E2028] pt-6 space-y-4">
                <h4 className="font-serif text-2xl text-white font-medium">
                  {PAYMENTS_BENEFITS_TERMS.importantExclusions.heading}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  {PAYMENTS_BENEFITS_TERMS.importantExclusions.paragraph1}
                </p>
                <p className="text-xs sm:text-sm text-stone-300 font-light">
                  {PAYMENTS_BENEFITS_TERMS.importantExclusions.introList}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-white">
                  {PAYMENTS_BENEFITS_TERMS.importantExclusions.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#0A0B0E] rounded border border-[#1E2028]">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-stone-400 font-serif italic pt-1">
                  {PAYMENTS_BENEFITS_TERMS.importantExclusions.note}
                </p>
              </div>
            </div>
          )}

          {/* 4. MISSED PAYMENTS & CANCELLATION */}
          {activeTab === 'missed' && (
            <div className="space-y-8">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  POLICY LIFECYCLE
                </span>
                <h3 className="font-serif text-3xl font-normal text-white mt-1">
                  Payment Continuity &amp; Cancellation
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="font-serif text-xl text-white font-medium">
                    {PAYMENTS_BENEFITS_TERMS.ifYourPaymentIsMissed.heading}
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    <p>&bull; {PAYMENTS_BENEFITS_TERMS.ifYourPaymentIsMissed.paragraph1}</p>
                    <p>&bull; {PAYMENTS_BENEFITS_TERMS.ifYourPaymentIsMissed.paragraph2}</p>
                    <p>&bull; {PAYMENTS_BENEFITS_TERMS.ifYourPaymentIsMissed.paragraph3}</p>
                    <p>&bull; {PAYMENTS_BENEFITS_TERMS.ifYourPaymentIsMissed.paragraph4}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-xl text-white font-medium">
                    {PAYMENTS_BENEFITS_TERMS.cancellation.heading}
                  </h4>
                  <div className="space-y-2 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    <p>&bull; {PAYMENTS_BENEFITS_TERMS.cancellation.paragraph1}</p>
                    <p>&bull; {PAYMENTS_BENEFITS_TERMS.cancellation.paragraph2}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. MUTUAL RESPONSIBILITIES */}
          {activeTab === 'responsibilities' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  GOVERNANCE
                </span>
                <h3 className="font-serif text-3xl font-normal text-white mt-1">
                  Mutual Responsibilities
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#1E2028]">
                <div className="space-y-4 md:pr-6">
                  <h4 className="font-serif text-xl text-white font-medium">
                    {PAYMENTS_BENEFITS_TERMS.yourResponsibilitiesAsAMember.heading}
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {PAYMENTS_BENEFITS_TERMS.yourResponsibilitiesAsAMember.items.map((item, idx) => (
                      <li key={idx}>
                        <strong className="text-white font-medium">{item.title}:</strong> {item.body}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
                  <h4 className="font-serif text-xl text-gold-300 font-medium">
                    {PAYMENTS_BENEFITS_TERMS.ourResponsibilityToYou.heading}
                  </h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {PAYMENTS_BENEFITS_TERMS.ourResponsibilityToYou.bullets.map((bullet, idx) => (
                      <li key={idx}>&bull; {bullet}</li>
                    ))}
                    <li className="text-xs text-stone-400 font-serif italic pt-2">
                      {PAYMENTS_BENEFITS_TERMS.ourResponsibilityToYou.footnote}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 6. PRIVACY & COMPLAINTS */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                  COMPLIANCE &amp; DISPUTES
                </span>
                <h3 className="font-serif text-3xl font-normal text-white mt-1">
                  Privacy &amp; Complaints
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="font-serif text-xl text-white font-medium">
                    {PAYMENTS_BENEFITS_TERMS.yourPrivacy.heading}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {PAYMENTS_BENEFITS_TERMS.yourPrivacy.paragraph1}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {PAYMENTS_BENEFITS_TERMS.yourPrivacy.paragraph2}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {PAYMENTS_BENEFITS_TERMS.yourPrivacy.paragraph3}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-xl text-white font-medium">
                    {PAYMENTS_BENEFITS_TERMS.complaints.heading}
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {PAYMENTS_BENEFITS_TERMS.complaints.paragraph1}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {PAYMENTS_BENEFITS_TERMS.complaints.paragraph2}
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    {PAYMENTS_BENEFITS_TERMS.complaints.paragraph3}
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
