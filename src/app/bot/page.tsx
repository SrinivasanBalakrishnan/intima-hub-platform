"use client";

import { useState, useRef, useEffect } from "react";

export default function BotPage() {
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hello. I am Intima-Bot. How can I assist with your wellness today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput(""); 
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { role: "bot", content: data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "bot", content: "Connection unstable. Switching to secure backup node..." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black text-gray-100 font-sans relative">
      
      {/* --- THE BACK BUTTON (Styled & Functional) --- */}
      <button
        onClick={() => window.location.href = '/'}
        className="fixed top-5 left-5 z-[9999] group bg-zinc-900/80 backdrop-blur-md border border-zinc-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 hover:text-white hover:border-blue-500 transition-all shadow-lg flex items-center gap-2"
      >
        <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Hub
      </button>
      {/* --------------------------------------------- */}

      {/* HEADER */}
      <header className="flex-none flex items-center justify-end px-6 py-5 border-b border-gray-800 bg-zinc-900/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Intima-Bot™
          </h1>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-green-400 border border-green-900/50 px-3 py-1 rounded-full bg-green-900/10">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            Quantum-Secured
          </div>
        </div>
      </header>

      {/* CHAT AREA */}
      <main className="flex-1 overflow-y-auto p-6 space-y-6 pt-10">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`max-w-[85%] rounded-2xl px-6 py-4 text-sm leading-relaxed shadow-md ${
                msg.role === "user" 
                  ? "bg-blue-600 text-white rounded-br-none" 
                  : "bg-zinc-800 text-gray-200 border border-zinc-700 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-zinc-900/50 text-gray-500 rounded-2xl px-4 py-2 text-xs border border-zinc-800">
              Encrypting & Processing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      {/* INPUT AREA */}
      <footer className="flex-none p-4 border-t border-gray-800 bg-zinc-900/80 backdrop-blur-xl z-50">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            disabled={isLoading}
            placeholder="Ask about sexual wellness, products, or privacy..."
            className="flex-1 bg-black/50 border border-zinc-700 rounded-xl px-5 py-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition text-sm text-white placeholder-gray-600"
          />
          <button 
            onClick={handleSend} 
            disabled={isLoading} 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg shadow-blue-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
        <p className="text-center text-xs text-gray-600 mt-3">
          Intima-Bot provides information, not medical diagnosis.
        </p>
      </footer>
    </div>
  );
}