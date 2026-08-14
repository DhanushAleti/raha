import type { Metadata } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raha — Prove your foreign income is a 0% export",
  description:
    "Paid from abroad? Your foreign income is a zero-rated export at 0% GST — but only with a FIRA and an LUT. Raha checks if you're covered in 2 minutes and proves it across every rail. For Indian freelancers, consultants, indie founders and creators.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  openGraph: {
    title: "Raha — Prove your foreign income is a 0% export",
    description:
      "The compliance layer for Indians paid from abroad. FIRA, LUT and GST — proven across every rail, so your foreign income stays zero-rated.",
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
