import { useState, useCallback } from 'react';
import { sendXLM } from '../utils/stellarTx';
import { parseError } from '../utils/errorHandler';

export const TX_STATUS = {
  IDLE: 'idle',
  SIGNING: 'signing',
  SUBMITTING: 'submitting',
  SUCCESS: 'success',
  FAILED: 'failed',
};

export const useTransaction = () => {
  const [status, setStatus] = useState(TX_STATUS.IDLE);
  const [txResult, setTxResult] = useState(null);
  const [error, setError] = useState(null);

  const send = useCallback(async (fromAddress, toAddress, amount, memo = '') => {
    setStatus(TX_STATUS.SIGNING);
    setTxResult(null);
    setError(null);

    try {
      setStatus(TX_STATUS.SUBMITTING);
      const result = await sendXLM(fromAddress, toAddress, amount, memo);
      setTxResult(result);
      setStatus(TX_STATUS.SUCCESS);
      return result;
    } catch (err) {
      const parsed = parseError(err);
      setError(parsed);
      setStatus(TX_STATUS.FAILED);
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus(TX_STATUS.IDLE);
    setTxResult(null);
    setError(null);
  }, []);

  return { status, txResult, error, send, reset };
};
