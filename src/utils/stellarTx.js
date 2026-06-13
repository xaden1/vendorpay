import * as StellarSdk from '@stellar/stellar-sdk';

const HORIZON = import.meta.env.VITE_HORIZON_URL || 'https://horizon-testnet.stellar.org';
const NETWORK_PASSPHRASE = import.meta.env.VITE_NETWORK_PASSPHRASE || StellarSdk.Networks.TESTNET;
const server = new StellarSdk.Horizon.Server(HORIZON);

export const sendXLM = async (fromAddress, toAddress, amount, memo = '') => {
  if (!StellarSdk.StrKey.isValidEd25519PublicKey(toAddress)) {
    throw new Error('INVALID_DESTINATION');
  }
  if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
    throw new Error('INVALID_AMOUNT');
  }

  let sourceAccount;
  try {
    sourceAccount = await server.loadAccount(fromAddress);
  } catch (e) {
    throw new Error('ACCOUNT_NOT_FOUND');
  }

  const xlmBalance = sourceAccount.balances.find(b => b.asset_type === 'native');
  const available = parseFloat(xlmBalance?.balance || 0) - 1;
  if (parseFloat(amount) > available) {
    throw new Error('INSUFFICIENT_FUNDS');
  }

  const txBuilder = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  txBuilder.addOperation(
    StellarSdk.Operation.payment({
      destination: toAddress,
      asset: StellarSdk.Asset.native(),
      amount: parseFloat(amount).toFixed(7),
    })
  );

  if (memo) {
    txBuilder.addMemo(StellarSdk.Memo.text(memo.slice(0, 28)));
  }

  txBuilder.setTimeout(30);
  const tx = txBuilder.build();

  const { signTransaction } = await import('@stellar/freighter-api');
  const { signedTxXdr, error } = await signTransaction(tx.toXDR(), {
    networkPassphrase: NETWORK_PASSPHRASE,
  });

  if (error || !signedTxXdr) {
    throw new Error(error || 'USER_REJECTED');
  }

  const signedXDR = signedTxXdr;

  const signedTx = StellarSdk.TransactionBuilder.fromXDR(signedXDR, NETWORK_PASSPHRASE);
  const result = await server.submitTransaction(signedTx);

  return {
    hash: result.hash,
    ledger: result.ledger,
    successful: true,
    explorerUrl: `https://stellar.expert/explorer/testnet/tx/${result.hash}`
  };
};

export const checkDestinationExists = async (address) => {
  try {
    const server = new StellarSdk.Horizon.Server(HORIZON);
    await server.loadAccount(address);
    return true;
  } catch {
    return false;
  }
};
