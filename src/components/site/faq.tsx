"use client";

import { SectionHeading, Reveal } from "@/components/site/reveal";
import { faqs } from "@/lib/data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";
import { business } from "@/lib/data";

export function FAQ() {
  return (
    <section id="faq" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title={
                <>
                  Questions? <span className="gradient-text">We've got answers</span>
                </>
              }
              description="Everything you need to know about your visit. Can't find what you're looking for? Our team is one call away."
            />
            <Reveal delay={0.15} className="mt-6">
              <div className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-primary/5 p-5">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  <p className="text-sm font-semibold">Still have questions?</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Reach out and our friendly staff will help you right away.
                </p>
                <a href={`tel:${business.phoneRaw}`} className="text-sm font-semibold text-primary hover:underline">
                  {business.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <Accordion type="single" collapsible className="flex flex-col gap-3">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`item-${i}`}
                    className="rounded-xl border border-border/60 bg-card px-5 shadow-sm data-[state=open]:border-primary/30 data-[state=open]:shadow-md"
                  >
                    <AccordionTrigger className="text-left text-sm font-semibold hover:no-underline sm:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
