"use client";

import * as React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  MessageCircle,
  Send,
  Loader2,
  ArrowUp,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { business } from "@/lib/data";
import { toast } from "sonner";

const footerLinks = [
  {
    title: "Services",
    links: [
      { label: "Eye Exams", href: "#services" },
      { label: "Prescription Eyewear", href: "#services" },
      { label: "Contact Lenses", href: "#services" },
      { label: "Pediatric Eye Care", href: "#services" },
      { label: "Retinal Imaging", href: "#services" },
    ],
  },
  {
    title: "Clinic",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Our Team", href: "#team" },
      { label: "Eyewear", href: "#products" },
      { label: "FAQ", href: "#faq" },
      { label: "Book Appointment", href: "#booking" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "#contact" },
      { label: "Opening Hours", href: "#contact" },
      { label: "Find Us", href: "#contact" },
      { label: "Insurance", href: "#faq" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to subscribe");
      toast.success(data.alreadySubscribed ? "You're already subscribed!" : "Subscribed! Thanks for joining.");
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/60 bg-gradient-to-b from-background to-primary/10">
      <div className="pointer-events-none absolute -left-32 -top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        {/* Newsletter banner */}
        <div className="mb-12 flex flex-col items-center gap-6 rounded-3xl border border-border/60 bg-gradient-to-br from-primary to-emerald-800 p-8 text-center text-primary-foreground shadow-xl lg:flex-row lg:justify-between lg:text-left">
          <div className="max-w-lg">
            <h3 className="text-2xl font-semibold font-[var(--font-playfair-display)]">
              Eye care tips, straight to your inbox
            </h3>
            <p className="mt-2 text-sm text-primary-foreground/80">
              Join our newsletter for seasonal eye-care advice, exclusive offers, and new arrivals.
              No spam, ever.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex w-full max-w-md gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-primary-foreground/40"
            />
            <Button
              type="submit"
              disabled={loading}
              variant="secondary"
              className="shrink-0 gap-2 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              <span className="hidden sm:inline">Subscribe</span>
            </Button>
          </form>
        </div>

        {/* Main footer */}
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="#home" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground shadow-md">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                  <path
                    d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-base font-bold tracking-tight">{business.shortName}</span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
                  & Clinic
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {business.description}
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={business.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={business.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href={business.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{business.addressShort}</span>
              </li>
              <li>
                <a
                  href={`tel:${business.phoneRaw}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" />
                  {business.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${business.email}`}
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" />
                  <span className="break-all">{business.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Mon–Sat: 9AM–8PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Crafted with <Heart className="h-3.5 w-3.5 fill-accent text-accent" /> for clearer vision
          </p>
          <Link
            href="#home"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
