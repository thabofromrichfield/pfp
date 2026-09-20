import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#0D0E12] border-b border-gold-500/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-10 bg-gold-500" />
          <span className="text-[11px] font-bold tracking-widest-2xl gold-text-gradient uppercase">
            ABOUT US &bull; OUR PURPOSE &amp; PHILOSOPHY
          </span>
        </div>

        {/* Lead Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal text-white leading-[1.12]">
            Shaped by early mornings, steaming cauldrons, and the quiet reality of feeding communities in mourning.
          </h2>
        </div>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Built From Real Experience */}
          <div className="lg:col-span-7 space-y-8 text-stone-300 font-light leading-relaxed text-base sm:text-lg">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                Built From Real Experience
              </h3>
              <p>
                Our understanding of the needs of families has been shaped by working hand in hand with experienced catering companies with more than <strong className="text-gold-300 font-semibold">10 years of experience in the catering industry</strong>.
              </p>
              <p>
                Through this experience, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and the practical details behind the scenes; <em className="text-gold-300">Catering is a responsibility that families often need help managing.</em>
              </p>
            </div>

            {/* Editorial Pull Quote */}
            <div className="bg-[#14151C] border-l-2 border-gold-500 p-8 space-y-3 shadow-2xl">
              <blockquote className="font-serif text-xl sm:text-2xl text-white italic leading-snug">
                &ldquo;We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.&rdquo;
              </blockquote>
              <div className="text-xs font-bold tracking-widest-xl gold-text-gradient uppercase">
                &mdash; The PFP Founding Principle
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                What We Do
              </h3>
              <p>
                PFP brings together planning, practical support and care to help families prepare ahead of time.
              </p>
              <p>
                Our packages are designed to provide meaningful support when it matters most — whether that means assistance with groceries, additional financial support or catering for family and guests.
              </p>
              <p>
                We don’t believe in waiting until a family is facing a difficult moment before thinking about what they may need. We believe in planning ahead. Because when the unexpected happens, having a plan can make a difficult journey a little easier.
              </p>
            </div>
          </div>

          {/* Right Column: The Sacred Promise & Tenets */}
          <div className="lg:col-span-5 space-y-6">
            <div className="dark-glass-card p-8 sm:p-10 space-y-6 border border-gold-500/30">
              <div className="border-b border-stone-800 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest-2xl gold-text-gradient block">
                  OUR SACRED COMMITMENT
                </span>
                <h4 className="font-serif text-2xl font-normal text-white mt-1">
                  Our Promise
                </h4>
              </div>

              <div className="p-4 bg-[#0A0A0E] border border-gold-500/30 font-serif text-xl text-gold-300 italic text-center shadow-inner">
                &ldquo;At PFP, every detail with Care.&rdquo;
              </div>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                We are committed to serving families with compassion, professionalism and respect, while creating practical solutions that help families feel more prepared for tomorrow.
              </p>

              {/* Three Pillars of Conduct */}
              <div className="pt-2 space-y-4 text-xs">
                <div className="border-t border-stone-800 pt-3">
                  <div className="font-serif text-base font-semibold text-gold-300">
                    01. Compassion
                  </div>
                  <p className="text-stone-400 mt-0.5 font-light">
                    Meeting grieving families with sincere empathy, active listening, and calm guidance during their most vulnerable days.
                  </p>
                </div>

                <div className="border-t border-stone-800 pt-3">
                  <div className="font-serif text-base font-semibold text-gold-300">
                    02. Professionalism
                  </div>
                  <p className="text-stone-400 mt-0.5 font-light">
                    Disciplined execution: Punctual delivery of cooking teams, immaculate food hygiene, and verified supermarket vouchers.
                  </p>
                </div>

                <div className="border-t border-stone-800 pt-3">
                  <div className="font-serif text-base font-semibold text-gold-300">
                    03. Respect
                  </div>
                  <p className="text-stone-400 mt-0.5 font-light">
                    Honouring family customs, traditional community menus, and the memory of the deceased with solemn discretion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
