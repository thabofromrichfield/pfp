import React from 'react';
import { HeartHandshake, Sparkles, UtensilsCrossed, CalendarClock } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-paper relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-primary text-xs font-bold tracking-widest uppercase">
            <span>ABOUT US &bull; OUR PURPOSE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
            Built From Real Experience. Rooted in Care.
          </h2>
          <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed">
            Our goal is to provide families with practical support that helps ease some of the financial and logistical pressure during difficult times. Through our carefully structured support packages, families can receive assistance with groceries, catering and other meaningful benefits, depending on the package they choose.
          </p>
        </div>

        {/* 2-Column Experience Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border-l-4 border-accent pl-5 space-y-3">
              <h3 className="font-serif text-2xl font-bold text-primary">
                Built From Real Experience
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                Our understanding of the needs of families has been shaped by working hand in hand with experienced catering companies with more than <strong>10 years of experience in the catering industry</strong>.
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Through this experience, we have seen how much goes into feeding and accommodating family members and guests during a funeral. From preparing large quantities of food to organising cooking teams, equipment, serving stations and the practical details behind the scenes; <em>Catering is a responsibility that families often need help managing.</em>
            </p>

            <div className="p-5 rounded-2xl bg-paper-soft border border-paper-border space-y-2">
              <div className="flex items-center gap-2 text-primary font-serif font-bold text-lg">
                <HeartHandshake className="w-5 h-5 text-accent" />
                <span>Our Core Belief</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed italic">
                &ldquo;We believe that families should be able to focus on remembering and honouring their loved one, while having practical support available to help manage some of the responsibilities around them.&rdquo;
              </p>
            </div>
          </div>

          {/* Right Column: Visual Feature Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="p-6 rounded-2xl bg-white shadow-luxury border border-paper-border hover:border-accent transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <UtensilsCrossed className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-serif font-bold text-lg text-primary mb-1">
                More Than Just Cash
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Conventional policies offer cash that takes weeks or leaves the family scrambling to find pots, firewood, or reliable cooks. PFP provides turn-key logistical relief.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white shadow-luxury border border-paper-border hover:border-accent transition-all">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <CalendarClock className="w-5 h-5 text-accent" />
              </div>
              <h4 className="font-serif font-bold text-lg text-primary mb-1">
                We Believe in Planning Ahead
              </h4>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                We don’t believe in waiting until a family is facing a difficult moment before thinking about what they may need. Because when the unexpected happens, having a plan makes a difficult journey a little easier.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do & Our Promise Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* What We Do */}
          <div className="p-8 sm:p-10 rounded-3xl bg-primary text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
            <div className="relative space-y-4">
              <span className="text-xs uppercase tracking-widest text-accent font-bold">
                PRACTICAL PREPARATION
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                What We Do
              </h3>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-light">
                PFP brings together planning, practical support and care to help families prepare ahead of time.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                Our packages are designed to provide meaningful support when it matters most — whether that means assistance with groceries, additional financial support or catering for family and guests.
              </p>
              <div className="pt-2 flex items-center gap-2 text-accent-light text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-accent" />
                <span>Meaningful assistance when it matters most</span>
              </div>
            </div>
          </div>

          {/* Our Promise */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-paper-soft to-white border-2 border-accent/40 shadow-xl relative overflow-hidden">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-accent-dark font-bold">
                OUR SACRED COMMITMENT
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
                Our Promise
              </h3>
              <div className="p-4 rounded-xl bg-white border border-accent/30 text-primary font-serif text-lg font-bold">
                &ldquo;At PFP, every detail with Care.&rdquo;
              </div>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We are committed to serving families with compassion, professionalism and respect, while creating practical solutions that help families feel more prepared for tomorrow.
              </p>
              <div className="pt-2 flex items-center gap-3 text-xs text-slate-600 font-medium">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">Compassion</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">Professionalism</span>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold">Respect</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
