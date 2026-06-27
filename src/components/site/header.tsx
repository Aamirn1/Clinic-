"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, Phone, CalendarCheck, Home, Stethoscope, Glasses, Info, Users, HelpCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { business } from "@/lib/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Services", href: "#services", icon: Stethoscope },
  { label: "About", href: "#about", icon: Info },
  { label: "Eyewear", href: "#products", icon: Glasses },
  { label: "Team", href: "#team", icon: Users },
  { label: "FAQ", href: "#faq", icon: HelpCircle },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#home" className="group flex items-center gap-2.5">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground shadow-md transition-transform group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
              <path
                d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
            </svg>
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-foreground">
              Islamabad Optical
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-primary">
              & Clinic
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="hidden sm:inline-flex"
          >
            {mounted ? (
              theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )
            ) : (
              <Sun className="h-5 w-5 opacity-0" />
            )}
          </Button>
          <a href={`tel:${business.phoneRaw}`}>
            <Button
              variant="ghost"
              className="hidden items-center gap-2 text-sm font-medium md:inline-flex"
            >
              <Phone className="h-4 w-4" />
              {business.phone}
            </Button>
          </a>
          <Link href="#booking">
            <Button className="btn-gradient gap-2 border-0 text-primary-foreground shadow-sm">
              <CalendarCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </Button>
          </Link>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col overflow-y-auto">
                {/* Header — fixed spacing, no overlap */}
                <div className="flex items-center justify-between gap-3 bg-brand-gradient px-5 py-5 text-primary-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
                        <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
                      </svg>
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-bold">Islamabad Optical</span>
                      <span className="text-[10px] uppercase tracking-[0.18em] text-white/80">&amp; Clinic</span>
                    </div>
                  </div>
                  <SheetClose asChild>
                    <Button size="icon" variant="ghost" className="h-9 w-9 text-primary-foreground hover:bg-white/15" aria-label="Close menu">
                      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                    </Button>
                  </SheetClose>
                </div>

                {/* Nav links with icons */}
                <nav className="flex flex-col gap-1 px-3 py-4">
                  <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Menu</p>
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-primary/5"
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <link.icon className="h-4 w-4" />
                        </span>
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Bottom actions — safe-area aware, never cut off */}
                <div className="mt-auto flex flex-col gap-2 border-t border-border/60 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-4">
                  <SheetClose asChild>
                    <Link href="#booking">
                      <Button className="btn-gradient w-full gap-2 border-0 text-primary-foreground">
                        <CalendarCheck className="h-4 w-4" /> Book Appointment
                      </Button>
                    </Link>
                  </SheetClose>
                  <div className="grid grid-cols-2 gap-2">
                    <a href={`tel:${business.phoneRaw}`}>
                      <Button variant="outline" size="sm" className="w-full gap-1.5">
                        <Phone className="h-4 w-4" /> Call
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="gap-1.5"
                    >
                      {mounted && theme === "dark" ? (
                        <><Sun className="h-4 w-4" /> Light</>
                      ) : (
                        <><Moon className="h-4 w-4" /> Dark</>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
