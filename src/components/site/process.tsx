"use client";

import { SectionHeading, Reveal } from "@/components/site/reveal";
import { steps } from "@/lib/data";

export function Process() {
  return (
    <section className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Your path to clearer vision, <span className="gradient-text">in 4 simple steps</span>
            </>
          }
          description="We've designed every visit to be effortless, transparent, and focused entirely on you."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.step} delay={i * 0.08}>
                <div className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-background shadow-md">
                    <step.icon className="h-7 w-7 text-primary" />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-5 text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
