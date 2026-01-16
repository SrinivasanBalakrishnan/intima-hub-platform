// src/utils/security.ts

// A curated dictionary of 100 "Privacy/Tech/Space" themed words for the recovery phrase
const WORD_LIST = [
  "alpha", "nebula", "quantum", "cipher", "vector", "orbit", "prism", "flux",
  "gravity", "helix", "ion", "kinetic", "logic", "matrix", "neutron", "omega",
  "pulse", "quark", "radar", "sonar", "tensor", "unity", "vortex", "wave",
  "xenon", "zero", "axis", "binary", "core", "delta", "echo", "fusion",
  "grid", "hyper", "input", "jupiter", "kilo", "laser", "macro", "nano",
  "optic", "phase", "quanta", "router", "static", "token", "ultra", "vault",
  "wire", "xray", "yield", "zone", "anchor", "bravo", "cloud", "data",
  "entry", "frame", "guard", "hash", "index", "jump", "link", "mode",
  "node", "open", "proxy", "query", "root", "stack", "trace", "unit",
  "void", "warp", "zinc", "atlas", "bolt", "code", "deck", "edge",
  "file", "gate", "host", "item", "java", "key", "load", "main",
  "net", "object", "port", "qubit", "rack", "scan", "task", "user"
];

/**
 * Generates a 12-word mnemonic phrase.
 * This acts as the user's "Private Key" to their vault.
 */
export const generateMnemonic = (): string => {
  const phrase: string[] = [];
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
    phrase.push(WORD_LIST[randomIndex]);
  }
  return phrase.join(" ");
};

/**
 * Generates a consistent User ID based on the mnemonic.
 * This ensures if they login with the same phrase, they get the same ID.
 */
export const generateIdFromMnemonic = (mnemonic: string): string => {
  // Simple hash function to create a pseudo-random ID from the string
  let hash = 0;
  for (let i = 0; i < mnemonic.length; i++) {
    const char = mnemonic.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  const positiveHash = Math.abs(hash);
  return `User_${positiveHash.toString().slice(0, 3)}_X${positiveHash.toString().slice(-2)}`;
};