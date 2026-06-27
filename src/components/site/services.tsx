"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionHeading, Reveal } from "@/components/site/reveal";
import { services } from "@/lib/data";

export function Services() {
  return (
    <section id="services" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              Complete eye care, <span className="gradient-text">all in one place</span>
            </>
          }
          description="From routine eye exams to advanced diagnostics and designer eyewear, our clinic delivers comprehensive vision care for every member of your family."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-primary/5"
              >
                {/* hover gradient */}
                <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <service.icon className="h-6 w-6" />
                  </div>
                  {service.price && (
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {service.price}
                    </span>
                  )}
                </div>

                <h3 className="relative mt-5 text-xl font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <ul className="relative mt-5 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-foreground/80">
                      <Check className="h-4 w-4 shrink-0 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="relative mt-6 pt-2">
                  <Link
                    href="#booking"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                  >
                    Book this service
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <div className="rounded-2xl border border-dashed border-primary/30 bg-primary/5 px-6 py-4 text-center">
            <p className="text-sm text-muted-foreground">
              Not sure which service you need?{" "}
              <Link href="#booking" className="font-semibold text-primary hover:underline">
                Book a general consultation
              </Link>{" "}
              and our optometrist will guide you.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
