
import { StateCreator } from 'zustand';
import { RefuelRecord, TripLog } from '../types';
import { db } from '../services/db';

export interface HistoryState {
  refuelRecords: RefuelRecord[];
  tripLogs: TripLog[];
  actions: {
    addRefuelRecord: (record: Omit<RefuelRecord, 'id'>) => Promise<void>;
    addTripLog: (log: Omit<TripLog, 'id'>) => Promise<void>;
  };
}

// Note: This slice doesn't need to hold the data itself, as we'll use dexie-react-hooks.
// The actions here are for writing to the DB.
export const createHistorySlice: StateCreator<HistoryState> = (set, get) => ({
  refuelRecords: [], // Will be populated by useLiveQuery
  tripLogs: [], // Will be populated by useLiveQuery
  actions: {
    addRefuelRecord: async (record) => {
      await db.refuelRecords.add(record);
    },
    addTripLog: async (log) => {
      await db.tripLogs.add(log);
    },
  },
});
