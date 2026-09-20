import React, { useState } from 'react';
import {
  ABOUT_US,
  SUPPORT_PACKAGES,
  EVERY_DETAIL_WITH_CARE,
  PAYMENTS_BENEFITS_TERMS,
} from '../data/pfpData';
import { AgeBand } from '../types';

interface HomePageProps {
  onNavigate: (sectionId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>('18-64');
  const [activeTermsTab, setActiveTermsTab] = useState<
    'benefits' | 'payment' | 'claims' | 'waiting' | 'missed' | 'responsibilities' | 'privacy'
  >('benefits');

  const termsTabs = [
    { id: 'benefits', label: 'How Your Benefits Work' },
    { id: 'payment', label: 'Your Monthly Payment' },
    { id: 'claims', label: 'Claims & Payouts' },
    { id: 'waiting', label: 'Waiting Period & Exclusions' },
    { id: 'missed', label: 'Missed Payments & Cancellation' },
    { id: 'responsibilities', label: 'Mutual Responsibilities' },
    { id: 'privacy', label: 'Privacy & Complaints' },
  ];

  return (
    <div className="space-y-24 py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8">
      {/* =========================================================================
          HERO & CORE STATEMENT
         ========================================================================= */}
      <section id="top" className="space-y-8 max-w-4xl border-b border-[#20232B] pb-16">
        <div className="space-y-3">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            PFP &bull; PREMIUM FUNERAL PLANNING
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white leading-[1.08] tracking-tight">
            Plan ahead. Prepare your family. Let PFP support you when it matters most.
          </h1>
        </div>

        <p className="text-stone-300 text-lg sm:text-xl font-light leading-relaxed max-w-3xl">
          {ABOUT_US.goal}
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => onNavigate('packages')}
            className="px-8 py-4 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
          >
            Explore Support Packages
          </button>
          <button
            onClick={() => onNavigate('about')}
            className="px-8 py-4 rounded bg-[#12141C] hover:bg-[#1A1D27] text-gold-300 text-xs font-semibold uppercase tracking-wider border border-[#252834] transition-colors"
          >
            About Us
          </button>
          <button
            onClick={() => onNavigate('terms')}
            className="px-8 py-4 rounded bg-[#12141C] hover:bg-[#1A1D27] text-stone-300 text-xs font-semibold uppercase tracking-wider border border-[#252834] transition-colors"
          >
            Payments &amp; Terms
          </button>
        </div>

        {/* Core Pillars from supplied content */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#1C1F28]">
          <div className="space-y-1">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
              Experience
            </span>
            <div className="font-serif text-2xl text-white">10+ Years</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Working hand in hand with experienced catering companies with more than 10 years of experience in the catering industry.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
              Claims Turnaround
            </span>
            <div className="font-serif text-2xl text-white">48–72 Hours</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Claims will be paid out between 48-72 hours once verified.
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
              Waiting Period
            </span>
            <div className="font-serif text-2xl text-white">6 Months</div>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              The current PFP proposal provides for a 6-month waiting period for natural death.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT US
         ========================================================================= */}
      <section id="about" className="space-y-16 border-b border-[#20232B] pb-20 scroll-mt-28">
        <div className="max-w-4xl space-y-4">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            ABOUT US
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
            Our Purpose &amp; Foundation
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            {ABOUT_US.goal}
          </p>
        </div>

        {/* Built From Real Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
              EXPERIENCE &bull; 10+ YEARS
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
              {ABOUT_US.builtFromRealExperience.heading}
            </h3>
            <div className="p-5 rounded bg-[#12141A] border border-[#20232B]">
              <p className="font-serif text-base text-gold-300 italic leading-relaxed">
                &ldquo;{ABOUT_US.builtFromRealExperience.belief}&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
            <p>{ABOUT_US.builtFromRealExperience.paragraph1}</p>
            <p>{ABOUT_US.builtFromRealExperience.paragraph2}</p>
          </div>
        </div>

        {/* What We Do & Our Promise */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What We Do */}
          <div className="panel-dark p-8 sm:p-10 rounded-lg border border-[#222530] space-y-4">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
              PRACTICAL PREPARATION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              {ABOUT_US.whatWeDo.heading}
            </h3>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              {ABOUT_US.whatWeDo.paragraph1}
            </p>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              {ABOUT_US.whatWeDo.paragraph2}
            </p>
            <div className="space-y-1.5 pt-2 text-xs sm:text-sm text-stone-300 font-light border-t border-[#1C1F28]">
              <p>&bull; {ABOUT_US.whatWeDo.belief1}</p>
              <p className="text-white font-normal">&bull; {ABOUT_US.whatWeDo.belief2}</p>
              <p>&bull; {ABOUT_US.whatWeDo.belief3}</p>
            </div>
          </div>

          {/* Our Promise */}
          <div className="panel-dark p-8 sm:p-10 rounded-lg border border-[#222530] space-y-4">
            <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
              OUR PROMISE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              {ABOUT_US.ourPromise.heading}
            </h3>
            <div className="p-4 bg-[#0C0E12] rounded border border-gold-400/40 text-gold-300 font-serif text-lg font-medium">
              &ldquo;{ABOUT_US.ourPromise.motto}&rdquo;
            </div>
            <p className="text-stone-300 text-sm leading-relaxed font-light">
              {ABOUT_US.ourPromise.commitment}
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR SUPPORT PACKAGES
         ========================================================================= */}
      <section id="packages" className="space-y-16 border-b border-[#20232B] pb-20 scroll-mt-28">
        <div className="max-w-4xl space-y-4">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            OUR SUPPORT PACKAGES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white leading-tight">
            Carefully Structured Support
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            {EVERY_DETAIL_WITH_CARE.paragraph1}
          </p>

          {/* Age Bracket Selector */}
          <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Select Principal Member Age Band:
            </span>
            <div className="inline-flex rounded border border-[#222530] bg-[#12141A] p-1">
              <button
                onClick={() => setSelectedAgeBand('18-64')}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                  selectedAgeBand === '18-64'
                    ? 'bg-gold-400 text-[#0B0C0E]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                18–64 / 18–65 Years
              </button>
              <button
                onClick={() => setSelectedAgeBand('65-75')}
                className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
                  selectedAgeBand === '65-75'
                    ? 'bg-gold-400 text-[#0B0C0E]'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                65–75 Years
              </button>
            </div>
          </div>
        </div>

        {/* 3 Package Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SUPPORT_PACKAGES.map((pkg) => {
            const currentPremium =
              selectedAgeBand === '18-64' ? pkg.premiums.age18_64 : pkg.premiums.age65_75;
            const ageLabel =
              selectedAgeBand === '18-64'
                ? pkg.premiums.ageLabel1 || '18–64 years'
                : '65–75 years';

            return (
              <div
                key={pkg.id}
                className="panel-dark p-8 rounded-lg border border-[#222530] flex flex-col justify-between space-y-8 hover:border-gold-400/40 transition-colors"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-[#1E2028] pb-4">
                    <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
                      {pkg.tagline}
                    </span>
                    <span className="text-stone-400 text-xs font-mono">0{pkg.packageNumber}</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl font-normal text-white">
                      {pkg.name}
                    </h3>
                    <div className="font-serif text-lg text-gold-300 font-medium">
                      {pkg.headline}
                    </div>
                  </div>

                  <p className="text-xs text-stone-300 font-light leading-relaxed">
                    {pkg.description}
                  </p>

                  {/* Catering Inclusions for Package 3 */}
                  {pkg.cateringIncludes && (
                    <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] space-y-2">
                      <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider block">
                        Catering support includes:
                      </span>
                      <ul className="text-xs text-stone-300 space-y-1.5 font-light">
                        {pkg.cateringIncludes.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Price Box */}
                <div className="space-y-4 pt-6 border-t border-[#1E2028]">
                  <div className="p-4 rounded bg-[#0A0B0E] border border-[#1E2028] space-y-2">
                    <span className="text-[11px] text-stone-400 uppercase tracking-wider block">
                      Monthly Premium &bull; {ageLabel}
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold text-white">
                        R{currentPremium}
                      </span>
                      <span className="text-xs text-stone-400">/ month</span>
                    </div>

                    {pkg.totalValue && (
                      <div className="flex justify-between items-center text-xs pt-2 border-t border-[#181A22] text-stone-400">
                        <span>Total Benefit Value:</span>
                        <span className="text-gold-300 font-semibold text-sm">
                          R{pkg.totalValue.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* EVERY DETAIL WITH CARE Callout */}
        <div className="p-8 sm:p-10 rounded-lg bg-[#12141A] border border-[#20232B] space-y-3">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            {EVERY_DETAIL_WITH_CARE.heading}
          </span>
          <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed max-w-3xl">
            {EVERY_DETAIL_WITH_CARE.paragraph1}
          </p>
          <p className="text-white font-serif text-lg sm:text-xl font-normal">
            {EVERY_DETAIL_WITH_CARE.paragraph2}
          </p>
        </div>
      </section>

      {/* =========================================================================
          PAYMENTS, BENEFITS & TERMS
         ========================================================================= */}
      <section id="terms" className="space-y-12 scroll-mt-28">
        <div className="max-w-4xl space-y-4 border-b border-[#20232B] pb-10">
          <span className="text-gold-300 text-xs font-semibold uppercase tracking-widest block">
            {PAYMENTS_BENEFITS_TERMS.heading}
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
            {PAYMENTS_BENEFITS_TERMS.subheading}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
            {PAYMENTS_BENEFITS_TERMS.intro}
          </p>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="space-y-8">
          <div className="flex items-center overflow-x-auto pb-2 gap-1 border-b border-[#20232B] no-scrollbar">
            {termsTabs.map((tab) => {
              const isActive = activeTermsTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTermsTab(tab.id as any)}
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

          {/* Tab Content Panes */}
          <div className="panel-dark p-8 sm:p-12 rounded-lg border border-[#222530] min-h-[440px]">
            {/* 1. HOW YOUR BENEFITS WORK */}
            {activeTermsTab === 'benefits' && (
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

                <p className="text-xs text-stone-400 font-serif italic">
                  {PAYMENTS_BENEFITS_TERMS.howYourBenefitsWork.footer}
                </p>
              </div>
            )}

            {/* 2. YOUR MONTHLY PAYMENT */}
            {activeTermsTab === 'payment' && (
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

            {/* 3. CLAIMS & PAYOUTS */}
            {activeTermsTab === 'claims' && (
              <div className="space-y-6">
                <div>
                  <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
                    RESOLUTION PROCESS
                  </span>
                  <h3 className="font-serif text-3xl font-normal text-white mt-1">
                    {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.heading}
                  </h3>
                  <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] mt-3">
                    <span className="font-serif text-xl text-gold-300 font-medium">
                      {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.payoutTime}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  <p>{PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.paragraph1}</p>
                  <p>{PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.paragraph2}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-xl text-white font-medium">
                    {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.introDocs}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-300 font-light">
                    {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.documents.map((doc, idx) => (
                      <li key={idx} className="p-3 bg-[#0A0B0E] rounded border border-[#1E2028] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] text-xs text-stone-400 font-serif italic">
                  {PAYMENTS_BENEFITS_TERMS.claimsAndPayouts.assistance}
                </div>
              </div>
            )}

            {/* 4. WAITING PERIOD & IMPORTANT EXCLUSIONS */}
            {activeTermsTab === 'waiting' && (
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

            {/* 5. MISSED PAYMENTS & CANCELLATION */}
            {activeTermsTab === 'missed' && (
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

            {/* 6. MUTUAL RESPONSIBILITIES */}
            {activeTermsTab === 'responsibilities' && (
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

            {/* 7. PRIVACY & COMPLAINTS */}
            {activeTermsTab === 'privacy' && (
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
      </section>
    </div>
  );
};
