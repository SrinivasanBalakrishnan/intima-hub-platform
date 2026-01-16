"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; 
import { useIntima } from "./context/IntimaContext";
// Ensure this file exists from Step 1
import { generateMnemonic } from "./utils/security"; 

export default function Home() {
  // 1. CONNECT TO GLOBAL BRAIN
  const { isAuthenticated, login, logout, userId } = useIntima();
  
  // --- UI STATES ---
  // view: 'intro' = Start Screen
  // 'processing' = Matrix Animation
  // 'reveal' = 12-Word Key Display
  // 'restore' = Login Screen
  // 'hub' = The Main App
  const [view, setView] = useState<'intro' | 'processing' | 'reveal' | 'restore' | 'hub'>('intro');
  
  // Data for the flow
  const [tempMnemonic, setTempMnemonic] = useState("");
  const [restoreInput, setRestoreInput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  // --- EFFECT: Handle Login State Sync ---
  // If the Context says we are logged in (from persistence), go to Hub immediately.
  useEffect(() => {
    if (isAuthenticated) {
      setView('hub');
    } else {
      // If we logout or start fresh, go to intro
      if (view === 'hub') setView('intro');
    }
  }, [isAuthenticated]);

  // --- ACTIONS ---

  // A. GENERATE NEW IDENTITY FLOW
  const startGeneration = () => {
    setView('processing');
    
    // 1. Generate the secret keys immediately
    const secret = generateMnemonic();
    setTempMnemonic(secret);

    // 2. Play the "Privacy Theater" animation for 2.5s (Retaining existing feature)
    setTimeout(() => {
      setView('reveal'); // Move to Step 3 (The Vault Reveal)
    }, 2500);
  };

  // B. CONFIRM AND ENTER HUB
  const confirmIdentity = () => {
    if (isCopied) {
      login(tempMnemonic); // Logs in with the generated phrase
    }
  };

  // C. RESTORE SESSION FLOW
  const handleRestore = () => {
    const success = login(restoreInput.toLowerCase().trim());
    if (!success) {
      alert("Invalid phrase. Please check your 12 words and try again.");
    }
  };

  // D. LOGOUT
  const handleLogout = () => {
    logout();
    setView('intro');
    setTempMnemonic("");
    setRestoreInput("");
    setIsCopied(false);
  };

  // ---------------------------------------------------------
  // RENDER: THE HUB (When Authenticated)
  // ---------------------------------------------------------
  if (view === 'hub') {
    return (
      <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-700">
        
        {/* IDENTITY BADGE & EXIT */}
        <div className="absolute top-6 right-6 z-20 flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-full shadow-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] text-gray-400 font-mono tracking-wider">{userId}</span>
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

        {/* HEADER (No Logo, Clean Look) */}
        <div className="mb-12 mt-20 md:mt-0 text-center relative z-10 flex flex-col items-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-tight">
            Intima Hub
          </h1>
          <p className="text-gray-400 text-lg tracking-wide">
            The Quantum-Secured Sexual Wellness Ecosystem
          </p>
          
          <button 
            onClick={() => setShowSecurity(true)}
            className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-900/10 border border-green-900/50 text-green-400 text-sm font-medium hover:bg-green-900/20 hover:scale-105 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500/50"
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
          <Link href="/bot" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-blue-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col gap-4 cursor-pointer">
            <div className="absolute top-4 right-4 text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded shadow-lg">LIVE</div>
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🤖</div>
            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Intima-Bot</h2>
              <p className="text-gray-400 text-sm mt-1">Your AI wellness assistant. Ask anonymously.</p>
            </div>
          </Link>

          <Link href="/shop" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-pink-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] flex flex-col gap-4 cursor-pointer">
            <div className="absolute top-4 right-4 text-xs font-bold bg-pink-600 text-white px-2 py-1 rounded shadow-lg">NEW</div>
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🛒</div>
            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">Shop</h2>
              <p className="text-gray-400 text-sm mt-1">Biodegradable condoms & sustainable lubricants.</p>
            </div>
          </Link>

          <Link href="/care" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-green-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col gap-4 cursor-pointer">
            <div className="absolute top-4 right-4 text-xs font-bold bg-green-600 text-white px-2 py-1 rounded shadow-lg">OPEN</div>
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🩺</div>
            <div>
              <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">Care</h2>
              <p className="text-gray-400 text-sm mt-1">Anonymous consultation with verified specialists.</p>
            </div>
          </Link>

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

  // ---------------------------------------------------------
  // RENDER: THE ONBOARDING FLOW (Intro, Processing, Reveal, Restore)
  // ---------------------------------------------------------
  return (
    <div className="min-h-screen bg-black text-gray-100 font-mono flex flex-col items-center justify-center p-6 relative overflow-hidden animate-in fade-in duration-500">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

      <div className="relative z-10 max-w-lg w-full text-center">
        
        {/* LOGO (Always Visible in Onboarding) */}
        <div className="w-24 h-24 bg-zinc-900 border border-zinc-700 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(34,197,94,0.1)] overflow-hidden relative">
            <Image 
               src="/logo.jpg" 
               alt="Intima Hub Logo" 
               width={100} 
               height={100} 
               className="object-cover w-full h-full"
               priority
             />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-600 mb-4 tracking-tighter">
          INTIMA HUB
        </h1>
        
        <p className="text-gray-500 text-sm md:text-base mb-12 max-w-sm mx-auto leading-relaxed">
          The Privacy-Native Operating System for Intimate Health. 
          <span className="block text-gray-600 mt-2 text-xs uppercase tracking-widest font-bold">No Email. No Names. Zero Trace.</span>
        </p>

        {/* DYNAMIC CONTENT AREA */}
        <div className="min-h-[200px] flex flex-col items-center justify-center w-full">
          
          {/* STATE 1: INTRO (Choice) */}
          {view === 'intro' && (
            <div className="flex flex-col gap-4 w-full max-w-xs">
              <button 
                onClick={startGeneration}
                className="group relative px-8 py-4 bg-white text-black font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-95"
              >
                Generate New Identity
              </button>
              <button 
                onClick={() => setView('restore')}
                className="text-gray-500 hover:text-white text-sm hover:underline transition-all"
              >
                Restore Existing Session
              </button>
            </div>
          )}

          {/* STATE 2: PROCESSING (Animation) */}
          {view === 'processing' && (
            <div className="space-y-4 w-full max-w-xs">
              <div className="w-full bg-zinc-900 rounded-full h-1.5 overflow-hidden border border-zinc-800">
                <div className="bg-green-500 h-full w-2/3 animate-[shimmer_1s_infinite]"></div>
              </div>
              <div className="text-xs text-green-500 font-mono flex flex-col gap-1 items-start pl-2">
                <span className="animate-pulse">&gt; Generating RSA-4096 Keys...</span>
                <span className="animate-pulse delay-75">&gt; Hashing IP Address...</span>
                <span className="animate-pulse delay-150">&gt; Allocating Non-Custodial Vault...</span>
              </div>
            </div>
          )}

          {/* STATE 3: REVEAL (The New Vault Screen) */}
          {view === 'reveal' && (
            <div className="animate-in fade-in zoom-in duration-300 w-full">
              <div className="bg-zinc-900 border border-yellow-500/30 p-6 rounded-xl mb-4 text-left relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500/50"></div>
                <h3 className="text-yellow-400 font-bold text-sm uppercase tracking-widest mb-2">⚠️ Secret Recovery Key</h3>
                <p className="text-gray-400 text-xs mb-4">
                  This is the <b className="text-white">only way</b> to recover your funds if you disconnect. Save these 12 words.
                </p>
                
                <div className="bg-black p-4 rounded-lg border border-zinc-800 font-mono text-green-400 text-sm break-words leading-relaxed select-all">
                  {tempMnemonic}
                </div>
              </div>

              <div 
                onClick={() => setIsCopied(!isCopied)}
                className="flex items-center gap-3 mb-6 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isCopied ? "bg-green-500 border-green-500" : "border-gray-500"}`}>
                  {isCopied && <span className="text-black text-xs font-bold">✓</span>}
                </div>
                <span className={`text-sm ${isCopied ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
                  I have saved my recovery key safe.
                </span>
              </div>

              <button 
                onClick={confirmIdentity}
                disabled={!isCopied}
                className="w-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-bold border border-zinc-700 transition-all flex items-center justify-center gap-2 hover:border-green-500"
              >
                Enter Secure Hub ➜
              </button>
            </div>
          )}

          {/* STATE 4: RESTORE (Login Screen) */}
          {view === 'restore' && (
            <div className="animate-in fade-in zoom-in duration-300 w-full max-w-xs">
              <h3 className="text-white font-bold mb-4">Restore Session</h3>
              <textarea 
                value={restoreInput}
                onChange={(e) => setRestoreInput(e.target.value)}
                placeholder="Enter your 12-word phrase here..."
                className="w-full bg-zinc-900 border border-zinc-700 text-white p-4 rounded-xl mb-4 h-32 focus:border-green-500 focus:outline-none text-sm font-mono"
              />
              <div className="flex gap-3">
                <button 
                  onClick={() => setView('intro')}
                  className="flex-1 bg-transparent border border-zinc-700 text-gray-400 py-3 rounded-lg font-bold hover:text-white hover:border-white transition-all"
                >
                  Back
                </button>
                <button 
                  onClick={handleRestore}
                  disabled={restoreInput.length < 10}
                  className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold transition-all disabled:opacity-50"
                >
                  Unlock 🔓
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <div className="absolute bottom-6 text-[10px] text-zinc-600 text-center uppercase tracking-widest">
        Non-Custodial Protocol • Your Keys, Your Data
      </div>
    </div>
  );
}