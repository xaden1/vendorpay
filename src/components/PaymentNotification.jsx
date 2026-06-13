import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, CheckCircle } from 'lucide-react';
import { formatXLM } from '../utils/formatters';

const PaymentNotification = ({ payment, onDismiss }) => {
  return (
    <AnimatePresence>
      {payment && (
        <motion.div
          initial={{ opacity: 0, y: -50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.95 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
        >
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 p-1 rounded-xl shadow-2xl">
            <div className="bg-surface rounded-lg p-4 flex items-start gap-4">
              <div className="bg-emerald-500/20 p-2 rounded-full text-emerald-400">
                <CheckCircle size={24} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-bold text-t1 mb-1">Payment Received!</h4>
                <div className="text-2xl font-black text-grad mb-2">
                  {formatXLM(payment.amount || 0)}
                </div>
                {payment.hash && (
                  <a
                    href={`https://stellar.expert/explorer/testnet/tx/${payment.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-t3 hover:text-emerald-400 flex items-center gap-1"
                  >
                    View on Explorer <ExternalLink size={12} />
                  </a>
                )}
              </div>

              <button
                onClick={onDismiss}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentNotification;
