
import { StateCreator } from 'zustand';

export interface SettingsState {
  bikeModel: string;
  tankCapacityL: number;
  fuelEconomyKmPerL: number;
  reserveLiters: number;
  actions: {
    setSettings: (settings: Partial<Omit<SettingsState, 'actions'>>) => void;
    loadInitialSettings: () => void;
  };
}

export const createSettingsSlice: StateCreator<SettingsState> = (set, get) => ({
  bikeModel: 'Honda Dream Yuga',
  tankCapacityL: 8,
  fuelEconomyKmPerL: 55, // default
  reserveLiters: 1.5,
  actions: {
    setSettings: (settings) => set(settings),
    // This action can be used to hydrate other parts of the state from settings
    loadInitialSettings: () => {
      // For example, set initial fuel level to tank capacity
      // This logic is better placed elsewhere, but demonstrates the possibility
    },
  },
});
