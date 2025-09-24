
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BikeState, createBikeStateSlice } from './bikeStateSlice';
import { SettingsState, createSettingsSlice } from './settingsSlice';
import { HistoryState, createHistorySlice } from './historySlice';
import { dexieStorage } from './dexieStorage';

type StoreState = BikeState & SettingsState & HistoryState;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
      ...createBikeStateSlice(...a),
      ...createSettingsSlice(...a),
      ...createHistorySlice(...a),
    }),
    {
      name: 'smart-bike-storage',
      storage: createJSONStorage(() => dexieStorage),
      // Only persist the settings slice. History is managed directly via Dexie.
      // Bike state is ephemeral.
      partialize: (state) => ({
        bikeModel: state.bikeModel,
        tankCapacityL: state.tankCapacityL,
        fuelEconomyKmPerL: state.fuelEconomyKmPerL,
        reserveLiters: state.reserveLiters,
      }),
    }
  )
);

// Export selectors for convenience
export const useBikeState = () => useAppStore((state) => state);
export const useSettings = () => useAppStore((state) => state);
export const useHistoryActions = () => useAppStore((state) => state.actions);
export const useBikeActions = () => useAppStore((state) => state.actions);
export const useSettingsActions = () => useAppStore((state) => state.actions);

