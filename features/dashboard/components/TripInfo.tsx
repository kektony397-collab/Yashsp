import React from 'react';
// FIX: Switched to useAppStore for correct hook usage.
import { useAppStore } from '../../../store';
import { Card } from '../../../components/Card';
import { MapPin } from 'lucide-react';

const TripInfo: React.FC = () => {
  // FIX: used useAppStore with a selector for performance and to fix the type error.
  const tripKm = useAppStore((state) => state.tripKm);

  return (
    <Card>
      <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-primary mr-3"/>
          <h3 className="text-lg font-bold text-primary font-mono uppercase">Current Trip</h3>
      </div>
      <div className="text-center">
        <p className="text-4xl font-mono font-bold text-foreground">
          {tripKm.toFixed(2)} <span className="text-xl text-gray-400">km</span>
        </p>
      </div>
    </Card>
  );
};

export default TripInfo;