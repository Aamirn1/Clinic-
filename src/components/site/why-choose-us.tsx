"use client";

import Image from "next/image";
import { SectionHeading, Reveal } from "@/components/site/reveal";
import { features } from "@/lib/data";
import { business } from "@/lib/data";

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden scroll-mt-20 bg-gradient-to-b from-primary/5 to-background py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-40 top-1/4 -z-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: image collage */}
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border/60 shadow-lg">
                    <Image
                      src="/images/eye-exam.jpg"
                      alt="Optometrist performing an eye examination"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 shadow-lg">
                    <Image
                      src="/images/glasses-collection.jpg"
                      alt="Stylish eyeglasses frames collection"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="pt-8">
                  <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/60 shadow-lg">
                    <Image
                      src="/images/clinic-interior.jpg"
                      alt="Modern eye clinic reception area"
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-4 rounded-2xl border border-border/60 bg-card p-5 shadow-lg">
                    <p className="text-3xl font-bold gradient-text font-[var(--font-playfair-display)]">
                      98%
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      of patients would recommend us to family & friends
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: copy + features */}
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Why Choose Us"
              title={
                <>
                  A clinic built around <span className="gradient-text">your vision</span>
                </>
              }
              description={`At ${business.name}, we combine medical-grade diagnostics with a warm, personalized experience — so every visit leaves you seeing better and feeling cared for.`}
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {features.map((feature, i) => (
                <Reveal key={feature.title} delay={i * 0.05}>
                  <div className="group flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{feature.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
