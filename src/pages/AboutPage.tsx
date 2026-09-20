import React from 'react';
import { HeartHandshake, Shield, Award, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onOpenQuote: (pkgId?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenQuote }) => {
  return (
    <div className="py-12 sm:py-20 space-y-16 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Category Header */}
      <div className="max-w-4xl space-y-4 border-b border-[#1E2028] pb-10">
        <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
          ABOUT US &bull; OUR PURPOSE &amp; PHILOSOPHY
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white leading-tight">
          Practical Support Shaped by Over a Decade of Real Experience.
        </h1>
        <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
          Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families can receive assistance with groceries, catering and other meaningful benefits, depending on the package they choose.
        </p>
      </div>

      {/* Main Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-12">
          {/* Built From Real Experience */}
          <div className="space-y-4">
            <h2 className="font-serif text-3xl text-white font-normal">
              Built From Real Experience
            </h2>
            <div className="space-y-4 text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              <p>
                Our understanding of the needs of families has been shaped by working hand in hand with experienced catering companies with <strong className="text-white font-semibold">more than 10 years of experience in the catering industry</strong>.
              </p>
              <p>
                Through this experience, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and the practical details behind the scenes; <em>Catering is a responsibility that families often need help managing.</em>
              </p>
              <div className="panel-dark p-6 rounded border-l-2 border-gold-500 my-6">
                <blockquote className="font-serif text-xl text-white italic font-normal leading-relaxed">
                  &ldquo;We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div className="space-y-4 border-t border-[#1E2028] pt-10">
            <h2 className="font-serif text-3xl text-white font-normal">
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
              <p className="font-semibold text-white">
                We believe in planning ahead.
              </p>
              <p className="text-gold-400 font-serif italic text-lg">
                Because when the unexpected happens, having a plan can make a difficult journey a little easier.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Our Promise & Pillars */}
        <div className="lg:col-span-5 space-y-6">
          <div className="panel-dark p-8 rounded-lg border border-[#242833] space-y-6">
            <div className="border-b border-[#20232B] pb-4">
              <span className="text-gold-500 text-xs font-semibold uppercase tracking-widest block">
                OUR COMMITMENT
              </span>
              <h3 className="font-serif text-2xl text-white font-normal mt-1">
                Our Promise
              </h3>
            </div>

            <div className="bg-[#090A0D] p-5 rounded border border-[#20232B] font-serif text-xl text-white italic text-center">
              &ldquo;At PFP, every detail with Care.&rdquo;
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-light leading-relaxed">
              We are committed to serving families with compassion, professionalism and respect, while creating practical solutions that help families feel more prepared for tomorrow.
            </p>

            {/* Core Tenets */}
            <div className="space-y-4 pt-2 text-xs">
              <div className="border-t border-[#1E2028] pt-3 space-y-1">
                <div className="font-semibold text-gold-400 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Compassion</span>
                </div>
                <p className="text-stone-400 font-light leading-relaxed">
                  Serving families during their most sensitive hours with patience, kindness, and deep empathy.
                </p>
              </div>

              <div className="border-t border-[#1E2028] pt-3 space-y-1">
                <div className="font-semibold text-gold-400 flex items-center gap-1.5">
                  <Shield className="w-4 h-4" />
                  <span>Professionalism</span>
                </div>
                <p className="text-stone-400 font-light leading-relaxed">
                  Punctual delivery of cooking teams, immaculate food hygiene standards, and verified supermarket vouchers.
                </p>
              </div>

              <div className="border-t border-[#1E2028] pt-3 space-y-1">
                <div className="font-semibold text-gold-400 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Respect</span>
                </div>
                <p className="text-stone-400 font-light leading-relaxed">
                  Honouring family traditions, mourning rituals, and the sacred memory of your loved one.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenQuote()}
                className="btn-primary-gold w-full py-3.5 rounded text-xs tracking-wider uppercase font-bold text-center"
              >
                Join PFP / Request Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
