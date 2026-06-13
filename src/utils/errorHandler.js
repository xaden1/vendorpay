export const ERROR_TYPES = {
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  NETWORK_ERROR: 'NETWORK_ERROR',
  ACCOUNT_NOT_FOUND: 'ACCOUNT_NOT_FOUND',
  INVALID_DESTINATION: 'INVALID_DESTINATION',
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  USER_REJECTED: 'USER_REJECTED',
  TX_TIMEOUT: 'TX_TIMEOUT',
  CONTRACT_ERROR: 'CONTRACT_ERROR',
  STREAM_ERROR: 'STREAM_ERROR',
};

export const parseError = (error) => {
  const msg = error?.message || String(error);

  if (msg.includes('WALLET_NOT_FOUND') || msg.includes('not installed') || msg.includes('Freighter')) {
    return {
      type: ERROR_TYPES.WALLET_NOT_FOUND,
      title: 'Wallet Not Found',
      message: 'Freighter wallet extension is not installed or not responding.',
      action: 'Install Freighter from freighter.app and refresh the page.',
      severity: 'error',
    };
  }

  if (msg.includes('User declined') || msg.includes('rejected') || msg.includes('cancelled')) {
    return {
      type: ERROR_TYPES.USER_REJECTED,
      title: 'Transaction Cancelled',
      message: 'You declined the transaction in Freighter.',
      action: 'Try again and approve the transaction.',
      severity: 'warning',
    };
  }

  if (msg.includes('INSUFFICIENT_FUNDS') || msg.includes('op_underfunded') || msg.includes('insufficient')) {
    return {
      type: ERROR_TYPES.INSUFFICIENT_FUNDS,
      title: 'Insufficient Funds',
      message: 'Your wallet does not have enough XLM for this transaction.',
      action: 'Fund your testnet wallet at laboratory.stellar.org',
      severity: 'error',
    };
  }

  if (msg.includes('INVALID_AMOUNT')) {
    return {
      type: ERROR_TYPES.INVALID_AMOUNT,
      title: 'Invalid Amount',
      message: 'Please enter a valid payment amount greater than 0.',
      action: 'Check the amount and try again.',
      severity: 'warning',
    };
  }

  if (msg.includes('INVALID_DESTINATION') || msg.includes('invalid address')) {
    return {
      type: ERROR_TYPES.INVALID_DESTINATION,
      title: 'Invalid Destination',
      message: 'The recipient wallet address is not valid.',
      action: 'Check the address and try again.',
      severity: 'error',
    };
  }

  if (msg.includes('NETWORK_ERROR') || msg.includes('fetch') || msg.includes('Failed to fetch') || msg.includes('network')) {
    return {
      type: ERROR_TYPES.NETWORK_ERROR,
      title: 'Network Error',
      message: 'Could not connect to Stellar Horizon. Check your internet connection.',
      action: 'Wait a moment and try again.',
      severity: 'error',
    };
  }

  if (msg.includes('ACCOUNT_NOT_FOUND') || msg.includes('404')) {
    return {
      type: ERROR_TYPES.ACCOUNT_NOT_FOUND,
      title: 'Account Not Found',
      message: 'This wallet address does not exist on Stellar Testnet.',
      action: 'Fund it at laboratory.stellar.org with Friendbot.',
      severity: 'error',
    };
  }

  if (msg.includes('TX_TIMEOUT')) {
    return {
      type: ERROR_TYPES.TX_TIMEOUT,
      title: 'Transaction Timeout',
      message: 'The transaction was submitted but confirmation is taking too long.',
      action: 'Check Stellar Expert for your transaction status.',
      severity: 'warning',
    };
  }

  return {
    type: 'UNKNOWN_ERROR',
    title: 'Something Went Wrong',
    message: msg || 'An unexpected error occurred.',
    action: 'Please try again.',
    severity: 'error',
  };
};
