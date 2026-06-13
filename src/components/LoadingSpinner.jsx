import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 40, color = '#10B981' }) => (
  <div className="flex items-center justify-center">
    <motion.div
      style={{ width: size, height: size, border: `3px solid rgba(16,185,129,0.15)`, borderTopColor: color, borderRadius: '50%' }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  </div>
);

export default LoadingSpinner;
