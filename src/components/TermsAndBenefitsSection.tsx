import React, { useState } from 'react';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  CreditCard,
  Shield,
  UserCheck,
  Building,
  HeartHandshake,
  Lock,
  MessageSquareWarning,
  Printer
} from 'lucide-react';
import { COMPANY_INFO } from '../data/pfpData';

export const TermsAndBenefitsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'payments' | 'benefits' | 'claims' | 'waiting' | 'missed' | 'responsibilities' | 'privacy'
  >('claims');

  return (
    <section id="terms" className="py-20 lg:py-28 bg-paper-soft relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-primary text-xs font-bold tracking-widest uppercase">
            <span>MEMBERSHIP GOVERNANCE &amp; POLICY TERMS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Clear. Simple. Transparent.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            At Premium Funeral Planning, we believe our members should understand exactly how their membership works. From monthly payments to benefit fulfilment and claims, we aim to make the process as clear and straightforward as possible.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 gap-2 mb-10 no-scrollbar">
          {[
            { id: 'claims', label: 'Claims & Payouts (48-72h)', icon: Clock },
            { id: 'benefits', label: 'How Benefits Work', icon: Shield },
            { id: 'payments', label: 'Your Monthly Payment', icon: CreditCard },
            { id: 'waiting', label: 'Waiting Periods & Exclusions', icon: AlertTriangle },
            { id: 'missed', label: 'Missed Payments & Cancellation', icon: HelpCircle },
            { id: 'responsibilities', label: 'Mutual Responsibilities', icon: UserCheck },
            { id: 'privacy', label: 'Privacy & Complaints', icon: Lock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-primary hover:bg-slate-100 border border-paper-border'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panes */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-paper-border p-6 sm:p-10 shadow-xl min-h-[460px]">
          {/* TAB 1: CLAIMS & PAYOUTS */}
          {activeTab === 'claims' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 border-slate-100 gap-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                    RAPID CLAIMS RESOLUTION
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-primary">
                    Claims &amp; Payouts (48–72 Hours)
                  </h3>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-xl text-xs font-bold">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>Turnaround: 48–72 Hours</span>
                </div>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">
                We understand that when a family contacts us after losing a loved one, they need guidance, clarity and support. The family should notify PFP as soon as reasonably possible after the death of an insured person.
              </p>

              <div className="p-4 rounded-2xl bg-paper-soft border border-paper-border space-y-3">
                <h4 className="font-serif font-bold text-sm text-primary">
                  Required Claim Documentation:
                </h4>
                <p className="text-xs text-slate-600">
                  The claimant will be required to complete the applicable claim documentation and provide the supporting documents required for the assessment of the claim. These may include:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Identification documents (Deceased &amp; Claimant)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Official Death Certificate (DHA-5)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Notification of Death / Proof of death (BI-1663)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Membership / policy information</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Banking details (where cash benefit applies)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>Any other documents required to assess the claim</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary text-white flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-serif font-bold text-sm text-accent">PFP Assistance Commitment</div>
                  <p className="text-xs text-slate-200">
                    PFP will assist the family with the claims process where this forms part of our agreed role. Claims will be paid out between 48–72 hours once verified.
                  </p>
                </div>
                <a
                  href={`tel:${COMPANY_INFO.phone.replace(/\s/g, '')}`}
                  className="px-4 py-2 bg-accent text-primary-dark font-bold text-xs rounded-lg uppercase tracking-wider whitespace-nowrap shadow hover:bg-accent-hover transition-colors"
                >
                  Call Claims
                </a>
              </div>
            </div>
          )}

          {/* TAB 2: HOW YOUR BENEFITS WORK */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <div className="border-b pb-4 border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                  BENEFIT SCHEDULE &amp; FULFILMENT
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  How Your Benefits Work
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  When an eligible insured event occurs and the applicable claim has been accepted in accordance with the relevant policy terms, the selected PFP benefits will be fulfilled according to the package chosen.
                </p>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-paper-soft text-primary font-serif font-bold border-b border-paper-border">
                      <th className="p-3.5 rounded-l-xl">PACKAGE</th>
                      <th className="p-3.5 rounded-r-xl">BENEFIT FULFILMENT DETAIL</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-primary align-top whitespace-nowrap">
                        Package 1 — Grocery Support
                      </td>
                      <td className="p-4 text-slate-700">
                        Up to <strong>R15,000 grocery support</strong>, provided through a voucher redeemable at the member’s nearest participating supermarket.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-primary align-top whitespace-nowrap">
                        Package 2 — Grocery &amp; Cash Benefit
                      </td>
                      <td className="p-4 text-slate-700">
                        Up to <strong>R15,000 grocery support</strong>, together with a <strong>R10,000 cash benefit</strong> paid into the client’s account, subject to the applicable approved terms and claim requirements.
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-primary align-top whitespace-nowrap">
                        Package 3 — Grocery &amp; Catering Support
                      </td>
                      <td className="p-4 text-slate-700">
                        Up to <strong>R15,000 grocery support</strong>, together with professional <strong>catering support for up to 500 people</strong>, including agreed catering services, cooking team, pots, gas stoves, and serving equipment.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs">
                <strong>Important Note:</strong> Benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status and claims requirements.
              </div>
            </div>
          )}

          {/* TAB 3: YOUR MONTHLY PAYMENT */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="border-b pb-4 border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                  PREMIUM SCHEDULE &amp; COLLECTION
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  Your Monthly Payment
                </h3>
              </div>

              <p className="text-slate-700 text-sm leading-relaxed">
                Membership is paid through the approved payment method selected when you join PFP. Your monthly premium is determined by:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-paper-soft border border-paper-border text-center space-y-1">
                  <span className="text-accent font-serif font-bold text-xl">01</span>
                  <div className="font-serif font-bold text-primary text-sm">Selected Package</div>
                  <p className="text-xs text-slate-500">Package 1, 2, or 3</p>
                </div>

                <div className="p-4 rounded-2xl bg-paper-soft border border-paper-border text-center space-y-1">
                  <span className="text-accent font-serif font-bold text-xl">02</span>
                  <div className="font-serif font-bold text-primary text-sm">Principal Member Age</div>
                  <p className="text-xs text-slate-500">18–64 or 65–75 years</p>
                </div>

                <div className="p-4 rounded-2xl bg-paper-soft border border-paper-border text-center space-y-1">
                  <span className="text-accent font-serif font-bold text-xl">03</span>
                  <div className="font-serif font-bold text-primary text-sm">Underwriting Terms</div>
                  <p className="text-xs text-slate-500">Applicable policy criteria</p>
                </div>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <p>
                  • Your monthly premium will depend on the applicable package, age band and approved terms. Premiums are payable according to the payment date and method reflected in your membership/policy documentation.
                </p>
                <p>
                  • <strong>Member Responsibility:</strong> Members are responsible for ensuring that sufficient funds are available for their scheduled payment.
                </p>
                <p>
                  • Your confirmed premium and payment details will be clearly reflected in your membership/policy documentation.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: WAITING PERIOD & EXCLUSIONS */}
          {activeTab === 'waiting' && (
            <div className="space-y-6">
              <div className="border-b pb-4 border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                  UNDERWRITING CONDITIONS
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  Waiting Period &amp; Important Exclusions
                </h3>
              </div>

              {/* Waiting Period Card */}
              <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border space-y-3">
                <div className="flex items-center gap-2 text-primary font-serif font-bold text-base">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>Waiting Period Guidelines</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  The current PFP proposal provides for a <strong>6-month waiting period for natural death</strong>, subject to final underwriting approval and policy wording.
                </p>
                <p className="text-xs text-slate-600">
                  Any treatment of accidental or unnatural death during the waiting period will be governed by the final approved policy terms.
                </p>
              </div>

              {/* Exclusions Card */}
              <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-rose-800 font-serif font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <span>Important Exclusions</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Benefits are not automatically payable in every circumstance. Claims remain strictly subject to:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">• Waiting periods</span>
                  <span className="flex items-center gap-1.5">• Exclusions</span>
                  <span className="flex items-center gap-1.5">• Eligibility requirements</span>
                  <span className="flex items-center gap-1.5">• Premium status</span>
                  <span className="flex items-center gap-1.5">• Policy conditions</span>
                  <span className="flex items-center gap-1.5">• Claims documentation</span>
                </div>
                <p className="text-[11px] text-slate-500 italic pt-1">
                  Examples of exclusions may include circumstances specifically excluded under the applicable policy terms and conditions.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: MISSED PAYMENTS & CANCELLATION */}
          {activeTab === 'missed' && (
            <div className="space-y-6">
              <div className="border-b pb-4 border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                  PREMIUM CONTINUITY &amp; MEMBERSHIP LIFECYCLE
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  If Your Payment Is Missed &amp; Cancellation Terms
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border space-y-3">
                  <div className="font-serif font-bold text-primary text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>If Your Payment Is Missed</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li>• Members must keep their premiums up to date.</li>
                    <li>
                      • Where a payment is not received, the membership may enter the applicable <strong>grace period</strong> in accordance with the final approved terms.
                    </li>
                    <li>
                      • If premiums remain unpaid after the applicable grace period, the membership may lapse.
                    </li>
                    <li>
                      • Reinstatement, where available, may be subject to applicable rules and could require payment of outstanding premiums and/or other requirements.
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border space-y-3">
                  <div className="font-serif font-bold text-primary text-base flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-accent" />
                    <span>Cancellation &amp; Cooling-Off</span>
                  </div>
                  <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                    <li>
                      • A member may request cancellation in accordance with the applicable membership, administration and policy procedures.
                    </li>
                    <li>
                      • Any applicable <strong>cooling-off period</strong>, refund arrangements, cancellation notice requirements and effective date will be governed by the final approved terms and applicable law.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: MUTUAL RESPONSIBILITIES */}
          {activeTab === 'responsibilities' && (
            <div className="space-y-6">
              <div className="border-b pb-4 border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                  PARTNERSHIP OF TRUST
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  Mutual Responsibilities
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Member Responsibilities */}
                <div className="p-5 rounded-2xl bg-white border border-paper-border shadow-xs space-y-3">
                  <h4 className="font-serif font-bold text-primary text-base flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-accent" />
                    <span>Your Responsibilities as a Member</span>
                  </h4>
                  <ul className="text-xs text-slate-600 space-y-2.5">
                    <li>
                      <strong>Providing accurate information:</strong> All information supplied during application and membership must be complete and accurate.
                    </li>
                    <li>
                      <strong>Keeping payments up to date:</strong> Ensure that your agreed monthly payment can be collected.
                    </li>
                    <li>
                      <strong>Keeping your information updated:</strong> Notify PFP/administrator of relevant changes to your contact or membership information.
                    </li>
                    <li>
                      <strong>Keeping your documents safe:</strong> Retain your membership/policy documentation and make sure your family knows how to contact PFP if something happens.
                    </li>
                    <li>
                      <strong>Submitting claims promptly:</strong> Provide the required claim information and supporting documents as soon as reasonably possible.
                    </li>
                  </ul>
                </div>

                {/* Our Responsibility */}
                <div className="p-5 rounded-2xl bg-primary text-white space-y-3 shadow-md">
                  <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                    <Shield className="w-4 h-4 text-accent" />
                    <span>Our Responsibility to You</span>
                  </h4>
                  <ul className="text-xs text-slate-200 space-y-2.5">
                    <li>• Providing the support included in your selected package.</li>
                    <li>• Assisting with administration and claims processes within our agreed role.</li>
                    <li>• Communicating important information to members.</li>
                    <li>• Working with approved service providers to fulfil applicable PFP services.</li>
                    <li>• Treating members and their families with professionalism, compassion and respect.</li>
                    <li className="text-[11px] text-slate-300 italic pt-1">
                      * Where a benefit is subject to an insurer’s assessment, PFP cannot guarantee that a claim will be approved.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: PRIVACY & COMPLAINTS */}
          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <div className="border-b pb-4 border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                  GOVERNANCE &amp; COMPLIANCE
                </span>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  Your Privacy (POPIA) &amp; Complaints
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border space-y-3">
                  <div className="flex items-center gap-2 text-primary font-serif font-bold text-base">
                    <Lock className="w-4 h-4 text-accent" />
                    <span>Your Privacy &amp; Data Rights</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We respect the privacy of our members. Personal information may be processed for purposes including:
                  </p>
                  <ul className="text-xs text-slate-600 space-y-1 pl-3 list-disc">
                    <li>Membership administration</li>
                    <li>Underwriting &amp; risk assessment</li>
                    <li>Payment administration &amp; debiting</li>
                    <li>Claims processing &amp; benefit fulfillment</li>
                    <li>Communication, compliance and funeral-planning services</li>
                  </ul>
                  <div className="p-3 bg-white rounded-xl border border-paper-border text-xs text-primary font-medium">
                    PFP handles personal information in accordance with applicable South African data-protection requirements, including POPIA.
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border space-y-3">
                  <div className="flex items-center gap-2 text-primary font-serif font-bold text-base">
                    <MessageSquareWarning className="w-4 h-4 text-accent" />
                    <span>Complaints Channel</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We want our members to feel heard. If you have a complaint relating to PFP’s services or administration, you may contact PFP through our official complaints channel:
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-paper-border text-xs space-y-1">
                    <div><strong>Email:</strong> {COMPANY_INFO.complaintsEmail}</div>
                    <div><strong>Toll-Free:</strong> {COMPANY_INFO.phone}</div>
                    <div><strong>Hours:</strong> Mon – Fri 08:00 – 17:00</div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic">
                    Where a complaint relates specifically to the underwriting or assessment of an insurance claim, it will be handled in accordance with the formal insurer dispute and ombud resolution framework.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
