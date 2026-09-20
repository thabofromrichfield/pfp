import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/pfpData';

export const TermsPage: React.FC = () => {
  const [activeSub, setActiveSub] = useState<
    'benefits' | 'payments' | 'waiting' | 'missed' | 'responsibilities' | 'privacy'
  >('benefits');

  const subTabs = [
    { id: 'benefits', label: 'How Benefits Work' },
    { id: 'payments', label: 'Your Monthly Payment' },
    { id: 'waiting', label: 'Waiting Period & Exclusions' },
    { id: 'missed', label: 'Missed Payments & Cancellation' },
    { id: 'responsibilities', label: 'Mutual Responsibilities' },
    { id: 'privacy', label: 'Privacy (POPIA) & Complaints' },
  ];

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#1E2028] pb-10">
        <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
          POLICY GOVERNANCE &bull; STATUTORY SCHEDULE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Clear. Simple. Transparent.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          At Premium Funeral Planning, we believe our members should understand exactly how their membership works. From monthly payments to benefit fulfilment and claims, we aim to make the process as clear and straightforward as possible.
        </p>
      </div>

      {/* Directory Layout */}
      <div className="space-y-8">
        {/* Clean Sub-Navigation */}
        <div className="flex items-center overflow-x-auto pb-2 gap-1 border-b border-[#1E2028] no-scrollbar">
          {subTabs.map((item) => {
            const isActive = activeSub === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSub(item.id as any)}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 -mb-px ${
                  isActive
                    ? 'border-gold-500 text-gold-400 bg-[#12141C]'
                    : 'border-transparent text-stone-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Content Panel */}
        <div className="panel-dark p-8 sm:p-12 rounded-lg border border-[#242833] min-h-[440px]">
          {/* 1. HOW YOUR BENEFITS WORK */}
          {activeSub === 'benefits' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                  FULFILMENT SCHEDULE
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  How Your Benefits Work
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
                  When an eligible insured event occurs and the applicable claim has been accepted in accordance with the relevant policy terms, the selected PFP benefits will be fulfilled according to the package chosen:
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-[#20232B] rounded">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0A0B0E] border-b border-[#20232B] text-gold-400 font-serif font-semibold">
                      <th className="p-4 w-1/3">PACKAGE</th>
                      <th className="p-4 w-2/3">BENEFIT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2028]">
                    <tr>
                      <td className="p-4 align-top font-serif text-base text-white">
                        Package 1 &mdash; Grocery Support
                      </td>
                      <td className="p-4 text-stone-300 font-light leading-relaxed">
                        Up to <strong>R15,000 grocery support</strong>, provided through a voucher redeemable at the member’s nearest participating supermarket.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 align-top font-serif text-base text-white">
                        Package 2 &mdash; Grocery &amp; Cash Benefit
                      </td>
                      <td className="p-4 text-stone-300 font-light leading-relaxed">
                        Up to <strong>R15,000 grocery support</strong>, together with a <strong>R10,000 cash benefit</strong> paid into the client’s account, subject to the applicable approved terms and claim requirements.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 align-top font-serif text-base text-white">
                        Package 3 &mdash; Grocery &amp; Catering Support
                      </td>
                      <td className="p-4 text-stone-300 font-light leading-relaxed">
                        Up to <strong>R15,000 grocery support</strong>, together with professional <strong>catering support for up to 500 people</strong>, including the agreed catering services and equipment (cooking team, serving stations, pots, gas stoves, utensils, and service clean-up).
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] text-xs text-stone-400 font-serif italic">
                Benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status and claims requirements.
              </div>
            </div>
          )}

          {/* 2. YOUR MONTHLY PAYMENT */}
          {activeSub === 'payments' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                  PREMIUM CRITERIA
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  Your Monthly Payment
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 mt-2 font-light leading-relaxed">
                  Membership is paid through the approved payment method selected when you join PFP. Your monthly premium depends on:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded bg-[#0A0B0E] border border-[#1E2028] space-y-1">
                  <div className="text-gold-400 font-serif text-xl font-bold">01</div>
                  <div className="font-semibold text-white text-sm">Selected Package</div>
                  <p className="text-xs text-stone-400 font-light">Package 1, Package 2, or Package 3.</p>
                </div>

                <div className="p-5 rounded bg-[#0A0B0E] border border-[#1E2028] space-y-1">
                  <div className="text-gold-400 font-serif text-xl font-bold">02</div>
                  <div className="font-semibold text-white text-sm">Principal Member Age</div>
                  <p className="text-xs text-stone-400 font-light">Age band at entry: 18–64 or 65–75 years.</p>
                </div>

                <div className="p-5 rounded bg-[#0A0B0E] border border-[#1E2028] space-y-1">
                  <div className="text-gold-400 font-serif text-xl font-bold">03</div>
                  <div className="font-semibold text-white text-sm">Underwriting Terms</div>
                  <p className="text-xs text-stone-400 font-light">Applicable policy and membership terms.</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                <p>
                  • Your monthly premium will depend on the applicable package, age band and approved terms. Premiums are payable according to the payment date and method reflected in your membership/policy documentation.
                </p>
                <p>
                  • <strong className="text-white">Member Responsibility:</strong> Members are responsible for ensuring that sufficient funds are available for their scheduled payment.
                </p>
                <p>
                  • Your confirmed premium and payment details will be reflected in your membership/policy documentation.
                </p>
              </div>
            </div>
          )}

          {/* 3. WAITING PERIOD & EXCLUSIONS */}
          {activeSub === 'waiting' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                  UNDERWRITING CONDITIONS
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  Waiting Period &amp; Important Exclusions
                </h2>
              </div>

              <div className="space-y-3">
                <h3 className="font-serif text-xl text-white font-medium">
                  Waiting Period
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  The current PFP proposal provides for a <strong>6-month waiting period for natural death</strong>, subject to final underwriting approval and policy wording.
                </p>
                <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                  Any treatment of accidental or unnatural death during the waiting period will be governed by the final approved policy terms.
                </p>
              </div>

              <div className="border-t border-[#1E2028] pt-6 space-y-3">
                <h3 className="font-serif text-xl text-white font-medium">
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
                  <span>&bull; Claims documentation requirements</span>
                </div>
                <p className="text-xs text-stone-400 font-serif italic pt-1">
                  Examples of exclusions may include circumstances specifically excluded under the applicable policy.
                </p>
              </div>
            </div>
          )}

          {/* 4. MISSED PAYMENTS & CANCELLATION */}
          {activeSub === 'missed' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                  MEMBERSHIP CONTINUITY
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  If Your Payment Is Missed &amp; Cancellation
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-white font-medium">
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
                  <h3 className="font-serif text-xl text-white font-medium">
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

          {/* 5. MUTUAL RESPONSIBILITIES */}
          {activeSub === 'responsibilities' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                  GOVERNANCE PARTNERSHIP
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  Mutual Responsibilities
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#1E2028]">
                <div className="space-y-4 md:pr-6">
                  <h3 className="font-serif text-xl text-white font-medium">
                    Your Responsibilities as a Member
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    <li>
                      <strong className="text-white">Providing accurate information:</strong> All information supplied during application and membership must be complete and accurate.
                    </li>
                    <li>
                      <strong className="text-white">Keeping payments up to date:</strong> Ensure that your agreed monthly payment can be collected.
                    </li>
                    <li>
                      <strong className="text-white">Keeping your information updated:</strong> Notify PFP/administrator of relevant changes to your contact or membership information.
                    </li>
                    <li>
                      <strong className="text-white">Keeping your documents safe:</strong> Retain your membership/policy documentation and make sure your family knows how to contact PFP if something happens.
                    </li>
                    <li>
                      <strong className="text-white">Submitting claims promptly:</strong> Provide the required claim information and supporting documents as soon as reasonably possible.
                    </li>
                  </ul>
                </div>

                <div className="space-y-4 md:pl-8 pt-6 md:pt-0">
                  <h3 className="font-serif text-xl text-gold-400 font-medium">
                    Our Responsibility to You
                  </h3>
                  <ul className="space-y-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    <li>&bull; Providing the support included in your selected package.</li>
                    <li>&bull; Assisting with administration and claims processes within our agreed role.</li>
                    <li>&bull; Communicating important information to members.</li>
                    <li>&bull; Working with approved service providers to fulfil applicable PFP services.</li>
                    <li>&bull; Treating members and their families with professionalism, compassion and respect.</li>
                    <li className="text-xs text-stone-400 font-serif italic pt-2">
                      * Where a benefit is subject to an insurer’s assessment, PFP cannot guarantee that a claim will be approved.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* 6. PRIVACY & COMPLAINTS */}
          {activeSub === 'privacy' && (
            <div className="space-y-6">
              <div>
                <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                  STATUTORY COMPLIANCE &amp; DISPUTE RESOLUTION
                </span>
                <h2 className="font-serif text-3xl font-normal text-white mt-1">
                  Your Privacy (POPIA) &amp; Complaints Channel
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="font-serif text-xl text-white font-medium">
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
                  <h3 className="font-serif text-xl text-white font-medium">
                    Complaints Channel
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
                    We want our members to feel heard. If you have a complaint relating to PFP’s services or administration, you may contact PFP through our official complaints channel:
                  </p>
                  <div className="p-4 bg-[#0A0B0E] rounded border border-[#1E2028] text-xs text-stone-300 space-y-1">
                    <div><strong>Complaints Desk:</strong> {COMPANY_INFO.complaintsEmail}</div>
                    <div><strong>Helpline:</strong> {COMPANY_INFO.phone}</div>
                    <div><strong>Operating Hours:</strong> Mon &ndash; Fri 08:00 &ndash; 17:00</div>
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
