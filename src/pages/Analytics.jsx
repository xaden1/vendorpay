import { useState } from 'react';
import { Download } from 'lucide-react';
import { useApp } from '../context/AppContext';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import RevenueChart from '../components/RevenueChart';
import BusinessScore from '../components/BusinessScore';
import { calculateBusinessScore } from '../utils/businessScore';

const Analytics = () => {
  const { transactions, operations, xlmPrice } = useApp();
  const [dateRange, setDateRange] = useState('30'); // days

  const scoreData = calculateBusinessScore(transactions, operations);

  const exportCSV = () => {
    const headers = ['Date,Type,From,To,Amount(XLM),Hash\n'];
    const rows = operations.map(op => {
      const date = new Date(op.created_at).toISOString();
      const type = op.type;
      const from = op.from || '';
      const to = op.to || '';
      const amount = op.amount || '0';
      const hash = op.transaction_hash;
      return `${date},${type},${from},${to},${amount},${hash}`;
    });
    
    const blob = new Blob([headers + rows.join('\n')], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vendorpay_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-t1 mb-2">Analytics</h1>
          <p className="text-t3">Monitor your store's performance and business score.</p>
        </div>
        
        <div className="flex gap-3">
          <select 
            className="input w-auto cursor-pointer"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 90 Days</option>
          </select>
          <button onClick={exportCSV} className="btn btn-ghost">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <AnalyticsDashboard />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart operations={operations} xlmPrice={xlmPrice} />
        </div>
        <div className="lg:col-span-1">
          <BusinessScore scoreData={scoreData} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
