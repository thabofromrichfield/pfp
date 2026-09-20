export interface SupportPackage {
  id: string;
  packageNumber: number;
  name: string;
  tagline: string;
  headline: string;
  description: string;
  totalValue?: number;
  premiums: {
    age18_64: number; // or 18-65 for Package 3
    age65_75: number;
    ageLabel1?: string;
  };
  cateringIncludes?: string[];
}

export const SUPPORT_PACKAGES: SupportPackage[] = [
  {
    id: 'package-1',
    packageNumber: 1,
    name: 'PACKAGE 1',
    tagline: 'GROCERY SUPPORT',
    headline: 'Grocery Support up to R15,000',
    description:
      'Receive grocery support of up to R15,000 through a voucher redeemable at your nearest supermarket, helping your family purchase essential food and supplies during the funeral period.',
    premiums: {
      age18_64: 295,
      age65_75: 445,
      ageLabel1: '18–64 years',
    },
  },
  {
    id: 'package-2',
    packageNumber: 2,
    name: 'PACKAGE 2',
    tagline: 'GROCERY & CASH BENEFIT',
    headline: 'R15,000 Grocery Support + R10,000 Cash Benefit',
    description:
      'Receive grocery support of up to R15,000, together with a R10,000 cash benefit paid into the client’s account to provide additional financial support during the funeral period.',
    totalValue: 25000,
    premiums: {
      age18_64: 395,
      age65_75: 545,
      ageLabel1: '18–64 years',
    },
  },
  {
    id: 'package-3',
    packageNumber: 3,
    name: 'PACKAGE 3',
    tagline: 'GROCERY & CATERING SUPPORT',
    headline: 'R15,000 Grocery Support + Catering Support',
    description:
      'Receive grocery support of up to R15,000, together with professional catering support for up to 500 people.',
    cateringIncludes: [
      'Professional cooking team',
      'Serving stations',
      'Pots and cooking equipment',
      'Gas stoves',
      'Serving utensils',
      'Setup and service clean-up',
    ],
    totalValue: 30000,
    premiums: {
      age18_64: 445,
      age65_75: 645,
      ageLabel1: '18–65 years',
    },
  },
];

export const ABOUT_US = {
  goal: 'Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families can receive assistance with groceries, catering and other meaningful benefits, depending on the package they choose.',
  builtFromRealExperience: {
    heading: 'Built From Real Experience',
    paragraph1:
      'Our understanding of the needs of families has been shaped by working hand in hand with experienced catering companies with more than 10 years of experience in the catering industry.',
    paragraph2:
      'Through this experience, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and the practical details behind the scenes; Catering is a responsibility that families often need help managing.',
    belief:
      'We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.',
  },
  whatWeDo: {
    heading: 'What We Do',
    paragraph1:
      'PFP brings together planning, practical support and care to help families prepare ahead of time.',
    paragraph2:
      'Our packages are designed to provide meaningful support when it matters most — whether that means assistance with groceries, additional financial support or catering for family and guests.',
    belief1: 'We don’t believe in waiting until a family is facing a difficult moment before thinking about what they may need.',
    belief2: 'We believe in planning ahead.',
    belief3: 'Because when the unexpected happens, having a plan can make a difficult journey a little easier.',
  },
  ourPromise: {
    heading: 'Our Promise',
    motto: 'At PFP, every detail with Care.',
    commitment:
      'We are committed to serving families with compassion, professionalism and respect, while creating practical solutions that help families feel more prepared for tomorrow.',
  },
};

export const EVERY_DETAIL_WITH_CARE = {
  heading: 'EVERY DETAIL WITH CARE',
  paragraph1:
    'At PFP, our packages are designed to provide practical support that helps families manage some of the financial and logistical responsibilities that come with a funeral.',
  paragraph2: 'Plan ahead. Prepare your family. Let PFP support you when it matters most.',
};

export const PAYMENTS_BENEFITS_TERMS = {
  heading: 'PAYMENTS, BENEFITS & TERMS',
  subheading: 'Clear. Simple. Transparent.',
  intro:
    'At Premium Funeral Planning, we believe our members should understand exactly how their membership works. From monthly payments to benefit fulfilment and claims, we aim to make the process as clear and straightforward as possible.',
  yourMonthlyPayment: {
    heading: 'YOUR MONTHLY PAYMENT',
    intro: 'Membership is paid through the approved payment method selected when you join PFP.',
    bullets: [
      'The package you select.',
      'The age of the principal member.',
      'The applicable membership and underwriting terms.',
    ],
    paragraph1:
      'Your monthly premium will depend on the applicable package, age band and approved terms. Premiums are payable according to the payment date and method reflected in your membership/policy documentation.',
    paragraph2:
      'Members are responsible for ensuring that sufficient funds are available for their scheduled payment.',
    paragraph3:
      'Your confirmed premium and payment details will be reflected in your membership/policy documentation.',
  },
  howYourBenefitsWork: {
    heading: 'HOW YOUR BENEFITS WORK',
    intro:
      'When an eligible insured event occurs and the applicable claim has been accepted in accordance with the relevant policy terms, the selected PFP benefits will be fulfilled according to the package chosen.',
    table: [
      {
        package: 'Package 1 — Grocery Support',
        benefit:
          'Up to R15,000 grocery support, provided through a voucher redeemable at the member’s nearest participating supermarket.',
      },
      {
        package: 'Package 2 — Grocery & Cash Benefit',
        benefit:
          'Up to R15,000 grocery support, together with a R10,000 cash benefit, subject to the applicable approved terms and claim requirements.',
      },
      {
        package: 'Package 3 — Grocery & Catering Support',
        benefit:
          'Up to R15,000 grocery support, together with professional catering support for up to 500 people, including the agreed catering services and equipment.',
      },
    ],
    footer:
      'Benefits are subject to the applicable waiting periods, eligibility requirements, exclusions, premium status and claims requirements.',
  },
  claimsAndPayouts: {
    heading: 'CLAIMS & PAYOUTS',
    paragraph1:
      'We understand that when a family contacts us after losing a loved one, they need guidance, clarity and support.',
    paragraph2:
      'The family should notify PFP as soon as reasonably possible after the death of an insured person.',
    introDocs:
      'The claimant will be required to complete the applicable claim documentation and provide the supporting documents required for the assessment of the claim. These may include:',
    documents: [
      'Identification documents',
      'Proof of death',
      'Official death certificate',
      'Membership/policy information',
      'Banking details where a cash benefit is applicable',
      'Any other documents required to assess the claim',
    ],
    assistance: 'PFP will assist the family with the claims process where this forms part of our agreed role.',
    payoutTime: 'Claims will be paid out between 48-72 hours',
  },
  waitingPeriod: {
    heading: 'WAITING PERIOD',
    paragraph1:
      'The current PFP proposal provides for a 6-month waiting period for natural death, subject to final underwriting approval and policy wording.',
    paragraph2:
      'Any treatment of accidental or unnatural death during the waiting period will be governed by the final approved policy terms.',
  },
  ifYourPaymentIsMissed: {
    heading: 'IF YOUR PAYMENT IS MISSED',
    paragraph1: 'Members must keep their premiums up to date.',
    paragraph2:
      'Where a payment is not received, the membership may enter the applicable grace period in accordance with the final approved terms.',
    paragraph3:
      'If premiums remain unpaid after the applicable grace period, the membership may lapse.',
    paragraph4:
      'Reinstatement, where available, may be subject to the applicable rules and could require payment of outstanding premiums and/or other requirements.',
  },
  cancellation: {
    heading: 'CANCELLATION',
    paragraph1:
      'A member may request cancellation in accordance with the applicable membership, administration and policy procedures.',
    paragraph2:
      'Any applicable cooling-off period, refund arrangements, cancellation notice requirements and effective date will be governed by the final approved terms and applicable law.',
  },
  importantExclusions: {
    heading: 'IMPORTANT EXCLUSIONS',
    paragraph1: 'Benefits are not automatically payable in every circumstance.',
    introList: 'Claims remain subject to the applicable:',
    bullets: [
      'Waiting periods',
      'Exclusions',
      'Eligibility requirements',
      'Premium status',
      'Policy conditions',
      'Claims documentation requirements',
    ],
    note: 'Examples of exclusions may include circumstances specifically excluded under the applicable policy.',
  },
  yourResponsibilitiesAsAMember: {
    heading: 'YOUR RESPONSIBILITIES AS A MEMBER',
    items: [
      {
        title: 'Providing accurate information',
        body: 'All information supplied during application and membership must be complete and accurate.',
      },
      {
        title: 'Keeping payments up to date',
        body: 'Ensure that your agreed monthly payment can be collected.',
      },
      {
        title: 'Keeping your information updated',
        body: 'Notify PFP/administrator of relevant changes to your contact or membership information.',
      },
      {
        title: 'Keeping your documents safe',
        body: 'Retain your membership/policy documentation and make sure your family knows how to contact PFP if something happens.',
      },
      {
        title: 'Submitting claims promptly',
        body: 'Provide the required claim information and supporting documents as soon as reasonably possible.',
      },
    ],
  },
  ourResponsibilityToYou: {
    heading: 'OUR RESPONSIBILITY TO YOU',
    bullets: [
      'Providing the support included in your selected package.',
      'Assisting with administration and claims processes within our agreed role.',
      'Communicating important information to members.',
      'Working with approved service providers to fulfil applicable PFP services.',
      'Treating members and their families with professionalism, compassion and respect.',
    ],
    footnote: 'Where a benefit is subject to an insurer’s assessment, PFP cannot guarantee that a claim will be approved.',
  },
  yourPrivacy: {
    heading: 'YOUR PRIVACY',
    paragraph1: 'We respect the privacy of our members.',
    paragraph2:
      'Personal information may be processed for purposes including membership administration, underwriting, payment administration, claims processing, communication, compliance and the provision of applicable funeral-planning services.',
    paragraph3:
      'PFP will handle personal information in accordance with applicable data-protection requirements, including POPIA where applicable.',
  },
  complaints: {
    heading: 'COMPLAINTS',
    paragraph1: 'We want our members to feel heard.',
    paragraph2:
      'If you have a complaint relating to PFP’s services or administration, you may contact PFP through our official complaints channel.',
    paragraph3:
      'Where a complaint relates specifically to the underwriting or assessment of an insurance claim, it will be handled in accordance with the applicable insurer dispute processes.',
  },
};
