"use client";

import { useState } from "react";

// --- MOCK DATA DATABASE ---
// This acts as your temporary "backend" for the demo
const DOCTORS = [
  {
    id: 1,
    name: "Dr. A. Sharma",
    role: "Sexual Health Specialist",
    exp: "12 Yrs Exp",
    status: "Online",
    category: "Physical",
    image: "👨‍⚕️",
    price: "500 INT"
  },
  {
    id: 2,
    name: "Dr. Sarah J.",
    role: "Clinical Psychologist",
    exp: "8 Yrs Exp",
    status: "Offline",
    category: "Mental",
    image: "👩‍⚕️",
    price: "650 INT"
  },
  {
    id: 3,
    name: "Dr. K. Lee",
    role: "Urologist",
    exp: "15 Yrs Exp",
    status: "Busy",
    category: "Physical",
    image: "👨‍⚕️",
    price: "800 INT"
  }
];

export default function CarePage() {
  // --- STATE MANAGEMENT ---
  const [filter, setFilter] = useState("All");
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [bookingStep, setBookingStep] = useState(0); // 0=Closed, 1=Date/Time, 2=Success
  const [selectedSlot, setSelectedSlot] = useState("");

  // Filter Logic: Sorts doctors based on the category button clicked
  const filteredDoctors = filter === "All" 
    ? DOCTORS 
    : DOCTORS.filter(d => d.category === filter);

  // --- HANDLERS ---
  const handleBookClick = (doctor: any) => {
    setSelectedDoctor(doctor);
    setBookingStep(1); // Open Modal
    setSelectedSlot(""); // Reset slot
  };

  const confirmBooking = () => {
    if (!selectedSlot) return;
    setBookingStep(2); // Show Success Screen
  };

  const closeBooking = () => {
    setBookingStep(0);
    setSelectedDoctor(null);
    setSelectedSlot("");
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative p-6 pb-20">
      
      {/* 1. BACK BUTTON (Navigation Safety) */}
      <button
        onClick={() => window.location.href = '/'}
        className="fixed top-5 left-5 z-[9999] group bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-green-500 transition-all shadow-lg flex items-center gap-2"
      >
        <span>←</span> Back to Hub
      </button>

      {/* 2. HEADER */}
      <header className="mt-16 mb-8 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2">
          Intima-Care
        </h1>
        <p className="text-gray-400">Anonymous Consultation. Verified Specialists.</p>
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
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center gap-4 hover:border-green-500 transition-all hover:bg-zinc-900 group">
            {/* Doctor Avatar */}
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform">
              {doc.image}
            </div>
            
            {/* Doctor Info */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-lg font-bold text-white group-hover:text-green-400 transition-colors">{doc.name}</h3>
                {/* Status Badge Logic */}
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  doc.status === "Online" ? "bg-green-900/30 text-green-400 border-green-900 animate-pulse" :
                  doc.status === "Busy" ? "bg-red-900/30 text-red-400 border-red-900" :
                  "bg-zinc-800 text-gray-500 border-zinc-700"
                }`}>
                  {doc.status}
                </span>
              </div>
              <p className="text-gray-400 text-sm">{doc.role}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-zinc-500 text-xs">{doc.exp}</p>
                <span className="text-zinc-700 text-xs">•</span>
                <p className="text-green-400 text-xs font-mono">{doc.price}</p>
              </div>
            </div>

            {/* Book Button */}
            <button 
              onClick={() => handleBookClick(doc)}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-green-900/20 active:scale-95 transition-all"
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {/* 5. INTERACTIVE BOOKING MODAL */}
      {bookingStep > 0 && selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-green-500/30 rounded-2xl max-w-md w-full p-6 shadow-[0_0_50px_rgba(34,197,94,0.15)] relative overflow-hidden">
            
            {/* Close 'X' Button */}
            <button 
              onClick={closeBooking}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-800"
            >
              ✕
            </button>

            {/* --- STEP 1: SELECT DATE & TIME --- */}
            {bookingStep === 1 && (
              <>
                <div className="text-center mb-6">
                  <div className="inline-block p-3 bg-zinc-800 rounded-full text-4xl mb-2">{selectedDoctor.image}</div>
                  <h3 className="text-xl font-bold text-white">Book with {selectedDoctor.name}</h3>
                  <p className="text-green-400 text-sm font-mono mt-1">Fee: {selectedDoctor.price}</p>
                </div>

                <div className="space-y-5">
                  {/* Date Selector */}
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold tracking-wider ml-1">Select Date</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {["Today", "Tomorrow", "Fri 24th"].map((day) => (
                        <button key={day} className="bg-zinc-800 hover:bg-zinc-700 text-gray-300 py-2 rounded-lg text-sm border border-zinc-700 focus:border-green-500 focus:bg-green-900/20 focus:text-green-400 transition-all">
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time Selector */}
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-bold tracking-wider ml-1">Available Slots</label>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {["10:00 AM", "2:30 PM", "4:15 PM", "6:00 PM", "8:30 PM"].map((time) => (
                        <button 
                          key={time} 
                          onClick={() => setSelectedSlot(time)}
                          className={`py-2 rounded-lg text-sm border transition-all ${
                            selectedSlot === time 
                              ? "bg-green-600 text-white border-green-500 shadow-lg scale-105" 
                              : "bg-zinc-800 text-gray-300 border-zinc-700 hover:border-green-500/50"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Confirm Action */}
                <button 
                  onClick={confirmBooking}
                  disabled={!selectedSlot}
                  className="w-full mt-8 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white py-3 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                  {selectedSlot ? `Confirm for ${selectedSlot}` : "Select a Time Slot"}
                </button>
              </>
            )}

            {/* --- STEP 2: SUCCESS SCREEN --- */}
            {bookingStep === 2 && (
              <div className="text-center py-4">
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 animate-bounce shadow-[0_0_30px_#22c55e]">
                  ✓
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                <p className="text-gray-400 text-sm mb-8 px-4">
                  A secure, encrypted video link has been generated for your session with {selectedDoctor.name}.
                </p>
                
                {/* Fake Ticket */}
                <div className="bg-zinc-800/50 p-5 rounded-xl border border-dashed border-zinc-600 mb-8 mx-2 relative">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-zinc-900 px-2 text-xs text-gray-500 uppercase tracking-widest">
                    SESSION TICKET
                  </div>
                  <p className="text-xs text-gray-500 uppercase mb-1">Meeting ID</p>
                  <p className="text-2xl font-mono text-green-400 font-bold tracking-widest">
                    IH-{Math.floor(Math.random() * 9000) + 1000}-SECURE
                  </p>
                </div>

                <button 
                  onClick={closeBooking}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl font-bold border border-zinc-700 transition-all hover:border-gray-500"
                >
                  Return to List
                </button>
              </div>
            )}
            
          </div>
        </div>
      )}

    </div>
  );
}