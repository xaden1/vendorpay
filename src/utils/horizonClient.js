const HORIZON = import.meta.env.VITE_HORIZON_URL || 'https://horizon-testnet.stellar.org';

export const fetchAccount = async (address) => {
  const res = await fetch(`${HORIZON}/accounts/${address}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('ACCOUNT_NOT_FOUND');
    throw new Error('NETWORK_ERROR');
  }
  return res.json();
};

export const fetchBalance = async (address) => {
  const account = await fetchAccount(address);
  const xlm = account.balances.find(b => b.asset_type === 'native');
  return {
    xlm: parseFloat(xlm?.balance || 0),
    raw: account.balances,
    sequence: account.sequence,
    subentryCount: account.subentry_count
  };
};

export const fetchTransactions = async (address, limit = 50) => {
  const res = await fetch(
    `${HORIZON}/accounts/${address}/transactions?limit=${limit}&order=desc`
  );
  if (!res.ok) throw new Error('NETWORK_ERROR');
  const data = await res.json();
  return data._embedded?.records || [];
};

export const fetchOperations = async (address, limit = 100) => {
  const res = await fetch(
    `${HORIZON}/accounts/${address}/operations?limit=${limit}&order=desc`
  );
  if (!res.ok) throw new Error('NETWORK_ERROR');
  const data = await res.json();
  return data._embedded?.records || [];
};

export const fetchXLMPrice = async () => {
  try {
    const res = await fetch(
      `${HORIZON}/order_book?selling_asset_type=native&buying_asset_type=credit_alphanum4&buying_asset_code=USDC&buying_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN&limit=1`
    );
    if (!res.ok) return 0.11;
    const data = await res.json();
    const bestBid = data.bids?.[0]?.price;
    return bestBid ? parseFloat(bestBid) : 0.11;
  } catch {
    return 0.11;
  }
};

export const streamPayments = (address, onPayment, onError) => {
  const es = new EventSource(
    `${HORIZON}/accounts/${address}/transactions?cursor=now`
  );
  es.addEventListener('message', (e) => {
    try {
      const tx = JSON.parse(e.data);
      onPayment(tx);
    } catch (err) {
      // ignore parse errors
    }
  });
  es.addEventListener('error', () => {
    onError?.(new Error('STREAM_ERROR'));
  });
  return () => es.close();
};

export const waitForTransaction = async (txHash, maxAttempts = 20) => {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`${HORIZON}/transactions/${txHash}`);
      if (res.ok) {
        const tx = await res.json();
        return { success: tx.successful, tx };
      }
    } catch {}
    await new Promise(r => setTimeout(r, 2000));
  }
  throw new Error('TX_TIMEOUT');
};
