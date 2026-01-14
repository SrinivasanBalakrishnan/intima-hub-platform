"use client";

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative p-6">
      
      {/* 1. BACK BUTTON (The Proven Fix) */}
      <button
        onClick={() => window.location.href = '/'}
        className="fixed top-5 left-5 z-[9999] group bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-pink-500 transition-all shadow-lg flex items-center gap-2"
      >
        <span>←</span> Back to Hub
      </button>

      {/* 2. HEADER */}
      <header className="mt-16 mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2">
          Intima-Shop
        </h1>
        <p className="text-gray-400">Sustainable Intimacy. Discreet Delivery.</p>
      </header>

      {/* 3. PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        
        {/* PRODUCT A: CONDOMS */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-pink-500 transition-colors group">
          <div className="h-40 bg-zinc-800 rounded-xl mb-4 flex items-center justify-center text-6xl">
            🌿
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Bio-Condoms (12 Pack)</h3>
          <p className="text-gray-400 text-sm mb-4">100% biodegradable latex. Packaging infused with wildflower seeds. Plant after use.</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-pink-400">$12.99</span>
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Add to Cart
            </button>
          </div>
        </div>

        {/* PRODUCT B: LUBRICANT */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition-colors group">
          <div className="h-40 bg-zinc-800 rounded-xl mb-4 flex items-center justify-center text-6xl">
            💧
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Organic Aloe Lube</h3>
          <p className="text-gray-400 text-sm mb-4">Water-based, pH-balanced, and completely plastic-free glass bottle.</p>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-purple-400">$18.50</span>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition">
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}