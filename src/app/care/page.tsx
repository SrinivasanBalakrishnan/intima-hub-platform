// FORCE_DEPLOY_TRIGGER_3D_OMNIBUS_FINAL
"use client";

import { useState } from "react";
import Link from "next/link";
// TESTER NOTE: Verified path to context from care subfolder
import { useIntima } from "../context/IntimaContext";

// --- 3D VERTICAL DATASETS (FULL REGISTRY) ---
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

  const calculateTotal = () => {
    if (!selectedProvider) return 0;
    return activeTab === 'Destinations' ? selectedProvider.price * stayDuration : selectedProvider.price;
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
    addTransaction(`${activeTab}: ${selectedProvider.name}`, total, 'debit');
    setViewState('success');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans p-6 pb-32">
      <Link href="/" className="fixed top-5 left-5 z-[50] bg-zinc-900/90 border border-zinc-800 px-4 py-2 rounded-full text-xs font-bold hover:border-blue-500 transition-all">← HUB</Link>
      <header className="mt-16 mb-12 text-center">
        <h1 className="text-5xl font-black bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent mb-4 tracking-tighter uppercase">Intima-Care</h1>
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-900/50 rounded-full border border-zinc-800"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span><span className="text-xs font-mono text-zinc-400 uppercase">Vault: {balance.toFixed(0)} INT</span></div>
      </header>
      <div className="flex justify-center gap-3 mb-12 overflow-x-auto pb-4 no-scrollbar">
        {['Doctors', 'Destinations', 'Diagnostics'].map((tab) => (
          <button key={tab} onClick={() => { setActiveTab(tab as any); setSelectedProvider(null); }} className={`px-8 py-3 rounded-2xl text-xs font-black transition-all border-2 whitespace-nowrap ${activeTab === tab ? "bg-white text-black border-white scale-105 shadow-xl" : "bg-zinc-900 text-zinc-500 border-zinc-800"}`}>{tab.toUpperCase()}</button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {getActiveData().map((item) => (
          <div key={item.id} onClick={() => handleOpen(item)} className="group relative bg-zinc-900/30 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-500 transition-all cursor-pointer overflow-hidden"><div className="absolute top-0 right-0 p-4 opacity-5 text-6xl">{item.image}</div><div className="flex items-start gap-5"><div className="text-4xl shrink-0">{item.image}</div><div className="flex-1"><h3 className="text-xl font-bold mb-1">{item.name}</h3><p className="text-zinc-500 text-xs mb-3">{item.org}</p><div className="flex items-center gap-2 flex-wrap"><span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded uppercase tracking-widest">{item.role}</span>{item.distance && <span className="text-[10px] text-blue-400 font-mono">📍 {item.distance}</span>}</div></div><div className="text-right shrink-0"><div className="text-xl font-black text-white">{item.price}</div><div className="text-[10px] text-zinc-600 uppercase font-bold">{activeTab === 'Destinations' ? 'per night' : 'fixed fee'}</div></div></div></div>
        ))}
      </div>
      {selectedProvider && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedProvider(null)} className="absolute top-6 right-6 text-zinc-500 hover:text-white text-xl z-50">✕</button>
            {viewState === 'profile' && (
              <div className="p-10">
                <div className="flex items-center gap-6 mb-8"><div className="text-6xl">{selectedProvider.image}</div><div><h2 className="text-3xl font-black tracking-tight">{selectedProvider.name}</h2><p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">{selectedProvider.type}</p></div></div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-10">{selectedProvider.bio}</p>
                <div className="flex flex-wrap gap-2 mb-10">{selectedProvider.tags.map((tag: string) => (<span key={tag} className="text-[10px] bg-zinc-800 text-zinc-500 px-3 py-1 rounded-full uppercase font-bold border border-zinc-700">{tag}</span>))}</div>
                <button onClick={() => setViewState('booking')} className="w-full bg-white text-black py-5 rounded-3xl font-black text-lg hover:bg-zinc-200 transition-all">START SECURE BOOKING</button>
              </div>
            )}
            {viewState === 'booking' && (
              <div className="p-10">
                <h3 className="text-2xl font-black mb-8 text-center uppercase tracking-tighter">Settlement Config</h3>
                {activeTab === 'Destinations' ? (
                  <div className="space-y-6"><p className="text-xs text-zinc-500 uppercase text-center font-bold tracking-widest">Stay Duration (Nights)</p><div className="flex items-center justify-between bg-black/50 p-6 rounded-3xl border border-zinc-800"><button onClick={() => setStayDuration(Math.max(1, stayDuration - 1))} className="w-12 h-12 bg-zinc-800 rounded-full text-2xl font-bold">-</button><span className="text-4xl font-black font-mono">{stayDuration}</span><button onClick={() => setStayDuration(stayDuration + 1)} className="w-12 h-12 bg-zinc-800 rounded-full text-2xl font-bold">+</button></div></div>
                ) : (
                  <div className="bg-black/50 p-8 rounded-3xl border border-dashed border-zinc-800 text-center"><p className="text-zinc-400 text-sm italic">Standard Zero-Data Voucher Protocol Active.</p></div>
                )}
                <div className="mt-10 pt-8 border-t border-zinc-800"><div className="flex justify-between items-center mb-6"><span className="text-zinc-500 font-bold uppercase text-xs">Final Total</span><span className="text-3xl font-black text-white font-mono">{calculateTotal()} INT</span></div><button onClick={executeOrder} className="w-full bg-blue-600 text-white py-5 rounded-3xl font-black text-lg uppercase shadow-xl transition-all">Authorize Payment</button></div>
              </div>
            )}
            {viewState === 'success' && (
              <div className="p-10 text-center animate-in zoom-in-95 duration-500 h-full overflow-y-auto max-h-[85vh] no-scrollbar">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">✓</div>
                <h3 className="text-2xl font-black mb-2 uppercase">Settlement Complete</h3>
                <p className="text-zinc-500 text-[10px] mb-8 leading-relaxed uppercase tracking-widest">Intima Hub has settled your bill. Present this digital ID at the destination.</p>
                <div className="bg-white p-6 rounded-3xl mb-8 flex flex-col items-center">
                  <div className="w-44 h-44 bg-zinc-100 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden"><div className="grid grid-cols-6 gap-1 p-4 opacity-80">{Array.from({ length: 36 }).map((_, i) => (<div key={i} className={`w-6 h-6 rounded-sm ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>))}</div><div className="absolute inset-0 border-[10px] border-white"></div></div>
                  <p className="text-[10px] text-zinc-400 uppercase font-bold mb-1">Secure Voucher ID</p><p className="text-xl text-black font-black font-mono tracking-[0.2em]">{generatedId}</p>
                </div>
                <button onClick={() => { setSelectedProvider(null); setViewState('profile'); }} className="w-full py-4 bg-zinc-800 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-colors">Acknowledge</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}