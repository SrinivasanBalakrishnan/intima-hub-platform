"use client";

export default function CarePage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative p-6">
      
      {/* BACK BUTTON */}
      <button
        onClick={() => window.location.href = '/'}
        className="fixed top-5 left-5 z-[9999] group bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-green-500 transition-all shadow-lg flex items-center gap-2"
      >
        <span>←</span> Back to Hub
      </button>

      <header className="mt-16 mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent mb-2">
          Intima-Care
        </h1>
        <p className="text-gray-400">Anonymous Consultation. Verified Specialists.</p>
      </header>

      {/* DOCTOR LIST */}
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        
        {/* DOCTOR 1 */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center gap-4 hover:border-green-500 transition-colors">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">👨‍⚕️</div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Dr. A. Sharma</h3>
              <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded-full border border-green-900">Online</span>
            </div>
            <p className="text-gray-400 text-sm">Sexual Health Specialist • 12 Yrs Exp</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold">
            Chat Now
          </button>
        </div>

        {/* DOCTOR 2 */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 flex items-center gap-4 hover:border-green-500 transition-colors">
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl">👩‍⚕️</div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Dr. Sarah J.</h3>
              <span className="text-xs bg-zinc-800 text-gray-400 px-2 py-1 rounded-full border border-zinc-700">Offline</span>
            </div>
            <p className="text-gray-400 text-sm">Clinical Psychologist • 8 Yrs Exp</p>
          </div>
          <button className="bg-zinc-700 text-gray-400 px-4 py-2 rounded-lg text-sm font-bold cursor-not-allowed">
            Book
          </button>
        </div>

      </div>
    </div>
  );
}