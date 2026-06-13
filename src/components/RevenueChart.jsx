import { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const RevenueChart = ({ operations, xlmPrice }) => {
  const data = useMemo(() => {
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (29 - i));
      return {
        date: format(d, 'MMM dd'),
        rawDate: d.toISOString().split('T')[0],
        xlm: 0,
      };
    });

    const received = operations.filter(op => op.type === 'payment' && op.to);
    
    received.forEach(op => {
      const dateStr = op.created_at.split('T')[0];
      const day = last30Days.find(d => d.rawDate === dateStr);
      if (day) {
        day.xlm += parseFloat(op.amount);
      }
    });

    return last30Days.map(d => ({
      ...d,
      usd: d.xlm * (xlmPrice || 0.11)
    }));
  }, [operations, xlmPrice]);

  return (
    <div className="card p-6 h-[400px]">
      <h3 className="text-lg font-bold text-t1 mb-6">Revenue Over Time (30 Days)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorXlm" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(16,185,129,0.1)" vertical={false} />
          <XAxis 
            dataKey="date" 
            stroke="#4ADE80" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            minTickGap={30}
          />
          <YAxis 
            stroke="#4ADE80" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            tickFormatter={(value) => `${value} XLM`}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0B1523', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px' }}
            itemStyle={{ color: '#10B981' }}
          />
          <Area 
            type="monotone" 
            dataKey="xlm" 
            stroke="#10B981" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorXlm)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
