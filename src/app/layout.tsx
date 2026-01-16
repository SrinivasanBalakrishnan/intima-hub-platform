import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. IMPORT THE BRAIN
import { IntimaProvider } from "./context/IntimaContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. UPDATED METADATA (Branding)
export const metadata: Metadata = {
  title: "Intima Hub | Quantum-Secured Wellness",
  description: "Privacy-first sexual wellness ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {/* 3. WRAP THE APP IN THE PROVIDER */}
        <IntimaProvider>
          {children}
        </IntimaProvider>
      </body>
    </html>
  );
}