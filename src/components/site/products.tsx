"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading, Reveal } from "@/components/site/reveal";
import { products } from "@/lib/data";

export function Products() {
  return (
    <section id="products" className="relative scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Eyewear Collection"
            title={
              <>
                Premium eyewear, <span className="gradient-text">curated for you</span>
              </>
            }
            description="Browse our most-loved frames, lenses, and accessories — fitted by experts who know style and comfort."
          />
          <Reveal delay={0.1}>
            <Link href="#booking">
              <Button variant="outline" className="gap-2">
                Visit the showroom
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.name} delay={i * 0.06}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-foreground shadow">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground/70">
                    {product.category}
                  </span>
                  <h3 className="mt-1 text-base font-semibold">{product.name}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">{product.price}</span>
                    <Link
                      href="#booking"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      Enquire
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
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
