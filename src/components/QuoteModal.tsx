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
  const [phone, setPhone] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);

  if (!isOpen) return null;

  const currentPkg =
    SUPPORT_PACKAGES.find((p) => p.id === selectedPkgId) || SUPPORT_PACKAGES[2];

  const currentPremium =
    selectedAgeBand === '18-64' ? currentPkg.premiums.age18_64 : currentPkg.premiums.age65_75;
  const ageLabel =
    selectedAgeBand === '18-64'
      ? currentPkg.premiums.ageLabel1 || '18–64 years'
      : '65–75 years';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-center justify-center p-4 backdrop-blur-xs">
      <div className="relative bg-[#101217] border border-[#282C38] max-w-xl w-full rounded-lg overflow-hidden shadow-2xl my-8">
        {/* Modal Header */}
        <div className="bg-[#0A0B0E] text-white p-6 sm:p-8 relative border-b border-[#20232B]">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-stone-400 hover:text-white text-2xl font-light w-8 h-8 flex items-center justify-center rounded"
            aria-label="Close"
          >
            &times;
          </button>

          <span className="text-gold-300 text-[11px] font-semibold uppercase tracking-wider block">
            PFP &bull; SUPPORT PLAN REQUEST
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white mt-1">
            Request Your Policy Schedule
          </h3>
          <p className="text-xs text-stone-300 font-light mt-1 max-w-md">
            At PFP, every detail with Care.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto bg-[#101217]">
          {submitted ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-14 h-14 border border-gold-400 rounded bg-[#161820] flex items-center justify-center mx-auto text-gold-300 text-2xl font-bold">
                ✓
              </div>

              <div className="space-y-2">
                <span className="text-gold-300 text-xs font-semibold uppercase tracking-wider">
                  REQUEST PROVISIONALLY RECORDED
                </span>
                <h4 className="font-serif text-3xl font-normal text-white">
                  Thank You, {fullName || 'Valued Applicant'}
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto leading-relaxed font-light">
                  Your request for <strong className="text-white">{currentPkg.name}: {currentPkg.tagline}</strong> has been received. Our administration will contact you on <strong className="text-white">{phone}</strong> to confirm your details and prepare your membership documentation.
                </p>
              </div>

              <div className="bg-[#0A0B0E] border border-[#20232B] p-5 text-left max-w-md mx-auto space-y-2.5 text-xs text-stone-300 rounded">
                <div className="flex justify-between border-b border-[#1E2028] pb-2">
                  <span className="font-serif text-base text-white">{currentPkg.name}: {currentPkg.tagline}</span>
                  <span className="font-serif font-bold text-gold-300 text-lg">R{currentPremium} / mo</span>
                </div>
                <div className="flex justify-between text-stone-400">
                  <span>Age Band:</span>
                  <span className="text-white">{ageLabel}</span>
                </div>
                {currentPkg.totalValue && (
                  <div className="flex justify-between text-stone-400">
                    <span>Total Benefit Value:</span>
                    <span className="text-gold-300 font-semibold">R{currentPkg.totalValue.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-400">
                  <span>Waiting Period:</span>
                  <span className="text-white">6 months (natural death)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] font-semibold text-xs uppercase tracking-wider"
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
                      className="w-full bg-[#12141A] border border-[#262A35] rounded px-3 py-2 text-xs text-white font-medium outline-none focus:border-gold-400"
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
                            ? 'bg-gold-400 text-[#0B0C0E] border-gold-400'
                            : 'bg-[#12141A] text-stone-400 border-[#262A35]'
                        }`}
                      >
                        18–64 / 65 Yrs
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('65-75')}
                        className={`py-2 text-xs font-semibold uppercase tracking-wider rounded border transition-colors ${
                          selectedAgeBand === '65-75'
                            ? 'bg-gold-400 text-[#0B0C0E] border-gold-400'
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
                    <span className="font-serif text-2xl font-bold text-gold-300">R{currentPremium}</span>
                    <span className="text-xs text-stone-400 font-light"> / month</span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-[#0A0B0E] border border-[#20232B] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 uppercase tracking-wider block">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 082 123 4567"
                    className="w-full bg-[#0A0B0E] border border-[#20232B] rounded px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-gold-400"
                  />
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
                    className="mt-0.5 accent-amber-500"
                  />
                  <span className="text-xs text-stone-300 font-light leading-relaxed">
                    I acknowledge that membership benefits are subject to the 6-month natural death waiting period and policy terms. Personal information is processed in accordance with POPIA.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded bg-gold-400 hover:bg-gold-300 text-[#0B0C0E] font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Submit Schedule Request &bull; R{currentPremium}/month
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
