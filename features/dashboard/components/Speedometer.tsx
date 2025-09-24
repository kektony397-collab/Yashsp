import React from 'react';
// FIX: Switched to useAppStore for correct hook usage.
import { useAppStore } from '../../../store';
import { Card } from '../../../components/Card';

const Speedometer: React.FC = () => {
  // FIX: used useAppStore with a selector for performance and to fix the type error.
  const currentSpeedKph = useAppStore((state) => state.currentSpeedKph);

  return (
    <Card className="flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-card to-black">
      <div className="relative">
        <span className="font-mono text-8xl font-bold text-primary" style={{ textShadow: '0 0 10px #00f5d4' }}>
          {Math.round(currentSpeedKph)}
        </span>
        <span className="absolute bottom-2 -right-12 text-2xl font-mono text-primary/70">
          km/h
        </span>
      </div>
      <h3 className="text-xl text-gray-400 font-mono uppercase tracking-widest mt-2">Current Speed</h3>
    </Card>
  );
};

export default Speedometer;