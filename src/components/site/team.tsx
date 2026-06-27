"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Mail, GraduationCap } from "lucide-react";
import { SectionHeading, Reveal } from "@/components/site/reveal";
import { team } from "@/lib/data";

export function Team() {
  return (
    <section id="team" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Meet The Team"
          title={
            <>
              Specialists who <span className="gradient-text">genuinely care</span>
            </>
          }
          description="Our friendly, highly-qualified team is the heart of the clinic. They'll make sure you feel comfortable, informed, and confident at every visit."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                  {/* Social icons */}
                  <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Linkedin className="h-4 w-4" />
                    </span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-md transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Mail className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="relative -mt-16 px-5 pb-5">
                  <div className="rounded-xl border border-border/60 bg-background/95 p-4 shadow-lg backdrop-blur-md">
                    <h3 className="text-lg font-semibold tracking-tight">{member.name}</h3>
                    <p className="text-sm font-medium text-primary">{member.role}</p>
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <GraduationCap className="h-3.5 w-3.5" />
                      {member.qualifications}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
