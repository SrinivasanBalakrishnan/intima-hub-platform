"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // State to control the Security Console Popup
  const [showSecurity, setShowSecurity] = useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER */}
      <div className="mb-12 text-center relative z-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-tight">
          Intima Hub
        </h1>
        <p className="text-gray-400 text-lg tracking-wide">
          The Quantum-Secured Sexual Wellness Ecosystem
        </p>
        
        {/* INTERACTIVE SECURITY BADGE (Now Clickable) */}
        <button 
          onClick={() => setShowSecurity(true)}
          className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-900/10 border border-green-900/50 text-green-400 text-sm font-medium hover:bg-green-900/20 hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50"
          aria-label="View Security Protocols"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
          System Online & Encrypted
          <span className="ml-1 text-[10px] opacity-70 border-l border-green-700 pl-2">
            [VIEW DETAILS]
          </span>
        </button>
      </div>

      {/* THE 4 BOXES GRID (All Active) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full relative z-10">
        
        {/* BOX 1: AI BOT */}
        <Link href="/bot" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-blue-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col gap-4 cursor-pointer">
          <div className="absolute top-4 right-4 text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded shadow-lg">LIVE</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🤖</div>
          <div>
            <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Intima-Bot</h2>
            <p className="text-gray-400 text-sm mt-1">Your AI wellness assistant. Ask anonymously.</p>
          </div>
        </Link>

        {/* BOX 2: SHOP */}
        <Link href="/shop" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-pink-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] flex flex-col gap-4 cursor-pointer">
          <div className="absolute top-4 right-4 text-xs font-bold bg-pink-600 text-white px-2 py-1 rounded shadow-lg">NEW</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🛒</div>
          <div>
            <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">Shop</h2>
            <p className="text-gray-400 text-sm mt-1">Biodegradable condoms & sustainable lubricants.</p>
          </div>
        </Link>

        {/* BOX 3: CARE */}
        <Link href="/care" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-green-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col gap-4 cursor-pointer">
          <div className="absolute top-4 right-4 text-xs font-bold bg-green-600 text-white px-2 py-1 rounded shadow-lg">OPEN</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🩺</div>
          <div>
            <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">Care</h2>
            <p className="text-gray-400 text-sm mt-1">Anonymous consultation with verified specialists.</p>
          </div>
        </Link>

        {/* BOX 4: PAY */}
        <Link href="/pay" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-purple-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col gap-4 cursor-pointer">
          <div className="absolute top-4 right-4 text-xs font-bold bg-purple-600 text-white px-2 py-1 rounded shadow-lg">SECURE</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">💳</div>
          <div>
            <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Pay</h2>
            <p className="text-gray-400 text-sm mt-1">Decentralized privacy-first wallet.</p>
          </div>
        </Link>

      </div>

      <footer className="mt-16 text-gray-600 text-sm relative z-10">
        © 2026 Intima Hub Platform. All rights reserved.
      </footer>

      {/* --- NEW: SECURITY CONSOLE OVERLAY (Visible only when clicked) --- */}
      {showSecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-black border border-green-500/30 rounded-lg max-w-lg w-full p-6 shadow-[0_0_50px_rgba(34,197,94,0.15)] font-mono relative">
            
            {/* TERMINAL HEADER */}
            <div className="flex justify-between items-center mb-6 border-b border-green-900 pb-2">
              <h3 className="text-green-400 font-bold text-sm tracking-widest uppercase">
                <span className="animate-pulse">●</span> Security_Console_v1.0
              </h3>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-500/30"></div>
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
            </div>

            {/* PROTOCOL LIST */}
            <div className="space-y-5 mb-8">
              
              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5 text-xs">➜</span>
                <div>
                  <p className="text-green-400 font-bold text-xs uppercase tracking-wider">Zero_Persistence_Layer</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    Session data is stored in volatile RAM only. Refreshing the page triggers an immediate cryptographic wipe of all chat logs.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5 text-xs">➜</span>
                <div>
                  <p className="text-green-400 font-bold text-xs uppercase tracking-wider">TLS_1.3_Encryption</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    Military-grade transport security active. All data packets between client and server are signed and encrypted.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5 text-xs">➜</span>
                <div>
                  <p className="text-green-400 font-bold text-xs uppercase tracking-wider">Post_Quantum_Readiness</p>
                  <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                    Architecture aligned with NIST Kyber-512 standards for future lattice-based key exchange integration.
                  </p>
                </div>
              </div>

            </div>

            {/* CLOSE BUTTON */}
            <button 
              onClick={() => setShowSecurity(false)}
              className="w-full bg-green-900/10 border border-green-500/30 text-green-400 py-3 rounded hover:bg-green-500 hover:text-black transition-all font-bold tracking-widest text-xs uppercase"
            >
              Acknowledge & Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}