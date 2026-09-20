import React from 'react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#FAF8F5] editorial-border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="h-px w-8 bg-gold-600" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-widest-2xl text-gold-700 uppercase">
            ABOUT US &bull; OUR PURPOSE &amp; PHILOSOPHY
          </span>
        </div>

        {/* Lead Headline */}
        <div className="max-w-4xl mb-16">
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] font-normal text-obsidian-950 leading-[1.12]">
            Shaped by early mornings, steaming cauldrons, and the quiet reality of feeding communities in mourning.
          </h2>
        </div>

        {/* Two-Column Editorial Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Built From Real Experience */}
          <div className="lg:col-span-7 space-y-8 text-stone-700 font-light leading-relaxed text-base sm:text-lg">
            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-obsidian-950">
                Built From Real Experience
              </h3>
              <p>
                Our understanding of the needs of families has been shaped by working hand in hand with experienced catering companies with more than <strong>10 years of experience in the catering industry</strong>.
              </p>
              <p>
                Through this experience, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and the practical details behind the scenes; <em>Catering is a responsibility that families often need help managing.</em>
              </p>
            </div>

            {/* Editorial Pull Quote */}
            <div className="bg-sand-100/60 border-l-2 border-gold-600 p-8 space-y-3">
              <blockquote className="font-serif text-xl sm:text-2xl text-obsidian-950 italic leading-snug">
                &ldquo;We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.&rdquo;
              </blockquote>
              <div className="text-xs font-semibold tracking-widest text-gold-700 uppercase">
                &mdash; The PFP Founding Principle
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-obsidian-950">
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
            <div className="bg-white border border-sand-300 p-8 sm:p-10 space-y-6">
              <div className="border-b border-sand-200 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-widest-2xl text-gold-700 block">
                  OUR SACRED COMMITMENT
                </span>
                <h4 className="font-serif text-2xl font-normal text-obsidian-950 mt-1">
                  Our Promise
                </h4>
              </div>

              <div className="p-4 bg-sand-50 border border-sand-200 font-serif text-xl text-obsidian-950 italic text-center">
                &ldquo;At PFP, every detail with Care.&rdquo;
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-light">
                We are committed to serving families with compassion, professionalism and respect, while creating practical solutions that help families feel more prepared for tomorrow.
              </p>

              {/* Three Pillars of Conduct */}
              <div className="pt-2 space-y-4 text-xs">
                <div className="border-t border-sand-200 pt-3">
                  <div className="font-serif text-base font-semibold text-obsidian-950">
                    01. Compassion
                  </div>
                  <p className="text-stone-500 mt-0.5">
                    Meeting grieving families with sincere empathy, active listening, and calm guidance during their most vulnerable days.
                  </p>
                </div>

                <div className="border-t border-sand-200 pt-3">
                  <div className="font-serif text-base font-semibold text-obsidian-950">
                    02. Professionalism
                  </div>
                  <p className="text-stone-500 mt-0.5">
                    Disciplined execution: Punctual delivery of cooking teams, immaculate food hygiene, and verified supermarket vouchers.
                  </p>
                </div>

                <div className="border-t border-sand-200 pt-3">
                  <div className="font-serif text-base font-semibold text-obsidian-950">
                    03. Respect
                  </div>
                  <p className="text-stone-500 mt-0.5">
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
