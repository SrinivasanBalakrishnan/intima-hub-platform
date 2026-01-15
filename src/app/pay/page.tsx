"use client";

import { useState } from "react";

// --- MOCK TRANSACTION DATA ---
// Represents the initial state of the user's secure ledger
const INITIAL_TRANSACTIONS = [
  { 
    id: "txn_3928472910", 
    descriptor: "Intima-Shop Order", 
    merchant: "Intima Shop Decentralized",
    amount: -12.99, 
    date: "Today, 10:30 AM", 
    status: "Completed",
    type: "spend",
    icon: "🛒",
    iconColor: "bg-green-900/30 text-green-400"
  },
  { 
    id: "txn_88129381", 
    descriptor: "Dr. Sharma Consult", 
    merchant: "Intima Care Platform",
    amount: -50.00, 
    date: "Yesterday", 
    status: "Completed",
    type: "spend",
    icon: "🩺",
    iconColor: "bg-blue-900/30 text-blue-400"
  }
];

export default function PayPage() {
  // --- STATE MANAGEMENT ---
  const [balance, setBalance] = useState(2450.00);
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [isMaskingActive, setIsMaskingActive] = useState(true);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // --- TOP UP ENGINE (The Privacy Gateway) ---
  const executeTopUp = (amount: number) => {
    setIsProcessing(true);
    
    // Simulate API Latency & Banking Handshake
    setTimeout(() => {
      const newTxn = {
        id: `txn_masked_${Math.floor(Math.random() * 10000)}`,
        // If Masking is ON, show generic name. If OFF, show Intima Pay.
        descriptor: isMaskingActive ? "Wallet Load (Masked)" : "Intima Pay Load",
        merchant: isMaskingActive ? "IH Cloud Services LLC" : "Intima Pay Global",
        amount: amount,
        date: "Just Now",
        status: "Settled",
        type: "credit",
        icon: "💳",
        iconColor: "bg-purple-900/30 text-purple-400"
      };

      setBalance(prev => prev + amount);
      setTransactions([newTxn, ...transactions]); // Add to top of list
      setIsProcessing(false);
      setShowTopUpModal(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative p-6 pb-20">
      
      {/* 1. BACK BUTTON (Preserved from your original code) */}
      <button
        onClick={() => window.location.href = '/'}
        className="fixed top-5 left-5 z-[9999] group bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-purple-500 transition-all shadow-lg flex items-center gap-2"
      >
        <span>←</span> Back to Hub
      </button>

      {/* 2. ENTERPRISE HEADER */}
      <header className="mt-16 mb-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent mb-2">
          Intima-Pay
        </h1>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-gray-400">Quantum-Encrypted Wallet.</p>
          
          {/* API Key Badge (New Enterprise Feature) */}
          <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-zinc-800">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
              Live_ID: ip_live_99283711
            </span>
          </div>
        </div>
      </header>

      {/* 3. MAIN DASHBOARD */}
      <div className="max-w-md mx-auto relative">
        
        {/* PRIVACY TOGGLE SWITCH */}
        <div className="flex justify-end mb-4">
          <button 
            onClick={() => setIsMaskingActive(!isMaskingActive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
              isMaskingActive 
                ? "bg-purple-900/20 border-purple-500/50" 
                : "bg-zinc-900 border-zinc-700 opacity-60"
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${isMaskingActive ? "bg-purple-400 shadow-[0_0_10px_#a855f7]" : "bg-gray-500"}`}></div>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isMaskingActive ? "text-purple-300" : "text-gray-500"}`}>
              {isMaskingActive ? "Privacy Shield: ON" : "Shield: OFF"}
            </span>
          </button>
        </div>

        {/* WALLET CARD (Enhanced) */}
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 shadow-2xl border border-purple-700/50 mb-8 relative overflow-hidden group">
          {/* Holographic BG Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/20 rounded-full blur-3xl -ml-5 -mb-5 pointer-events-none"></div>
          
          <div className="flex justify-between items-start mb-1">
            <p className="text-purple-200 text-sm">Total Privacy Balance</p>
            <span className="text-xl opacity-80">💳</span>
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-6 font-mono tracking-tight">
            {balance.toFixed(2)} <span className="text-lg opacity-60">INT</span>
          </h2>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setShowTopUpModal(true)}
              className="flex-1 bg-white/20 hover:bg-white/30 text-white py-3 rounded-xl text-sm font-bold backdrop-blur-sm transition-all active:scale-95 shadow-lg"
            >
              + Add Funds
            </button>
            <button className="flex-1 bg-black/20 hover:bg-black/30 text-white py-3 rounded-xl text-sm font-medium backdrop-blur-sm transition-all border border-white/10">
              Transfer
            </button>
          </div>
        </div>

        {/* TRANSACTIONS LIST */}
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-4 ml-2 flex justify-between items-center">
          <span>Recent Activity</span>
          <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded text-gray-500">REAL-TIME</span>
        </h3>
        
        <div className="space-y-3 pb-8">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-zinc-900/50 p-4 rounded-xl flex justify-between items-center border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`${tx.iconColor} p-2 rounded-lg text-lg`}>{tx.icon}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white text-sm font-medium">{tx.descriptor}</p>
                    {tx.type === 'credit' && isMaskingActive && (
                      <span className="text-[9px] bg-zinc-800 text-gray-500 px-1 rounded border border-zinc-700">MASKED</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs">{tx.date} • {tx.merchant}</p>
                </div>
              </div>
              <span className={`font-mono font-bold ${tx.type === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                {tx.type === 'credit' ? '+' : '-'} {Math.abs(tx.amount).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

{/* --- B2B ENTERPRISE API SIGNAL --- */}
        <div className="mt-8 pt-6 border-t border-zinc-800 text-center pb-12">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Institutional Infrastructure</p>
          <button 
            onClick={() => alert("Intima API Sandbox: Enterprise Access Required.\n\nPlease contact institutional_sales@intima.io for API keys.")}
            className="group flex items-center justify-center gap-2 mx-auto text-xs font-mono text-zinc-500 hover:text-purple-400 transition-all border border-transparent hover:border-purple-500/30 px-4 py-2 rounded-full hover:bg-purple-500/10"
          >
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
            <span>Developer_API_Docs_v2.0</span>
            <span className="opacity-50 group-hover:opacity-100 transition-opacity">↗</span>
          </button>
        </div>
      </div>

      {/* 4. MODAL: LIQUIDITY INJECTION (Top Up) */}
      {showTopUpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-purple-500/30 rounded-2xl w-full max-w-sm p-6 shadow-[0_0_50px_rgba(168,85,247,0.2)] relative overflow-hidden">
            
            {/* Close Button */}
            <button 
              onClick={() => !isProcessing && setShowTopUpModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800"
            >✕</button>

            {/* Modal Content */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-white mb-1">Load Funds</h3>
              <p className="text-gray-400 text-xs">Funds are tokenized 1:1 into INT.</p>
            </div>

            {isProcessing ? (
              <div className="py-8 text-center">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h4 className="text-white font-bold text-sm mb-1">Connecting to Banking Rail...</h4>
                <p className="text-purple-400 text-[10px] font-mono animate-pulse uppercase">
                  Swapping Descriptor to "IH Cloud Services"...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {[50, 100, 250, 500].map((amt) => (
                    <button 
                      key={amt}
                      onClick={() => executeTopUp(amt)}
                      className="bg-zinc-800 hover:bg-purple-900/20 border border-zinc-700 hover:border-purple-500 text-white py-3 rounded-xl font-mono text-lg transition-all focus:scale-95"
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                {/* Privacy Assurance Box */}
                <div className="bg-purple-900/10 border border-purple-500/20 p-3 rounded-xl flex gap-3 items-start mt-2">
                  <div className="text-purple-400 text-lg">🛡️</div>
                  <div>
                    <p className="text-purple-200 text-xs font-bold mb-0.5">Privacy Shield Active</p>
                    <p className="text-purple-400/60 text-[10px] leading-snug">
                      Your bank statement will NOT show "Intima Pay". The charge will appear as "IH Cloud Services LLC".
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}