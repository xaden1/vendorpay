import { useState, useEffect, useCallback, useRef } from 'react';
import { streamPayments } from '../utils/horizonClient';

export const usePaymentStream = (address, onPayment) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [lastPayment, setLastPayment] = useState(null);
  const cleanupRef = useRef(null);

  const startStream = useCallback(() => {
    if (!address || cleanupRef.current) return;
    setIsStreaming(true);

    const cleanup = streamPayments(
      address,
      (tx) => {
        setLastPayment(tx);
        onPayment?.(tx);
      },
      (err) => {
        console.error('Stream error:', err);
        setIsStreaming(false);
      }
    );

    cleanupRef.current = cleanup;
  }, [address, onPayment]);

  const stopStream = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
    setIsStreaming(false);
  }, []);

  useEffect(() => {
    return () => {
      cleanupRef.current?.();
    };
  }, []);

  return { isStreaming, lastPayment, startStream, stopStream };
};
