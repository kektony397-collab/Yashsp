
import { StateCreator } from 'zustand';

export interface BikeState {
  currentFuelL: number;
  tripKm: number;
  totalOdometerKm: number;
  currentSpeedKph: number;
  isGpsAvailable: boolean;
  isNetworkAvailable: boolean;
  actions: {
    setBikeState: (state: Partial<BikeState>) => void;
    consumeFuel: (liters: number) => void;
    addTripKm: (km: number) => void;
  };
}

export const createBikeStateSlice: StateCreator<BikeState> = (set, get) => ({
  currentFuelL: 0,
  tripKm: 0,
  totalOdometerKm: 10000, // Default starting value
  currentSpeedKph: 0,
  isGpsAvailable: true,
  isNetworkAvailable: navigator.onLine,
  actions: {
    setBikeState: (state) => set(state),
    consumeFuel: (liters) => set((state) => ({ currentFuelL: Math.max(0, state.currentFuelL - liters) })),
    addTripKm: (km) => set((state) => ({
      tripKm: state.tripKm + km,
      totalOdometerKm: state.totalOdometerKm + km,
    })),
  },
});
