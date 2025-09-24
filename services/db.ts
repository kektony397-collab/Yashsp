
import Dexie, { Table } from 'dexie';
import { Settings, RefuelRecord, TripLog } from '../types';

export class AppDB extends Dexie {
  settings!: Table<Settings, number>;
  refuelRecords!: Table<RefuelRecord, number>;
  tripLogs!: Table<TripLog, number>;

  constructor() {
    super('SmartBikeDB');
    this.version(1).stores({
      settings: '++id, &key',
      refuelRecords: '++id, timestamp',
      tripLogs: '++id, startTimestamp',
    });
  }
}

export const db = new AppDB();
