// FORCE_DEPLOY_TRIGGER_01
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// TESTER NOTE: '../' is correct here because we go up from 'context' to 'app', then down to 'utils'
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

  // AUTH / VAULT STATE
  isAuthenticated: boolean;
  vaultKey: string | null;
  login: (mnemonic: string) => boolean; 
  logout: () => void;                  
};

const IntimaContext = createContext<IntimaContextType | undefined>(undefined);

export function IntimaProvider({ children }: { children: ReactNode }) {
  // --- 1. STATE DEFINITIONS ---
  
  // Auth & Vault State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [vaultKey, setVaultKey] = useState<string | null>(null);
  
  // Core App Data
  const [balance, setBalance] = useState(0); 
  const [cart, setCart] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userId, setUserId] = useState("Guest_User");
  
  // Animation State
  const [hasSeenSplash, setHasSeenSplash] = useState(false);

  // --- 2. SESSION RECOVERY ---
  useEffect(() => {
    // Check global splash setting
    if (typeof window !== 'undefined') {
      const savedSplash = localStorage.getItem('intima_global_splash');
      if (savedSplash === 'true') setHasSeenSplash(true);
      
      // Check active session
      const activeSession = sessionStorage.getItem('intima_active_session');
      if (activeSession) {
         login(activeSession);
      }
    }
  }, []);

  // --- 3. LOGIN LOGIC ---
  const login = (mnemonic: string) => {
    if (!mnemonic) return false;
    
    // Generate IDs
    const derivedKey = `intima_vault_${mnemonic.trim().replace(/\s+/g, '_')}`;
    const derivedId = generateIdFromMnemonic(mnemonic);

    setVaultKey(derivedKey);
    setUserId(derivedId);

    // Save session
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('intima_active_session', mnemonic);
      
      // Load Vault
      const savedData = localStorage.getItem(derivedKey);
      
      if (savedData) {
        // RESTORE EXISTING
        try {
          const parsed = JSON.parse(savedData);
          setBalance(parsed.balance);
          setCart(parsed.cart);
          setTransactions(parsed.transactions);
        } catch (e) {
          console.error("Vault corruption detected", e);
        }
      } else {
        // CREATE NEW (Genesis)
        const genesisBalance = 499.00;
        const genesisTx: Transaction = {
          id: 'GENESIS-001',
          merchant: 'Intima Welcome Bonus',
          amount: 499.00,
          date: new Date().toLocaleDateString(),
          type: 'credit',
          status: 'completed'
        };

        setBalance(genesisBalance);
        setCart([]);
        setTransactions([genesisTx]);
      }
    }

    setIsAuthenticated(true);
    setHasSeenSplash(true); 
    return true;
  };

  // --- 4. PERSISTENCE ---
  useEffect(() => {
    if (isAuthenticated && vaultKey && typeof window !== 'undefined') {
      const vaultData = {
        balance,
        cart,
        transactions,
        lastActive: new Date().toISOString()
      };
      localStorage.setItem(vaultKey, JSON.stringify(vaultData));
    }
  }, [balance, cart, transactions, isAuthenticated, vaultKey]);

  // Save Splash State
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
      date: new Date().toLocaleDateString(),
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

  const logout = () => {
    setIsAuthenticated(false);
    setVaultKey(null);
    setUserId("Guest");
    setCart([]); 
    setBalance(0);
    setTransactions([]);
    setHasSeenSplash(false);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('intima_global_splash', 'false');
      sessionStorage.removeItem('intima_active_session');
    }
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
      hasSeenSplash,
      markSplashSeen,
      isAuthenticated,
      vaultKey,
      login,
      logout
    }}>
      {children}
    </IntimaContext.Provider>
  );
}

export function useIntima() {
  const context = useContext(IntimaContext);
  if (context === undefined) {
    throw new Error('useIntima must be used within an IntimaProvider');
  }
  return context;
}