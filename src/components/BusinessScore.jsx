import { motion } from 'framer-motion';

const BusinessScore = ({ scoreData }) => {
  if (!scoreData) return null;
  const { score, grade, breakdown } = scoreData;

  const getGradeColor = (g) => {
    switch(g) {
      case 'A+': return '#10B981'; // emerald
      case 'A': return '#34D399'; // emerald-bright
      case 'B': return '#F59E0B'; // gold
      case 'C': return '#F97316'; // coral
      case 'D': return '#EF4444'; // red
      default: return '#9CA3AF'; // gray
    }
  };

  const gradeColor = getGradeColor(grade);
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="card p-6 h-full">
      <h3 className="text-lg font-bold text-t1 mb-6">Business Score</h3>
      
      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* Circular Gauge */}
        <div className="relative w-48 h-48 flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke="rgba(16,185,129,0.1)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50" cy="50" r="45"
              fill="none"
              stroke={gradeColor}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ strokeDasharray: circumference }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-black" style={{ color: gradeColor }}>
              {score}
            </span>
            <span className="text-sm font-semibold text-t3">Grade {grade}</span>
          </div>
        </div>

        {/* Breakdown Bars */}
        <div className="flex-1 w-full space-y-4">
          {Object.entries(breakdown || {}).map(([key, data], index) => (
            <div key={key}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-t3">{data.label}</span>
                <span className="font-semibold text-t1">{data.score}/{data.max}</span>
              </div>
              <div className="h-2 w-full bg-void rounded-full overflow-hidden border border-b1">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: gradeColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(data.score / data.max) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusinessScore;
