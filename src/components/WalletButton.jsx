import { motion } from 'framer-motion';
import { Wallet, LogOut, Loader2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { truncateAddress } from '../utils/formatters';

const WalletButton = () => {
  const { wallet } = useApp();

  if (wallet.isConnecting) {
    return (
      <button className="btn btn-ghost" disabled>
        <Loader2 size={16} className="animate-spin" />
        Connecting...
      </button>
    );
  }

  if (wallet.address) {
    return (
      <div className="flex items-center gap-2">
        <div className="badge badge-green">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          {truncateAddress(wallet.address)}
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-icon"
          onClick={wallet.disconnect}
          title="Disconnect Wallet"
        >
          <LogOut size={16} />
        </motion.button>
      </div>
    );
  }

  return (
    <div>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="btn btn-primary"
        onClick={wallet.connect}
      >
        <Wallet size={16} />
        Connect Wallet
      </motion.button>
      {wallet.error?.message && (
        <div className="text-sm text-red-500 mt-1">{wallet.error.message}</div>
      )}
    </div>
  );
};

export default WalletButton;

