import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

const CATEGORIES = ['Food', 'Drinks', 'Services', 'Goods', 'Other'];
const CURRENCIES = ['INR', 'USD', 'NGN', 'KES', 'EUR', 'BRL'];

const AddProductModal = ({ isOpen, onClose, editProduct }) => {
  const { addProduct, updateProduct, currency: defaultCurrency } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: defaultCurrency,
    category: 'Goods',
    emoji: '📦'
  });

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    } else {
      setFormData({
        name: '',
        price: '',
        currency: defaultCurrency,
        category: 'Goods',
        emoji: '📦'
      });
    }
  }, [editProduct, isOpen, defaultCurrency]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editProduct) {
      updateProduct(editProduct.id, formData);
    } else {
      addProduct(formData);
    }
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
          className="card w-full max-w-md p-6 relative"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold text-t1 mb-6">
            {editProduct ? 'Edit Product' : 'Add New Product'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/4">
                <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide">Emoji</label>
                <input
                  type="text"
                  className="input text-center text-2xl p-2"
                  value={formData.emoji}
                  onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                  maxLength={2}
                  required
                />
              </div>
              <div className="w-3/4">
                <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide">Product Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="e.g. Masala Chai"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-2/3">
                <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide">Price</label>
                <input
                  type="number"
                  className="input"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>
              <div className="w-1/3">
                <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide">Currency</label>
                <select
                  className="input cursor-pointer"
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  {CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-t3 mb-1 uppercase tracking-wide">Category</label>
              <select
                className="input cursor-pointer"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="pt-4 flex gap-3">
              <button type="button" onClick={onClose} className="btn btn-ghost flex-1 justify-center">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary flex-1 justify-center">
                <Save size={16} />
                {editProduct ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddProductModal;
