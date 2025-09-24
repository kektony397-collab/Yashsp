import React, { useState } from 'react';
import { useAppStore } from '../../../store';
import { parseRefuelText } from '../../../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

const RefuelForm: React.FC = () => {
  const { addRefuelRecord, setBikeState } = useAppStore((state) => state.actions);
  const { totalOdometerKm, tankCapacityL, currentFuelL } = useAppStore((state) => ({
    totalOdometerKm: state.totalOdometerKm,
    tankCapacityL: state.tankCapacityL,
    currentFuelL: state.currentFuelL,
  }));
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAiParse = async () => {
    if (!inputValue) return;
    setIsLoading(true);
    setError('');

    const result = await parseRefuelText(inputValue, tankCapacityL);

    if ('error' in result) {
      setError(result.error);
    } else {
      await addRefuelRecord({
        timestamp: Date.now(),
        litersAdded: result.litersAdded,
        totalOdometerKm: totalOdometerKm,
      });
      // Correctly add the new fuel to the current level, capped at tank capacity.
      const newFuelLevel = Math.min(tankCapacityL, currentFuelL + result.litersAdded);
      setBikeState({ currentFuelL: newFuelLevel });
      setInputValue('');
      setError('');
    }
    setIsLoading(false);
  };
  
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="refuel-input" className="block text-sm font-medium text-gray-300 mb-1">
          Enter fuel amount (e.g., "5.5 liters" or "filled up")
        </label>
        <div className="flex space-x-2">
          <input
            id="refuel-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="I added 6 litres of petrol"
            className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground focus:ring-primary focus:border-primary"
            disabled={isLoading}
          />
          <button
            onClick={handleAiParse}
            disabled={isLoading || !inputValue}
            className="flex items-center justify-center px-4 py-2 bg-accent hover:bg-accent/80 text-white font-bold rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            <span className="ml-2 hidden sm:inline">Parse</span>
          </button>
        </div>
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
};

export default RefuelForm;