import { describe, it, expect } from 'vitest';
import { calculateBusinessScore } from '../utils/businessScore';

describe('calculateBusinessScore', () => {
  it('returns zero score for empty data', () => {
    const result = calculateBusinessScore([], []);
    expect(result.score).toBe(0);
    expect(result.grade).toBe('F');
  });

  it('calculates a positive score for active wallet', () => {
    const transactions = Array.from({ length: 20 }, (_, i) => ({
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
    }));
    const operations = Array.from({ length: 15 }, (_, i) => ({
      type: 'payment',
      to: 'GDEST...',
      from: `GCUST${i}`,
    }));
    const result = calculateBusinessScore(transactions, operations);
    expect(result.score).toBeGreaterThan(0);
    expect(['A+', 'A', 'B', 'C', 'D', 'F']).toContain(result.grade);
  });

  it('has correct breakdown structure', () => {
    const result = calculateBusinessScore([{ created_at: new Date().toISOString() }], []);
    expect(result.breakdown).toHaveProperty('volume');
    expect(result.breakdown).toHaveProperty('consistency');
    expect(result.breakdown).toHaveProperty('diversity');
    expect(result.breakdown).toHaveProperty('tenure');
  });

  it('score does not exceed 100', () => {
    const manyTx = Array.from({ length: 200 }, (_, i) => ({
      created_at: new Date(Date.now() - i * 3600000).toISOString(),
    }));
    const manyOps = Array.from({ length: 200 }, (_, i) => ({
      type: 'payment', to: 'X', from: `G${i}`,
    }));
    const result = calculateBusinessScore(manyTx, manyOps);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});
