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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#0D0E12] border-2 border-gold-500/50 max-w-2xl w-full overflow-hidden shadow-gold-glow-lg my-8">
        {/* Modal Header */}
        <div className="bg-[#060608] text-white p-8 relative border-b border-gold-500/30">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-8 h-8 text-stone-400 hover:text-gold-400 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-[10px] uppercase font-bold tracking-widest-2xl gold-text-gradient block mb-2">
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
        <div className="p-8 max-h-[75vh] overflow-y-auto bg-[#0D0E12]">
          {submitted ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 border-2 border-gold-500 bg-[#14151C] flex items-center justify-center mx-auto text-gold-400 shadow-gold-glow">
                <Check className="w-8 h-8 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient">
                  APPLICATION PROVISIONALLY REGISTERED
                </span>
                <h4 className="font-serif text-3xl font-normal text-white">
                  Thank You, {fullName || 'Valued Member'}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed font-light">
                  Your official registration reference is <strong className="text-gold-300">{refNumber}</strong>. A dedicated PFP membership officer will contact you on <strong className="text-gold-300">{phone}</strong> to confirm your details and issue your membership policy document.
                </p>
              </div>

              <div className="bg-[#121318] border border-gold-500/30 p-6 text-left max-w-md mx-auto space-y-2.5 text-xs text-stone-300">
                <div className="flex justify-between border-b border-stone-800 pb-2">
                  <span className="font-serif text-base text-white">{currentPkg.name}: {currentPkg.tagline}</span>
                  <span className="font-serif font-bold gold-text-gradient text-lg">R{currentPremium} / mo</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Principal Member Age:</span>
                  <span className="text-white">{selectedAgeBand} years</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Total Benefit Value:</span>
                  <span className="text-gold-300 font-semibold">R{currentPkg.totalValue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Natural Death Waiting Period:</span>
                  <span className="text-white">6 months</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="btn-gold px-8 py-3.5 rounded-sm text-xs tracking-widest-xl uppercase"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Package & Age Header */}
              <div className="bg-[#121318] border border-gold-500/30 p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-400 mb-1">
                      Support Package
                    </label>
                    <select
                      value={selectedPkgId}
                      onChange={(e) => setSelectedPkgId(e.target.value)}
                      className="w-full bg-[#0A0A0E] border border-gold-500/30 px-3 py-2 text-xs font-serif text-white font-medium outline-none focus:border-gold-400"
                    >
                      {SUPPORT_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {pkg.tagline}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gold-400 mb-1">
                      Principal Age Band
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('18-64')}
                        className={`py-2 text-xs font-bold uppercase tracking-wider border ${
                          selectedAgeBand === '18-64'
                            ? 'btn-gold shadow-gold-glow'
                            : 'bg-[#0A0A0E] text-stone-400 border-stone-800'
                        }`}
                      >
                        18–64 Yrs
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('65-75')}
                        className={`py-2 text-xs font-bold uppercase tracking-wider border ${
                          selectedAgeBand === '65-75'
                            ? 'btn-gold shadow-gold-glow'
                            : 'bg-[#0A0A0E] text-stone-400 border-stone-800'
                        }`}
                      >
                        65–75 Yrs
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-3 flex items-baseline justify-between">
                  <span className="text-xs text-stone-300 font-light">{currentPkg.headline}</span>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-bold gold-text-gradient">R{currentPremium}</span>
                    <span className="text-xs text-stone-400 font-light"> / month</span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="bg-[#121318] border border-gold-500/30 p-6 space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
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
                      className="w-full bg-[#0A0A0E] border border-stone-800 px-3.5 py-2.5 text-xs text-white outline-none focus:border-gold-500"
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
                      className="w-full bg-[#0A0A0E] border border-stone-800 px-3.5 py-2.5 text-xs text-white outline-none focus:border-gold-500"
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
                      className="w-full bg-[#0A0A0E] border border-stone-800 px-3.5 py-2.5 text-xs text-white outline-none focus:border-gold-500"
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
                      className="w-full bg-[#0A0A0E] border border-stone-800 px-3.5 py-2.5 text-xs text-white outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-300 mb-1">
                      Province
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full bg-[#0A0A0E] border border-stone-800 px-3.5 py-2.5 text-xs text-white outline-none focus:border-gold-500"
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
                      className="w-full bg-[#0A0A0E] border border-stone-800 px-3.5 py-2.5 text-xs text-white outline-none focus:border-gold-500"
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
                  <span className="text-[11px] text-stone-300 font-light leading-relaxed">
                    I confirm that the details provided are accurate. I acknowledge the 6-month natural death waiting period, policy terms, and POPIA privacy handling.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn-gold w-full py-4 text-xs tracking-widest-xl uppercase rounded-sm"
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
