import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight, HeartHandshake, Phone, Calendar } from 'lucide-react';
import { SUPPORT_PACKAGES, COMPANY_INFO } from '../data/pfpData';
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
  const [paymentMethod, setPaymentMethod] = useState('Debit Order');
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-paper-border my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-primary text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent">
              PREMIUM FUNERAL PLANNING &bull; MEMBERSHIP APPLICATION
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Secure Practical Support Today
            </h3>
            <p className="text-xs text-slate-300 font-light">
              Complete this application to receive your official membership policy schedule and begin coverage.
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-dark">
                  APPLICATION PROVISIONALLY REGISTERED
                </span>
                <h4 className="font-serif text-2xl font-bold text-primary">
                  Thank You, {fullName || 'Valued Member'}!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your reference number is <strong>{refNumber}</strong>. A dedicated PFP onboarding specialist will contact you on <strong>{phone}</strong> within 2 business hours to verify your banking details and issue your official membership documentation.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-paper-soft border border-paper-border text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between font-bold text-primary">
                  <span>Selected Package:</span>
                  <span>{currentPkg.name} ({currentPkg.tagline})</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Principal Member Age:</span>
                  <span>{selectedAgeBand} years</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Monthly Premium:</span>
                  <span className="font-bold text-accent-dark">R{currentPremium} / month</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Waiting Period:</span>
                  <span>6 months natural death</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Payment Schedule:</span>
                  <span>{paymentMethod}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleReset}
                  className="px-8 py-3 rounded-xl bg-primary hover:bg-primary-light text-white font-bold text-xs uppercase tracking-wider shadow"
                >
                  Close &amp; Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Package & Age Selection preview */}
              <div className="p-4 rounded-2xl bg-paper-soft border border-paper-border space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-paper-border/60 pb-3">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Support Package
                    </label>
                    <select
                      value={selectedPkgId}
                      onChange={(e) => setSelectedPkgId(e.target.value)}
                      className="mt-1 font-serif font-bold text-primary bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-sm"
                    >
                      {SUPPORT_PACKAGES.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} — {pkg.tagline}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                      Principal Age Band
                    </label>
                    <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 mt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('18-64')}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          selectedAgeBand === '18-64'
                            ? 'bg-primary text-white'
                            : 'text-slate-600'
                        }`}
                      >
                        18–64
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedAgeBand('65-75')}
                        className={`px-3 py-1 rounded text-xs font-bold ${
                          selectedAgeBand === '65-75'
                            ? 'bg-primary text-white'
                            : 'text-slate-600'
                        }`}
                      >
                        65–75
                      </button>
                    </div>
                  </div>
                </div>

                {/* Instant Confirmed Premium Display */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-primary">{currentPkg.headline}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-2xl font-black text-accent-dark">
                      R{currentPremium}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium"> / month</span>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary block">
                  1. Principal Member Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Sipho Nkosi"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      South African ID / Passport *
                    </label>
                    <input
                      type="text"
                      required
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder="13-digit ID number"
                      maxLength={13}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 082 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sipho@example.co.za"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-accent focus:border-accent outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Province
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white"
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
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Preferred Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-accent focus:border-accent outline-none bg-white"
                    >
                      <option value="Monthly Debit Order">Monthly Debit Order</option>
                      <option value="EFT / Bank Deposit">EFT / Bank Transfer</option>
                      <option value="Retail Supermarket Paypoint">Retail Supermarket Paypoint</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Member Agreement & Consent */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="mt-0.5 rounded text-accent focus:ring-accent"
                  />
                  <span className="text-[11px] text-slate-600 leading-relaxed">
                    I confirm that the information provided is accurate. I acknowledge that benefits are subject to the 6-month natural death waiting period, approved policy wording, and that personal data is processed under South Africa’s POPIA.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-accent hover:bg-accent-hover text-primary-dark font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Submit Application for {currentPkg.name} (R{currentPremium}/mo)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 mt-2">
                  No payment collected today &bull; Free consultation &bull; Cancel anytime during cooling-off
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
