import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Loader2, ExternalLink, Copy } from 'lucide-react';
import { TX_STATUS } from '../hooks/useTransaction';
import { truncateAddress, copyToClipboard } from '../utils/formatters';

const TransactionFeedback = ({ status, txResult, error, onReset }) => {
  if (status === TX_STATUS.IDLE) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        className="card p-6 mt-4"
        style={{
          borderColor: status === TX_STATUS.SUCCESS ? 'var(--emerald)' : status === TX_STATUS.FAILED ? 'var(--red)' : 'var(--b2)',
          boxShadow: status === TX_STATUS.SUCCESS ? 'var(--shadow-emerald)' : status === TX_STATUS.FAILED ? '0 0 30px var(--red-glow)' : 'none'
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          {(status === TX_STATUS.SIGNING || status === TX_STATUS.SUBMITTING) && (
            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--emerald)' }} />
          )}
          {status === TX_STATUS.SUCCESS && (
            <CheckCircle2 size={24} style={{ color: 'var(--emerald)' }} />
          )}
          {status === TX_STATUS.FAILED && (
            <XCircle size={24} style={{ color: 'var(--red)' }} />
          )}
          <div>
            <h4 className="font-bold" style={{ color: 'var(--t1)' }}>
              {status === TX_STATUS.SIGNING && 'Awaiting Signature...'}
              {status === TX_STATUS.SUBMITTING && 'Submitting Transaction...'}
              {status === TX_STATUS.SUCCESS && 'Transaction Successful!'}
              {status === TX_STATUS.FAILED && (error?.title || 'Transaction Failed')}
            </h4>
            <p className="text-xs mt-1" style={{ color: 'var(--t3)' }}>
              {status === TX_STATUS.SIGNING && 'Please approve in Freighter'}
              {status === TX_STATUS.SUBMITTING && 'Broadcasting to Stellar network...'}
              {status === TX_STATUS.SUCCESS && `Hash: ${truncateAddress(txResult?.hash, 8)}`}
              {status === TX_STATUS.FAILED && (error?.message || 'An error occurred')}
            </p>
          </div>
        </div>

        {status === TX_STATUS.SUCCESS && txResult && (
          <div className="flex gap-2 mt-3">
            <a
              href={txResult.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-xs"
            >
              <ExternalLink size={14} />
              View on Explorer
            </a>
            <button
              className="btn btn-ghost text-xs"
              onClick={() => copyToClipboard(txResult.hash)}
            >
              <Copy size={14} />
              Copy Hash
            </button>
          </div>
        )}

        {(status === TX_STATUS.SUCCESS || status === TX_STATUS.FAILED) && (
          <button
            className="btn btn-ghost text-xs mt-3 w-full justify-center"
            onClick={onReset}
          >
            {status === TX_STATUS.SUCCESS ? 'Send Another' : 'Try Again'}
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionFeedback;
