"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image"; // Added for Logo integration
import { useIntima } from "../context/IntimaContext";

export default function PayPage() {
  // 1. CONNECT TO GLOBAL BRAIN
  const { balance, transactions, addTransaction, userId } = useIntima();

  // --- LOCAL UI STATE ---
  const [isMaskingActive, setIsMaskingActive] = useState(true);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- TOP UP ENGINE (The Privacy Gateway) ---
  const executeTopUp = () => {
    if (!selectedAmount) return;
    
    setIsProcessing(true);
    
    // Simulate Banking Handshake & Latency
    setTimeout(() => {
      // Determine descriptor based on privacy toggle
      const merchantName = isMaskingActive ? "IH Cloud Services LLC" : "Intima Pay Global";
      
      // EXECUTE GLOBAL TRANSACTION
      addTransaction(merchantName, selectedAmount, 'credit');

      // Reset State
      setIsProcessing(false);
      setShowTopUpModal(false);
      setSelectedAmount(null);
      alert(`Funds Secured. Bank Statement Descriptor: ${isMaskingActive ? "IH_CLOUD_SVS" : "INTIMA_PAY"}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans pb-24 relative overflow-hidden">
      
      {/* BACKGROUND FX */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-900/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* 1. NAVIGATION BAR */}
      <div className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-zinc-800 p-4 flex justify-between items-center px-6">
        <Link 
          href="/"
          className="group border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-purple-500 transition-all flex items-center gap-2"
        >
          <span>←</span> Back to Hub
        </Link>
        
        {/* API STATUS BADGE (RESTORED) */}
        <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800 backdrop-blur-sm shadow-sm">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
            Live_ID: ip_live_99283711
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-28">
        
        {/* HEADER & PRIVACY TOGGLE */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-white bg-clip-text text-transparent mb-2">
              Intima Vault
            </h1>
            <p className="text-gray-400 text-sm">Non-Custodial Assets • Zero-Knowledge Protocol</p>
          </div>

          {/* PRIVACY SWITCH */}
          <button 
            onClick={() => setIsMaskingActive(!isMaskingActive)}
            className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all ${
              isMaskingActive 
                ? "bg-purple-900/20 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]" 
                : "bg-zinc-900 border-zinc-700 opacity-60"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isMaskingActive ? "bg-purple-400 animate-pulse" : "bg-gray-500"}`}></div>
            <span className={`text-xs font-bold uppercase tracking-wider ${isMaskingActive ? "text-purple-300" : "text-gray-500"}`}>
              {isMaskingActive ? "Privacy Shield: ON" : "Shield: OFF"}
            </span>
          </button>
        </div>

        {/* 2. THE GLASS VAULT CARD (ENTERPRISE UPGRADE) */}
        {/* Added: True Glassmorphism & Neon Glow */}
        <div className="relative w-full aspect-[1.8/1] md:aspect-[2.5/1] rounded-3xl overflow-hidden p-8 flex flex-col justify-between mb-12 group transition-all hover:scale-[1.005] shadow-[0_0_40px_rgba(168,85,247,0.15)] border border-white/10">
          
          {/* Glass Effect Layers */}
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-2xl z-0"></div>
          {/* Subtle sheen layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 z-0 pointer-events-none"></div>
          
          {/* Card Content */}
          <div className="relative z-10 flex justify-between items-start">
             <div>
                <span className="block text-gray-400 text-xs font-mono uppercase tracking-widest mb-1">Available Liquidity</span>
                <div className="text-5xl md:text-6xl font-bold text-white tracking-tight flex items-baseline gap-2 text-shadow-sm">
                  {balance.toFixed(2)} 
                  <span className="text-xl text-purple-400 font-normal">INT</span>
                </div>
             </div>
             
             {/* LOGO SWAP (Restored from Emoji to Image) */}
             <div className="w-14 h-14 rounded-full border border-white/20 bg-black/20 flex items-center justify-center backdrop-blur-md overflow-hidden shadow-inner">
               <Image 
                 src="/logo.jpg" 
                 alt="Intima Logo" 
                 width={56} 
                 height={56} 
                 className="object-cover w-full h-full opacity-90"
               />
             </div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-4">
             <div className="font-mono text-gray-500 text-xs tracking-widest uppercase">
               User_ID: <span className="text-gray-300 shadow-purple-500/50">{userId}</span>
             </div>
             
             {/* TOP UP TRIGGER */}
             <button 
               onClick={() => setShowTopUpModal(true)}
               className="w-full md:w-auto bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-purple-400 hover:text-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2 active:scale-95"
             >
               <span>+</span> Add Funds
             </button>
          </div>
        </div>

        {/* 3. IMMUTABLE LEDGER (HISTORY) */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl p-6 min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
               <h2 className="text-xl font-bold text-white">Immutable Ledger</h2>
               <span className="text-[10px] bg-zinc-800 text-gray-500 px-2 py-0.5 rounded border border-zinc-700">REAL-TIME</span>
            </div>
            <button className="text-xs text-gray-500 hover:text-white transition-colors cursor-not-allowed" title="Disabled for Privacy">Export CSV 🔒</button>
          </div>

          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-20 text-gray-600 flex flex-col items-center">
                <span className="text-4xl opacity-20 mb-2">⛓️</span>
                <span>No transactions found on chain.</span>
              </div>
            ) : (
              transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-4 bg-black/40 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-inner ${
                      tx.type === 'credit' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'
                    }`}>
                      {tx.type === 'credit' ? '↓' : '↑'}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors">{tx.merchant}</h4>
                      <p className="text-gray-500 text-xs font-mono">{tx.date} • {tx.status}</p>
                    </div>
                  </div>
                  <div className={`font-mono font-bold ${
                    tx.type === 'credit' ? 'text-green-400' : 'text-white'
                  }`}>
                    {tx.type === 'credit' ? '+' : '-'}{Math.abs(tx.amount).toFixed(2)} INT
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. INSTITUTIONAL FOOTER (RESTORED EXACTLY) */}
        <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center pb-12">
           <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">
             Institutional Infrastructure
           </p>
           <button 
             onClick={() => alert("Intima API Sandbox: Enterprise Access Required.\n\nPlease contact zirive.hnw@gmail.com for API keys.")}
             className="group flex items-center justify-center gap-2 mx-auto text-xs font-mono text-zinc-500 hover:text-purple-400 transition-all border border-transparent hover:border-purple-500/30 px-4 py-2 rounded-full hover:bg-purple-500/10"
           >
             <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
             <span>Developer_API_Docs_v2.0</span>
             <span className="opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
           </button>
        </div>

      </div>

      {/* 5. MODAL: LIQUIDITY INJECTION (Top Up) */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-zinc-900 border border-purple-500/30 w-full max-w-md rounded-2xl p-6 shadow-[0_0_50px_rgba(168,85,247,0.15)] relative overflow-hidden">
             
             {/* Close Button */}
             <button 
               onClick={() => !isProcessing && setShowTopUpModal(false)}
               className="absolute top-4 right-4 text-gray-500 hover:text-white w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800 transition-colors"
             >✕</button>

             <div className="text-center mb-8">
               <h2 className="text-2xl font-bold text-white mb-2">Fiat-to-Token Bridge</h2>
               <p className="text-gray-400 text-xs">
                 Selected Privacy Mode: <span className={`font-mono px-1.5 py-0.5 rounded text-[10px] font-bold ${isMaskingActive ? "bg-purple-900 text-purple-300" : "bg-zinc-800 text-gray-400"}`}>
                   {isMaskingActive ? "ENHANCED (MASKED)" : "STANDARD"}
                 </span>
               </p>
             </div>

             {/* Amount Selection */}
             <div className="grid grid-cols-3 gap-3 mb-8">
               {[50, 100, 250].map((amt) => (
                 <button
                   key={amt}
                   onClick={() => setSelectedAmount(amt)}
                   disabled={isProcessing}
                   className={`py-4 rounded-xl border transition-all font-mono font-bold text-lg ${
                     selectedAmount === amt 
                       ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-900/50' 
                       : 'bg-zinc-800 border-zinc-700 text-gray-400 hover:border-purple-500/50 hover:text-white'
                   }`}
                 >
                   ${amt}
                 </button>
               ))}
             </div>

             {/* Summary */}
             {selectedAmount && (
               <div className="bg-black/50 p-4 rounded-xl mb-6 flex justify-between items-center border border-zinc-800 animate-in slide-in-from-top-2">
                 <span className="text-gray-400 text-sm">You Receive:</span>
                 <span className="text-purple-400 font-mono font-bold text-xl">{selectedAmount}.00 INT</span>
               </div>
             )}

             {/* Action */}
             <button 
               onClick={executeTopUp}
               disabled={!selectedAmount || isProcessing}
               className="w-full bg-white text-black py-4 rounded-xl font-bold hover:bg-purple-400 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-lg"
             >
               {isProcessing ? (
                 <>
                   <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                   <span>Securing Funds...</span>
                 </>
               ) : (
                 "Confirm Secure Transfer"
               )}
             </button>
             
             {/* Security Footer */}
             <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-gray-500 uppercase tracking-widest">
               <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
               256-Bit SSL Encrypted
             </div>
           </div>
        </div>
      )}

    </div>
  );
}