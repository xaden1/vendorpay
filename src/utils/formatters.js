import { formatDistanceToNow, format } from 'date-fns';

export const truncateAddress = (addr, chars = 5) => {
  if (!addr) return '';
  const endChars = Math.max(1, chars - 1);
  return `${addr.slice(0, chars)}...${addr.slice(-endChars)}`;
};

export const formatXLM = (amount, decimals = 2) => {
  const n = parseFloat(amount);
  if (isNaN(n)) return '0.00 XLM';
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(decimals)}M XLM`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(decimals)}K XLM`;
  return `${n.toFixed(decimals)} XLM`;
};

export const formatUSD = (xlmAmount, xlmPrice) => {
  const usd = parseFloat(xlmAmount) * parseFloat(xlmPrice || 0.11);
  if (usd >= 1000) return `$${(usd / 1000).toFixed(2)}K`;
  return `$${usd.toFixed(2)}`;
};

export const formatLocalCurrency = (amount, currency = 'INR', xlmPrice = 0.11) => {
  const rates = { INR: 83, NGN: 1580, KES: 130, USD: 1, EUR: 0.92, BRL: 5.1 };
  const rate = rates[currency] || 1;
  const value = parseFloat(amount) * xlmPrice * rate;
  const symbols = { INR: '₹', NGN: '₦', KES: 'KSh', USD: '$', EUR: '€', BRL: 'R$' };
  return `${symbols[currency] || currency} ${value.toFixed(2)}`;
};

export const xlmFromLocal = (localAmount, currency = 'INR', xlmPrice = 0.11) => {
  const rates = { INR: 83, NGN: 1580, KES: 130, USD: 1, EUR: 0.92, BRL: 5.1 };
  const rate = rates[currency] || 1;
  const xlm = parseFloat(localAmount) / rate / xlmPrice;
  return xlm.toFixed(7);
};

export const formatRelative = (dateStr) => {
  try { return formatDistanceToNow(new Date(dateStr), { addSuffix: true }); }
  catch { return dateStr; }
};

export const formatDateTime = (dateStr) => {
  try { return format(new Date(dateStr), 'MMM d, yyyy • h:mm a'); }
  catch { return dateStr; }
};

export const formatDate = (dateStr) => {
  try { return format(new Date(dateStr), 'MMM d, yyyy'); }
  catch { return dateStr; }
};

export const copyToClipboard = async (text) => {
  try { await navigator.clipboard.writeText(text); return true; }
  catch { return false; }
};

export const generateMemo = (productName, vendorId) => {
  const short = productName.slice(0, 15).replace(/\s/g, '_');
  return `VP_${short}_${Date.now().toString(36).toUpperCase()}`;
};
