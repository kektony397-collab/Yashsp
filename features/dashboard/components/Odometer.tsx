import React from 'react';
// FIX: Switched to useAppStore for correct hook usage.
import { useAppStore } from '../../../store';
import { Card } from '../../../components/Card';
import { TrendingUp } from 'lucide-react';

const Odometer: React.FC = () => {
  // FIX: used useAppStore with a selector for performance and to fix the type error.
  const totalOdometerKm = useAppStore((state) => state.totalOdometerKm);

  return (
    <Card>
      <div className="flex items-center mb-4">
          <TrendingUp className="w-6 h-6 text-accent mr-3"/>
          <h3 className="text-xl font-bold text-accent font-mono uppercase">Odometer</h3>
      </div>
      <div className="text-center">
        <p className="text-5xl font-mono font-bold text-foreground tracking-widest">
            {totalOdometerKm.toFixed(1)}
        </p>
        <p className="text-sm text-gray-400 font-mono mt-2">Total Kilometers</p>
      </div>
    </Card>
  );
};

export default Odometer;