import type { Metadata, Viewport } from "next";
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

// NOTE: Update this to your final Vercel domain after deploy for perfect social previews.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://islamabadoptical.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Islamabad Optical & Clinic | Premier Eye Care & Eyewear in Islamabad",
    template: "%s | Islamabad Optical & Clinic",
  },
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
  creator: "Islamabad Optical & Clinic",
  publisher: "Islamabad Optical & Clinic",
  applicationName: "Islamabad Optical & Clinic",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon-32.png"],
  },
  manifest: undefined,
  openGraph: {
    title: "Islamabad Optical & Clinic | Premier Eye Care & Eyewear",
    description:
      "Comprehensive eye exams, premium eyewear & expert vision care. Book your appointment today.",
    url: siteUrl,
    siteName: "Islamabad Optical & Clinic",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Islamabad Optical & Clinic — See the world in perfect clarity",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Islamabad Optical & Clinic",
    description: "Premier eye care & eyewear in Islamabad. Book your appointment today.",
    images: ["/og-image.png"],
    creator: "@islamabadoptical",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "health",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f59e0b" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="shortcut icon" href="/favicon-32.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
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
