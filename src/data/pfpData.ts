import { SupportPackage } from '../types';

export const COMPANY_INFO = {
  acronym: 'PFP',
  fullName: 'PREMIUM FUNERAL PLANNING',
  motto: 'Plan ahead. Prepare your family. Let PFP support you when it matters most.',
  promise: 'At PFP, every detail with Care.',
  goal: 'Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families can receive assistance with groceries, catering and other meaningful benefits, depending on the package they choose.',
  waitingPeriod: '6-month waiting period for natural death',
  payoutTimeframe: '48–72 hours',
};

export const SUPPORT_PACKAGES: SupportPackage[] = [
  {
    id: 'package-1',
    packageNumber: 1,
    name: 'Package 1',
    tagline: 'Grocery Support',
    headline: 'Grocery Support up to R15,000',
    grocerySupport: 15000,
    totalValue: 15000,
    premiums: {
      age18_64: 295,
      age65_75: 445,
    },
    description:
      'Receive grocery support of up to R15,000 through a voucher redeemable at your nearest supermarket, helping your family purchase essential food and supplies during the funeral period.',
  },
  {
    id: 'package-2',
    packageNumber: 2,
    name: 'Package 2',
    tagline: 'Grocery & Cash Benefit',
    headline: 'R15,000 Grocery Support + R10,000 Cash Benefit',
    grocerySupport: 15000,
    cashBenefit: 10000,
    totalValue: 25000,
    premiums: {
      age18_64: 395,
      age65_75: 545,
    },
    description:
      "Receive grocery support of up to R15,000, together with a R10,000 cash benefit paid directly into the client's bank account to provide essential financial flexibility during the funeral period.",
  },
  {
    id: 'package-3',
    packageNumber: 3,
    name: 'Package 3',
    tagline: 'Grocery & Catering Support',
    headline: 'R15,000 Grocery Support + Catering for up to 500 People',
    grocerySupport: 15000,
    cateringGuests: 500,
    totalValue: 30000,
    premiums: {
      age18_64: 445,
      age65_75: 645,
    },
    description:
      'Receive grocery support of up to R15,000, together with catering for up to 500 people with cooking team, serving stations, pots & equipment, gas stoves, utensils, setup & service cleanup.',
    cateringIncludes: [
      'Cooking team',
      'Serving stations',
      'Pots & equipment',
      'Gas stoves',
      'Utensils',
      'Setup & service cleanup',
    ],
  },
];

export const ABOUT_CONTENT = {
  goal: 'Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families can receive assistance with groceries, catering and other meaningful benefits, depending on the package they choose.',
  builtFromRealExperience: {
    title: 'Built From Real Experience',
    paragraph1:
      'Our understanding of the needs of families has been shaped by working hand in hand with experienced catering companies with more than 10 years of experience in the catering industry.',
    paragraph2:
      'Through this experience, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and the practical details behind the scenes; Catering is a responsibility that families often need help managing.',
    belief:
      'We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.',
    planningAhead:
      'We don’t believe in waiting until a family is facing a difficult moment before thinking about what they may need. Because when the unexpected happens, having a plan makes a difficult journey a little easier.',
  },
  whatWeDo: {
    title: 'What We Do',
    paragraph1:
      'PFP brings together planning, practical support and care to help families prepare ahead of time.',
    paragraph2:
      'Our packages are designed to provide meaningful support when it matters most — whether that means assistance with groceries, additional financial support or catering for family and guests.',
  },
  ourPromise: {
    title: 'Our Promise',
    motto: 'At PFP, every detail with Care.',
    commitment:
      'We are committed to serving families with compassion, professionalism and respect, while creating practical solutions that help families feel more prepared for tomorrow.',
  },
};

export const TERMS_CONTENT = {
  header: {
    title: 'Payments, Benefits & Terms',
    subtitle: 'Clear. Simple. Transparent.',
    intro:
      'At Premium Funeral Planning, we believe our members should understand exactly how their membership works. From monthly payments to benefit fulfilment and claims, we aim to make the process as clear and straightforward as possible.',
  },
  monthlyPayment: {
    title: 'Your Monthly Payment',
    intro:
      'Membership is paid through the approved payment method selected when you join PFP. Your monthly premium will depend on:',
    points: ['Selected package', 'Principal member age', 'Underwriting terms'],
    notes: [
      'Your monthly premium will depend on the applicable package, age band and approved terms.',
      'Premiums are payable according to the payment date and method reflected in your membership/policy documentation.',
      'Members are responsible for ensuring that sufficient funds are available for their scheduled payment.',
      'Your confirmed premium and payment details will be reflected in your membership/policy documentation.',
    ],
  },
  benefitFulfilment: {
    title: 'How Your Benefits Work',
    intro:
      'When an eligible insured event occurs and the applicable claim has been accepted in accordance with the relevant policy terms, the selected PFP benefits will be fulfilled according to the package chosen:',
    table: [
      {
        package: 'Package 1 — Grocery Support',
        benefit:
          'Up to R15,000 grocery support, provided through a voucher redeemable at the member’s nearest participating supermarket.',
      },
      {
        package: 'Package 2 — Grocery & Cash Benefit',
        benefit:
          'Up to R15,000 grocery support, together with a R10,000 cash benefit paid into the client’s account, subject to the applicable approved terms and claim requirements.',
      },
      {
        package: 'Package 3 — Grocery & Catering Support',
        benefit:
          'Up to R15,000 grocery support, together with professional catering support for up to 500 people, including the agreed catering services and equipment.',
      },
    ],
    footnote:
      'Benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status and claims requirements.',
  },
  claimsAndPayouts: {
    title: 'Claims & Payouts',
    payoutNote: 'Payouts are made within 48–72 hours.',
    intro:
      'We understand that when a family contacts us after losing a loved one, they need guidance, clarity and support. The family should notify PFP as soon as reasonably possible after the death of an insured person.',
    docsIntro:
      'The claimant will be required to complete the applicable claim documentation and provide the supporting documents required for the assessment of the claim. These may include:',
    requiredDocs: [
      'Identification documents',
      'Proof of death',
      'Membership / policy information',
      'Banking details (where a cash benefit applies)',
      'Any other documents required to assess the claim',
    ],
    roleNote:
      'PFP will assist the family with the claims process where this forms part of our agreed role.',
  },
  waitingPeriod: {
    title: 'Waiting Period',
    points: [
      'The current PFP proposal provides for a 6-month waiting period for natural death, subject to final underwriting approval and policy wording.',
      'Any treatment of accidental or unnatural death during the waiting period will be governed by the final approved policy terms.',
    ],
  },
  missedPayment: {
    title: 'If Your Payment Is Missed',
    points: [
      'Members must keep their premiums up to date.',
      'Where a payment is not received, the membership may enter the applicable grace period in accordance with the final approved terms.',
      'If premiums remain unpaid after the applicable grace period, the membership may lapse.',
      'Reinstatement, where available, may be subject to the applicable rules and could require payment of outstanding premiums and/or other requirements.',
    ],
  },
  cancellation: {
    title: 'Cancellation',
    points: [
      'A member may request cancellation in accordance with the applicable membership, administration and policy procedures.',
      'Any applicable cooling-off period, refund arrangements, cancellation notice requirements and effective date will be governed by the final approved terms and applicable law.',
    ],
  },
  exclusions: {
    title: 'Important Exclusions',
    intro:
      'Benefits are not automatically payable in every circumstance. Claims remain subject to the applicable waiting periods, exclusions, eligibility requirements, premium status, policy conditions and claims documentation requirements.',
    note: 'Examples of exclusions may include circumstances specifically excluded under the applicable policy terms and conditions.',
  },
  memberResponsibilities: {
    title: 'Your Responsibilities as a Member',
    items: [
      {
        label: 'Providing accurate information',
        detail:
          'All information supplied during application and membership must be complete and accurate.',
      },
      {
        label: 'Keeping payments up to date',
        detail: 'Ensure that your agreed monthly payment can be collected.',
      },
      {
        label: 'Keeping your information updated',
        detail:
          'Notify PFP/administrator of relevant changes to your contact or membership information.',
      },
      {
        label: 'Keeping your documents safe',
        detail:
          'Retain your membership/policy documentation and make sure your family knows how to contact PFP if something happens.',
      },
      {
        label: 'Submitting claims promptly',
        detail:
          'Provide the required claim information and supporting documents as soon as reasonably possible.',
      },
    ],
  },
  companyResponsibilities: {
    title: 'Our Responsibility to You',
    points: [
      'Providing the support included in your selected package.',
      'Assisting with administration and claims processes within our agreed role.',
      'Communicating important information to members.',
      'Working with approved service providers to fulfil applicable PFP services.',
      'Treating members and their families with professionalism, compassion and respect.',
    ],
    footnote:
      'Where a benefit is subject to an insurer’s assessment, PFP cannot guarantee that a claim will be approved.',
  },
  privacy: {
    title: 'Your Privacy (POPIA)',
    body: 'We respect the privacy of our members. Personal information may be processed for purposes including membership administration, underwriting, payment administration, claims processing, communication, compliance and the provision of applicable funeral-planning services. PFP will handle personal information in accordance with applicable data-protection requirements, including POPIA where applicable.',
  },
  complaints: {
    title: 'Complaints',
    body: 'We want our members to feel heard. If you have a complaint relating to PFP’s services or administration, you may contact PFP through our official complaints channel. Where a complaint relates specifically to the underwriting or assessment of an insurance claim, it will be handled in accordance with the applicable insurer dispute processes.',
  },
};
