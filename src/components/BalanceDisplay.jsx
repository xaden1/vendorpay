import { motion } from 'framer-motion';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatXLM, formatUSD } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';

const BalanceDisplay = () => {
  const { balance, xlmPrice } = useApp();

  if (balance.loading && !balance.balance) {
    return (
      <div className="card p-6">
        <LoadingSpinner size={24} />
      </div>
    );
  }

  const xlm = balance.balance?.xlm || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card card-glow p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--t3)' }}>Balance</span>
        <motion.button
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
          className="btn btn-icon"
          onClick={balance.refresh}
          style={{ width: 30, height: 30 }}
        >
          <RefreshCw size={13} />
        </motion.button>
      </div>
      <div className="text-3xl font-black text-grad mb-1">
        {formatXLM(xlm)}
      </div>
      <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--t3)' }}>
        <TrendingUp size={13} />
        {formatUSD(xlm, xlmPrice)}
      </div>
    </motion.div>
  );
};

export default BalanceDisplay;
