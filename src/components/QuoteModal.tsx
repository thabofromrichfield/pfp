import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white border border-sand-300 max-w-2xl w-full overflow-hidden shadow-2xl my-8">
        {/* Modal Header */}
        <div className="bg-[#17181C] text-white p-8 relative border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] uppercase font-semibold tracking-widest-2xl text-gold-400 block mb-2">
            MEMBERSHIP ENROLMENT &bull; SCHEDULE OF COVER
          </span>
          <h3 className="font-serif text-3xl font-normal text-white">
            Request Your PFP Policy Schedule
          </h3>
          <p className="text-xs text-stone-400 font-light mt-1 max-w-lg">
            Complete this confidential schedule to have your membership documentation prepared.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-8 max-h-[75vh] overflow-y-auto bg-[#FAF8F5]">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-14 h-14 border border-gold-600 bg-sand-50 flex items-center justify-center mx-auto text-gold-800">
                <Check className="w-8 h-8 stroke-[2]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-700">
                  APPLICATION PROVISIONALLY REGISTERED
                </span>
                <h4 className="font-serif text-3xl font-normal text-obsidian-950">
                  Thank You, {fullName || 'Valued Member'}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed font-light">
                  Your official registration reference is <strong>{refNumber}</strong>. A dedicated PFP membership officer will contact you on <strong>{phone}</strong> to confirm your details and issue your membership policy document.
                </p>
              </div>

              <div className="bg-white border border-sand-300 p-6 text-left max-w-md mx-auto space-y-2.5 text-xs text-stone-700">
                <div className="flex justify-between border-b border-sand-200 pb-2">
                  <span className="font-serif text-base text-obsidian-950">{currentPkg.name}: {currentPkg.tagline}</span>
                  <span className="font-serif font-bold text-gold-800 text-base">R{currentPremium} / mo</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Principal Member Age:</span>
                  <span>{selectedAgeBand} years</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Total Benefit Value:</span>
                  <span>R{currentPkg.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Natural Death Waiting Period:</span>
                  <span>6 months</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-3.5 bg-obsidian-950 text-white font-medium text-xs tracking-widest-xl uppercase border border-gold-600/40 hover:bg-obsidian-900 transition-colors"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Package & Age Header */}
              <div className="bg-white border border-sand-300 p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
                      Support Package
                    </label>
                    <select
                      value={selectedPkgId}
                      onChange={(e) => setSelectedPkgId(e.target.value)}
                      className="w-full bg-sand-50 border border-sand-300 px-3 py-2 text-xs font-serif text-obsidian-950 font-medium outline-none"
                    >
                      {SUPPORT_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {pkg.tagline}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-stone-500 mb-1">
                      Principal Age Band
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('18-64')}
                        className={`py-2 text-xs font-semibold uppercase tracking-wider border ${
                          selectedAgeBand === '18-64'
                            ? 'bg-obsidian-950 text-white border-obsidian-950'
                            : 'bg-white text-stone-600 border-sand-300'
                        }`}
                      >
                        18–64 Yrs
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('65-75')}
                        className={`py-2 text-xs font-semibold uppercase tracking-wider border ${
                          selectedAgeBand === '65-75'
                            ? 'bg-obsidian-950 text-white border-obsidian-950'
                            : 'bg-white text-stone-600 border-sand-300'
                        }`}
                      >
                        65–75 Yrs
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-sand-200 pt-3 flex items-baseline justify-between">
                  <span className="text-xs text-stone-500 font-light">{currentPkg.headline}</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-normal text-obsidian-950">R{currentPremium}</span>
                    <span className="text-xs text-stone-400 font-light"> / month</span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-white border border-sand-300 p-6 space-y-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-stone-500 block">
                  Principal Applicant Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Thabo Mokoena"
                      className="w-full bg-sand-50 border border-sand-300 px-3.5 py-2.5 text-xs text-obsidian-950 outline-none focus:border-obsidian-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      South African ID / Passport *
                    </label>
                    <input
                      type="text"
                      required
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder="13-digit RSA ID"
                      maxLength={13}
                      className="w-full bg-sand-50 border border-sand-300 px-3.5 py-2.5 text-xs text-obsidian-950 outline-none focus:border-obsidian-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Mobile Number (Calls &amp; WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 082 123 4567"
                      className="w-full bg-sand-50 border border-sand-300 px-3.5 py-2.5 text-xs text-obsidian-950 outline-none focus:border-obsidian-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="thabo@example.co.za"
                      className="w-full bg-sand-50 border border-sand-300 px-3.5 py-2.5 text-xs text-obsidian-950 outline-none focus:border-obsidian-950"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Province
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-sand-50 border border-sand-300 px-3.5 py-2.5 text-xs text-obsidian-950 outline-none"
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
                    <label className="block text-xs font-medium text-stone-700 mb-1">
                      Preferred Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full bg-sand-50 border border-sand-300 px-3.5 py-2.5 text-xs text-obsidian-950 outline-none"
                    >
                      <option value="Monthly Debit Order">Monthly Debit Order</option>
                      <option value="EFT / Bank Deposit">EFT / Bank Deposit</option>
                      <option value="Supermarket Paypoint">Supermarket Paypoint</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Acknowledgement */}
              <div className="space-y-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-1"
                  />
                  <span className="text-[11px] text-stone-600 font-light leading-relaxed">
                    I confirm that the details provided are accurate. I acknowledge the 6-month natural death waiting period, policy terms, and POPIA privacy handling.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 bg-obsidian-950 hover:bg-obsidian-900 text-white font-medium text-xs tracking-widest-xl uppercase border border-gold-600/40 transition-colors"
                >
                  Submit Membership Request &bull; R{currentPremium}/month
                </button>
                <p className="text-[10px] text-center text-stone-400 mt-2 font-serif italic">
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
