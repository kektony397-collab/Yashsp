
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { BikeState, createBikeStateSlice } from './bikeStateSlice';
import { SettingsState, createSettingsSlice } from './settingsSlice';
import { HistoryState, createHistorySlice } from './historySlice';
import { dexieStorage } from './dexieStorage';

// Combine all state types, omitting the individual 'actions' objects
type AppState = Omit<BikeState, 'actions'> & Omit<SettingsState, 'actions'> & Omit<HistoryState, 'actions'>;

// Combine all action types
type AppActions = BikeState['actions'] & SettingsState['actions'] & HistoryState['actions'];

// The final, combined store state
export type StoreState = AppState & {
  actions: AppActions;
};

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => {
      // Create each slice
      const bikeSlice = createBikeStateSlice(...a);
      const settingsSlice = createSettingsSlice(...a);
      const historySlice = createHistorySlice(...a);

      // Destructure to separate state from actions
      const { actions: bikeActions, ...bikeState } = bikeSlice;
      const { actions: settingsActions, ...settingsState } = settingsSlice;
      const { actions: historyActions, ...historyState } = historySlice;
      
      return {
        // Spread all state properties
        ...bikeState,
        ...settingsState,
        ...historyState,
        // Combine all actions into a single 'actions' object
        actions: {
          ...bikeActions,
          ...settingsActions,
          ...historyActions,
        },
      };
    },
    {
      name: 'smart-bike-storage',
      storage: createJSONStorage(() => dexieStorage),
      // Persist settings and the non-ephemeral parts of the bike state.
      partialize: (state) => ({
        // From settingsSlice
        bikeModel: state.bikeModel,
        tankCapacityL: state.tankCapacityL,
        fuelEconomyKmPerL: state.fuelEconomyKmPerL,
        reserveLiters: state.reserveLiters,
        // From bikeStateSlice
        totalOdometerKm: state.totalOdometerKm,
        currentFuelL: state.currentFuelL,
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