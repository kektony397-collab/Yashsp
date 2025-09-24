
import { StateStorage } from 'zustand/middleware';
import { db } from '../services/db';

export const dexieStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const item = await db.settings.get({ key: name });
    return item ? JSON.stringify(item.value) : null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await db.settings.put({ key: name, value: JSON.parse(value) });
  },
  removeItem: async (name: string): Promise<void> => {
    const item = await db.settings.get({ key: name });
    if (item && item.id) {
      await db.settings.delete(item.id);
    }
  },
};
