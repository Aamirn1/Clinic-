"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Menu, Moon, Sun, Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { business } from "@/lib/data";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Eyewear", href: "#products" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
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
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground shadow-md transition-transform group-hover:scale-105">
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
            <Button className="gap-2 bg-primary shadow-sm hover:bg-primary/90">
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
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2.5 border-b border-border/60 pb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-emerald-700 text-primary-foreground">
                    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden>
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
                  <div className="flex flex-col leading-none">
                    <span className="text-sm font-bold">Islamabad Optical</span>
                    <span className="text-[10px] uppercase tracking-widest text-primary">
                      & Clinic
                    </span>
                  </div>
                </div>
                <nav className="mt-4 flex flex-1 flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2 border-t border-border/60 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="justify-start"
                  >
                    {mounted && theme === "dark" ? (
                      <>
                        <Sun className="mr-2 h-4 w-4" /> Light Mode
                      </>
                    ) : (
                      <>
                        <Moon className="mr-2 h-4 w-4" /> Dark Mode
                      </>
                    )}
                  </Button>
                  <SheetClose asChild>
                    <Link href="#booking">
                      <Button className="w-full gap-2 bg-primary">
                        <CalendarCheck className="h-4 w-4" /> Book Appointment
                      </Button>
                    </Link>
                  </SheetClose>
                  <a href={`tel:${business.phoneRaw}`} className="block">
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2">
                      <Phone className="h-4 w-4" /> {business.phone}
                    </Button>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
