"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
  CalendarCheck,
  Clock,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Loader2,
  Stethoscope,
  CalendarDays,
  User,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SectionHeading, Reveal } from "@/components/site/reveal";
import { business, services, timeSlots } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function Booking() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [service, setService] = React.useState<string>("");
  const [time, setTime] = React.useState<string>("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState<null | {
    name: string;
    service: string;
    date: string;
    time: string;
  }>(null);

  const today = new Date();
  const disabledDays = [{ before: new Date(today.getFullYear(), today.getMonth(), today.getDate()) }];

  const canSubmit =
    date && service && time && name.trim() && email.trim() && phone.trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) {
      toast.error("Please complete all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service,
          date: format(date!, "yyyy-MM-dd"),
          time,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setSuccess({
        name,
        service,
        date: format(date!, "EEEE, MMMM d, yyyy"),
        time,
      });
      toast.success("Appointment requested! We'll confirm shortly.");
      // reset
      setName("");
      setEmail("");
      setPhone("");
      setNotes("");
      setService("");
      setTime("");
      setDate(undefined);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="booking" className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Book an Appointment"
          title={
            <>
              Reserve your visit in <span className="gradient-text">under a minute</span>
            </>
          }
          description="Pick a date and time that works for you. We'll send a confirmation within a few hours."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Left: info panel */}
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-6 rounded-3xl border border-border/60 bg-brand-gradient p-7 text-primary-foreground shadow-xl">
              <div>
                <h3 className="text-2xl font-semibold font-[var(--font-playfair-display)]">
                  Why book with us?
                </h3>
                <p className="mt-2 text-sm text-primary-foreground/80">
                  We respect your time and your eyes. Here's what to expect.
                </p>
              </div>

              <ul className="space-y-4">
                {[
                  { icon: Clock, title: "Quick confirmation", desc: "Most requests confirmed within 2 hours." },
                  { icon: Stethoscope, title: "Expert optometrists", desc: "Qualified, caring specialists." },
                  { icon: CalendarDays, title: "Flexible slots", desc: "Evening & weekend availability." },
                  { icon: CheckCircle2, title: "No hidden fees", desc: "Transparent pricing upfront." },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/15">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{item.title}</p>
                      <p className="text-xs text-primary-foreground/75">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-3 border-t border-primary-foreground/20 pt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/70">
                  Prefer to talk?
                </p>
                <a href={`tel:${business.phoneRaw}`} className="flex items-center gap-2 text-sm font-medium hover:underline">
                  <Phone className="h-4 w-4" /> {business.phone}
                </a>
                <a href={`mailto:${business.email}`} className="flex items-center gap-2 text-sm font-medium hover:underline">
                  <Mail className="h-4 w-4" /> {business.email}
                </a>
                <p className="flex items-start gap-2 text-sm">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {business.address}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-xl sm:p-8">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
                      className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary"
                    >
                      <CheckCircle2 className="h-10 w-10" />
                    </motion.div>
                    <h3 className="mt-6 text-2xl font-semibold font-[var(--font-playfair-display)]">
                      Appointment Requested!
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      Thank you, {success.name}. We've received your request for{" "}
                      <strong className="text-foreground">{success.service}</strong> on{" "}
                      <strong className="text-foreground">{success.date}</strong> at{" "}
                      <strong className="text-foreground">{success.time}</strong>. Our team will
                      contact you shortly to confirm.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <Button onClick={() => setSuccess(null)} variant="outline">
                        Book another
                      </Button>
                      <a href={`tel:${business.phoneRaw}`}>
                        <Button className="btn-gradient gap-2 border-0 text-primary-foreground">
                          <Phone className="h-4 w-4" /> Call us now
                        </Button>
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Service + date + time */}
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-1.5 text-sm font-medium">
                          <Stethoscope className="h-4 w-4 text-primary" /> Service *
                        </Label>
                        <Select value={service} onValueChange={setService}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((s) => (
                              <SelectItem key={s.title} value={s.title}>
                                {s.title}
                              </SelectItem>
                            ))}
                            <SelectItem value="General Consultation">
                              General Consultation
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-1.5 text-sm font-medium">
                          <CalendarDays className="h-4 w-4 text-primary" /> Preferred Date *
                        </Label>
                        <div className="rounded-lg border border-input bg-background">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={disabledDays}
                            className="mx-auto p-2"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Time slots */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-1.5 text-sm font-medium">
                        <Clock className="h-4 w-4 text-primary" /> Preferred Time *
                      </Label>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {timeSlots.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setTime(slot)}
                            className={cn(
                              "rounded-lg border px-2 py-2 text-xs font-medium transition-all",
                              time === slot
                                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                                : "border-border bg-background hover:border-primary/40 hover:bg-primary/5"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-border/60" />

                    {/* Contact details */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-1.5 text-sm font-medium">
                          <User className="h-4 w-4 text-primary" /> Full Name *
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Ahmed Khan"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium">
                          Phone *
                        </Label>
                        <Input
                          id="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. 0300 1234567"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes" className="text-sm font-medium">
                        Notes (optional)
                      </Label>
                      <Textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Anything we should know? Existing prescription, symptoms, etc."
                        rows={3}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={!canSubmit || loading}
                      className="btn-gradient w-full gap-2 border-0 text-primary-foreground shadow-lg shadow-primary/20 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" /> Booking...
                        </>
                      ) : (
                        <>
                          <CalendarCheck className="h-5 w-5" /> Confirm Appointment
                        </>
                      )}
                    </Button>
                    <p className="text-center text-xs text-muted-foreground">
                      By booking, you agree to our appointment policy. We'll never share your details.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
