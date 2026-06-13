import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import Analytics from './pages/Analytics';
import Transactions from './pages/Transactions';
import SendPayment from './pages/SendPayment';
import PaymentNotification from './components/PaymentNotification';
import ErrorBoundary from './components/ErrorBoundary';

const ProtectedRoute = ({ children }) => {
  const { wallet } = useApp();
  if (!wallet.address) return <Navigate to="/" replace />;
  return children;
};

function App() {
  const { wallet, lastPayment, clearPaymentNotification } = useApp();

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-base text-t1 flex flex-col relative">
          <Navbar />
          
          <main className="flex-grow pt-16 relative z-10">
            <Routes>
              <Route path="/" element={wallet.address ? <Navigate to="/dashboard" replace /> : <Landing />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
              <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
              <Route path="/send" element={<ProtectedRoute><SendPayment /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Incoming Payment Notification */}
          <PaymentNotification 
            payment={lastPayment} 
            onDismiss={clearPaymentNotification} 
          />
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
