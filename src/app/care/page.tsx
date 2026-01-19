// FORCE_DEPLOY_TRIGGER_01
"use client";

import { useState } from "react";
import Link from "next/link";
// TESTER NOTE: Use '../' to go up one level from 'care' to 'src/app'
import { useIntima } from "../context/IntimaContext";

// --- MOCK DATABASE (Enhanced with Bio & Stats & Numeric Pricing) ---
const DOCTORS = [
  {
    id: 1,
    name: "Dr. A. Sharma",
    role: "Sexual Health Specialist",
    hospital: "Apollo Spectra",
    exp: "12 Yrs",
    status: "Online",
    category: "Physical",
    image: "👨‍⚕️",
    price: 500, // Changed to Number for math
    rating: 4.9,
    reviews: 124,
    bio: "Specialist in reproductive health and anxiety management. 10+ years of experience in confidential patient care.",
    tags: ["PCOS", "Anxiety", "Wellness"]
  },
  {
    id: 2,
    name: "Dr. Sarah J.",
    role: "Clinical Psychologist",
    hospital: "Mindful Space",
    exp: "8 Yrs",
    status: "Offline",
    category: "Mental",
    image: "👩‍⚕️",
    price: 650, // Changed to Number for math
    rating: 5.0,
    reviews: 215,
    bio: "Focuses on the psychology of intimacy and relationship counseling. LGBTQ+ friendly and trauma-informed.",
    tags: ["Therapy", "Relationships", "Trauma"]
  },
  {
    id: 3,
    name: "Dr. K. Lee",
    role: "Urologist",
    hospital: "Fortis Malar",
    exp: "15 Yrs",
    status: "Busy",
    category: "Physical",
    image: "👨‍⚕️",
    price: 800, // Changed to Number for math
    rating: 4.8,
    reviews: 89,
    bio: "Expert in male sexual wellness and hormonal balance. Discrete and judgment-free consultations.",
    tags: ["ED", "Hormones", "Fertility"]
  }
];

export default function CarePage() {
  // --- STATE MANAGEMENT ---
  const { balance, addTransaction } = useIntima(); // CONNECT TO WALLET
  const [filter, setFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  
  // viewState: 'profile' (bio) | 'booking' (date/time) | 'success' (ticket)
  const [viewState, setViewState] = useState<'profile' | 'booking' | 'success'>('profile'); 
  const [selectedSlot, setSelectedSlot] = useState("");

  // Filter Logic
  const filteredDoctors = filter === "All" 
    ? DOCTORS 
    : DOCTORS.filter(d => d.category === filter);

  // --- HANDLERS ---
  
  // 1. Open Profile
  const handleCardClick = (doctor: any) => {
    setSelectedDoctor(doctor);
    setViewState('profile'); // Start with profile view
    setSelectedSlot(""); 
  };

  // 2. Proceed to Booking
  const proceedToBooking = () => {
    // ENTERPRISE GUARDRAIL: Check Liquidity
    if (balance < selectedDoctor.price) {
      alert(`Insufficient Liquidity. You need ${selectedDoctor.price - balance} more INT.\n\nRedirecting to Top-Up Bridge...`);
      window.location.href = "/pay";
      return;
    }
    setViewState('booking');
  };

  // 3. Confirm & Show Success
  const confirmBooking = () => {
    if (!selectedSlot) return;
    
    // EXECUTE TRANSACTION
    addTransaction(`Consult: ${selectedDoctor.name}`, selectedDoctor.price, 'debit');
    
    setViewState('success');
  };

  // 4. Close Modal
  const closeBooking = () => {
    setSelectedDoctor(null);
    setViewState('profile');
    setSelectedSlot("");
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative p-6 pb-24">
      
      {/* 1. BACK BUTTON */}
      <Link
        href="/"
        className="fixed top-5 left-5 z-[40] group bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-green-500 transition-all shadow-lg flex items-center gap-2"
      >
        <span>←</span> Back to Hub
      </Link>
        
      {/* 2. HEADER */}
      <header className="mt-16 mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2">
          Intima-Care
        </h1>
        <p className="text-gray-400 text-sm">Anonymous Consultation. Verified Specialists.</p>
        
        {/* BALANCE BADGE (Mobile/Desktop) */}
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-zinc-900/50 rounded-full border border-zinc-800">
           <span className="text-[10px] text-green-400 font-mono tracking-widest">BAL: {balance.toFixed(0)} INT</span>
        </div>
      </header>

      {/* 3. CATEGORY FILTERS */}
      <div className="flex justify-center gap-2 mb-10">
        {["All", "Physical", "Mental"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === cat 
                ? "bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                : "bg-zinc-900 text-gray-400 border border-zinc-800 hover:border-green-500/50 hover:text-green-400"
            }`}
          >
            {cat === "All" ? "All Specialists" : cat + " Health"}
          </button>
        ))}
      </div>

      {/* 4. DOCTOR LIST DISPLAY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {filteredDoctors.map((doc, i) => (
          <div 
            key={doc.id}
            onClick={() => handleCardClick(doc)}
            className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-green-500/50 transition-all hover:bg-zinc-900 cursor-pointer group relative overflow-hidden"
          >
             {/* Hover Glow Effect */}
             <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            {/* Avatar & Status */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-3xl shadow-inner border border-zinc-700 group-hover:scale-105 transition-transform">
                {doc.image}
              </div>
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-zinc-900 ${
                doc.status === 'Online' ? 'bg-green-500' : 
                doc.status === 'Busy' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}></div>
            </div>
            
            {/* Doctor Info */}
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start mb-1">
                <div className="flex flex-col">
                  {/* Name & Badge */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">{doc.name}</h3>
                    
                    {/* VERIFIED BADGE */}
                    <div className="group/badge relative z-10">
                      <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/badge:block w-32 bg-zinc-900 text-center p-2 rounded border border-zinc-700 shadow-xl text-[10px] text-gray-300 pointer-events-none">
                        Medical License Verified
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm">{doc.role}</p>
                </div>
                
                {/* Rating (Hidden on very small screens, visible on sm+) */}
                <div className="hidden sm:flex items-center gap-1 text-yellow-400 text-xs font-bold bg-yellow-400/10 px-2 py-1 rounded">
                  <span>★</span> {doc.rating}
                </div>
              </div>

              {/* Stats Line */}
              <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                <span>{doc.hospital}</span>
                <span>•</span>
                <span>{doc.exp} Exp</span>
              </div>

              {/* Mobile: Book Button takes full width at bottom */}
              <div className="mt-4 sm:hidden w-full">
                <button className="w-full bg-green-600/20 text-green-400 border border-green-600/50 py-2 rounded-lg text-sm font-bold">
                  View Profile & Book
                </button>
              </div>
            </div>

            {/* Desktop: Price/Chevron Right */}
            <div className="hidden sm:flex flex-col items-end gap-1">
              <span className="text-green-400 font-mono font-bold">{doc.price} INT</span>
              <span className="text-xs text-gray-600">per session</span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. MULTI-STAGE MODAL SYSTEM */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex flex-col max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={closeBooking}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-black/40 text-gray-400 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
            >✕</button>

            {/* === VIEW 1: PROFILE === */}
            {viewState === 'profile' && (
              <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                {/* Header Image */}
                <div className="h-32 bg-gradient-to-r from-green-900/40 to-teal-900/40 shrink-0 relative">
                    <div className="absolute -bottom-10 left-6 w-24 h-24 bg-zinc-800 rounded-full border-4 border-zinc-900 flex items-center justify-center text-5xl shadow-xl">
                     {selectedDoctor.image}
                  </div>
                </div>

                <div className="pt-12 px-6 pb-6">
                  {/* Name & Title */}
                  <h2 className="text-2xl font-bold text-white">{selectedDoctor.name}</h2>
                  <p className="text-green-400 text-sm font-medium mb-1">{selectedDoctor.role}</p>
                  <p className="text-gray-500 text-xs mb-6">{selectedDoctor.hospital}</p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-zinc-800/50 p-3 rounded-xl text-center border border-zinc-800">
                      <div className="text-white font-bold text-lg">{selectedDoctor.rating}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Rating</div>
                    </div>
                    <div className="bg-zinc-800/50 p-3 rounded-xl text-center border border-zinc-800">
                      <div className="text-white font-bold text-lg">{selectedDoctor.reviews}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Reviews</div>
                    </div>
                    <div className="bg-zinc-800/50 p-3 rounded-xl text-center border border-zinc-800">
                      <div className="text-white font-bold text-lg">{selectedDoctor.exp}</div>
                      <div className="text-[10px] text-gray-500 uppercase">Exp</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">About Specialist</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {selectedDoctor.bio}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedDoctor.tags.map((tag: string) => (
                      <span key={tag} className="text-[10px] bg-zinc-800 text-zinc-400 px-2 py-1 rounded border border-zinc-700">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button 
                    onClick={proceedToBooking}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-green-900/20 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <span>Book Appointment</span>
                    <span className="opacity-70 text-sm">({selectedDoctor.price} INT)</span>
                  </button>
                </div>
              </div>
            )}

            {/* === VIEW 2: BOOKING (Date/Time) === */}
            {viewState === 'booking' && (
              <div className="p-6 flex flex-col h-full">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-white">Select a Time</h3>
                  <p className="text-gray-500 text-xs">All times are in your local timezone.</p>
                </div>

                <div className="space-y-6 flex-1 overflow-y-auto">
                  {/* Dates */}
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Date</label>
                    <div className="grid grid-cols-3 gap-2">
                      {["Today", "Tomorrow", "Fri 24th"].map((day, idx) => (
                        <button key={day} className={`py-3 rounded-xl text-sm border transition-all ${idx === 1 ? "bg-green-900/20 border-green-500 text-green-400" : "bg-zinc-800 border-zinc-700 text-gray-400"}`}>
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Times */}
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2 block">Available Slots</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["10:00 AM", "2:30 PM", "4:15 PM", "6:00 PM"].map((time) => (
                        <button 
                          key={time} 
                          onClick={() => setSelectedSlot(time)}
                          className={`py-3 rounded-xl text-sm border transition-all font-mono ${
                            selectedSlot === time 
                              ? "bg-green-600 text-white border-green-500 shadow-lg" 
                              : "bg-zinc-800 text-gray-300 border-zinc-700 hover:border-green-500/50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={confirmBooking}
                  disabled={!selectedSlot}
                  className="w-full mt-6 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  Confirm Booking (-{selectedDoctor.price} INT)
                </button>
              </div>
            )}

            {/* === VIEW 3: SUCCESS === */}
            {viewState === 'success' && (
              <div className="p-6 flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl mb-6 animate-bounce shadow-[0_0_30px_#22c55e]">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                <p className="text-gray-400 text-sm mb-8">
                  Your secure session with {selectedDoctor.name} is scheduled.
                </p>
                
                <div className="bg-zinc-800/50 p-5 rounded-xl border border-dashed border-zinc-600 mb-8 w-full relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 px-2 text-xs text-gray-500 uppercase tracking-widest">
                    SESSION TICKET
                  </div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Time</p>
                  <p className="text-white font-bold mb-3">{selectedSlot}</p>
                  <p className="text-xs text-gray-500 uppercase mb-1">Meeting ID</p>
                  <p className="text-xl font-mono text-green-400 font-bold tracking-widest">
                    IH-{Math.floor(Math.random() * 9000) + 1000}-SECURE
                  </p>
                </div>

                <button 
                  onClick={closeBooking}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold border border-zinc-700 transition-all"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}