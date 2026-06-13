import { motion } from 'framer-motion';
import { Wallet, Zap, BarChart3, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Landing = () => {
  const { wallet } = useApp();

  const features = [
    { icon: Zap, title: "QR Payments", desc: "Generate dynamic QR codes for instant, exact payments. No manual typing needed." },
    { icon: BarChart3, title: "Business Analytics", desc: "Track revenue, understand your customers, and build your business credit score." },
    { icon: ShieldCheck, title: "Smart Contracts", desc: "Register your business on-chain with Soroban smart contracts for trust and transparency." }
  ];

  return (
    <div className="min-h-screen pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
              Get paid in seconds.<br/>
              <span className="text-grad">No bank required.</span>
            </h1>
            <p className="text-xl text-t3 max-w-2xl mx-auto mb-10">
              VendorPay turns your phone into a complete digital point-of-sale system powered by the Stellar network. Perfect for street vendors, freelancers, and small businesses.
            </p>
            
            <div className="flex justify-center gap-4">
              {wallet.address ? (
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button 
                  onClick={wallet.connect}
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  <Wallet size={20} />
                  Connect Wallet
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 py-20 border-t border-b1">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="card p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 border border-emerald-500/20">
                <f.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-t3">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <div className="py-20 text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
            {[
              { step: 1, title: "Connect", desc: "Link your Freighter wallet" },
              { step: 2, title: "Create", desc: "Build your product catalog" },
              { step: 3, title: "Earn", desc: "Show QR & get paid instantly" }
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center max-w-xs">
                <div className="w-16 h-16 rounded-full bg-void border-2 border-emerald-500/30 flex items-center justify-center text-2xl font-black text-emerald-400 mb-4 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  {s.step}
                </div>
                <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                <p className="text-sm text-t3">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Landing;
