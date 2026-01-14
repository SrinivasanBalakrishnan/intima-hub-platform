"use client";

export default function PayPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative p-6">
      
      {/* BACK BUTTON */}
      <button
        onClick={() => window.location.href = '/'}
        className="fixed top-5 left-5 z-[9999] group bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-purple-500 transition-all shadow-lg flex items-center gap-2"
      >
        <span>←</span> Back to Hub
      </button>

      <header className="mt-16 mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent mb-2">
          Intima-Pay
        </h1>
        <p className="text-gray-400">Quantum-Encrypted Wallet.</p>
      </header>

      {/* WALLET CARD */}
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-3xl p-8 shadow-2xl border border-purple-700/50 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
          
          <p className="text-purple-200 text-sm mb-1">Total Balance</p>
          <h2 className="text-4xl font-bold text-white mb-6">2,450 INT</h2>
          
          <div className="flex gap-4">
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl text-sm font-medium backdrop-blur-sm transition">
              Add Funds
            </button>
            <button className="flex-1 bg-white/20 hover:bg-white/30 text-white py-2 rounded-xl text-sm font-medium backdrop-blur-sm transition">
              Transfer
            </button>
          </div>
        </div>

        {/* TRANSACTIONS */}
        <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-4 ml-2">Recent Activity</h3>
        <div className="space-y-3">
          <div className="bg-zinc-900/50 p-4 rounded-xl flex justify-between items-center border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="bg-green-900/30 text-green-400 p-2 rounded-lg">🛒</div>
              <div>
                <p className="text-white text-sm font-medium">Intima-Shop Order</p>
                <p className="text-gray-500 text-xs">Today, 10:30 AM</p>
              </div>
            </div>
            <span className="text-red-400 font-bold">- 12.99 INT</span>
          </div>
          
          <div className="bg-zinc-900/50 p-4 rounded-xl flex justify-between items-center border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="bg-blue-900/30 text-blue-400 p-2 rounded-lg">🩺</div>
              <div>
                <p className="text-white text-sm font-medium">Dr. Sharma Consult</p>
                <p className="text-gray-500 text-xs">Yesterday</p>
              </div>
            </div>
            <span className="text-red-400 font-bold">- 50.00 INT</span>
          </div>
        </div>

      </div>
    </div>
  );
}