"use client";

import { useState } from "react";
// 1. IMPORT THE GLOBAL BRAIN
import { useIntima } from "../context/IntimaContext";
import Link from "next/link";

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
  // --- 2. CONNECT TO GLOBAL STATE ---
  const { cart, addToCart: globalAdd, removeFromCart: globalRemove, clearCart, addTransaction } = useIntima();

  // --- LOCAL UI STATE ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState("cart"); // 'cart' or 'invoice'
  const [orderId, setOrderId] = useState("");

  // Track subscription state for each product (Default: True/Active)
  const [subscriptions, setSubscriptions] = useState<Record<number, boolean>>({
    1: true,
    2: true,
    3: true,
    4: true
  });

  // --- ACTIONS ---

  const toggleSubscription = (id: number) => {
    setSubscriptions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Wrapper to handle price calculation before sending to Global State
  const handleAddToCart = (product: any) => {
    const isSub = subscriptions[product.id];
    
    // Logic: Apply 15% discount if subscribed
    const finalPrice = isSub 
      ? Number((product.price * 0.85).toFixed(2)) 
      : product.price;

    // Add to Global Context
    globalAdd({
      ...product,
      price: finalPrice, // Save the actual price they will pay
      isSubscribed: isSub
    });
    
    setIsCartOpen(true);
    setCheckoutStep("cart"); 
  };

  const handleCheckout = () => {
    // 1. Calculate the Final Total again to be safe
    const subtotal = cart.reduce((total, item) => total + item.price, 0);
    const tax = subtotal * 0.08;
    const finalTotal = Number((subtotal + tax).toFixed(2));

    // 2. DEDUCT FROM GLOBAL WALLET (The "Real" Transaction)
    addTransaction("Intima Shop Purchase", finalTotal, 'debit');

    // 3. Generate Invoice UI
    setOrderId(`ORD-${Math.floor(Math.random() * 90000) + 10000}`);
    setCheckoutStep("invoice");
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
    setTimeout(() => setCheckoutStep("cart"), 300);
  };

  const resetOrder = () => {
    clearCart(); // Wipes Global Cart
    setCheckoutStep("cart");
    setIsCartOpen(false);
  };

  // Calculate Total Price for Display
  const cartTotal = cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  const tax = (parseFloat(cartTotal) * 0.08).toFixed(2); 
  const finalTotal = (parseFloat(cartTotal) + parseFloat(tax)).toFixed(2);

  return (
    <div className="min-h-screen bg-black text-gray-100 font-sans relative p-6 pb-20">
      
      {/* 1. NAVIGATION BAR (Fixed Top) */}
      <div className="fixed top-0 left-0 w-full z-40 bg-black/90 backdrop-blur-md border-b border-zinc-800 p-4 flex justify-between items-center px-6 shadow-2xl">
        <Link
          href="/"
          className="group border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-purple-500 transition-all flex items-center gap-2"
        >
          <span>←</span> Back to Hub
        </Link>

        {/* --- RESTORED HEADING (Desktop) --- */}
        <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent hidden md:block">
          Intima-Shop
        </h1>

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

      {/* 2. HEADER (Mobile Only) */}
      <header className="mt-20 mb-10 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent mb-2 md:hidden">
          Intima-Shop
        </h1>
        <p className="text-gray-400">Sustainable Intimacy. Discreet Delivery.</p>
      </header>

      {/* 3. PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-gray-600 transition-all group relative overflow-hidden flex flex-col">
            
            {/* Background Icon Watermark */}
            <div className="absolute -right-6 -bottom-6 text-9xl opacity-5 grayscale group-hover:grayscale-0 transition-all pointer-events-none select-none">
              {product.icon}
            </div>

            {/* Product Image */}
            <div className="h-40 bg-zinc-800/50 rounded-xl mb-4 flex items-center justify-center text-7xl shadow-inner group-hover:scale-105 transition-transform duration-500">
              {product.icon}
            </div>
            
            {/* Details */}
            <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-6 min-h-[40px]">{product.desc}</p>
            
            {/* Push content down so Price/Button are always at bottom */}
            <div className="mt-auto">
              
              {/* SUBSCRIPTION TOGGLE (Your Feature) */}
              <div 
                onClick={() => toggleSubscription(product.id)}
                className={`mb-4 p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all group/sub ${
                  subscriptions[product.id] 
                    ? "bg-purple-900/20 border-purple-500/50 hover:bg-purple-900/40" 
                    : "bg-zinc-800/30 border-zinc-700 hover:border-zinc-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Custom Radio Button */}
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    subscriptions[product.id] ? "border-purple-400" : "border-gray-500"
                  }`}>
                    {subscriptions[product.id] && (
                      <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]"></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-xs font-bold transition-colors ${
                      subscriptions[product.id] ? "text-white" : "text-gray-400"
                    }`}>
                      Subscribe & Save
                    </span>
                    <span className="text-[10px] text-gray-400">Delivered every 30 days</span>
                  </div>
                </div>
                {subscriptions[product.id] && (
                  <span className="text-[10px] font-bold text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20 animate-pulse">
                    SAVE 15%
                  </span>
                )}
              </div>

              {/* Price & Action */}
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className={`text-2xl font-bold ${product.color}`}>
                    ${subscriptions[product.id] ? (product.price * 0.85).toFixed(2) : product.price}
                  </span>
                  {subscriptions[product.id] && (
                      <span className="text-[10px] text-gray-500 line-through">${product.price}</span>
                  )}
                </div>
                
                <button 
                  onClick={() => handleAddToCart(product)}
                  className={`${product.btnColor} text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg active:scale-95`}
                >
                  {subscriptions[product.id] ? "Subscribe" : "Add +"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 4. SLIDE-OUT CART / INVOICE DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={closeDrawer}
          ></div>

          {/* Side Panel */}
          <div className="relative w-full max-w-md bg-zinc-900 h-full border-l border-zinc-700 shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
            
            {/* --- VIEW 1: CART LIST --- */}
            {checkoutStep === "cart" && (
              <>
                {/* Header */}
                <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    Your Cart <span className="text-sm bg-zinc-800 px-2 py-1 rounded-full text-gray-400">{cart.length}</span>
                  </h2>
                  <button onClick={closeDrawer} className="text-gray-500 hover:text-white text-xl p-2 hover:bg-zinc-800 rounded-full transition-colors">✕</button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                  {cart.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20 flex flex-col items-center">
                      <div className="text-5xl mb-4 opacity-50">🛒</div>
                      <p>Your cart is empty.</p>
                      <button onClick={closeDrawer} className="mt-4 text-pink-500 hover:underline text-sm">Continue Shopping</button>
                    </div>
                  ) : (
                    cart.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 bg-black/40 p-3 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                        <div className="text-3xl bg-zinc-800 w-12 h-12 flex items-center justify-center rounded-lg">{item.icon}</div>
                        <div className="flex-1">
                          <p className="text-white font-medium text-sm">
                            {item.name}
                            {item.isSubscribed && <span className="ml-2 text-[10px] text-purple-400 border border-purple-500/30 px-1 rounded">SUB</span>}
                          </p>
                          <p className="text-gray-400 text-xs font-mono">${item.price}</p>
                        </div>
                        <button onClick={() => globalRemove(index)} className="text-red-500 hover:text-red-300 text-xs hover:bg-red-900/20 px-3 py-1.5 rounded transition-colors">Remove</button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-zinc-800 pt-6 mt-4">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400 text-sm uppercase tracking-wider">Subtotal</span>
                    <span className="text-3xl font-bold text-green-400 font-mono">${cartTotal}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-purple-900/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95 flex justify-center items-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <span className="text-xl">🔒</span>
                  </button>
                  <p className="text-center text-[10px] text-gray-600 mt-4 uppercase tracking-widest">256-Bit Encrypted Transaction (Simulated)</p>
                </div>
              </>
            )}

            {/* --- VIEW 2: DIGITAL INVOICE --- */}
            {checkoutStep === "invoice" && (
              <div className="flex flex-col h-full animate-in fade-in zoom-in-95 duration-300">
                {/* Invoice Header */}
                <div className="text-center mb-8 border-b border-dashed border-zinc-700 pb-6">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce shadow-[0_0_20px_#22c55e]">✓</div>
                  <h2 className="text-2xl font-bold text-white">Payment Successful</h2>
                  <p className="text-gray-400 text-sm mt-1">Thank you for your discreet purchase.</p>
                </div>

                {/* Invoice Details */}
                <div className="bg-zinc-800/30 p-6 rounded-xl border border-zinc-700 font-mono text-sm flex-1">
                  <div className="flex justify-between text-gray-400 mb-2">
                    <span>Order ID:</span>
                    <span className="text-white">{orderId}</span>
                  </div>
                  <div className="flex justify-between text-gray-400 mb-6">
                    <span>Date:</span>
                    <span className="text-white">{new Date().toLocaleDateString()}</span>
                  </div>

                  <div className="border-t border-zinc-700 my-4"></div>

                  {/* Itemized List */}
                  <div className="space-y-2 mb-6 max-h-[200px] overflow-y-auto custom-scrollbar">
                    {cart.map((item, i) => (
                      <div key={i} className="flex justify-between">
                        <span className="text-gray-300 truncate w-2/3">
                          {item.name}
                          {item.isSubscribed && <span className="text-purple-400 text-[10px] ml-1">*</span>}
                        </span>
                        <span className="text-white">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-zinc-700 my-4"></div>

                  {/* Final Math */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400">
                      <span>Subtotal</span>
                      <span>${cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Tax (8%)</span>
                      <span>${tax}</span>
                    </div>
                    <div className="flex justify-between text-green-400 font-bold text-lg mt-2 pt-2 border-t border-dashed border-zinc-700">
                      <span>TOTAL PAID</span>
                      <span>${finalTotal}</span>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <button 
                  onClick={resetOrder}
                  className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white py-4 rounded-xl font-bold border border-zinc-600 transition-all"
                >
                  Close & Start New Order
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}