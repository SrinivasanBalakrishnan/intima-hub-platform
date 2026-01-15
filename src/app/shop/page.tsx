"use client";

import { useState } from "react";

// --- MOCK PRODUCT DATABASE ---
const PRODUCTS = [
  {
    id: 1,
    name: "Bio-Condoms (12 Pack)",
    price: 12.99,
    desc: "100% biodegradable latex. Packaging infused with wildflower seeds.",
    icon: "🌿",
    color: "text-green-400",
    btnColor: "bg-green-600 hover:bg-green-700"
  },
  {
    id: 2,
    name: "Organic Aloe Lube",
    price: 18.50,
    desc: "Water-based, pH-balanced, and completely plastic-free glass bottle.",
    icon: "💧",
    color: "text-blue-400",
    btnColor: "bg-blue-600 hover:bg-blue-700"
  },
  {
    id: 3,
    name: "Sensitivity Kit",
    price: 45.00,
    desc: "Includes 3 textures of condoms and sampler lube pack.",
    icon: "🎁",
    color: "text-pink-400",
    btnColor: "bg-pink-600 hover:bg-pink-700"
  },
  {
    id: 4,
    name: "Wellness Supplement",
    price: 29.99,
    desc: "Natural libido support with Ashwagandha and Maca.",
    icon: "💊",
    color: "text-purple-400",
    btnColor: "bg-purple-600 hover:bg-purple-700"
  }
];

export default function ShopPage() {
  // --- STATE MANAGEMENT ---
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- CART ACTIONS ---
  const addToCart = (product: any) => {
    setCart([...cart, product]);
    setIsCartOpen(true); // Auto-open drawer to confirm addition
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  // Calculate Total Price
  const cartTotal = cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative p-6 pb-20">
      
      {/* 1. NAVIGATION BAR (Fixed Top) */}
      <div className="fixed top-0 left-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800 p-4 flex justify-between items-center px-6 shadow-2xl">
        {/* Back Button (Proven Fix) */}
        <button
          onClick={() => window.location.href = '/'}
          className="group border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-pink-500 transition-all flex items-center gap-2"
        >
          <span>←</span> Back to Hub
        </button>

        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent hidden md:block">
          Intima-Shop
        </h1>

        {/* Cart Icon (Clickable) */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 text-2xl hover:scale-110 transition-transform"
          aria-label="Open Cart"
        >
          🛒
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full animate-bounce shadow-lg shadow-red-500/50">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* 2. HEADER (Pushed down) */}
      <header className="mt-20 mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2 md:hidden">
          Intima-Shop
        </h1>
        <p className="text-gray-400">Sustainable Intimacy. Discreet Delivery.</p>
      </header>

      {/* 3. PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-gray-600 transition-all group relative overflow-hidden">
            
            {/* Background Icon Watermark */}
            <div className="absolute -right-6 -bottom-6 text-9xl opacity-5 grayscale group-hover:grayscale-0 transition-all pointer-events-none select-none">
              {product.icon}
            </div>

            {/* Product Image Placeholder */}
            <div className="h-40 bg-zinc-800/50 rounded-xl mb-4 flex items-center justify-center text-7xl shadow-inner group-hover:scale-105 transition-transform duration-500">
              {product.icon}
            </div>
            
            {/* Product Details */}
            <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{product.desc}</p>
            
            {/* Price & Action */}
            <div className="flex justify-between items-center mt-auto">
              <span className={`text-2xl font-bold ${product.color}`}>${product.price}</span>
              <button 
                onClick={() => addToCart(product)}
                className={`${product.btnColor} text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg active:scale-95`}
              >
                Add +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. SLIDE-OUT CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dark Backdrop (Click to close) */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Side Panel */}
          <div className="relative w-full max-w-md bg-zinc-900 h-full border-l border-zinc-700 shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* Drawer Header */}
            <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                Your Cart <span className="text-sm bg-zinc-800 px-2 py-1 rounded-full text-gray-400">{cart.length}</span>
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-gray-500 hover:text-white text-xl p-2 hover:bg-zinc-800 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                  <div className="text-5xl mb-4 opacity-50">🛒</div>
                  <p>Your cart is empty.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 text-pink-500 hover:underline text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                    <div className="text-3xl bg-zinc-800 w-12 h-12 flex items-center justify-center rounded-lg">{item.icon}</div>
                    <div className="flex-1">
                      <p className="text-white font-medium text-sm">{item.name}</p>
                      <p className="text-gray-400 text-xs font-mono">${item.price}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-red-300 text-xs hover:bg-red-900/20 px-3 py-1.5 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Checkout */}
            <div className="border-t border-zinc-800 pt-6 mt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-400 text-sm uppercase tracking-wider">Total Amount</span>
                <span className="text-3xl font-bold text-green-400 font-mono">${cartTotal}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <span className="text-xl">🔒</span>
              </button>
              <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest">
                256-Bit Encrypted Transaction (Simulated)
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}