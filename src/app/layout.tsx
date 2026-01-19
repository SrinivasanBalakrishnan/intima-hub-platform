// FORCE_DEPLOY_TRIGGER_01
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// TESTER NOTE: Use './' because 'context' is a folder inside 'src/app' (neighbor to layout.tsx)
import { IntimaProvider } from "./context/IntimaContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <IntimaProvider>
          {children}
        </IntimaProvider>
      </body>
    </html>
  );
}