import { useState, useCallback, useEffect } from 'react';
import { fetchBalance } from '../utils/horizonClient';
import { parseError } from '../utils/errorHandler';

export const useBalance = (address) => {
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!address) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBalance(address);
      setBalance(data);
      return data;
    } catch (err) {
      setError(parseError(err));
      return null;
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 15000);
    return () => clearInterval(interval);
  }, [refresh]);

  return { balance, loading, error, refresh };
};
