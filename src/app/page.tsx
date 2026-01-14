import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HEADER */}
      <div className="mb-12 text-center relative z-10">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 tracking-tight">
          Intima Hub
        </h1>
        <p className="text-gray-400 text-lg tracking-wide">
          The Quantum-Secured Sexual Wellness Ecosystem
        </p>
        <div className="mt-6 inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-900/10 border border-green-900/50 text-green-400 text-sm font-medium">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></span>
          System Online & Encrypted
        </div>
      </div>

      {/* THE 4 BOXES GRID (All Active Now) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full relative z-10">
        
        {/* BOX 1: AI BOT */}
        <Link href="/bot" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-blue-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col gap-4 cursor-pointer">
          <div className="absolute top-4 right-4 text-xs font-bold bg-blue-600 text-white px-2 py-1 rounded shadow-lg">LIVE</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🤖</div>
          <div>
            <h2 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">Intima-Bot</h2>
            <p className="text-gray-400 text-sm mt-1">Your AI wellness assistant. Ask anonymously.</p>
          </div>
        </Link>

        {/* BOX 2: SHOP (Now Active) */}
        <Link href="/shop" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-pink-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)] flex flex-col gap-4 cursor-pointer">
          <div className="absolute top-4 right-4 text-xs font-bold bg-pink-600 text-white px-2 py-1 rounded shadow-lg">NEW</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🛒</div>
          <div>
            <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors">Shop</h2>
            <p className="text-gray-400 text-sm mt-1">Biodegradable condoms & sustainable lubricants.</p>
          </div>
        </Link>

        {/* BOX 3: CARE (Now Active) */}
        <Link href="/care" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-green-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] flex flex-col gap-4 cursor-pointer">
          <div className="absolute top-4 right-4 text-xs font-bold bg-green-600 text-white px-2 py-1 rounded shadow-lg">OPEN</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">🩺</div>
          <div>
            <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors">Care</h2>
            <p className="text-gray-400 text-sm mt-1">Anonymous consultation with verified specialists.</p>
          </div>
        </Link>

        {/* BOX 4: PAY (Now Active) */}
        <Link href="/pay" className="group relative p-8 rounded-3xl bg-zinc-900/50 backdrop-blur-md border border-zinc-800 hover:border-purple-500 hover:bg-zinc-900 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col gap-4 cursor-pointer">
          <div className="absolute top-4 right-4 text-xs font-bold bg-purple-600 text-white px-2 py-1 rounded shadow-lg">SECURE</div>
          <div className="text-4xl group-hover:scale-110 transition-transform duration-300">💳</div>
          <div>
            <h2 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">Pay</h2>
            <p className="text-gray-400 text-sm mt-1">Decentralized privacy-first wallet.</p>
          </div>
        </Link>

      </div>

      <footer className="mt-16 text-gray-600 text-sm relative z-10">
        © 2026 Intima Hub Platform. All rights reserved.
      </footer>
    </div>
  );
}