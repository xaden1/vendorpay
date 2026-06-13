import { useState, useCallback } from 'react';
import * as StellarSdk from '@stellar/stellar-sdk';
import { parseError } from '../utils/errorHandler';

const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID;
const SOROBAN_RPC = import.meta.env.VITE_SOROBAN_RPC || 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = import.meta.env.VITE_NETWORK_PASSPHRASE || StellarSdk.Networks.TESTNET;

export const useContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const registerVendor = useCallback(async (address, name, category) => {
    if (!CONTRACT_ID || CONTRACT_ID === 'YOUR_DEPLOYED_CONTRACT_ID_HERE') {
      console.warn('Contract ID not set — skipping contract registration');
      return { success: true, simulated: true };
    }
    setLoading(true);
    setError(null);
    try {
      const server = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC);
      const sourceAccount = await server.getAccount(address);
      const contract = new StellarSdk.Contract(CONTRACT_ID);

      const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(contract.call(
          'register_vendor',
          StellarSdk.Address.fromString(address).toScVal(),
          StellarSdk.nativeToScVal(name, { type: 'string' }),
          StellarSdk.nativeToScVal(category, { type: 'string' }),
        ))
        .setTimeout(30)
        .build();

      const prepared = await server.prepareTransaction(tx);

      const module = await import('@stellar/freighter-api');
      const freighter = module?.default ?? module;
      const signTransaction = freighter?.signTransaction;
      if (typeof signTransaction !== 'function') {
        throw new Error('WALLET_NOT_FOUND');
      }

      const signedResult = await signTransaction(prepared.toXDR(), {
        networkPassphrase: NETWORK_PASSPHRASE,
      });
      const signedXDR = typeof signedResult === 'string'
        ? signedResult
        : signedResult?.signedTxXdr || signedResult?.signedTransaction;

      if (!signedXDR) {
        throw new Error('WALLET_NOT_FOUND');
      }

      const signedTx = StellarSdk.TransactionBuilder.fromXDR(signedXDR, NETWORK_PASSPHRASE);
      const result = await server.sendTransaction(signedTx);

      setIsRegistered(true);
      return { success: true, hash: result.hash };
    } catch (err) {
      const parsed = parseError(err);
      setError(parsed);
      return { success: false, error: parsed };
    } finally {
      setLoading(false);
    }
  }, []);

  const checkRegistration = useCallback(async (address) => {
    if (!CONTRACT_ID || CONTRACT_ID === 'YOUR_DEPLOYED_CONTRACT_ID_HERE') {
      return false;
    }
    try {
      const server = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC);
      const contract = new StellarSdk.Contract(CONTRACT_ID);
      const sourceAccount = await server.getAccount(address);
      const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: NETWORK_PASSPHRASE,
      })
        .addOperation(contract.call(
          'is_registered',
          StellarSdk.Address.fromString(address).toScVal(),
        ))
        .setTimeout(30)
        .build();
      const result = await server.simulateTransaction(tx);
      const val = StellarSdk.scValToNative(result.result?.retval);
      setIsRegistered(!!val);
      return !!val;
    } catch {
      return false;
    }
  }, []);

  return { loading, error, isRegistered, registerVendor, checkRegistration };
};
