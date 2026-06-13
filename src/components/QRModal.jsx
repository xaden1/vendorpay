import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import { getTimeRemaining } from '../utils/qrGenerator';
import { copyToClipboard } from '../utils/formatters';

const QRModal = ({ isOpen, onClose, paymentRequest }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0, isExpired: false });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen || !paymentRequest) return;
    
    const tick = () => {
      const remaining = getTimeRemaining(paymentRequest.expiresAt);
      setTimeLeft(remaining);
      if (remaining.isExpired) clearInterval(interval);
    };
    
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [isOpen, paymentRequest]);

  const handleCopy = async () => {
    if (await copyToClipboard(paymentRequest.vendorAddress)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen || !paymentRequest) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="card card-glow w-full max-w-sm p-6 relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
          
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-t1 mb-1">Payment Request</h3>
            <p className="text-t3">{paymentRequest.productName}</p>
          </div>

          <div className="bg-white p-4 rounded-xl mx-auto w-fit mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <QRCodeSVG
              value={paymentRequest.stellarUri}
              size={240}
              level="H"
              includeMargin={true}
              imageSettings={{
                src: "/favicon.svg",
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>

          <div className="text-center mb-6">
            <div className="text-3xl font-black text-grad mb-2">
              {paymentRequest.amount} XLM
            </div>
            
            <div className={`text-sm ${timeLeft.isExpired ? 'text-red-400' : 'text-emerald-400'}`}>
              {timeLeft.isExpired ? (
                'Expired'
              ) : (
                `Expires in ${timeLeft.minutes}:${timeLeft.seconds.toString().padStart(2, '0')}`
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center bg-void p-3 rounded-lg border border-b2">
              <div className="truncate text-sm text-t3 mr-2">
                {paymentRequest.vendorAddress}
              </div>
              <button
                onClick={handleCopy}
                className="text-emerald-400 hover:text-emerald-300"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <button
              onClick={onClose}
              className="btn btn-ghost w-full justify-center"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QRModal;
