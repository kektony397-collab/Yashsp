
import React from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import { useFuelCalculator } from '../../hooks/useFuelCalculator';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import Speedometer from './components/Speedometer';
import FuelGauge from './components/FuelGauge';
import Odometer from './components/Odometer';
import TripInfo from './components/TripInfo';
import GpsStatusIndicator from './components/GpsStatusIndicator';

const DashboardPage: React.FC = () => {
  useGeolocation();
  useFuelCalculator();
  useNetworkStatus();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
      <div className="md:col-span-2">
        <Speedometer />
      </div>
      <FuelGauge />
      <Odometer />
      <div className="md:col-span-2">
        <TripInfo />
      </div>
      <div className="md:col-span-2">
        <GpsStatusIndicator />
      </div>
    </div>
  );
};

export default DashboardPage;
