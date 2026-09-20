import React, { useState } from 'react';
import { Plus, Minus, Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { FAQS, COMPANY_INFO, SUPPORT_PACKAGES } from '../data/pfpData';

export const FaqContactPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'packages' | 'payments' | 'claims' | 'compliance'>('all');

  // Contact Form State
  const [name, setName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [message, setMessage] = useState('');
  const [pkgInterest, setPkgInterest] = useState('package-3');
  const [submitted, setSubmitted] = useState(false);

  const filteredFaqs = activeFilter === 'all'
    ? FAQS
    : FAQS.filter(f => f.category === activeFilter);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            MEMBER ASSISTANCE &bull; FAQ &amp; ADVISORY CONTACT
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Frequently Asked Questions &amp; Direct Advisory
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          Clear answers on our grocery support vouchers, 500-person catering teams, underwriting waiting periods, and direct channels to our Sandton team.
        </p>
      </div>

      {/* Main Grid: FAQ Left, Contact Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: FAQ Section */}
        <div className="lg:col-span-7 space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Questions' },
              { id: 'packages', label: 'Support Packages' },
              { id: 'payments', label: 'Premiums' },
              { id: 'claims', label: 'Claims (48–72h)' },
              { id: 'compliance', label: 'Terms & Waiting' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeFilter === cat.id
                    ? 'pill-tab-active'
                    : 'bg-[#121318] text-stone-300 hover:text-white border border-stone-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion in Smooth Cards */}
          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="smooth-card overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 group"
                  >
                    <span className="font-serif text-xl text-white font-normal group-hover:text-gold-300 transition-colors">
                      {faq.question}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-[#0A0A0E] border border-gold-500/30 flex items-center justify-center text-gold-400 flex-shrink-0 mt-0.5">
                      {isOpen ? <Minus className="w-4 h-4 stroke-[2]" /> : <Plus className="w-4 h-4 stroke-[2]" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-stone-300 font-light leading-relaxed border-t border-stone-800/80 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Contact Card & Form */}
        <div className="lg:col-span-5 space-y-6">
          <div className="smooth-card p-8 sm:p-10 space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                DIRECT CONTACT CHANNELS
              </span>
              <h2 className="font-serif text-2xl font-normal text-white mt-1">
                Reach Our Advisory Team
              </h2>
            </div>

            {/* Direct Contact Info */}
            <div className="space-y-4 text-xs text-stone-300 font-light">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">24/7 Emergency Claims Helpline</div>
                  <div>{COMPANY_INFO.phone} (Toll-Free) &bull; {COMPANY_INFO.phoneDirect}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">WhatsApp Advisory Line</div>
                  <div>{COMPANY_INFO.whatsapp}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Email Correspondence</div>
                  <div>General: {COMPANY_INFO.email}</div>
                  <div>Claims: {COMPANY_INFO.claimsEmail}</div>
                  <div>Complaints: {COMPANY_INFO.complaintsEmail}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Head Office</div>
                  <div>{COMPANY_INFO.address}</div>
                </div>
              </div>
            </div>

            {/* Contact Inquiry Form */}
            <div className="pt-4 border-t border-stone-800">
              {submitted ? (
                <div className="text-center py-6 space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-gold-400 mx-auto" />
                  <div className="font-serif text-xl text-white">Inquiry Received</div>
                  <p className="text-xs text-stone-300 font-light">
                    A PFP consultant will contact you on <strong>{contactPhone}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest-xl gold-text-gradient block">
                    REQUEST A CALL BACK
                  </span>

                  <div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full bg-[#0A0A0E] border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="Your Mobile Phone Number"
                      className="w-full bg-[#0A0A0E] border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <select
                      value={pkgInterest}
                      onChange={(e) => setPkgInterest(e.target.value)}
                      className="w-full bg-[#0A0A0E] border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none"
                    >
                      <option value="package-1">Package 1 — Grocery Support</option>
                      <option value="package-2">Package 2 — Grocery &amp; Cash</option>
                      <option value="package-3">Package 3 — Grocery &amp; Catering (500 People)</option>
                    </select>
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Your questions or notes (optional)"
                      className="w-full bg-[#0A0A0E] border border-stone-800 rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-gold-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-3.5 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
                  >
                    <span>Send Advisory Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
