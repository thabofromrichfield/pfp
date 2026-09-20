import React from 'react';
import { ArrowRight, HeartHandshake, Shield, Award, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            ABOUT US &bull; OUR STORY &amp; PHILOSOPHY
          </span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Practical Support Shaped by Over a Decade of Real Experience.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families can receive assistance with groceries, catering and other meaningful benefits, depending on the package they choose.
        </p>
      </div>

      {/* Main Narrative Spread in Smooth Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Story Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Card: Built From Real Experience */}
          <div className="smooth-card p-8 sm:p-10 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
              OUR FOUNDING ORIGIN
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              Built From Real Experience
            </h2>
            <div className="space-y-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                Our understanding of the needs of families has been shaped by working hand in hand with experienced catering companies with <strong className="text-gold-300 font-semibold">more than 10 years of experience in the catering industry</strong>.
              </p>
              <p>
                Through this experience, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and the practical details behind the scenes; <em className="text-gold-300">Catering is a responsibility that families often need help managing.</em>
              </p>
              <p>
                We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.
              </p>
            </div>
          </div>

          {/* Card: What We Do */}
          <div className="smooth-card p-8 sm:p-10 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
              PREPARATION AHEAD OF TIME
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              What We Do
            </h2>
            <div className="space-y-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                PFP brings together planning, practical support and care to help families prepare ahead of time.
              </p>
              <p>
                Our packages are designed to provide meaningful support when it matters most — whether that means assistance with groceries, additional financial support or catering for family and guests.
              </p>
              <p>
                We don’t believe in waiting until a family is facing a difficult moment before thinking about what they may need.
              </p>
              <p className="font-medium text-white">
                We believe in planning ahead.
              </p>
              <p className="text-gold-400 font-serif italic text-base">
                Because when the unexpected happens, having a plan can make a difficult journey a little easier.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Our Promise & Pillars */}
        <div className="lg:col-span-5 space-y-8">
          {/* Promise Card */}
          <div className="smooth-card-featured p-8 sm:p-10 space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
              OUR SACRED PROMISE
            </span>
            <h2 className="font-serif text-3xl font-normal text-white">
              Our Promise
            </h2>
            <div className="p-4 rounded-xl bg-[#090A0E] border border-gold-500/30 text-center font-serif text-xl text-gold-300 italic">
              &ldquo;At PFP, every detail with Care.&rdquo;
            </div>
            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              We are committed to serving families with compassion, professionalism and respect, while creating practical solutions that help families feel more prepared for tomorrow.
            </p>
          </div>

          {/* Three Core Pillars Cards */}
          <div className="space-y-4">
            <div className="smooth-card p-6 space-y-2">
              <div className="font-serif text-lg font-semibold text-gold-300 flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-gold-400" />
                <span>01. Compassion</span>
              </div>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                We understand the emotional weight carried by grieving relatives. Our personnel approach every client with patience, kindness, and deep reverence.
              </p>
            </div>

            <div className="smooth-card p-6 space-y-2">
              <div className="font-serif text-lg font-semibold text-gold-300 flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold-400" />
                <span>02. Professionalism</span>
              </div>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Punctual logistics, immaculate food prep hygiene, verified supermarket vouchers, and prompt claims fulfillment within 48–72 hours.
              </p>
            </div>

            <div className="smooth-card p-6 space-y-2">
              <div className="font-serif text-lg font-semibold text-gold-300 flex items-center gap-2">
                <Award className="w-5 h-5 text-gold-400" />
                <span>03. Respect</span>
              </div>
              <p className="text-xs text-stone-300 font-light leading-relaxed">
                Respect for cultural traditions, family dignity, and the sacred act of gathering together to honour the memory of departed loved ones.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="smooth-card p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
          Plan ahead. Prepare your family. Let PFP support you when it matters most.
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm font-light max-w-xl mx-auto">
          Explore our three tailored support packages designed to eliminate the financial and logistical pressure of funeral catering and groceries.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onOpenQuote()}
            className="btn-gold px-8 py-3.5 text-xs tracking-widest uppercase inline-flex items-center gap-2"
          >
            <span>Request a Consultation</span>
            <ArrowRight className="w-3.5 h-3.5 text-obsidian-950" />
          </button>
        </div>
      </div>
    </div>
  );
};
