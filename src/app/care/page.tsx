// FORCE_DEPLOY_TRIGGER_FINAL_QA
"use client";

import { useState } from "react";
import Link from "next/link";
// TESTER NOTE: Verified path to context from care subfolder
import { useIntima } from "../context/IntimaContext";

// --- AUDITED PROVIDER DATABASE ---
const PROVIDERS = [
  {
    id: 1,
    name: "Dr. A. Sharma",
    role: "Sexual Health Specialist",
    org: "Apollo Spectra",
    type: "Specialist",
    category: "Physical",
    image: "👨‍⚕️",
    price: 500,
    rating: 4.9,
    bio: "Specialist in reproductive health and confidential patient care.",
    tags: ["PCOS", "Wellness"]
  },
  {
    id: 101,
    name: "Aman-i-Khas",
    role: "Private Eco-Luxury Retreat",
    org: "Ranthambore, India",
    type: "Retreat",
    category: "Travel",
    image: "🏝️",
    price: 15000, 
    rating: 5.0,
    bio: "Ultra-private luxury tents. Rated 10/10 for honeymoon privacy.",
    tags: ["Privacy-Shielded", "Honeymoon"]
  },
  {
    id: 201,
    name: "Metropolis Lab",
    role: "Discrete Diagnostic Center",
    org: "Chennai, TN",
    type: "Clinic",
    category: "Diagnostics",
    image: "🏥",
    price: 1200,
    rating: 4.7,
    bio: "Express anonymous STD & Wellness checkups with results delivered to your Vault.",
    tags: ["Anonymous", "Certified"],
    distance: "2.4 km"
  }
];

export default function CarePage() {
  const { balance, addTransaction } = useIntima();
  
  // State Management
  const [filter, setFilter] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [viewState, setViewState] = useState<'profile' | 'booking' | 'success'>('profile');
  
  // Booking Contexts
  const [selectedSlot, setSelectedSlot] = useState(""); 
  const [stayDuration, setStayDuration] = useState(1);   
  const [generatedVoucher, setGeneratedVoucher] = useState("");

  // Logic: Filter Engine
  const filtered = filter === "All" 
    ? PROVIDERS 
    : PROVIDERS.filter(p => p.category === filter || p.type === filter);

  // Handlers
  const handleCardClick = (provider: any) => {
    setSelectedProvider(provider);
    setViewState('profile');
    setSelectedSlot("");
    setStayDuration(1);
  };

  const calculateTotal = () => {
    if (!selectedProvider) return 0;
    return selectedProvider.type === 'Retreat' 
      ? selectedProvider.price * stayDuration 
      : selectedProvider.price;
  };

  const proceedToBooking = () => {
    const total = calculateTotal();
    if (balance < total) {
      alert(`Insufficient INT. You need ${total - balance} more INT.`);
      return;
    }
    setViewState('booking');
  };

  const confirmBooking = () => {
    const total = calculateTotal();
    const voucherPrefix = selectedProvider.type === 'Clinic' ? 'LAB' : 'VAULT';
    const newVoucher = `${voucherPrefix}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    setGeneratedVoucher(newVoucher);
    
    // Global State Sync
    const transactionDesc = `${selectedProvider.type} Voucher: ${selectedProvider.name}`;
    addTransaction(transactionDesc, total, 'debit');
    
    setViewState('success');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans p-6 pb-24">
      {/* 1. NAVIGATION */}
      <Link href="/" className="fixed top-5 left-5 z-[40] bg-zinc-900/80 backdrop-blur-md border border-zinc-700 px-4 py-2 rounded-full text-sm hover:border-green-500 transition-all shadow-lg flex items-center gap-2">
        <span>←</span> Back to Hub
      </Link>
        
      {/* 2. HEADER */}
      <header className="mt-16 mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2">Intima-Care</h1>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800">
           <span className="text-[10px] text-green-400 font-mono tracking-widest uppercase">Vault: {balance.toFixed(0)} INT</span>
        </div>
      </header>

      {/* 3. CATEGORY FILTERS */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {["All", "Physical", "Mental", "Travel", "Diagnostics"].map((cat) => (
          <button key={cat} onClick={() => setFilter(cat)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${filter === cat ? "bg-green-600 text-white shadow-lg" : "bg-zinc-900 text-gray-500 border border-zinc-800 hover:text-white"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* 4. PROVIDER GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {filtered.map((item) => (
          <div key={item.id} onClick={() => handleCardClick(item)} className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 flex items-center gap-4 hover:border-green-500/50 transition-all cursor-pointer group relative overflow-hidden">
            <div className="text-4xl group-hover:scale-110 transition-transform">{item.image}</div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white group-hover:text-green-400">{item.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] bg-zinc-800 text-gray-400 px-2 py-0.5 rounded uppercase">{item.type}</span>
                {item.distance && <span className="text-[10px] text-blue-400 font-mono">📍 {item.distance}</span>}
              </div>
            </div>
            <div className="text-right">
              <p className="text-green-400 font-mono font-bold">{item.price} INT</p>
              <p className="text-[8px] text-gray-600 uppercase tracking-tighter">{item.type === 'Retreat' ? 'per night' : 'fixed fee'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 5. MULTI-MODE BOOKING MODAL */}
      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md rounded-3xl overflow-hidden relative flex flex-col max-h-[90vh]">
            <button onClick={() => setSelectedProvider(null)} className="absolute top-4 right-4 z-20 text-gray-400 hover:text-white">✕</button>

            {/* Profile View */}
            {viewState === 'profile' && (
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-5xl">{selectedProvider.image}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedProvider.name}</h2>
                    <p className="text-green-400 text-xs font-mono tracking-widest uppercase">{selectedProvider.type}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-8">{selectedProvider.bio}</p>
                <button onClick={proceedToBooking} className="w-full bg-green-600 py-4 rounded-xl font-bold hover:bg-green-500 transition-all">Book Now</button>
              </div>
            )}

            {/* Booking Config View */}
            {viewState === 'booking' && (
              <div className="p-6">
                <h3 className="text-xl font-bold mb-6 text-center">Confirm Details</h3>
                
                {selectedProvider.type === 'Retreat' ? (
                  <div className="space-y-4">
                    <p className="text-[10px] text-gray-500 uppercase text-center tracking-widest">Select Nights</p>
                    <div className="bg-black p-4 rounded-2xl border border-zinc-800 flex justify-between items-center">
                      <button onClick={() => setStayDuration(Math.max(1, stayDuration - 1))} className="w-10 h-10 bg-zinc-800 rounded-full text-xl">-</button>
                      <span className="text-3xl font-bold font-mono">{stayDuration}</span>
                      <button onClick={() => setStayDuration(stayDuration + 1)} className="w-10 h-10 bg-zinc-800 rounded-full text-xl">+</button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-black p-6 rounded-2xl border border-zinc-800 text-center">
                    <p className="text-green-400 font-mono text-sm tracking-widest uppercase">Secure Voucher Generation</p>
                    <p className="text-[10px] text-gray-500 mt-2 italic">Standardized anonymous intake protocol active.</p>
                  </div>
                )}

                <div className="mt-8 border-t border-zinc-800 pt-6">
                  <div className="flex justify-between mb-4">
                    <span className="text-xs text-gray-500 uppercase">Subtotal</span>
                    <span className="text-green-400 font-bold font-mono">{calculateTotal()} INT</span>
                  </div>
                  <button onClick={confirmBooking} className="w-full bg-green-600 py-4 rounded-xl font-bold hover:shadow-[0_0_25px_rgba(34,197,94,0.3)]">Authorize Payment</button>
                </div>
              </div>
            )}

            {/* Final Success View */}
            {viewState === 'success' && (
              <div className="p-10 text-center animate-in zoom-in-95 duration-300">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-[0_0_40px_rgba(34,197,94,0.4)]">✓</div>
                <h3 className="text-2xl font-bold mb-2">Voucher Secured</h3>
                <p className="text-gray-500 text-xs mb-8">Funds held in Escrow. Your anonymous credential has been forged.</p>
                <div className="p-4 bg-zinc-800 rounded-2xl border border-dashed border-zinc-600 font-mono">
                  <p className="text-[10px] text-gray-500 uppercase mb-1 tracking-widest">Digital Identifier</p>
                  <p className="text-xl text-green-400 font-bold tracking-[0.2em]">{generatedVoucher}</p>
                </div>
                <button onClick={() => setSelectedProvider(null)} className="mt-8 text-[10px] text-gray-500 hover:text-white uppercase tracking-widest transition-colors">Return to Dashboard</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}