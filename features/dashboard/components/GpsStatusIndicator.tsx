
import React from 'react';
import { useBikeState } from '../../../store';
import { Card } from '../../../components/Card';
import { Wifi, Satellite, WifiOff, SatelliteDish } from 'lucide-react';

const StatusPill: React.FC<{ label: string, active: boolean, activeIcon: React.ElementType, inactiveIcon: React.ElementType }> = ({ label, active, activeIcon: ActiveIcon, inactiveIcon: InactiveIcon }) => (
    <div className={`flex items-center px-4 py-2 rounded-full font-mono text-sm transition-all ${active ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-400'}`}>
        {active ? <ActiveIcon className="w-5 h-5 mr-2 animate-pulse-glow"/> : <InactiveIcon className="w-5 h-5 mr-2"/>}
        {label}
    </div>
);

const GpsStatusIndicator: React.FC = () => {
  const { isGpsAvailable, isNetworkAvailable } = useBikeState();

  return (
    <Card>
      <div className="flex justify-center items-center space-x-4">
        <StatusPill label="GPS" active={isGpsAvailable} activeIcon={SatelliteDish} inactiveIcon={Satellite} />
        <StatusPill label="Network" active={isNetworkAvailable} activeIcon={Wifi} inactiveIcon={WifiOff} />
      </div>
    </Card>
  );
};

export default GpsStatusIndicator;
