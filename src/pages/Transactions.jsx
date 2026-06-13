import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, ArrowUpRight, ArrowDownLeft, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatXLM, formatDateTime, truncateAddress } from '../utils/formatters';
import LoadingSpinner from '../components/LoadingSpinner';

const Transactions = () => {
  const { transactions, operations, txLoading, refreshTransactions, wallet } = useApp();
  const [combinedList, setCombinedList] = useState([]);

  useEffect(() => {
    // Combine operations with tx data for better display
    const payments = operations.filter(op => op.type === 'payment');
    
    const enriched = payments.map(op => {
      const isReceived = op.to === wallet.address;
      const tx = transactions.find(t => t.hash === op.transaction_hash) || {};
      
      return {
        id: op.id,
        hash: op.transaction_hash,
        date: op.created_at,
        amount: parseFloat(op.amount),
        isReceived,
        counterparty: isReceived ? op.from : op.to,
        memo: tx.memo || '',
        memoType: tx.memo_type || 'none',
        successful: tx.successful !== false // default true if unknown
      };
    });

    // Sort by date descending
    enriched.sort((a, b) => new Date(b.date) - new Date(a.date));
    setCombinedList(enriched);
  }, [operations, transactions, wallet.address]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-t1 mb-2">Transaction History</h1>
          <p className="text-t3">A complete record of your payments on Stellar Testnet.</p>
        </div>
        
        <button 
          onClick={refreshTransactions} 
          className="btn btn-ghost"
          disabled={txLoading}
        >
          <RefreshCw size={16} className={txLoading ? "animate-spin" : ""} /> 
          Refresh
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-void/50 border-b border-b1">
                <th className="p-4 text-xs font-semibold text-t3 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-t3 uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-semibold text-t3 uppercase tracking-wider">Amount</th>
                <th className="p-4 text-xs font-semibold text-t3 uppercase tracking-wider">From/To</th>
                <th className="p-4 text-xs font-semibold text-t3 uppercase tracking-wider">Memo</th>
                <th className="p-4 text-xs font-semibold text-t3 uppercase tracking-wider text-right">Explorer</th>
              </tr>
            </thead>
            <tbody>
              {txLoading && combinedList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : combinedList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-t3">
                    No payment history found for this wallet.
                  </td>
                </tr>
              ) : (
                combinedList.map((tx, i) => (
                  <motion.tr 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={tx.id} 
                    className="border-b border-b1 hover:bg-void/30 transition-colors"
                  >
                    <td className="p-4 whitespace-nowrap">
                      <div className="text-sm text-t1 font-medium">{formatDateTime(tx.date).split('•')[0]}</div>
                      <div className="text-xs text-t3">{formatDateTime(tx.date).split('•')[1]}</div>
                    </td>
                    <td className="p-4">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold ${
                        tx.isReceived ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}>
                        {tx.isReceived ? <ArrowDownLeft size={14} /> : <ArrowUpRight size={14} />}
                        {tx.isReceived ? 'Received' : 'Sent'}
                      </div>
                    </td>
                    <td className="p-4 font-black text-sm">
                      {formatXLM(tx.amount)}
                    </td>
                    <td className="p-4 text-sm font-mono text-t2">
                      {truncateAddress(tx.counterparty, 6)}
                    </td>
                    <td className="p-4 text-sm text-t3 max-w-[150px] truncate">
                      {tx.memo || '-'}
                    </td>
                    <td className="p-4 text-right">
                      <a 
                        href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex p-2 hover:bg-surface rounded-lg text-t3 hover:text-emerald-400 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
