"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarCheck, Phone, Star, ShieldCheck, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business } from "@/lib/data";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-16">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="absolute inset-0 -z-10 bg-grid dark:bg-grid-dark opacity-60 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -right-32 -top-20 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 top-40 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Copy */}
          <div className="flex flex-col items-start gap-6">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent">
                <span className="h-2 w-2 animate-ping rounded-full bg-accent opacity-75" />
              </span>
              Now accepting new patients
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl font-[var(--font-playfair-display)]"
            >
              See the world{" "}
              <span className="gradient-text gradient-text-animate">in perfect clarity</span> with expert eye care
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="max-w-xl text-base text-muted-foreground text-balance sm:text-lg"
            >
              {business.name} brings together advanced diagnostics, premium eyewear, and caring
              specialists — so you and your family enjoy a lifetime of healthy, clear vision.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Link href="#booking">
                <Button size="lg" className="btn-gradient gap-2 border-0 px-6 text-primary-foreground shadow-lg shadow-primary/20">
                  <CalendarCheck className="h-5 w-5" />
                  Book Appointment
                </Button>
              </Link>
              <a href={`tel:${business.phoneRaw}`}>
                <Button size="lg" variant="outline" className="gap-2 px-6">
                  <Phone className="h-4 w-4" />
                  {business.phone}
                </Button>
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.24 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  4.9/5 · 1,200+ reviews
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Certified Optometrists
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                15+ Years Experience
              </div>
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-border/60 shadow-2xl shadow-primary/10 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/hero-eye.jpg"
                alt="Premium optical store interior at Islamabad Optical & Clinic"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />
            </div>

            {/* Floating card - top */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -left-4 top-8 hidden rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur-md sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Same-day</p>
                  <p className="text-sm font-semibold">Eye Exams</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card - bottom */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-border/60 bg-background/90 p-4 shadow-xl backdrop-blur-md sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15 text-accent-foreground">
                  <Award className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Trusted by</p>
                  <p className="text-sm font-semibold">25,000+ patients</p>
                </div>
              </div>
            </motion.div>

            {/* Explore link */}
            <Link
              href="#services"
              className="group absolute -left-4 bottom-20 hidden items-center gap-2 rounded-full border border-border/60 bg-background/90 px-4 py-2 text-sm font-medium shadow-lg backdrop-blur-md transition-colors hover:border-primary/40 hover:text-primary sm:flex"
            >
              Explore services
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Trust marquee */}
      <div className="relative border-y border-border/60 bg-primary/5 py-4">
        <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-hidden px-4">
          <p className="shrink-0 text-xs font-semibold uppercase tracking-widest text-primary">
            Trusted brands
          </p>
          <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex w-max animate-marquee items-center gap-12">
              {[
                "Ray-Ban",
                "Oakley",
                "Essilor",
                "Zeiss",
                "Johnson & Johnson",
                "Bausch & Lomb",
                "Hoya",
                "Ray-Ban",
                "Oakley",
                "Essilor",
                "Zeiss",
                "Johnson & Johnson",
                "Bausch & Lomb",
                "Hoya",
              ].map((brand, i) => (
                <span
                  key={i}
                  className="text-lg font-semibold text-muted-foreground/70"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
