"use client";

import { useState } from "react";
import Link from "next/link";

// TESTER NOTE: These MUST be './' because folders are inside 'src/app'
import { useIntima } from "./context/IntimaContext";
import SplashScreen from "./components/SplashScreen";

export default function Home() {
  // 1. CONNECT TO GLOBAL BRAIN
  const { logout, userId, hasSeenSplash } = useIntima();
  
  // --- LOCAL UI STATES ---
  const [showSecurity, setShowSecurity] = useState(false);

  // --- 2. THE GATEKEEPER LOGIC ---
  if (!hasSeenSplash) {
    return <SplashScreen />;
  }

  // --- ACTIONS ---
  const handleLogout = () => {
    logout();
  };

  // ---------------------------------------------------------
  // RENDER: THE HUB (Authenticated Dashboard)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-700">
      
      {/* --- A. ATMOSPHERE --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 pointer-events-none"></div>
      
      {/* IDENTITY BADGE & EXIT */}
      <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-full shadow-lg group hover:border-zinc-600 transition-colors">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-gray-400 font-mono tracking-wider group-hover:text-white transition-colors">{userId}</span>
        </div>
        
        <button 
          onClick={handleLogout}
          className="text-[10px] text-red-500/70 hover:text-red-400 uppercase tracking-widest hover:underline transition-all cursor-pointer"
        >
          Disconnect / Exit
        </button>
      </div>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER */}
      <div className="mb-12 mt-20 md:mt-0 text-center relative z-10 flex flex-col items-center">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-tight drop-shadow-sm">
          Intima Hub
        </h1>
        <p className="text-gray-400 text-lg tracking-wide">
          The Quantum-Secured Sexual Wellness Ecosystem
        </p>
        
        <button 
          onClick={() => setShowSecurity(true)}
          className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-900/10 border border-green-900/50 text-green-400 text-sm font-medium hover:bg-green-900/20 hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
        >
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
          System Online & Encrypted
          <span className="ml-1 text-[10px] opacity-70 border-l border-green-700 pl-2">
            [VIEW DETAILS]
          </span>
        </button>
      </div>

      {/* THE 4 BOXES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full relative z-10">
        
        {/* BOT */}
        <Link href="/bot" className="group relative p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800 hover:border-blue-500 hover:bg-zinc-900/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] flex flex-col gap-4 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded shadow-lg z-10">LIVE</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300 relative z-10">🤖</div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Intima-Bot</h2>
            <p className="text-gray-400 text-sm mt-1">Your AI wellness assistant. Ask anonymously.</p>
          </div>
        </Link>

        {/* SHOP */}
        <Link href="/shop" className="group relative p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800 hover:border-pink-500 hover:bg-zinc-900/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(236,72,153,0.2)] flex flex-col gap-4 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 text-xs font-bold bg-pink-600 text-white px-2 py-1 rounded shadow-lg z-10">NEW</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300 relative z-10">🛒</div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">Shop</h2>
            <p className="text-gray-400 text-sm mt-1">Biodegradable condoms & sustainable lubricants.</p>
          </div>
        </Link>

        {/* CARE */}
        <Link href="/care" className="group relative p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800 hover:border-green-500 hover:bg-zinc-900/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.2)] flex flex-col gap-4 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 text-xs font-bold bg-green-600 text-white px-2 py-1 rounded shadow-lg z-10">OPEN</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300 relative z-10">🩺</div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">Care</h2>
            <p className="text-gray-400 text-sm mt-1">Anonymous consultation with verified specialists.</p>
          </div>
        </Link>

        {/* PAY */}
        <Link href="/pay" className="group relative p-8 rounded-3xl bg-zinc-900/40 backdrop-blur-md border border-zinc-800 hover:border-purple-500 hover:bg-zinc-900/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] flex flex-col gap-4 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 right-4 text-xs font-bold bg-purple-600 text-white px-2 py-1 rounded shadow-lg z-10">SECURE</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300 relative z-10">💳</div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Pay</h2>
            <p className="text-gray-400 text-sm mt-1">Decentralized privacy-first wallet.</p>
          </div>
        </Link>
      </div>

      <footer className="mt-16 text-gray-600 text-sm relative z-10">
        © 2026 Intima Hub Platform. All rights reserved.
      </footer>

      {/* SECURITY OVERLAY */}
      {showSecurity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-black border border-green-500/30 rounded-lg max-w-lg w-full p-6 shadow-[0_0_50px_rgba(34,197,94,0.15)] font-mono relative">
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
                    <p className="text-green-400 font-bold text-xs uppercase tracking-wider">Client-Side_Vault</p>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      Your data is encrypted with a 12-word mnemonic. We (Intima Hub) never see your keys or your balance.
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
            </div>

            <button 
              onClick={() => setShowSecurity(false)}
              className="w-full bg-green-900/10 border border-green-500/30 text-green-400 py-3 rounded hover:bg-green-500 hover:text-black transition-all font-bold tracking-widest text-xs uppercase"
            >
              Acknowledge & Close
            </button>
          </div>
        </div>
      )}

      {/* PANIC BUTTON */}
      <button
        onClick={() => window.location.replace("https://www.weather.com")}
        className="fixed bottom-6 right-6 z-50 bg-red-600 hover:bg-red-700 text-white font-bold p-4 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center justify-center transition-all hover:scale-110 border border-red-500/50 group"
        title="Quick Exit to Weather.com"
      >
        <span className="text-xl">✕</span>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-mono ml-0 group-hover:ml-2">
          QUICK EXIT
        </span>
      </button>
    </div>
  );
}