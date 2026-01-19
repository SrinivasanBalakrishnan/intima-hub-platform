// FORCE_DEPLOY_TRIGGER_3D_TRI_COLOR_PRODUCTION_READY
"use client";

import { useState } from "react";
import Link from "next/link";
import { useIntima } from "../context/IntimaContext";

// --- THEME CONFIGURATION ---
const THEMES = {
  Doctors: { color: "blue", hex: "#2563EB", text: "text-blue-400", bg: "bg-blue-600", border: "border-blue-500/50", glow: "from-blue-900/20" },
  Destinations: { color: "purple", hex: "#7C3AED", text: "text-purple-400", bg: "bg-purple-600", border: "border-purple-500/50", glow: "from-purple-900/20" },
  Diagnostics: { color: "green", hex: "#16A34A", text: "text-green-400", bg: "bg-green-600", border: "border-green-500/50", glow: "from-green-900/20" }
};

// --- DATASETS ---
const DOCTORS = [
  { id: 1, name: "Dr. A. Sharma", role: "Specialist", org: "Apollo Spectra", type: "Doctor", category: "Physical", image: "👨‍⚕️", price: 500, rating: 4.9, bio: "Certified Sexual Health Specialist with 12+ years experience.", tags: ["Verified", "Secure-Consult"] },
  { id: 2, name: "Dr. Sarah J.", role: "Psychologist", org: "Mindful Space", type: "Doctor", category: "Mental", image: "👩‍⚕️", price: 650, rating: 5.0, bio: "Expert in intimacy and relationship wellness coaching.", tags: ["Therapy", "LGBTQ+ Friendly"] },
  { id: 3, name: "Dr. K. Lee", role: "Urologist", org: "Fortis Malar", type: "Doctor", category: "Physical", image: "👨‍⚕️", price: 800, rating: 4.8, bio: "Expert in male sexual wellness and hormonal balance.", tags: ["Fertility", "Confidential"] }
];

const DESTINATIONS = [
  { id: 101, name: "Maldives", role: "Island Retreat", org: "North Atoll", type: "Escape", category: "Travel", image: "🏝️", price: 15000, rating: 5.0, bio: "Private island villas with zero-trace check-in protocols.", tags: ["High-Privacy", "Eco-Luxury"] },
  { id: 102, name: "Singapore", role: "Urban Luxury", org: "Marina Bay", type: "Escape", category: "Travel", image: "🏙️", price: 8000, rating: 4.8, bio: "Discreet luxury suites in the heart of the garden city.", tags: ["Discreet", "Modern"] },
  { id: 103, name: "Seychelles", role: "Granite Escape", org: "Mahe", type: "Escape", category: "Travel", image: "🌊", price: 12000, rating: 4.9, bio: "Isolated beachfronts and ultra-private specialized service.", tags: ["Secluded", "Romance"] },
  { id: 104, name: "Mauritius", role: "Lagoon Haven", org: "Le Morne", type: "Escape", category: "Travel", image: "🏖️", price: 9500, rating: 4.7, bio: "Turquoise waters and private villas.", tags: ["Nature", "Wellness"] },
  { id: 105, name: "Spain", role: "Iberian Soul", org: "Majorca", type: "Escape", category: "Travel", image: "🇪🇸", price: 7000, rating: 4.8, bio: "Hidden Mediterranean fincas with complete anonymity.", tags: ["Culture", "Private-Pool"] },
  { id: 106, name: "Portugal", role: "Cliff Edge", org: "Algarve", type: "Escape", category: "Travel", image: "🇵🇹", price: 6500, rating: 4.6, bio: "Atlantic views and luxury cave-suites.", tags: ["Vantage", "Intimate"] },
  { id: 107, name: "France", role: "Vineyard Suite", org: "Provence", type: "Escape", category: "Travel", image: "🇫🇷", price: 11000, rating: 4.9, bio: "Estate living with private wine cellars.", tags: ["Gourmet", "Elite"] },
  { id: 108, name: "Thailand", role: "Tropical Zen", org: "Koh Samui", type: "Escape", category: "Travel", image: "🇹🇭", price: 5500, rating: 4.7, bio: "Wellness-focused luxury retreats.", tags: ["Zen", "Detox"] },
  { id: 109, name: "Las Vegas", role: "Neon Vault", org: "The Strip", type: "Escape", category: "Travel", image: "🎲", price: 9000, rating: 4.5, bio: "High-roller privacy suites with VIP entrances.", tags: ["Excitement", "VIP"] },
  { id: 110, name: "Tokyo", role: "Neon Silence", org: "Shinjuku", type: "Escape", category: "Travel", image: "🇯🇵", price: 13000, rating: 5.0, bio: "Ultra-modern luxury with no-staff interaction.", tags: ["Tech-Privacy", "Urban"] }
];

const DIAGNOSTICS = [
  { id: 201, name: "Metropolis Lab", role: "Diagnostics", org: "Main Center", type: "Lab", category: "Diagnostics", image: "🏥", price: 1200, rating: 4.7, bio: "Anonymous STD & Wellness panels with zero-ID protocol.", tags: ["No-ID", "Fast-Results"], distance: "2.4 km" },
  { id: 202, name: "Apollo Diagnostics", role: "Wellness Hub", org: "District Lab", type: "Lab", category: "Diagnostics", image: "🔬", price: 1500, rating: 4.6, bio: "Full hormonal and intimate health screening panels.", tags: ["Certified", "Confidential"], distance: "4.1 km" }
];

export default function CarePage() {
  const { balance, addTransaction } = useIntima();
  const [activeTab, setActiveTab] = useState<'Doctors' | 'Destinations' | 'Diagnostics'>('Doctors');
  const [selectedProvider, setSelectedProvider] = useState<any>(null);
  const [viewState, setViewState] = useState<'profile' | 'booking' | 'success'>('profile');
  const [stayDuration, setStayDuration] = useState(1);
  const [generatedId, setGeneratedId] = useState("");

  const currentTheme = THEMES[activeTab];

  const getActiveData = () => {
    if (activeTab === 'Doctors') return DOCTORS;
    if (activeTab === 'Destinations') return DESTINATIONS;
    return DIAGNOSTICS;
  };

  const handleOpen = (item: any) => {
    setSelectedProvider(item);
    setViewState('profile');
    setStayDuration(1);
  };

  const executeOrder = () => {
    const total = activeTab === 'Destinations' ? selectedProvider.price * stayDuration : selectedProvider.price;
    if (balance < total) { alert("Insufficient INT Liquidity. Redirecting to Vault..."); window.location.href = "/pay"; return; }
    
    const prefix = activeTab === 'Doctors' ? 'SEC' : activeTab === 'Destinations' ? 'VLT' : 'LAB';
    const newId = `${prefix}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    setGeneratedId(newId);

    addTransaction(`${activeTab}: ${selectedProvider.name}`, total, 'debit');
    setViewState('success');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans p-6 pb-32 relative overflow-hidden transition-colors duration-700">
      
      {/* DYNAMIC ATMOSPHERE BACKGROUND */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${currentTheme.glow} via-black to-black transition-all duration-1000`}></div>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

      <Link href="/" className="fixed top-5 left-5 z-[50] bg-zinc-900/80 border border-zinc-800 px-4 py-2 rounded-full text-xs font-bold hover:border-white transition-all shadow-xl">← Back to Hub</Link>
      
      <header className="relative z-10 mt-16 mb-12 text-center">
        <h1 className="text-6xl font-black tracking-tighter uppercase mb-4">Intima-Care</h1>
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
           <span className={`w-2 h-2 rounded-full animate-pulse ${currentTheme.bg}`}></span>
           <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest tracking-[0.2em]">Vault: {balance.toFixed(0)} INT</span>
        </div>
      </header>

      {/* 3D TAB SYSTEM */}
      <div className="relative z-10 flex justify-center gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar">
        {(['Doctors', 'Destinations', 'Diagnostics'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSelectedProvider(null); }}
            className={`px-8 py-3 rounded-2xl text-[10px] font-black tracking-widest transition-all border-2 whitespace-nowrap ${
              activeTab === tab 
              ? `${THEMES[tab].bg} text-white border-transparent scale-110 shadow-2xl` 
              : "bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:text-zinc-300"
            }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* VERTICAL GRID - FIXED FOR VERCEL (Line 91 assertion) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {getActiveData().map((item: any) => (
          <div 
            key={item.id} 
            onClick={() => handleOpen(item)} 
            className={`group relative bg-zinc-900/20 backdrop-blur-xl border ${currentTheme.border} rounded-[32px] p-8 hover:scale-[1.02] transition-all cursor-pointer overflow-hidden shadow-2xl`}
          >
            <div className="flex items-start gap-6">
              <div className="text-5xl shrink-0 group-hover:rotate-12 transition-transform">{item.image}</div>
              <div className="flex-1">
                <h3 className="text-2xl font-black mb-1 group-hover:text-white transition-colors">{item.name}</h3>
                <p className="text-zinc-500 text-xs mb-4 uppercase font-bold tracking-widest">{item.org}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${currentTheme.bg} text-white`}>{item.role}</span>
                  {item.distance && <span className="text-[10px] text-zinc-400 font-mono">📍 {item.distance}</span>}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-black ${currentTheme.text}`}>{item.price}</div>
                <div className="text-[8px] text-zinc-600 uppercase font-black tracking-widest">{activeTab === 'Destinations' ? 'per night' : 'fixed'}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL SYSTEM */}
      {selectedProvider && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-500">
          <div className={`bg-zinc-900 border ${currentTheme.border} w-full max-w-lg rounded-[48px] overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]`}>
            <button onClick={() => setSelectedProvider(null)} className="absolute top-8 right-8 text-zinc-500 hover:text-white text-2xl z-50 transition-colors">✕</button>
            
            <div className="overflow-y-auto no-scrollbar">
              {viewState === 'profile' && (
                <div className="p-12">
                  <div className="text-7xl mb-8">{selectedProvider.image}</div>
                  <h2 className="text-4xl font-black tracking-tighter mb-2">{selectedProvider.name}</h2>
                  <p className={`font-mono text-xs uppercase tracking-[0.3em] mb-8 ${currentTheme.text}`}>{selectedProvider.type}</p>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-12">{selectedProvider.bio}</p>
                  <button onClick={() => setViewState('booking')} className={`w-full ${currentTheme.bg} text-white py-6 rounded-3xl font-black text-xl hover:brightness-110 active:scale-95 transition-all shadow-2xl uppercase`}>Start Secure Booking</button>
                </div>
              )}

              {viewState === 'booking' && (
                <div className="p-12 text-center">
                  <h3 className="text-2xl font-black mb-12 uppercase tracking-tighter">Settlement Config</h3>
                  {activeTab === 'Destinations' ? (
                    <div className="bg-black/50 p-8 rounded-[32px] border border-zinc-800 flex justify-between items-center mb-12">
                      <button onClick={() => setStayDuration(Math.max(1, stayDuration - 1))} className="w-14 h-14 bg-zinc-800 rounded-full text-3xl font-bold">-</button>
                      <span className="text-5xl font-black font-mono">{stayDuration}</span>
                      <button onClick={() => setStayDuration(stayDuration + 1)} className="w-14 h-14 bg-zinc-800 rounded-full text-3xl font-bold">+</button>
                    </div>
                  ) : (
                    <div className="bg-black/50 p-10 rounded-[32px] border border-dashed border-zinc-800 mb-12 italic text-zinc-500 text-sm">Standard Zero-Data Voucher Protocol Active.</div>
                  )}
                  <div className="flex justify-between items-center mb-10 px-4">
                    <span className="text-zinc-500 font-bold uppercase text-xs">Total due</span>
                    <span className={`text-4xl font-black font-mono ${currentTheme.text}`}>{activeTab === 'Destinations' ? selectedProvider.price * stayDuration : selectedProvider.price} INT</span>
                  </div>
                  <button onClick={executeOrder} className={`w-full ${currentTheme.bg} text-white py-6 rounded-3xl font-black text-xl active:scale-95 transition-all uppercase`}>Authorize Payment</button>
                </div>
              )}

              {viewState === 'success' && (
                <div className="p-12 text-center animate-in zoom-in-95 duration-500">
                  <div className={`w-24 h-24 ${currentTheme.bg} rounded-full flex items-center justify-center text-5xl mx-auto mb-10 shadow-2xl`}>✓</div>
                  <h3 className="text-3xl font-black mb-4 tracking-tighter uppercase">Settlement Complete</h3>
                  <div className="bg-white p-8 rounded-[40px] mb-10 shadow-2xl">
                     <div className="w-40 h-40 bg-zinc-100 mx-auto mb-6 rounded-3xl grid grid-cols-5 gap-1 p-4 opacity-50">
                        {Array.from({length: 25}).map((_, i) => (
                          <div key={i} className={`w-full h-full ${Math.random() > 0.5 ? 'bg-black' : ''}`}></div>
                        ))}
                     </div>
                     <p className="text-[10px] text-zinc-400 font-black uppercase tracking-widest mb-1">Secure Voucher ID</p>
                     <p className="text-2xl text-black font-black font-mono tracking-widest">{generatedId}</p>
                  </div>
                  <button onClick={() => setSelectedProvider(null)} className="text-xs text-zinc-500 hover:text-white uppercase font-black tracking-widest transition-colors">Close Vault</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}