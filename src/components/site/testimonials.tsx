"use client";

import * as React from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, Reveal } from "@/components/site/reveal";
import { testimonials } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [active, setActive] = React.useState(0);
  const [perView, setPerView] = React.useState(1);

  React.useEffect(() => {
    const update = () => {
      if (window.innerWidth >= 1024) setPerView(3);
      else if (window.innerWidth >= 640) setPerView(2);
      else setPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - perView);

  const next = React.useCallback(() => setActive((a) => (a >= maxIndex ? 0 : a + 1)), [maxIndex]);
  const prev = React.useCallback(() => setActive((a) => (a <= 0 ? maxIndex : a - 1)), [maxIndex]);

  React.useEffect(() => {
    const id = setInterval(() => setActive((a) => (a >= maxIndex ? 0 : a + 1)), 5000);
    return () => clearInterval(id);
  }, [maxIndex]);

  return (
    <section className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-background to-primary/5 py-20 sm:py-28">
      <div className="pointer-events-none absolute -right-32 -top-20 -z-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Patient Stories"
            title={
              <>
                Loved by thousands of <span className="gradient-text">happy patients</span>
              </>
            }
            description="Don't just take our word for it — here's what our community says about their experience."
          />
          <Reveal delay={0.1}>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={prev} aria-label="Previous">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={next} aria-label="Next">
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * (100 / perView)}%)` }}
          >
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="shrink-0 px-2"
                style={{ width: `${100 / perView}%` }}
              >
                <div
                  className={cn(
                    "flex h-full flex-col rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all sm:p-7",
                    i >= active && i < active + perView ? "opacity-100" : "opacity-60"
                  )}
                >
                  <Quote className="h-8 w-8 text-accent" />
                  <div className="mt-3 flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90 sm:text-base">
                    "{t.text}"
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-emerald-700 text-sm font-bold text-primary-foreground">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === active ? "w-8 bg-primary" : "w-2 bg-border hover:bg-primary/40"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
