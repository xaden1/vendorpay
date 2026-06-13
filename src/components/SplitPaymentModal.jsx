import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2, Send } from 'lucide-react';
import { useTransaction } from '../hooks/useTransaction';

const SplitPaymentModal = ({ isOpen, onClose, totalAmount, memo, onComplete }) => {
  const [recipients, setRecipients] = useState([{ address: '', amount: '' }]);
  const { send, status } = useTransaction();

  const addRecipient = () => {
    setRecipients([...recipients, { address: '', amount: '' }]);
  };

  const removeRecipient = (index) => {
    const newRecipients = [...recipients];
    newRecipients.splice(index, 1);
    setRecipients(newRecipients);
  };

  const updateRecipient = (index, field, value) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const currentTotal = recipients.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Math.abs(currentTotal - totalAmount) > 0.01 && totalAmount > 0) {
      alert(`Total split amount (${currentTotal}) does not match required total (${totalAmount})`);
      return;
    }
    
    // In a real app, we'd use a batched transaction or send sequentially
    // Here we'll just alert that this is a placeholder for the UI
    alert('Split payments initiated! (UI Demo)');
    if (onComplete) onComplete(recipients);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          className="card w-full max-w-lg p-6 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold text-t1 mb-2">Split Payment</h2>
          {totalAmount > 0 && (
            <p className="text-sm text-t3 mb-6">Total Amount to Split: <span className="font-bold text-grad">{totalAmount} XLM</span></p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {recipients.map((r, index) => (
              <div key={index} className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-t3 mb-1">Recipient Address</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="G..."
                    value={r.address}
                    onChange={(e) => updateRecipient(index, 'address', e.target.value)}
                    required
                  />
                </div>
                <div className="w-1/3">
                  <label className="block text-xs font-semibold text-t3 mb-1">Amount (XLM)</label>
                  <input
                    type="number"
                    className="input"
                    step="0.0000001"
                    min="0"
                    value={r.amount}
                    onChange={(e) => updateRecipient(index, 'amount', e.target.value)}
                    required
                  />
                </div>
                {recipients.length > 1 && (
                  <button type="button" onClick={() => removeRecipient(index)} className="btn btn-icon btn-danger mb-0.5">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addRecipient} className="btn btn-ghost w-full justify-center border-dashed mt-2">
              <Plus size={16} /> Add Recipient
            </button>

            <div className="flex justify-between items-center py-4 border-t border-b1 mt-4">
              <span className="text-t3 text-sm">Allocated Total:</span>
              <span className={`font-bold ${Math.abs(currentTotal - totalAmount) < 0.01 ? 'text-emerald-400' : 'text-gold'}`}>
                {currentTotal.toFixed(2)} XLM
              </span>
            </div>

            <button type="submit" className="btn btn-primary w-full justify-center" disabled={status !== 'idle'}>
              <Send size={16} />
              Process Split Payments
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplitPaymentModal;
