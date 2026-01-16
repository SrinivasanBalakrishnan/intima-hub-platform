"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- TYPES ---
export type Product = {
  id: number;
  name: string;
  price: number;
  icon: string;
  isSubscribed?: boolean;
};

export type Transaction = {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  type: 'debit' | 'credit';
  status: 'completed' | 'pending';
};

type IntimaContextType = {
  // Wallet State
  balance: number;
  transactions: Transaction[];
  addTransaction: (merchant: string, amount: number, type: 'debit' | 'credit') => void;
  
  // Cart State
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  
  // User State
  isAnonymous: boolean;
  userId: string;
  generateIdentity: () => void;
};

// --- INITIAL MOCK DATA ---
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TX-992', merchant: 'Intima Shop Decentralized', amount: 12.99, date: 'Today, 10:30 AM', type: 'debit', status: 'completed' },
  { id: 'TX-881', merchant: 'Dr. Sharma Consult', amount: 50.00, date: 'Yesterday', type: 'debit', status: 'completed' },
  { id: 'TX-774', merchant: 'Anon-Exchange TopUp', amount: 200.00, date: 'Oct 24', type: 'credit', status: 'completed' },
];

const IntimaContext = createContext<IntimaContextType | undefined>(undefined);

export function IntimaProvider({ children }: { children: ReactNode }) {
  // 1. STATE DEFINITIONS
  const [balance, setBalance] = useState(1240.50);
  const [cart, setCart] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [userId, setUserId] = useState("User_188_X26");
  const [isAnonymous, setIsAnonymous] = useState(true);

  // 2. LOAD FROM LOCAL STORAGE (The "Memory" Fix)
  useEffect(() => {
    const savedBalance = localStorage.getItem('intima_balance');
    const savedCart = localStorage.getItem('intima_cart');
    const savedTx = localStorage.getItem('intima_tx');
    const savedUser = localStorage.getItem('intima_user');

    if (savedBalance) setBalance(parseFloat(savedBalance));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedTx) setTransactions(JSON.parse(savedTx));
    if (savedUser) setUserId(savedUser);
  }, []);

  // 3. SAVE TO LOCAL STORAGE (Persistence)
  useEffect(() => {
    localStorage.setItem('intima_balance', balance.toString());
    localStorage.setItem('intima_cart', JSON.stringify(cart));
    localStorage.setItem('intima_tx', JSON.stringify(transactions));
    localStorage.setItem('intima_user', userId);
  }, [balance, cart, transactions, userId]);

  // --- ACTIONS ---

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addTransaction = (merchant: string, amount: number, type: 'debit' | 'credit') => {
    const newTx: Transaction = {
      id: `TX-${Math.floor(Math.random() * 90000)}`,
      merchant,
      amount,
      date: 'Just Now',
      type,
      status: 'completed'
    };
    
    setTransactions((prev) => [newTx, ...prev]);
    
    if (type === 'debit') {
      setBalance((prev) => prev - amount);
    } else {
      setBalance((prev) => prev + amount);
    }
  };

  const generateIdentity = () => {
    const newId = `User_${Math.floor(Math.random() * 999)}_X${Math.floor(Math.random() * 99)}`;
    setUserId(newId);
  };

  return (
    <IntimaContext.Provider value={{
      balance,
      transactions,
      addTransaction,
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isAnonymous,
      userId,
      generateIdentity
    }}>
      {children}
    </IntimaContext.Provider>
  );
}

// Hook for easy access
export function useIntima() {
  const context = useContext(IntimaContext);
  if (context === undefined) {
    throw new Error('useIntima must be used within an IntimaProvider');
  }
  return context;
}