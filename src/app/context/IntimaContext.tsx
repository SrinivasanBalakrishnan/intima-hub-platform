"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// IMPORT SECURITY UTILS (Ensure src/utils/security.ts exists as approved)
import { generateIdFromMnemonic } from '../utils/security';

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
  userId: string;

  // App State (Animation)
  hasSeenSplash: boolean;
  markSplashSeen: () => void;

  // AUTH / VAULT STATE (NEW ENTERPRISE FEATURES)
  isAuthenticated: boolean;
  vaultKey: string | null;
  login: (mnemonic: string) => boolean; // The Restore Function
  logout: () => void;                   // The Exit Function
};

// --- INITIAL MOCK DATA ---
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 'TX-992', merchant: 'Intima Shop Decentralized', amount: 12.99, date: 'Today, 10:30 AM', type: 'debit', status: 'completed' },
  { id: 'TX-881', merchant: 'Dr. Sharma Consult', amount: 50.00, date: 'Yesterday', type: 'debit', status: 'completed' },
  { id: 'TX-774', merchant: 'Anon-Exchange TopUp', amount: 200.00, date: 'Oct 24', type: 'credit', status: 'completed' },
];

const IntimaContext = createContext<IntimaContextType | undefined>(undefined);

export function IntimaProvider({ children }: { children: ReactNode }) {
  // --- 1. STATE DEFINITIONS ---
  
  // Auth & Vault State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vaultKey, setVaultKey] = useState<string | null>(null);
  
  // Core App Data
  const [balance, setBalance] = useState(1240.50);
  const [cart, setCart] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [userId, setUserId] = useState("Guest_User");
  
  // Animation State
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  // --- 2. SESSION RECOVERY (NEW: Fix for "Back Button" Bug) ---
  useEffect(() => {
    // A. Check if a session is active in this browser tab (Session Storage)
    const activeSession = sessionStorage.getItem('intima_active_session');
    
    // If we have an active session, auto-login silently
    if (activeSession) {
       login(activeSession);
    }
    
    // B. Check global splash setting (Local Storage)
    // This handles the "Have they seen the intro?" logic separately
    if (typeof window !== 'undefined') {
      const savedSplash = localStorage.getItem('intima_global_splash');
      if (savedSplash === 'true') setHasSeenSplash(true);
    }
  }, []);

  // --- 3. RESTORE / LOGIN LOGIC (The Vault Opener) ---
  const login = (mnemonic: string) => {
    if (!mnemonic) return false;
    
    // Create a unique storage key based on the secret phrase
    const derivedKey = `intima_vault_${mnemonic.trim().replace(/\s+/g, '_')}`;
    const derivedId = generateIdFromMnemonic(mnemonic);

    setVaultKey(derivedKey);
    setUserId(derivedId);

    // NEW: Save active session to sessionStorage 
    // This allows page refreshes/navigation without logging out, 
    // but wipes the session when the tab/browser is closed.
    sessionStorage.setItem('intima_active_session', mnemonic);

    // Attempt to load data from the vault
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(derivedKey);
      
      if (savedData) {
        // SCENARIO: RETURNING USER (Restore Balance)
        try {
          const parsed = JSON.parse(savedData);
          setBalance(parsed.balance);
          setCart(parsed.cart);
          setTransactions(parsed.transactions);
        } catch (e) {
          console.error("Vault corruption detected", e);
        }
      } else {
        // SCENARIO: NEW IDENTITY (Fresh Wallet)
        setBalance(1240.50); // Starting Bonus
        setCart([]);
        setTransactions(INITIAL_TRANSACTIONS);
      }
    }

    setIsAuthenticated(true);
    setHasSeenSplash(true); 
    return true;
  };

  // --- 4. PERSISTENCE (Auto-Save to Vault) ---
  useEffect(() => {
    if (isAuthenticated && vaultKey && typeof window !== 'undefined') {
      const vaultData = {
        balance,
        cart,
        transactions,
        lastActive: new Date().toISOString()
      };
      // Save to the SPECIFIC vault key
      localStorage.setItem(vaultKey, JSON.stringify(vaultData));
    }
  }, [balance, cart, transactions, isAuthenticated, vaultKey]);

  // Save Splash State globally (Separate from Vault)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('intima_global_splash', hasSeenSplash.toString());
    }
  }, [hasSeenSplash]);


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

  const markSplashSeen = () => {
    setHasSeenSplash(true);
  };

  // --- LOGOUT / EXIT ---
  const logout = () => {
    // 1. Clear Active Session State
    setIsAuthenticated(false);
    setVaultKey(null);
    setUserId("Guest");
    
    // 2. Clear Visual Data (Security Wipe)
    setCart([]); 
    setBalance(0);
    setTransactions([]);
    
    // 3. Reset Splash and Global Storage
    setHasSeenSplash(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('intima_global_splash', 'false');
      
      // NEW: Clear the Session Token so they don't auto-login on refresh
      sessionStorage.removeItem('intima_active_session');
    }
    
    // NOTE: We do NOT delete the localStorage vault item. 
    // That persists so the user can "Restore" later.
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
      userId,
      
      // Animation State
      hasSeenSplash,
      markSplashSeen,
      
      // Auth State
      isAuthenticated,
      vaultKey,
      login,
      logout
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