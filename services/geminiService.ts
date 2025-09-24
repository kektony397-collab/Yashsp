
import { RefuelRecord, TripLog } from '../types';

export const parseRefuelText = async (text: string, tankCapacity: number): Promise<{ litersAdded: number } | { error: string }> => {
  try {
    const response = await fetch('/api/parse-refuel-entry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, tankCapacity }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      return { error: errorData.error || 'Failed to parse text.' };
    }
    return await response.json();
  } catch (error) {
    return { error: 'Network error or server unavailable.' };
  }
};


export const analyzeEconomy = async (refuelRecords: RefuelRecord[], tripLogs: TripLog[]): Promise<{ analysis: string } | { error: string }> => {
    try {
        const response = await fetch('/api/analyze-economy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refuelRecords, tripLogs }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.error || 'Failed to get analysis.' };
        }
        const data = await response.json();
        return { analysis: data.analysis };
    } catch (error) {
        return { error: 'Network error or server unavailable.' };
    }
};
