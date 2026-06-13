import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchBalance, fetchAccount } from '../utils/horizonClient';

describe('horizonClient', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches account balance successfully', async () => {
    const mockAccount = {
      balances: [
        { asset_type: 'native', balance: '100.5000000' },
      ],
      sequence: '12345',
      subentry_count: 0,
    };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockAccount),
    });

    const result = await fetchBalance('GTEST123');
    expect(result.xlm).toBe(100.5);
    expect(result.sequence).toBe('12345');
  });

  it('throws ACCOUNT_NOT_FOUND for 404', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(fetchAccount('GINVALID')).rejects.toThrow('ACCOUNT_NOT_FOUND');
  });

  it('throws NETWORK_ERROR for non-404 failures', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    await expect(fetchAccount('GTEST')).rejects.toThrow('NETWORK_ERROR');
  });
});
