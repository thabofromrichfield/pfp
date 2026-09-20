import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/pfpData';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    packageInterest: 'Package 3 — Grocery & Catering Support (R445/mo)',
    inquiryType: 'New Membership Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#1E2028] pb-10">
        <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
          DIRECT ASSISTANCE &bull; JOHANNESBURG HEAD OFFICE
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          We Are Here When You Need Us
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          Whether you have an immediate claim, want to inquire about family coverage packages, or need advice on our 500-guest catering logistics, speak directly with our private planning advisors.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Emergency Channels */}
        <div className="lg:col-span-5 space-y-8">
          {/* Priority Line */}
          <div className="p-6 rounded-lg bg-[#111317] border border-gold-500/40 space-y-3">
            <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
              24/7 BEREAVEMENT &amp; CLAIM INTAKE
            </span>
            <div className="font-serif text-3xl font-semibold text-white">
              {COMPANY_INFO.emergencyPhone}
            </div>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              Toll-free emergency helpline available 24 hours a day, 365 days a year for urgent claim lodgements and immediate bereavement support.
            </p>
          </div>

          {/* Office Details */}
          <div className="panel-dark p-6 sm:p-8 rounded-lg border border-[#20232B] space-y-6">
            <div>
              <span className="text-xs uppercase text-stone-400 font-semibold tracking-wider block">
                HEAD OFFICE &amp; CLIENT SUITE
              </span>
              <div className="font-serif text-xl text-white mt-1">
                Sandton Financial District
              </div>
              <p className="text-sm text-stone-300 font-light mt-1">
                {COMPANY_INFO.address}
              </p>
            </div>

            <div className="border-t border-[#1E2028] pt-4 space-y-3">
              <span className="text-xs uppercase text-stone-400 font-semibold tracking-wider block">
                DIRECT CONTACT
              </span>
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-400 font-light">Main Switchboard:</span>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-gold-400 font-medium">
                    {COMPANY_INFO.phone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-light">General Email:</span>
                  <a href={`mailto:${COMPANY_INFO.email}`} className="text-white hover:text-gold-400 font-medium">
                    {COMPANY_INFO.email}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400 font-light">Claims Desk:</span>
                  <a href={`mailto:${COMPANY_INFO.claimsEmail}`} className="text-gold-400 font-medium">
                    {COMPANY_INFO.claimsEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[#1E2028] pt-4 space-y-2">
              <span className="text-xs uppercase text-stone-400 font-semibold tracking-wider block">
                CONSULTING HOURS
              </span>
              <div className="text-xs text-stone-300 space-y-1 font-light">
                <div className="flex justify-between">
                  <span>Monday &ndash; Friday</span>
                  <span className="text-white font-medium">08:00 &ndash; 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="text-white font-medium">09:00 &ndash; 13:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sundays &amp; Public Holidays</span>
                  <span className="text-stone-400">Emergency dispatch only</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Clean Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="panel-dark p-8 sm:p-10 rounded-lg border border-[#242833]">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-12 h-12 mx-auto rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-2xl text-white">Inquiry Received</h3>
                <p className="text-sm text-stone-300 max-w-md mx-auto font-light leading-relaxed">
                  Thank you, <strong className="text-white">{formData.name}</strong>. A dedicated PFP Senior Planning Advisor will contact you within 2 business hours at <strong className="text-white">{formData.phone}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 rounded bg-[#1A1C24] text-xs font-semibold text-gold-400 hover:text-white uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                    ONLINE INQUIRY DESK
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
                    Send Us an Inquiry
                  </h3>
                  <p className="text-xs text-stone-400 mt-1 font-light">
                    Our advisors respond promptly during office hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sipho Dlamini"
                      className="w-full bg-[#0A0B0E] border border-[#20232B] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Contact Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 082 123 4567"
                      className="w-full bg-[#0A0B0E] border border-[#20232B] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@domain.co.za"
                      className="w-full bg-[#0A0B0E] border border-[#20232B] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                      Package of Interest
                    </label>
                    <select
                      value={formData.packageInterest}
                      onChange={(e) => setFormData({ ...formData, packageInterest: e.target.value })}
                      className="w-full bg-[#0A0B0E] border border-[#20232B] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500"
                    >
                      <option>Package 1 — Grocery Support (R295/mo)</option>
                      <option>Package 2 — Grocery & Cash Benefit (R395/mo)</option>
                      <option>Package 3 — Grocery & Catering Support (R445/mo)</option>
                      <option>General Policy Questions</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider">
                    Message or Specific Family Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the principal member's age, number of family members, or catering venue logistics..."
                    className="w-full bg-[#0A0B0E] border border-[#20232B] rounded px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-gold-500 resize-none font-light"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded bg-gold-500 hover:bg-gold-600 text-black font-semibold text-xs uppercase tracking-widest transition-colors shadow-sm"
                  >
                    Submit Advisory Request
                  </button>
                  <p className="text-[11px] text-stone-400 text-center mt-3 font-light">
                    Your details are securely handled under the Protection of Personal Information Act (POPIA).
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
