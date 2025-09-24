
import { useEffect, useRef } from 'react';
import { useAppStore } from '../store';

export const useFuelCalculator = () => {
  const tripKm = useAppStore((state) => state.tripKm);
  const fuelEconomyKmPerL = useAppStore((state) => state.fuelEconomyKmPerL);
  const { consumeFuel } = useAppStore((state) => state.actions);
  const lastTripKmRef = useRef(0);

  useEffect(() => {
    const distanceIncrement = tripKm - lastTripKmRef.current;
    
    if (distanceIncrement > 0 && fuelEconomyKmPerL > 0) {
      const fuelConsumed = distanceIncrement / fuelEconomyKmPerL;
      consumeFuel(fuelConsumed);
    }
    
    lastTripKmRef.current = tripKm;
  }, [tripKm, fuelEconomyKmPerL, consumeFuel]);
};
