import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Send, BarChart3, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import BalanceDisplay from '../components/BalanceDisplay';
import { formatXLM, truncateAddress } from '../utils/formatters';

const Dashboard = () => {
  const { vendor, setVendor, contract, transactions, wallet } = useApp();
  const navigate = useNavigate();
  const [setupData, setSetupData] = useState({ name: '', category: 'Goods' });

  const handleSetup = async (e) => {
    e.preventDefault();
    if (contract.isContractConfigured && contract.isContractConfigured()) {
      await contract.registerVendor(wallet.address, setupData.name, setupData.category);
    }
    setVendor(setupData);
  };

  if (!vendor) {
    return (
      <div className="max-w-md mx-auto p-6 pt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card p-8">
          <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
            <Store size={32} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-t1">Setup Your Store</h2>
          <p className="text-t3 mb-6 text-sm">Register your business to start accepting payments on VendorPay.</p>
          
          <form onSubmit={handleSetup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide">Store Name</label>
              <input
                type="text"
                className="input"
                placeholder="e.g. Maria's Cafe"
                value={setupData.name}
                onChange={(e) => setSetupData({...setupData, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide">Category</label>
              <select
                className="input cursor-pointer"
                value={setupData.category}
                onChange={(e) => setSetupData({...setupData, category: e.target.value})}
              >
                <option value="Food">Food & Beverage</option>
                <option value="Goods">Retail Goods</option>
                <option value="Services">Services</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-full justify-center mt-2" disabled={contract.loading}>
              {contract.loading ? 'Registering on-chain...' : 'Complete Setup'}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const recentTxs = transactions.slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-t1 mb-2">Welcome back, {vendor.name} 👋</h1>
        <p className="text-t3">Here's what's happening with your store today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <BalanceDisplay />
        </div>
        
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button onClick={() => navigate('/catalog')} className="card p-6 flex flex-col items-center justify-center gap-3 hover:border-emerald-500 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="font-semibold text-t1">Create Product</span>
          </button>
          
          <button onClick={() => navigate('/send')} className="card p-6 flex flex-col items-center justify-center gap-3 hover:border-blue-500 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Send size={24} />
            </div>
            <span className="font-semibold text-t1">Send Payment</span>
          </button>
          
          <button onClick={() => navigate('/analytics')} className="card p-6 flex flex-col items-center justify-center gap-3 hover:border-violet-500 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center group-hover:scale-110 transition-transform">
              <BarChart3 size={24} />
            </div>
            <span className="font-semibold text-t1">View Analytics</span>
          </button>
        </div>
      </div>

      <div className="card p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-t1">Recent Transactions</h2>
          <button onClick={() => navigate('/transactions')} className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold">
            View All
          </button>
        </div>
        
        {recentTxs.length === 0 ? (
          <div className="text-center py-8 text-t3">No transactions yet.</div>
        ) : (
          <div className="space-y-3">
            {recentTxs.map((tx) => (
              <div key={tx.hash} className="flex justify-between items-center p-4 bg-void rounded-xl border border-b1">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center border border-b2 text-xs">
                    {tx.successful ? '✅' : '❌'}
                  </div>
                  <div>
                    <div className="font-semibold text-t1 mb-0.5">Payment</div>
                    <div className="text-xs text-t3">{new Date(tx.created_at).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-t1">{truncateAddress(tx.hash, 4)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
