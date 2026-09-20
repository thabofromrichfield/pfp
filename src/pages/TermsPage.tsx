import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/pfpData';

export const TermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'benefits' | 'payments' | 'claims' | 'waiting' | 'missed' | 'responsibilities' | 'privacy'
  >('benefits');

  const navigationItems = [
    { id: 'benefits', label: 'How Benefits Work' },
    { id: 'payments', label: 'Your Monthly Payment' },
    { id: 'claims', label: 'Claims & 48–72h Payouts' },
    { id: 'waiting', label: 'Waiting Period & Exclusions' },
    { id: 'missed', label: 'Missed Payments & Cancellation' },
    { id: 'responsibilities', label: 'Mutual Responsibilities' },
    { id: 'privacy', label: 'Privacy (POPIA) & Complaints' },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            POLICY SCHEDULE &bull; GOVERNANCE &amp; STATUTORY TERMS
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Clear. Simple. Transparent.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          At Premium Funeral Planning, we believe our members should understand exactly how their membership works. From monthly payments to benefit fulfilment and claims, we aim to make the process as clear and straightforward as possible.
        </p>
      </div>

      {/* Smooth Directory Tabs Navigation */}
      <div className="space-y-8">
        <div className="flex items-center overflow-x-auto pb-2 gap-2 border-b border-stone-800 no-scrollbar">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`px-5 py-3 text-xs font-bold uppercase tracking-wider whitespace-nowrap rounded-t-2xl transition-all border-b-2 -mb-px ${
                  isActive
                    ? 'border-gold-400 text-gold-300 bg-[#161720]'
                    : 'border-transparent text-stone-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Active Content Display in Smooth Card */}
        <div className="smooth-card p-8 sm:p-12 min-h-[440px]">
          {/* 1. HOW YOUR BENEFITS WORK */}
          {activeSection === 'benefits' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  BENEFIT FULFILMENT SCHEDULE
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  How Your Benefits Work
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
                  When an eligible insured event occurs and the applicable claim has been accepted in accordance with the relevant policy terms, the selected PFP benefits will be fulfilled according to the package chosen:
                </p>
              </div>

              {/* Tabular Schedule */}
              <div className="overflow-x-auto rounded-2xl border border-stone-800">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#090A0E] border-b border-stone-800 text-gold-300 font-serif font-semibold">
                      <th className="p-4 w-1/3">PACKAGE</th>
                      <th className="p-4 w-2/3">BENEFIT SCHEDULE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    <tr>
                      <td className="p-4 align-top font-serif text-base font-medium text-white">
                        Package 1 &mdash; Grocery Support
                      </td>
                      <td className="p-4 text-stone-300 font-light leading-relaxed">
                        Up to <strong className="text-gold-300">R15,000 grocery support</strong>, provided through a voucher redeemable at the member’s nearest participating supermarket.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 align-top font-serif text-base font-medium text-white">
                        Package 2 &mdash; Grocery &amp; Cash Benefit
                      </td>
                      <td className="p-4 text-stone-300 font-light leading-relaxed">
                        Up to <strong className="text-gold-300">R15,000 grocery support</strong>, together with a <strong className="text-gold-300">R10,000 cash benefit</strong> paid into the client’s account, subject to the applicable approved terms and claim requirements.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 align-top font-serif text-base font-medium text-white">
                        Package 3 &mdash; Grocery &amp; Catering Support
                      </td>
                      <td className="p-4 text-stone-300 font-light leading-relaxed">
                        Up to <strong className="text-gold-300">R15,000 grocery support</strong>, together with professional <strong className="text-gold-300">catering support for up to 500 people</strong>, including agreed catering services, cooking team, pots, gas stoves, and serving equipment.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-[#090A0E] border border-gold-500/20 text-xs text-gold-400 font-serif italic">
                Benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status and claims requirements.
              </div>
            </div>
          )}

          {/* 2. YOUR MONTHLY PAYMENT */}
          {activeSection === 'payments' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  PREMIUM CRITERIA &amp; DEBIT ORDERS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  Your Monthly Payment
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
                  Membership is paid through the approved payment method selected when you join PFP. Your monthly premium depends on:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-6 rounded-2xl bg-[#090A0E] border border-gold-500/20 space-y-2">
                  <span className="gold-text-gradient font-serif text-3xl font-bold">01</span>
                  <div className="font-serif text-base font-medium text-white">
                    The Package Selected
                  </div>
                  <p className="text-xs text-stone-400 font-light">
                    Package 1 (Grocery), Package 2 (Grocery &amp; Cash), or Package 3 (Grocery &amp; Catering).
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#090A0E] border border-gold-500/20 space-y-2">
                  <span className="gold-text-gradient font-serif text-3xl font-bold">02</span>
                  <div className="font-serif text-base font-medium text-white">
                    Principal Member Age
                  </div>
                  <p className="text-xs text-stone-400 font-light">
                    Age band at entry: 18–64 years or 65–75 years.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#090A0E] border border-gold-500/20 space-y-2">
                  <span className="gold-text-gradient font-serif text-3xl font-bold">03</span>
                  <div className="font-serif text-base font-medium text-white">
                    Underwriting Terms
                  </div>
                  <p className="text-xs text-stone-400 font-light">
                    Applicable membership status and policy documentation criteria.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                <p>
                  • Your monthly premium will depend on the applicable package, age band and approved terms. Premiums are payable according to the payment date and method reflected in your membership/policy documentation.
                </p>
                <p>
                  • <strong className="text-gold-300">Member Responsibility:</strong> Members are responsible for ensuring that sufficient funds are available for their scheduled payment.
                </p>
                <p>
                  • Your confirmed premium and payment details will be reflected in your membership/policy documentation.
                </p>
              </div>
            </div>
          )}

          {/* 3. CLAIMS & PAYOUTS */}
          {activeSection === 'claims' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  RAPID CLAIMS RESOLUTION
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  Claims &amp; Payouts (48–72 Hours)
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                We understand that when a family contacts us after losing a loved one, they need guidance, clarity and support. The family should notify PFP as soon as reasonably possible after the death of an insured person.
              </p>

              <div className="bg-[#090A0E] rounded-2xl border border-gold-500/20 p-6 space-y-3">
                <div className="font-serif text-lg font-medium text-gold-300">
                  Required Claim Supporting Documents
                </div>
                <p className="text-xs text-stone-300 font-light">
                  The claimant will be required to complete the applicable claim documentation and provide the supporting documents required for the assessment of the claim. These may include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>Identification documents (Deceased &amp; Claimant)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>Proof of death / Official death certificate (DHA-5)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>Membership / policy information</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>Banking details where a cash benefit is applicable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                    <span>Any other documents required to assess the claim</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                <p>
                  • PFP will assist the family with the claims process where this forms part of our agreed role.
                </p>
                <p className="font-semibold text-gold-300">
                  • Claims will be paid out between 48–72 hours upon verification.
                </p>
              </div>
            </div>
          )}

          {/* 4. WAITING PERIOD & EXCLUSIONS */}
          {activeSection === 'waiting' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  UNDERWRITING PROVISIONS
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  Waiting Period &amp; Important Exclusions
                </h2>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-xl font-medium text-white">
                  Waiting Period
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  The current PFP proposal provides for a <strong className="text-gold-300">6-month waiting period for natural death</strong>, subject to final underwriting approval and policy wording.
                </p>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  Any treatment of accidental or unnatural death during the waiting period will be governed by the final approved policy terms.
                </p>
              </div>

              <div className="border-t border-stone-800 pt-6 space-y-3">
                <h3 className="font-serif text-xl font-medium text-white">
                  Important Exclusions
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  Benefits are not automatically payable in every circumstance. Claims remain subject to the applicable:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-stone-300">
                  <span>&bull; Waiting periods</span>
                  <span>&bull; Exclusions</span>
                  <span>&bull; Eligibility requirements</span>
                  <span>&bull; Premium status</span>
                  <span>&bull; Policy conditions</span>
                  <span>&bull; Claims documentation</span>
                </div>
                <p className="text-xs text-stone-400 font-serif italic pt-1">
                  Examples of exclusions may include circumstances specifically excluded under the applicable policy.
                </p>
              </div>
            </div>
          )}

          {/* 5. MISSED PAYMENTS & CANCELLATION */}
          {activeSection === 'missed' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  MEMBERSHIP CONTINUITY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  If Your Payment Is Missed &amp; Cancellation
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-medium text-white">
                    If Your Payment Is Missed
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    Members must keep their premiums up to date.
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    Where a payment is not received, the membership may enter the applicable grace period in accordance with the final approved terms.
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    If premiums remain unpaid after the applicable grace period, the membership may lapse.
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    Reinstatement, where available, may be subject to the applicable rules and could require payment of outstanding premiums and/or other requirements.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-medium text-white">
                    Cancellation Policy
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    A member may request cancellation in accordance with the applicable membership, administration and policy procedures.
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    Any applicable cooling-off period, refund arrangements, cancellation notice requirements and effective date will be governed by the final approved terms and applicable law.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 6. MUTUAL RESPONSIBILITIES */}
          {activeSection === 'responsibilities' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  A PARTNERSHIP OF DIGNITY
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  Mutual Responsibilities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-800">
                <div className="space-y-4 md:pr-6">
                  <h3 className="font-serif text-xl font-medium text-white">
                    Your Responsibilities as a Member
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    <li>
                      <strong className="text-gold-300">Providing accurate information:</strong> All information supplied during application and membership must be complete and accurate.
                    </li>
                    <li>
                      <strong className="text-gold-300">Keeping payments up to date:</strong> Ensure that your agreed monthly payment can be collected.
                    </li>
                    <li>
                      <strong className="text-gold-300">Keeping your information updated:</strong> Notify PFP/administrator of relevant changes to your contact or membership information.
                    </li>
                    <li>
                      <strong className="text-gold-300">Keeping your documents safe:</strong> Retain your membership/policy documentation and make sure your family knows how to contact PFP if something happens.
                    </li>
                    <li>
                      <strong className="text-gold-300">Submitting claims promptly:</strong> Provide the required claim information and supporting documents as soon as reasonably possible.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
                  <h3 className="font-serif text-xl font-medium text-gold-300">
                    Our Responsibility to You
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    <li>&bull; Providing the support included in your selected package.</li>
                    <li>&bull; Assisting with administration and claims processes within our agreed role.</li>
                    <li>&bull; Communicating important information to members.</li>
                    <li>&bull; Working with approved service providers to fulfil applicable PFP services.</li>
                    <li>&bull; Treating members and their families with professionalism, compassion and respect.</li>
                    <li className="text-xs text-gold-400 font-serif italic pt-2">
                      * Where a benefit is subject to an insurer’s assessment, PFP cannot guarantee that a claim will be approved.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 7. PRIVACY (POPIA) & COMPLAINTS */}
          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  GOVERNANCE &amp; DISPUTE RESOLUTION
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                  Your Privacy (POPIA) &amp; Complaints Channel
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-medium text-white">
                    Your Privacy
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    We respect the privacy of our members. Personal information may be processed for purposes including membership administration, underwriting, payment administration, claims processing, communication, compliance and the provision of applicable funeral-planning services.
                  </p>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    PFP will handle personal information in accordance with applicable data-protection requirements, including POPIA where applicable.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-medium text-white">
                    Complaints Procedure
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    We want our members to feel heard. If you have a complaint relating to PFP’s services or administration, you may contact PFP through our official complaints channel:
                  </p>
                  <div className="p-4 rounded-xl bg-[#090A0E] border border-gold-500/20 text-xs text-stone-300 space-y-1">
                    <div><strong className="text-gold-300">Complaints Desk:</strong> {COMPANY_INFO.complaintsEmail}</div>
                    <div><strong className="text-gold-300">Helpline:</strong> {COMPANY_INFO.phone}</div>
                    <div><strong className="text-gold-300">Operating Hours:</strong> Mon &ndash; Fri 08:00 &ndash; 17:00</div>
                  </div>
                  <p className="text-xs text-stone-400 font-serif italic">
                    Where a complaint relates specifically to the underwriting or assessment of an insurance claim, it will be handled in accordance with the applicable insurer dispute processes and ombud resolution.
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
