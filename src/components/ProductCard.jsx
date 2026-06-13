import { motion } from 'framer-motion';
import { Edit2, Trash2, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatLocalCurrency, xlmFromLocal } from '../utils/formatters';

const ProductCard = ({ product, onEdit, onGenerateQR }) => {
  const { removeProduct, xlmPrice, currency } = useApp();

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="card p-5 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="text-4xl bg-void w-16 h-16 rounded-2xl flex items-center justify-center border border-b2">
          {product.emoji || '📦'}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <Edit2 size={16} />
          </button>
          <button
            onClick={() => removeProduct(product.id)}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex-1">
        <div className="badge badge-green mb-2">{product.category || 'Goods'}</div>
        <h3 className="text-lg font-bold text-t1 mb-1">{product.name}</h3>
        <div className="text-xl font-black text-grad-gold mb-1">
          {formatLocalCurrency(product.price, product.currency || currency, xlmPrice)}
        </div>
        <div className="text-sm text-t3 mb-4">
          ~ {xlmFromLocal(product.price, product.currency || currency, xlmPrice)} XLM
        </div>
      </div>

      <button
        onClick={() => onGenerateQR(product)}
        className="btn btn-primary w-full justify-center"
      >
        <QrCode size={16} />
        Generate QR
      </button>
    </motion.div>
  );
};

export default ProductCard;
