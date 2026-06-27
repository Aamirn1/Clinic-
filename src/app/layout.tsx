import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Islamabad Optical & Clinic | Premier Eye Care & Eyewear in Islamabad",
  description:
    "Islamabad Optical & Clinic — trusted eye care specialists offering comprehensive eye exams, prescription glasses, contact lenses, and advanced vision care. Book your appointment today.",
  keywords: [
    "Islamabad Optical",
    "eye clinic Islamabad",
    "optometrist Islamabad",
    "eye exam",
    "prescription glasses",
    "contact lenses",
    "vision care Pakistan",
    "eye doctor",
  ],
  authors: [{ name: "Islamabad Optical & Clinic" }],
  openGraph: {
    title: "Islamabad Optical & Clinic | Premier Eye Care & Eyewear",
    description:
      "Comprehensive eye exams, premium eyewear & expert vision care. Book your appointment today.",
    type: "website",
    locale: "en_PK",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamabad Optical & Clinic",
    description: "Premier eye care & eyewear in Islamabad. Book your appointment today.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
