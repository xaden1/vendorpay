import { v4 as uuidv4 } from 'uuid';

export const generatePaymentRequest = ({
  vendorAddress,
  amount,
  productName,
  memo,
  currency = 'XLM',
  expiresInSeconds = 300
}) => {
  const requestId = uuidv4().slice(0, 8).toUpperCase();
  const expiresAt = Date.now() + expiresInSeconds * 1000;
  const finalMemo = memo || `VP-${requestId}`;

  const stellarUri = [
    `web+stellar:pay`,
    `?destination=${vendorAddress}`,
    `&amount=${parseFloat(amount).toFixed(7)}`,
    `&asset_code=XLM`,
    `&memo=${finalMemo}`,
    `&memo_type=text`,
    `&msg=${encodeURIComponent(`Pay for ${productName}`)}`,
  ].join('');

  return {
    requestId,
    stellarUri,
    vendorAddress,
    amount,
    productName,
    memo: finalMemo,
    expiresAt,
    createdAt: Date.now(),
  };
};

export const isExpired = (paymentRequest) => {
  return Date.now() > paymentRequest.expiresAt;
};

export const getTimeRemaining = (expiresAt) => {
  const remaining = Math.max(0, expiresAt - Date.now());
  const minutes = Math.floor(remaining / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);
  return { minutes, seconds, remaining, isExpired: remaining === 0 };
};
