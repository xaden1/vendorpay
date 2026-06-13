import { describe, it, expect } from 'vitest';
import { parseError, ERROR_TYPES } from '../utils/errorHandler';

describe('errorHandler', () => {
  it('identifies wallet not found error', () => {
    const err = parseError(new Error('WALLET_NOT_FOUND'));
    expect(err.type).toBe(ERROR_TYPES.WALLET_NOT_FOUND);
    expect(err.severity).toBe('error');
    expect(err.title).toBeTruthy();
    expect(err.action).toBeTruthy();
  });

  it('identifies insufficient funds error', () => {
    const err = parseError(new Error('INSUFFICIENT_FUNDS'));
    expect(err.type).toBe(ERROR_TYPES.INSUFFICIENT_FUNDS);
    expect(err.severity).toBe('error');
  });

  it('identifies network error', () => {
    const err = parseError(new Error('Failed to fetch'));
    expect(err.type).toBe(ERROR_TYPES.NETWORK_ERROR);
  });

  it('identifies user rejection', () => {
    const err = parseError(new Error('User declined access'));
    expect(err.type).toBe(ERROR_TYPES.USER_REJECTED);
    expect(err.severity).toBe('warning');
  });

  it('handles unknown errors gracefully', () => {
    const err = parseError(new Error('some random error'));
    expect(err.type).toBe('UNKNOWN_ERROR');
    expect(err.title).toBeTruthy();
  });

  it('handles null/undefined errors', () => {
    const err = parseError(null);
    expect(err).toBeTruthy();
    expect(err.title).toBeTruthy();
  });
});
