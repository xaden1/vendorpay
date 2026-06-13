import { motion, AnimatePresence } from 'framer-motion';
import { Printer, X } from 'lucide-react';
import { printReceipt } from '../utils/receiptGenerator';

const ReceiptModal = ({ isOpen, onClose, receipt }) => {
  if (!isOpen || !receipt) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="card card-glow w-full max-w-sm relative"
        >
          <div className="p-6 border-b border-dashed border-b2">
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
              <X size={20} />
            </button>
            <div className="text-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-void text-xl mx-auto mb-2">
                VP
              </div>
              <h2 className="text-lg font-bold text-t1">VendorPay Receipt</h2>
              <p className="text-xs text-t3 font-mono mt-1">{receipt.receiptId}</p>
            </div>

            <div className="text-center my-6">
              <div className="text-4xl font-black text-grad mb-1">
                {receipt.formattedAmount}
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-t3">Product</span>
                <span className="font-bold text-t1">{receipt.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-t3">Date</span>
                <span className="font-bold text-t1">{receipt.formattedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-t3">Network</span>
                <span className="font-bold text-t1">{receipt.network}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-t3">Memo</span>
                <span className="font-bold text-t1">{receipt.memo || '-'}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-void/50">
            <div className="mb-6">
              <div className="text-xs text-t3 mb-1">Transaction Hash</div>
              <div className="text-[10px] font-mono text-t1 break-all bg-void p-2 rounded border border-b1">
                {receipt.txHash}
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={onClose} className="btn btn-ghost flex-1 justify-center">
                Close
              </button>
              <button onClick={() => printReceipt(receipt)} className="btn btn-primary flex-1 justify-center">
                <Printer size={16} />
                Print
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReceiptModal;
