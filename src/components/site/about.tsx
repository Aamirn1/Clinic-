"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, Heart, Sparkles } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/reveal";
import { business } from "@/lib/data";

const values = [
  {
    icon: Eye,
    title: "Vision First",
    description: "Every decision begins with what's best for your eyes — not our margins.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every patient like family, with patience, respect, and honesty.",
  },
  {
    icon: Sparkles,
    title: "Excellence",
    description: "We hold ourselves to the highest clinical and service standards.",
  },
  {
    icon: Target,
    title: "Integrity",
    description: "Transparent advice and pricing — always. No unnecessary upsells.",
  },
];

export function About() {
  return (
    <section id="about" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: copy */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title={
                <>
                  Caring for Islamabad's eyes <span className="gradient-text">since 2010</span>
                </>
              }
              description={business.description}
            />

            <Reveal delay={0.1} className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                What began as a small neighborhood optical counter has grown into a trusted clinic
                serving thousands of families across Islamabad and the wider region. Our journey has
                always been guided by a single belief: <strong className="text-foreground">clear vision is a right, not a luxury.</strong>
              </p>
              <p>
                Today, our clinic pairs experienced optometrists with modern diagnostic technology
                and a carefully curated eyewear collection — all delivered with the warmth of a
                family practice. Whether you need a routine check-up, your first pair of glasses, or
                ongoing management of an eye condition, we're here for you at every step.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((value, i) => (
                <Reveal key={value.title} delay={0.15 + i * 0.05}>
                  <div className="flex items-start gap-3 rounded-xl border border-border/60 bg-card p-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <value.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{value.title}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: image with stats overlay */}
          <Reveal delay={0.15} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border/60 shadow-2xl shadow-primary/10">
              <Image
                src="/images/clinic-interior.jpg"
                alt="Islamabad Optical & Clinic interior"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/10 to-transparent" />
            </div>

            {/* Mission card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-border/60 bg-background/95 p-5 shadow-xl backdrop-blur-md sm:left-8 sm:right-8"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
                  <Target className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Our Mission
                  </p>
                  <p className="mt-0.5 text-sm font-medium">
                    To make exceptional eye care accessible, honest, and genuinely caring.
                  </p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
