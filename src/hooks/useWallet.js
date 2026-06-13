import { useState, useCallback, useEffect } from 'react';
import { parseError } from '../utils/errorHandler';

export const useWallet = () => {
  const [address, setAddress] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('vp_wallet');
    if (saved) setAddress(saved);
  }, []);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const { isConnected, isAllowed, setAllowed, getAddress } = await import('@stellar/freighter-api');
      
      const connected = await isConnected();
      if (!connected.isConnected) {
        throw new Error('WALLET_NOT_FOUND');
      }

      const allowed = await isAllowed();
      if (!allowed.isAllowed) {
        await setAllowed();
      }

      const { address, error } = await getAddress();
      if (error || !address) {
        throw new Error(error || 'USER_REJECTED');
      }

      setAddress(address);
      localStorage.setItem('vp_wallet', address);
      return address;
    } catch (err) {
      console.error("Wallet connection error:", err);
      const parsed = parseError(err);
      setError(parsed);
      return null;
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setError(null);
    localStorage.removeItem('vp_wallet');
    localStorage.removeItem('vp_vendor');
    localStorage.removeItem('vp_catalog');
  }, []);

  return { address, isConnecting, error, connect, disconnect };
};
