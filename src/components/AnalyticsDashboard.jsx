import { motion } from 'framer-motion';
import { DollarSign, Activity, Users, ArrowUpRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatXLM } from '../utils/formatters';

const AnalyticsDashboard = () => {
  const { operations, transactions } = useApp();

  const receivedOps = operations.filter(op => op.type === 'payment' && op.to);
  const totalRevenue = receivedOps.reduce((sum, op) => sum + parseFloat(op.amount), 0);
  const uniqueCustomers = new Set(receivedOps.map(op => op.from)).size;
  const avgTx = receivedOps.length > 0 ? totalRevenue / receivedOps.length : 0;

  const stats = [
    { label: 'Total Revenue', value: formatXLM(totalRevenue), icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Transactions', value: transactions.length, icon: Activity, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Unique Customers', value: uniqueCustomers, icon: Users, color: 'text-violet-400', bg: 'bg-violet-400/10' },
    { label: 'Avg Transaction', value: formatXLM(avgTx), icon: ArrowUpRight, color: 'text-gold', bg: 'bg-gold/10' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="card p-5 flex items-center gap-4"
        >
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <div className="text-xs font-semibold text-t3 uppercase tracking-wider mb-1">{stat.label}</div>
            <div className="text-xl font-bold text-t1">{stat.value}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AnalyticsDashboard;
