import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, ShoppingBag, BarChart3, ArrowLeftRight, Send } from 'lucide-react';
import WalletButton from './WalletButton';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/catalog', label: 'Catalog', icon: ShoppingBag },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/transactions', label: 'History', icon: ArrowLeftRight },
  { path: '/send', label: 'Send', icon: Send },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(6,12,21,0.85)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--b1)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm" style={{ background: 'linear-gradient(135deg, var(--emerald), var(--jade))', color: 'var(--void)' }}>
            VP
          </div>
          <span className="text-lg font-bold text-grad hidden sm:block">VendorPay</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link key={path} to={path} className="no-underline">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-emerald-300'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                  style={isActive ? { background: 'var(--emerald-dim)', color: 'var(--emerald-bright)' } : {}}
                >
                  <Icon size={16} />
                  {label}
                </motion.div>
              </Link>
            );
          })}
        </div>

        <WalletButton />
      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-around py-1 border-t" style={{ borderColor: 'var(--b1)' }}>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link key={path} to={path} className="no-underline">
              <div className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${
                isActive ? 'text-emerald-400' : 'text-gray-500'
              }`}>
                <Icon size={18} />
                {label}
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
