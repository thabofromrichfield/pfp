import React, { useState } from 'react';
import { SUPPORT_PACKAGES } from '../data/pfpData';
import { AgeBand } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPackageId?: string;
  initialAgeBand?: AgeBand;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialPackageId = 'package-3',
  initialAgeBand = '18-64',
}) => {
  const [selectedPkgId, setSelectedPkgId] = useState<string>(initialPackageId);
  const [selectedAgeBand, setSelectedAgeBand] = useState<AgeBand>(initialAgeBand);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [province, setProvince] = useState('Gauteng');
  const [paymentMethod, setPaymentMethod] = useState('Monthly Debit Order');
  const [agreedTerms, setAgreedTerms] = useState(true);

  if (!isOpen) return null;

  const currentPkg =
    SUPPORT_PACKAGES.find((p) => p.id === selectedPkgId) || SUPPORT_PACKAGES[2];

  const currentPremium =
    selectedAgeBand === '18-64' ? currentPkg.premiums.age18_64 : currentPkg.premiums.age65_75;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  const refNumber = `PFP-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-4">
      <div className="relative bg-[#101217] border border-[#282C38] max-w-2xl w-full rounded-lg overflow-hidden shadow-2xl my-8">
        {/* Modal Header */}
        <div className="bg-[#0A0B0E] text-white p-6 sm:p-8 relative border-b border-[#20232B]">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-stone-400 hover:text-white text-xl font-light w-8 h-8 flex items-center justify-center rounded"
            aria-label="Close"
          >
            &times;
          </button>

          <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
            MEMBERSHIP ENROLMENT &bull; SCHEDULE OF COVER
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
            Request Your PFP Policy Schedule
          </h3>
          <p className="text-xs text-stone-300 font-light mt-1 max-w-lg">
            Complete this confidential schedule to have your membership documentation prepared.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto bg-[#101217]">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-14 h-14 border border-gold-500 rounded bg-[#161820] flex items-center justify-center mx-auto text-gold-400 text-2xl font-bold">
                ✓
              </div>

              <div className="space-y-2">
                <span className="text-gold-500 text-xs font-semibold uppercase tracking-wider">
                  APPLICATION PROVISIONALLY REGISTERED
                </span>
                <h4 className="font-serif text-3xl font-normal text-white">
                  Thank You, {fullName || 'Valued Member'}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed font-light">
                  Your official registration reference is <strong className="text-white font-medium">{refNumber}</strong>. A dedicated PFP membership officer will contact you on <strong className="text-white font-medium">{phone}</strong> to confirm your details and issue your membership policy document.
                </p>
              </div>

              <div className="bg-[#0A0B0E] border border-[#20232B] p-6 text-left max-w-md mx-auto space-y-2.5 text-xs text-stone-300 rounded">
                <div className="flex justify-between border-b border-[#1E2028] pb-2">
                  <span className="font-serif text-base text-white">{currentPkg.name}: {currentPkg.tagline}</span>
                  <span className="font-serif font-bold text-gold-400 text-lg">R{currentPremium} / mo</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Principal Member Age:</span>
                  <span className="text-white font-medium">{selectedAgeBand} years</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Total Benefit Value:</span>
                  <span className="text-gold-400 font-semibold">R{currentPkg.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Natural Death Waiting Period:</span>
                  <span className="text-white">6 months</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded bg-gold-500 hover:bg-gold-600 text-black font-semibold text-xs uppercase tracking-wider"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Package & Age Header */}
              <div className="bg-[#0A0B0E] border border-[#20232B] p-5 rounded space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Support Package
                    </label>
                    <select
                      value={selectedPkgId}
                      onChange={(e) => setSelectedPkgId(e.target.value)}
                      className="w-full bg-[#12141A] border border-[#262A35] rounded px-3 py-2 text-xs text-white font-medium outline-none focus:border-gold-500"
                    >
                      {SUPPORT_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {pkg.tagline}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-300 mb-1">
                      Principal Age Band
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('18-64')}
                        className={`py-2 text-xs font-semibold uppercase tracking-wider rounded border transition-colors ${
                          selectedAgeBand === '18-64'
                            ? 'bg-gold-500 text-black border-gold-500'
                            : 'bg-[#12141A] text-stone-400 border-[#262A35]'
                        }`}
                      >
                        18–64 Yrs
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('65-75')}
                        className={`py-2 text-xs font-semibold uppercase tracking-wider rounded border transition-colors ${
                          selectedAgeBand === '65-75'
                            ? 'bg-gold-500 text-black border-gold-500'
                            : 'bg-[#12141A] text-stone-400 border-[#262A35]'
                        }`}
                      >
                        65–75 Yrs
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#1C1F26] pt-3 flex items-baseline justify-between">
                  <span className="text-xs text-stone-300 font-light">{currentPkg.headline}</span>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-bold text-gold-400">R{currentPremium}</span>
                    <span className="text-xs text-stone-400 font-light"> / month</span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-[#0A0B0E] border border-[#20232B] p-5 rounded space-y-4">
                <span className="text-gold-500 text-[11px] font-semibold uppercase tracking-wider block">
                  Principal Applicant Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Thabo Mokoena"
                      className="w-full bg-[#12141A] border border-[#262A35] rounded px-3 py-2 text-xs text-white outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      South African ID / Passport *
                    </label>
                    <input
                      type="text"
                      required
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder="13-digit RSA ID"
                      maxLength={13}
                      className="w-full bg-[#12141A] border border-[#262A35] rounded px-3 py-2 text-xs text-white outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Mobile Number (Calls &amp; WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 082 123 4567"
                      className="w-full bg-[#12141A] border border-[#262A35] rounded px-3 py-2 text-xs text-white outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="thabo@example.co.za"
                      className="w-full bg-[#12141A] border border-[#262A35] rounded px-3 py-2 text-xs text-white outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Province
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-[#12141A] border border-[#262A35] rounded px-3 py-2 text-xs text-white outline-none focus:border-gold-500"
                    >
                      <option value="Gauteng">Gauteng</option>
                      <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                      <option value="Western Cape">Western Cape</option>
                      <option value="Eastern Cape">Eastern Cape</option>
                      <option value="Limpopo">Limpopo</option>
                      <option value="Mpumalanga">Mpumalanga</option>
                      <option value="North West">North West</option>
                      <option value="Free State">Free State</option>
                      <option value="Northern Cape">Northern Cape</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Preferred Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-[#12141A] border border-[#262A35] rounded px-3 py-2 text-xs text-white outline-none focus:border-gold-500"
                    >
                      <option value="Monthly Debit Order">Monthly Debit Order</option>
                      <option value="EFT / Bank Deposit">EFT / Bank Deposit</option>
                      <option value="Supermarket Paypoint">Supermarket Paypoint</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Acknowledgement */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-xs text-stone-300 font-light leading-relaxed">
                    I confirm that the details provided are accurate. I acknowledge the 6-month natural death waiting period, policy terms, and POPIA privacy handling.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded bg-gold-500 hover:bg-gold-600 text-black font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Submit Membership Request &bull; R{currentPremium}/month
                </button>
                <p className="text-[11px] text-center text-stone-400 mt-2 font-serif italic">
                  No immediate charge &bull; Official documentation prepared upon consultation
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
