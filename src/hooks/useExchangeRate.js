import { useState, useEffect } from 'react';
import { fetchXLMPrice } from '../utils/horizonClient';

export const useExchangeRate = () => {
  const [xlmPrice, setXlmPrice] = useState(0.11);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      const price = await fetchXLMPrice();
      setXlmPrice(price);
      setLoading(false);
    };
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return { xlmPrice, loading };
};
