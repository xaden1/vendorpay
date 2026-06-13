import { describe, it, expect } from 'vitest';
import { truncateAddress, formatXLM, formatUSD, xlmFromLocal, generateMemo } from '../utils/formatters';

describe('formatters', () => {
  it('truncates a Stellar address correctly', () => {
    const addr = 'GDQP2KPQGKIHYJGXNUIYOMHARUARCA7DJT5FO2FFOOKY3B2WSQHG4W37';
    const result = truncateAddress(addr, 5);
    expect(result).toBe('GDQP2...4W37');
    expect(result.length).toBeLessThan(addr.length);
  });

  it('formats XLM amounts correctly', () => {
    expect(formatXLM(1500.5)).toBe('1.50K XLM');
    expect(formatXLM(0.5)).toBe('0.50 XLM');
    expect(formatXLM(2000000)).toBe('2.00M XLM');
    expect(formatXLM('invalid')).toBe('0.00 XLM');
  });

  it('converts local currency to XLM', () => {
    const xlm = xlmFromLocal(83, 'INR', 0.11);
    expect(parseFloat(xlm)).toBeCloseTo(9.09, 0);
  });

  it('formats USD from XLM amount', () => {
    const usd = formatUSD(100, 0.11);
    expect(usd).toBe('$11.00');
  });

  it('generates a valid payment memo', () => {
    const memo = generateMemo('Chai', 'vendor1');
    expect(memo).toMatch(/^VP_/);
    expect(memo.length).toBeLessThanOrEqual(28);
  });

  it('handles empty address gracefully', () => {
    expect(truncateAddress('')).toBe('');
    expect(truncateAddress(null)).toBe('');
  });
});
