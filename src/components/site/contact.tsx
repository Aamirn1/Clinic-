"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Loader2,
  Facebook,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeading, Reveal } from "@/components/site/reveal";
import { business } from "@/lib/data";
import { toast } from "sonner";

export function Contact() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");
      toast.success("Message sent! We'll get back to you soon.");
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  const contactItems = [
    {
      icon: Phone,
      label: "Call Us",
      value: business.phone,
      href: `tel:${business.phoneRaw}`,
    },
    {
      icon: Mail,
      label: "Email Us",
      value: business.email,
      href: `mailto:${business.email}`,
    },
    {
      icon: MapPin,
      label: "Visit Us",
      value: business.address,
      href: `https://www.google.com/maps?q=${business.mapLat},${business.mapLng}`,
    },
  ];

  return (
    <section id="contact" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-primary/5" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title={
            <>
              We'd love to <span className="gradient-text">hear from you</span>
            </>
          }
          description="Have a question, feedback, or need directions? Reach out — we're here to help."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Left: contact info + map */}
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-3">
              {contactItems.map((item, i) => (
                <Reveal key={item.label} delay={i * 0.05}>
                  <a
                    href={item.href}
                    target={item.icon === MapPin ? "_blank" : undefined}
                    rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                    className="group flex h-full flex-col gap-3 rounded-2xl border border-border/60 bg-card p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-snug">{item.value}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            {/* Hours */}
            <Reveal delay={0.1}>
              <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-base font-semibold">Opening Hours</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {business.hours.map((h) => (
                    <li
                      key={h.day}
                      className="flex items-center justify-between border-b border-border/40 py-2 text-sm last:border-0"
                    >
                      <span className="text-muted-foreground">{h.day}</span>
                      <span className="font-medium">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Map */}
            <Reveal delay={0.15}>
              <div className="overflow-hidden rounded-2xl border border-border/60 shadow-sm">
                <iframe
                  title="Islamabad Optical & Clinic location"
                  src={`https://www.google.com/maps?q=${business.mapLat},${business.mapLng}&z=15&output=embed`}
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: contact form */}
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-xl sm:p-8">
              <h3 className="text-xl font-semibold font-[var(--font-playfair-display)]">
                Send us a message
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill in the form and we'll respond within 24 hours.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="c-name" className="text-sm font-medium">
                      Name *
                    </Label>
                    <Input
                      id="c-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-phone" className="text-sm font-medium">
                      Phone
                    </Label>
                    <Input
                      id="c-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300 1234567"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-email" className="text-sm font-medium">
                    Email *
                  </Label>
                  <Input
                    id="c-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-subject" className="text-sm font-medium">
                    Subject *
                  </Label>
                  <Input
                    id="c-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="How can we help?"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-message" className="text-sm font-medium">
                    Message *
                  </Label>
                  <Textarea
                    id="c-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    rows={5}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full gap-2 bg-primary shadow-lg shadow-primary/20 hover:bg-primary/90"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-6">
                <span className="text-xs font-medium text-muted-foreground">Follow us:</span>
                <div className="flex gap-2">
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
