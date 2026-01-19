// FORCE_DEPLOY_TRIGGER_3D_DEEP_BOOKING_FINAL
"use client";

import { useState } from "react";
import Link from "next/link";
import { useIntima } from "../context/IntimaContext";

// --- THEME & DATA REGISTRY ---
const THEMES: any = {
  Doctors: { color: "blue", text: "text-blue-400", bg: "bg-blue-600", border: "border-blue-500/50", glow: "from-blue-900/20" },
  Destinations: { color: "purple", text: "text-purple-400", bg: "bg-purple-600", border: "border-purple-500/50", glow: "from-purple-900/20" },
  Diagnostics: { color: "green", text: "text-green-400", bg: "bg-green-600", border: "border-green-500/50", glow: "from-green-900/20" }
};

// --- DATASETS ---
const DOCTORS = [
  { id: 1, name: "Dr. A. Sharma", role: "Specialist", org: "Apollo Spectra", type: "Doctor", image: "👨‍⚕️", price: 500, rating: 4.9, bio: "Certified Sexual Health Specialist with 12+ years experience.", verified: true },
  { id: 2, name: "Dr. Sarah J.", role: "Psychologist", org: "Mindful Space", type: "Doctor", image: "👩‍⚕️", price: 650, rating: 5.0, bio: "Expert in intimacy and relationship wellness coaching.", verified: true },
  { id: 3, name: "Dr. K. Lee", role: "Urologist", org: "Fortis Malar", type: "Doctor", image: "👨‍⚕️", price: 800, rating: 4.8, bio: "Expert in male sexual wellness and hormonal balance.", verified: true }
];

const DESTINATIONS = [
  { 
    id: 101, name: "Maldives", type: "Escape", image: "🏝️", 
    hotels: [
      { name: "Soneva Fushi", price: 15000, rating: 5.0, bio: "Ultra-private island retreat." },
      { name: "Aman Maldives", price: 18000, rating: 4.9, bio: "Minimalist luxury, maximum privacy." },
      { name: "Velaa Private Island", price: 22000, rating: 5.0, bio: "Discrete luxury for high-profile guests." }
    ] 
  },
  { 
    id: 105, name: "Spain", type: "Escape", image: "🇪🇸", 
    hotels: [
      { name: "Mandarin Oriental, Barcelona", price: 7000, rating: 4.8, bio: "Gothic heart, modern luxury." },
      { name: "Marbella Club Hotel", price: 9000, rating: 4.9, bio: "Beachfront fincas with private pools." },
      { name: "Hotel Alfonso XIII", price: 6500, rating: 4.7, bio: "Sevillian heritage with complete anonymity." }
    ] 
  }
];

const DIAGNOSTICS = [
  { id: 201, name: "Metropolis Lab", role: "Wellness", org: "Main Center", image: "🏥", price: 1200, rating: 4.7, bio: "Leading chain for anonymous STD and wellness panels.", distance: "2.4 km" },
  { id: 202, name: "Apollo Diagnostics", role: "Bio-Tech", org: "District Lab", image: "🔬", price: 1500, rating: 4.6, bio: "High-accuracy hormonal screening with zero-ID protocol.", distance: "4.1 km" },
  { id: 203, name: "Wellness PathLabs", role: "Precision", org: "Central Lab", image: "🧪", price: 1100, rating: 4.5, bio: "Specialized in metabolic and intimate health checkups.", distance: "1.8 km" }
];

export default function CarePage() {
  const { balance, addTransaction } = useIntima();
  const [activeTab, setActiveTab] = useState<'Doctors' | 'Destinations' | 'Diagnostics'>('Doctors');
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [viewState, setViewState] = useState<'profile' | 'selection' | 'booking' | 'success'>('profile');
  
  // Booking Contexts
  const [stayDuration, setStayDuration] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [selectedHotel, setSelectedHotel] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [generatedId, setGeneratedId] = useState("");

  const theme = THEMES[activeTab];

  const handleOpen = (item: any) => {
    setSelectedProvider(item);
    setViewState('profile');
    setSelectedHotel(null);
    setStayDuration(1);
    setGuestCount(1);
    setSelectedSlot("");
  };

  const calculateTotal = () => {
    if (activeTab === 'Destinations' && selectedHotel) return selectedHotel.price * stayDuration;
    return selectedProvider?.price || 0;
  };

  const executeOrder = () => {
    const total = calculateTotal();
    if (balance < total) { 
        alert("Insufficient INT Liquidity. Redirecting to Vault..."); 
        window.location.href = "/pay"; 
        return; 
    }
    const prefix = activeTab === 'Doctors' ? 'SEC' : activeTab === 'Destinations' ? 'VLT' : 'LAB';
    const newId = `${prefix}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setGeneratedId(newId);
    addTransaction(`${activeTab}: ${selectedHotel?.name || selectedProvider.name}`, total, 'debit');
    setViewState('success');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 pb-32 relative overflow-hidden transition-all duration-700">
      
      {/* ATMOSPHERE */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${theme.glow} via-black to-black transition-all duration-1000`}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <Link href="/" className={`fixed top-5 left-5 z-[50] bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full text-[10px] font-black tracking-widest transition-all hover:${theme.text} hover:scale-105`}>← BACK TO HUB</Link>
      
      <header className="relative z-10 mt-16 mb-12 text-center">
        <h1 className={`text-6xl font-black tracking-tighter uppercase italic mb-4 transition-colors ${theme.text}`}>Intima-Care</h1>
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
           <span className={`w-2 h-2 rounded-full animate-pulse ${theme.bg}`}></span>
           <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest tracking-[0.2em]">Vault Balance: {balance.toFixed(0)} INT</span>
        </div>
      </header>

      {/* 3D TABS */}
      <div className="relative z-10 flex justify-center gap-3 mb-16 no-scrollbar overflow-x-auto pb-4">
        {(['Doctors', 'Destinations', 'Diagnostics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSelectedProvider(null); }}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all border-2 whitespace-nowrap ${activeTab === tab ? `${THEMES[tab].bg} text-white border-transparent scale-110 shadow-2xl` : "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300"}`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* PROVIDER GRID - TS FIX APPLIED */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {(activeTab === 'Doctors' ? DOCTORS : activeTab === 'Destinations' ? DESTINATIONS : DIAGNOSTICS).map((item: any) => (
          <div key={item.id} onClick={() => handleOpen(item)} className={`group bg-zinc-900/20 backdrop-blur-xl border ${theme.border} rounded-[32px] p-8 hover:scale-[1.02] transition-all cursor-pointer overflow-hidden shadow-2xl`}>
            <div className="flex items-start gap-6">
              <div className="text-5xl shrink-0 group-hover:rotate-12 transition-transform">{item.image}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                   <h3 className="text-2xl font-black">{item.name}</h3>
                   {item.verified && <span className="text-blue-400 text-sm">✓</span>}
                </div>
                <div className="flex items-center gap-2 mb-4">
                   <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase bg-white/5 text-zinc-400 border border-white/10">{item.rating || "5.0"} ★</span>
                   {item.distance && <span className="text-[10px] text-zinc-400 font-mono italic">📍 {item.distance}</span>}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xl font-black ${theme.text}`}>{item.price ? `${item.price} INT` : 'EXPLORE'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DYNAMIC MODAL ENGINE */}
      {selectedProvider && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className={`bg-zinc-900 border ${theme.border} w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]`}>
            <button onClick={() => setSelectedProvider(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white text-2xl z-50">✕</button>
            <div className="overflow-y-auto no-scrollbar p-12">
              
              {/* VIEW 1: PROFILE */}
              {viewState === 'profile' && (
                <div>
                  <div className="text-7xl mb-8">{selectedProvider.image}</div>
                  <h2 className="text-4xl font-black tracking-tighter mb-4">{selectedProvider.name}</h2>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-12">{selectedProvider.bio || "Secure, verified, and privacy-native infrastructure."}</p>
                  <button onClick={() => setViewState('selection')} className={`w-full ${theme.bg} text-white py-6 rounded-3xl font-black text-xl hover:brightness-110 active:scale-95 transition-all shadow-2xl`}>CONTINUE</button>
                </div>
              )}

              {/* VIEW 2: SELECTION (DATE/TIME OR HOTEL) */}
              {viewState === 'selection' && (
                <div className="text-center">
                  <h3 className="text-2xl font-black mb-8 uppercase tracking-tighter">Booking Config</h3>
                  
                  {/* DOCTORS & DIAGNOSTICS: DATE/TIME */}
                  {(activeTab === 'Doctors' || activeTab === 'Diagnostics') && (
                    <div className="space-y-6">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Select Date & Time Slot</label>
                       <input type="date" className="w-full bg-black border border-zinc-800 p-4 rounded-2xl text-white font-mono" />
                       <div className="grid grid-cols-2 gap-2">
                          {["10:00 AM", "02:00 PM", "04:30 PM", "06:00 PM"].map(t => (
                            <button key={t} onClick={() => setSelectedSlot(t)} className={`py-4 rounded-xl text-xs font-bold border transition-all ${selectedSlot === t ? theme.bg : 'bg-black/50 border-zinc-800 hover:border-zinc-500'}`}>{t}</button>
                          ))}
                       </div>
                    </div>
                  )}

                  {/* DESTINATIONS: HOTELS & GUESTS */}
                  {activeTab === 'Destinations' && (
                    <div className="space-y-6 text-left">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Select Partner Stay</label>
                       <div className="space-y-3">
                          {selectedProvider.hotels.map((h: any) => (
                            <button key={h.name} onClick={() => setSelectedHotel(h)} className={`w-full p-4 rounded-2xl border text-left transition-all ${selectedHotel?.name === h.name ? `${theme.border} bg-white/5` : "bg-black/50 border-zinc-800"}`}>
                               <div className="flex justify-between font-black text-sm"><span>{h.name}</span><span className={theme.text}>{h.price} INT</span></div>
                               <div className="text-[10px] text-zinc-500 mt-1">{h.bio}</div>
                            </button>
                          ))}
                       </div>
                       <div className="flex gap-2">
                          <div className="flex-1">
                             <label className="text-[8px] uppercase tracking-tighter text-zinc-500 ml-1">Check-in</label>
                             <input type="date" className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-xs" />
                          </div>
                          <div className="w-24">
                             <label className="text-[8px] uppercase tracking-tighter text-zinc-500 ml-1">Guests</label>
                             <select onChange={(e) => setGuestCount(Number(e.target.value))} className="w-full bg-black border border-zinc-800 p-3 rounded-xl text-xs">
                               {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Persons</option>)}
                             </select>
                          </div>
                       </div>
                    </div>
                  )}

                  <button 
                    disabled={activeTab === 'Destinations' ? !selectedHotel : !selectedSlot} 
                    onClick={() => setViewState('booking')} 
                    className={`w-full mt-10 bg-white text-black py-6 rounded-3xl font-black text-lg disabled:opacity-20 active:scale-95 transition-all uppercase`}
                  >
                    Set Settlement
                  </button>
                </div>
              )}

              {/* VIEW 3: SETTLEMENT */}
              {viewState === 'booking' && (
                <div className="text-center">
                  <h3 className="text-2xl font-black mb-12 uppercase tracking-tighter">Settlement Config</h3>
                  {activeTab === 'Destinations' && (
                    <div className="bg-black/50 p-8 rounded-[32px] border border-zinc-800 flex justify-between items-center mb-12">
                      <button onClick={() => setStayDuration(Math.max(1, stayDuration - 1))} className="w-14 h-14 bg-zinc-800 rounded-full text-3xl font-bold transition-all hover:bg-zinc-700">-</button>
                      <span className="text-5xl font-black font-mono">{stayDuration} <span className="text-xs">NIGHTS</span></span>
                      <button onClick={() => setStayDuration(stayDuration + 1)} className="w-14 h-14 bg-zinc-800 rounded-full text-3xl font-bold transition-all hover:bg-zinc-700">+</button>
                    </div>
                  )}
                  <div className="flex justify-between items-center mb-10 px-4">
                    <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Total Due</span>
                    <span className={`text-4xl font-black font-mono ${theme.text}`}>{calculateTotal()} INT</span>
                  </div>
                  <button onClick={executeOrder} className={`w-full ${theme.bg} text-white py-6 rounded-3xl font-black text-xl active:scale-95 transition-all shadow-2xl uppercase`}>Start Secure Booking</button>
                </div>
              )}

              {/* VIEW 4: SUCCESS (QR VOUCHER) */}
              {viewState === 'success' && (
                <div className="text-center animate-in zoom-in-95 duration-500">
                  <div className={`w-24 h-24 ${theme.bg} rounded-full flex items-center justify-center text-5xl mx-auto mb-10 shadow-2xl`}>✓</div>
                  <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Voucher Secured</h3>
                  <div className="bg-white p-8 rounded-[40px] mb-10 shadow-2xl text-black">
                     <div className="w-40 h-40 bg-zinc-100 mx-auto mb-6 rounded-3xl grid grid-cols-5 gap-1 p-4 opacity-50">
                        {Array.from({length: 25}).map((_, i) => (
                          <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-black' : ''}`}></div>
                        ))}
                     </div>
                     <p className="text-[10px] text-zinc-400 font-black uppercase mb-1 tracking-widest">Encrypted Voucher ID</p>
                     <p className="text-2xl font-black font-mono tracking-widest">{generatedId}</p>
                  </div>
                  <button onClick={() => { setSelectedProvider(null); setViewState('profile'); }} className="text-xs text-zinc-500 hover:text-white uppercase font-black tracking-widest transition-colors">Close Vault</button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}