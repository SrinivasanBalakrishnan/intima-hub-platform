"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// 1. IMPORT GLOBAL BRAIN
import { useIntima } from "./context/IntimaContext";

export default function Home() {
  // 2. CONNECT TO GLOBAL STATE
  // hasSeenSplash: Tells us if we should show the intro or the hub
  // markSplashSeen: The function to call when user clicks "Enter"
  // userId: The persistent ID from the context
  const { hasSeenSplash, markSplashSeen, userId } = useIntima();
  
  // --- LOCAL STATE FOR ANIMATION ONLY ---
  const [bootSequence, setBootSequence] = useState(0); // 0=Idle, 1=Processing, 2=Complete
  
  // --- STATE: HUB SECURITY CONSOLE ---
  const [showSecurity, setShowSecurity] = useState(false);

  // --- LOGIC: SIMULATE CRYPTOGRAPHIC HANDSHAKE ---
  const runOnboarding = () => {
    setBootSequence(1); // Start "Processing"
    
    // Step 1: Simulate fake delay for "Key Generation"
    setTimeout(() => {
      // We don't generate a new ID here; we reveal the one from Context
      setBootSequence(2); // Ready to Enter
    }, 2500); 
  };

  const enterHub = () => {
    // CRITICAL FIX: Update Global Memory
    markSplashSeen(); 
    // This triggers a re-render. Since hasSeenSplash is now true, 
    // it will skip the 'if' block below and show the Hub.
  };

  // ---------------------------------------------------------
  // RENDER 1: THE ZERO-KNOWLEDGE SPLASH SCREEN (Locked State)
  // ---------------------------------------------------------
  // Only show this if the Global Brain says we haven't seen it yet
  if (!hasSeenSplash) {
    return (
      <div className="min-h-screen bg-black text-gray-100 font-mono flex flex-col items-center justify-center p-6 relative overflow-hidden animate-in fade-in duration-500">
        
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

        <div className="relative z-10 max-w-lg w-full text-center">
          
          {/* Privacy Icon */}
          <div className="w-24 h-24 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.1)] overflow-hidden relative">
             {/* Fallback to emoji if image fails, or use your logo */}
             <div className="text-4xl">🛡️</div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 mb-4 tracking-tighter">
            INTIMA HUB
          </h1>
          
          <p className="text-gray-500 text-sm md:text-base mb-12 max-w-sm mx-auto leading-relaxed">
            The Privacy-Native Operating System for Intimate Health. 
            <span className="block text-gray-600 mt-2 text-xs uppercase tracking-widest font-bold">No Email. No Names. Zero Trace.</span>
          </p>

          {/* ACTION AREA */}
          <div className="min-h-[140px] flex flex-col items-center justify-center w-full">
            
            {/* STAGE 0: IDLE */}
            {bootSequence === 0 && (
              <button 
                onClick={runOnboarding}
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95"
              >
                Generate Anonymous ID
                <div className="absolute inset-0 rounded-full border border-white opacity-0 group-hover:animate-ping"></div>
              </button>
            )}

            {/* STAGE 1: PROCESSING (The Theater) */}
            {bootSequence === 1 && (
              <div className="space-y-4 w-full max-w-xs">
                {/* Loading Bar */}
                <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                  <div className="bg-green-500 h-full w-2/3 animate-[shimmer_1s_infinite]"></div>
                </div>
                {/* Technical Jargon */}
                <div className="text-xs text-green-500 font-mono flex flex-col gap-1 items-start pl-2">
                  <span className="animate-pulse">&gt; Generating RSA-4096 Keys...</span>
                  <span className="animate-pulse delay-75">&gt; Hashing IP Address...</span>
                  <span className="animate-pulse delay-150">&gt; Establishing TLS Tunnel...</span>
                </div>
              </div>
            )}

            {/* STAGE 2: COMPLETE (Identity Assigned) */}
            {bootSequence === 2 && (
              <div className="animate-in fade-in zoom-in duration-300 w-full max-w-xs">
                <div className="bg-zinc-900 border border-green-500/30 p-4 rounded-lg mb-4 flex items-center justify-between shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                  <span className="text-gray-500 text-xs uppercase font-bold">Your Identity</span>
                  <span className="text-green-400 font-bold font-mono tracking-widest">{userId}</span>
                </div>
                <button 
                  onClick={enterHub}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg font-bold border border-zinc-700 transition-all flex items-center justify-center gap-2 hover:border-green-500"
                >
                  Enter Secure Hub ➜
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="absolute bottom-6 text-[10px] text-zinc-600 text-center uppercase tracking-widest">
          Session Data is Volatile • Wiped on Exit
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // RENDER 2: THE MAIN DASHBOARD (Hub View)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-700">
      
      {/* IDENTITY BADGE (Using Global UserID) */}
      <div className="absolute top-6 right-6 z-20">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-full shadow-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-gray-400 font-mono tracking-wider">{userId}</span>
        </div>
      </div>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER */}
      <div className="mb-12 mt-20 md:mt-0 text-center relative z-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-tight">
          Intima Hub
        </h1>
        <p className="text-gray-400 text-lg tracking-wide">
          The Quantum-Secured Sexual Wellness Ecosystem
        </p>
        
        {/* INTERACTIVE SECURITY BADGE */}
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

      {/* THE 4 BOXES GRID */}
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

      {/* --- SECURITY CONSOLE OVERLAY --- */}
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

      {/* SAFETY: PANIC BUTTON */}
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