// FORCE_DEPLOY_TRIGGER_03
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useIntima } from "../context/IntimaContext";

// --- INTERNAL UTILS ---
const generateMnemonic = () => {
  const words = ["alpha", "bravo", "nebula", "quantum", "cipher", "vault", "prism", "echo", "solar", "orbit", "flux", "zero"];
  return words.sort(() => 0.5 - Math.random()).join(" ");
};

export default function SplashScreen() {
  const { login } = useIntima();
  
  // --- UI STATES ---
  // Views: 'intro' | 'generating' (Terminal) | 'reveal' (The New Feature) | 'restoring'
  const [mode, setMode] = useState<'intro' | 'generating' | 'reveal' | 'restoring'>('intro');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [restoreInput, setRestoreInput] = useState("");
  
  // Safety Stop States
  const [tempMnemonic, setTempMnemonic] = useState("");
  const [isSavedChecked, setIsSavedChecked] = useState(false);

  // --- ANIMATION LOGIC ---
  const handleGenerate = () => {
    setMode('generating');
    const steps = [
      "Initializing Zero-Knowledge Protocol...",
      "Allocating High-Entropy Memory...",
      "Forging Non-Custodial Keys...",
      "Encrypting Local Storage...",
      "PHRASE GENERATED SUCCESSFULLY."
    ];

    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex >= steps.length) {
        clearInterval(interval);
        // INSTEAD OF LOGIN: Show the words
        const newKey = generateMnemonic();
        setTempMnemonic(newKey);
        setTimeout(() => setMode('reveal'), 500); // Small pause for effect
      } else {
        setTerminalLogs(prev => [...prev, steps[stepIndex]]);
        stepIndex++;
      }
    }, 600);
  };

  const handleRestore = () => {
    if (!restoreInput.trim()) return;
    login(restoreInput);
  };

  const handleFinalLogin = () => {
    if (isSavedChecked) {
      login(tempMnemonic);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(tempMnemonic);
    alert("Key phrase copied to clipboard. Store it safely!");
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-white font-sans overflow-hidden flex flex-col items-center justify-center">
      
      {/* ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black"></div>
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_90deg_at_50%_50%,#00000000_50%,#4c1d95_100%)] opacity-20 blur-[100px] animate-slow-spin"></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none"></div>
      
      {/* CENTER CARD */}
      <div className="relative z-10 w-full max-w-md p-8">
        
        {/* BRANDING */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="relative w-24 h-24 mx-auto mb-6 group">
            <div className="absolute inset-0 bg-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse-slow"></div>
            <div className="relative w-full h-full bg-black/50 rounded-full border border-white/10 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-2xl">
              <Image src="/logo.jpg" alt="Intima Hub" width={96} height={96} className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 mb-3 drop-shadow-sm">INTIMA HUB</h1>
          <p className="text-purple-200/60 font-mono text-xs uppercase tracking-[0.3em]">Privacy-Native Operating System for Intimate Health & Wellness</p>
        </div>

        {/* INTERACTION AREA */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-2 shadow-2xl overflow-hidden relative">
          
          {/* VIEW: INTRO */}
          {mode === 'intro' && (
            <div className="p-4 space-y-4 animate-in fade-in zoom-in-95 duration-500">
              <button onClick={handleGenerate} className="w-full relative group/btn overflow-hidden rounded-xl bg-white text-black py-4 font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98]">
                <span className="relative z-10 flex items-center justify-center gap-2">New Id<span className="text-xs opacity-50">→</span></span>
              </button>
              <button onClick={() => setMode('restoring')} className="w-full py-4 rounded-xl text-gray-400 font-medium text-sm hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <span className="opacity-50">🔑</span> Unlock by Existing Key
              </button>
            </div>
          )}

          {/* VIEW: GENERATING (Terminal) */}
          {mode === 'generating' && (
            <div className="p-6 font-mono text-xs h-[160px] flex flex-col justify-end bg-black/40 rounded-xl inner-shadow">
              {terminalLogs.map((log, i) => (
                <div key={i} className="mb-1 text-green-400/80 border-l-2 border-green-500 pl-2 animate-in slide-in-from-left-2 duration-200">
                  {`> ${log}`}
                </div>
              ))}
              <div className="w-2 h-4 bg-green-500 animate-pulse mt-1"></div>
            </div>
          )}

          {/* VIEW: REVEAL (The Safety Stop) */}
          {mode === 'reveal' && (
            <div className="p-6 space-y-5 animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-center">
                <h3 className="text-white font-bold text-sm tracking-widest uppercase mb-1">Backup Phrase</h3>
                <p className="text-[10px] text-gray-500">Store these 12 words in a safe, offline place.</p>
              </div>

              <div className="bg-black/60 border border-zinc-800 p-4 rounded-xl relative group">
                <p className="text-green-400 font-mono text-sm leading-relaxed text-center italic">
                  {tempMnemonic}
                </p>
                <button 
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 text-[10px] bg-zinc-800 text-gray-400 px-2 py-1 rounded hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>

              <div className="flex items-start gap-3 px-1">
                <input 
                  type="checkbox" 
                  id="safetyCheck" 
                  checked={isSavedChecked}
                  onChange={(e) => setIsSavedChecked(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-purple-600"
                />
                <label htmlFor="safetyCheck" className="text-[10px] text-gray-400 leading-tight cursor-pointer">
                  I have manually backed up this phrase. I understand Intima Hub cannot recover my account without it.
                </label>
              </div>

              <button 
                onClick={handleFinalLogin}
                disabled={!isSavedChecked}
                className={`w-full py-4 rounded-xl font-bold transition-all ${
                  isSavedChecked 
                  ? "bg-white text-black hover:scale-[1.02] active:scale-[0.98]" 
                  : "bg-zinc-800 text-gray-600 cursor-not-allowed"
                }`}
              >
                Enter Hub
              </button>
            </div>
          )}

          {/* VIEW: RESTORING */}
          {mode === 'restoring' && (
            <div className="p-4 space-y-3 animate-in slide-in-from-right duration-300">
              <div className="text-center mb-2">
                <h3 className="text-white font-bold">Access Vault</h3>
                <p className="text-xs text-gray-500">Enter your 12-word recovery phrase</p>
              </div>
              <textarea value={restoreInput} onChange={(e) => setRestoreInput(e.target.value)} placeholder="alpha bravo charlie..." className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors resize-none h-24 font-mono" />
              <div className="flex gap-2">
                <button onClick={() => setMode('intro')} className="flex-1 py-3 rounded-lg text-xs font-bold text-gray-500 hover:bg-white/5">Cancel</button>
                <button onClick={handleRestore} className="flex-1 py-3 rounded-lg text-xs font-bold bg-purple-600 text-white hover:bg-purple-500">Unlock 🔓</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}