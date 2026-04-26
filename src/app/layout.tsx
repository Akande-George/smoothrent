import type { Metadata } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MockAuthProvider } from "@/components/providers/auth-provider";

const displayFont = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const bodyFont = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmoothRent — A quieter way to find a Nigerian home",
  description:
    "Verified Nigerian rentals, digital leases and trustworthy agents. SmoothRent is the editorial-grade marketplace for tenants, landlords and agents across Lagos, Abuja, Port Harcourt and beyond.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="antialiased">
        <MockAuthProvider>{children}</MockAuthProvider>
      </body>
    </html>
  );
}
