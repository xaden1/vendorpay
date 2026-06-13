import { useState, useEffect } from 'react';
import { Send, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useTransaction, TX_STATUS } from '../hooks/useTransaction';
import TransactionFeedback from '../components/TransactionFeedback';
import ReceiptModal from '../components/ReceiptModal';
import { generateReceipt } from '../utils/receiptGenerator';

const SendPayment = () => {
  const { wallet, balance } = useApp();
  const { status, txResult, error, send, reset } = useTransaction();
  
  const [destination, setDestination] = useState('');
  const [amount, setAmount] = useState('');
  const [memo, setMemo] = useState('');
  
  const [receipt, setReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  const availableXlm = balance.balance?.xlm ? Math.max(0, balance.balance.xlm - 1) : 0; // 1 XLM reserve

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wallet.address) return;
    
    const result = await send(wallet.address, destination, amount, memo);
    
    if (result && result.successful) {
      const newReceipt = generateReceipt({
        txHash: result.hash,
        vendorAddress: destination,
        customerAddress: wallet.address,
        amount: amount,
        productName: 'Manual Payment',
        memo: memo,
        explorerUrl: result.explorerUrl
      });
      setReceipt(newReceipt);
    }
  };

  const handleMax = () => {
    setAmount(availableXlm.toFixed(2));
  };

  const handleReset = () => {
    reset();
    setDestination('');
    setAmount('');
    setMemo('');
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
          <Send size={32} />
        </div>
        <h1 className="text-3xl font-bold text-t1 mb-2">Send Payment</h1>
        <p className="text-t3">Send XLM to any Stellar Testnet address instantly.</p>
      </div>

      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide flex justify-between">
              <span>Destination Address</span>
            </label>
            <input
              type="text"
              className="input font-mono text-sm"
              placeholder="G..."
              value={destination}
              onChange={(e) => setDestination(e.target.value.trim())}
              required
              disabled={status !== TX_STATUS.IDLE && status !== TX_STATUS.FAILED}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide flex justify-between">
              <span>Amount (XLM)</span>
              <span className="text-t2">Available: {availableXlm.toFixed(2)} XLM</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400">
                <DollarSign size={18} />
              </div>
              <input
                type="number"
                className="input pl-10 pr-16 text-lg font-bold"
                placeholder="0.00"
                step="0.0000001"
                min="0.0000001"
                max={availableXlm}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                disabled={status !== TX_STATUS.IDLE && status !== TX_STATUS.FAILED}
              />
              <button
                type="button"
                onClick={handleMax}
                className="absolute inset-y-2 right-2 px-3 bg-void rounded text-xs font-bold text-emerald-400 hover:bg-surface border border-b1"
                disabled={status !== TX_STATUS.IDLE && status !== TX_STATUS.FAILED}
              >
                MAX
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide flex justify-between">
              <span>Memo (Optional)</span>
              <span className="font-normal opacity-50">{memo.length}/28</span>
            </label>
            <input
              type="text"
              className="input"
              placeholder="Payment description"
              maxLength={28}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              disabled={status !== TX_STATUS.IDLE && status !== TX_STATUS.FAILED}
            />
          </div>

          {status === TX_STATUS.IDLE || status === TX_STATUS.FAILED ? (
            <button 
              type="submit" 
              className="btn btn-primary w-full justify-center py-4 text-base mt-2"
              disabled={!destination || !amount || parseFloat(amount) > availableXlm}
            >
              <Send size={18} />
              Send XLM
            </button>
          ) : null}
        </form>

        <TransactionFeedback 
          status={status} 
          txResult={txResult} 
          error={error} 
          onReset={handleReset} 
        />

        {status === TX_STATUS.SUCCESS && receipt && (
          <button 
            onClick={() => setIsReceiptOpen(true)}
            className="btn btn-ghost w-full justify-center mt-3"
          >
            View Digital Receipt
          </button>
        )}
      </div>

      <ReceiptModal 
        isOpen={isReceiptOpen} 
        onClose={() => setIsReceiptOpen(false)} 
        receipt={receipt} 
      />
    </div>
  );
};

export default SendPayment;
