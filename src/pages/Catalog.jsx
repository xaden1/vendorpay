import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import QRModal from '../components/QRModal';
import { generatePaymentRequest } from '../utils/qrGenerator';
import { xlmFromLocal } from '../utils/formatters';

const Catalog = () => {
  const { catalog, wallet, xlmPrice } = useApp();
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);

  const filteredCatalog = catalog.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const handleGenerateQR = (product) => {
    const amountInXlm = xlmFromLocal(product.price, product.currency, xlmPrice);
    const req = generatePaymentRequest({
      vendorAddress: wallet.address,
      amount: amountInXlm,
      productName: product.name,
      currency: 'XLM'
    });
    setPaymentRequest(req);
    setIsQRModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setTimeout(() => setEditingProduct(null), 300); // clear after animation
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-t1 mb-2">Product Catalog</h1>
          <p className="text-t3">Manage your items and generate payment QRs.</p>
        </div>
        
        <div className="flex w-full md:w-auto gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-t3" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="input pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary whitespace-nowrap"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {catalog.length === 0 ? (
        <div className="text-center py-20 px-4 card border-dashed border-2 bg-transparent">
          <div className="w-20 h-20 bg-void rounded-full flex items-center justify-center mx-auto mb-6 border border-b2 text-t3">
            <ShoppingBag size={32} />
          </div>
          <h3 className="text-xl font-bold text-t1 mb-2">Your catalog is empty</h3>
          <p className="text-t3 mb-6 max-w-md mx-auto">Add your first product to start generating QR codes and accepting payments.</p>
          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary mx-auto">
            <Plus size={18} /> Add First Product
          </button>
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredCatalog.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <ProductCard 
                  product={product} 
                  onEdit={handleEdit}
                  onGenerateQR={handleGenerateQR}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={closeAddModal} 
        editProduct={editingProduct} 
      />

      <QRModal 
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        paymentRequest={paymentRequest}
      />
    </div>
  );
};

export default Catalog;
