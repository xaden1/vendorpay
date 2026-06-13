import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useWallet } from '../hooks/useWallet';
import { useBalance } from '../hooks/useBalance';
import { useExchangeRate } from '../hooks/useExchangeRate';
import { useContract } from '../hooks/useContract';
import { fetchTransactions, fetchOperations } from '../utils/horizonClient';

const AppContext = createContext(null);

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export const AppProvider = ({ children }) => {
  const wallet = useWallet();
  const balance = useBalance(wallet.address);
  const { xlmPrice } = useExchangeRate();
  const contract = useContract();

  // Vendor profile
  const [vendor, setVendor] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vp_vendor')) || null; }
    catch { return null; }
  });

  // Product catalog
  const [catalog, setCatalog] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vp_catalog')) || []; }
    catch { return []; }
  });

  // Currency
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('vp_currency') || 'INR';
  });

  // Transactions cache
  const [transactions, setTransactions] = useState([]);
  const [operations, setOperations] = useState([]);
  const [txLoading, setTxLoading] = useState(false);

  // Persist vendor
  useEffect(() => {
    if (vendor) localStorage.setItem('vp_vendor', JSON.stringify(vendor));
    else localStorage.removeItem('vp_vendor');
  }, [vendor]);

  // Persist catalog
  useEffect(() => {
    localStorage.setItem('vp_catalog', JSON.stringify(catalog));
  }, [catalog]);

  // Persist currency
  useEffect(() => {
    localStorage.setItem('vp_currency', currency);
  }, [currency]);

  // Fetch transactions
  const refreshTransactions = useCallback(async () => {
    if (!wallet.address) return;
    setTxLoading(true);
    try {
      const [txs, ops] = await Promise.all([
        fetchTransactions(wallet.address),
        fetchOperations(wallet.address),
      ]);
      setTransactions(txs);
      setOperations(ops);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setTxLoading(false);
    }
  }, [wallet.address]);

  useEffect(() => {
    refreshTransactions();
  }, [refreshTransactions]);

  // Catalog CRUD
  const addProduct = useCallback((product) => {
    setCatalog(prev => [...prev, { ...product, id: Date.now().toString(36) }]);
  }, []);

  const updateProduct = useCallback((id, updates) => {
    setCatalog(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  }, []);

  const removeProduct = useCallback((id) => {
    setCatalog(prev => prev.filter(p => p.id !== id));
  }, []);

  const value = {
    wallet,
    balance,
    xlmPrice,
    contract,
    vendor,
    setVendor,
    catalog,
    addProduct,
    updateProduct,
    removeProduct,
    currency,
    setCurrency,
    transactions,
    operations,
    txLoading,
    refreshTransactions,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
