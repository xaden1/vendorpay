import * as StellarSdk from '@stellar/stellar-sdk';

const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID;
const SOROBAN_RPC = import.meta.env.VITE_SOROBAN_RPC || 'https://soroban-testnet.stellar.org';
const NETWORK_PASSPHRASE = import.meta.env.VITE_NETWORK_PASSPHRASE || StellarSdk.Networks.TESTNET;

export const isContractConfigured = () => {
  return CONTRACT_ID && CONTRACT_ID !== 'YOUR_DEPLOYED_CONTRACT_ID_HERE';
};

export const callContract = async (address, method, ...args) => {
  if (!isContractConfigured()) {
    console.warn('Contract ID not configured — skipping contract call');
    return { success: true, simulated: true };
  }

  const server = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC);
  const sourceAccount = await server.getAccount(address);
  const contract = new StellarSdk.Contract(CONTRACT_ID);

  const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(30)
    .build();

  const prepared = await server.prepareTransaction(tx);

  const { signTransaction } = await import('@stellar/freighter-api');
  const { signedTxXdr, error } = await signTransaction(prepared.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  if (error || !signedTxXdr) {
    throw new Error(error || 'USER_REJECTED');
  }

  const signedXDR = signedTxXdr;

  const signedTx = StellarSdk.TransactionBuilder.fromXDR(signedXDR, NETWORK_PASSPHRASE);
  const result = await server.sendTransaction(signedTx);

  return { success: true, hash: result.hash };
};

export const simulateContract = async (address, method, ...args) => {
  if (!isContractConfigured()) return null;

  const server = new StellarSdk.SorobanRpc.Server(SOROBAN_RPC);
  const sourceAccount = await server.getAccount(address);
  const contract = new StellarSdk.Contract(CONTRACT_ID);

  const tx = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(contract.call(method, ...args))
    .setTimeout(30)
    .build();

  const result = await server.simulateTransaction(tx);
  return StellarSdk.scValToNative(result.result?.retval);
};
