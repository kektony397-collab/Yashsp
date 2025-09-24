
import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../../store';

interface FormState {
    bikeModel: string;
    tankCapacityL: string;
    fuelEconomyKmPerL: string;
    reserveLiters: string;
}

const SettingsForm: React.FC = () => {
  const { bikeModel, tankCapacityL, fuelEconomyKmPerL, reserveLiters, actions } = useAppStore();
  const [formState, setFormState] = useState<FormState>({
    bikeModel,
    tankCapacityL: String(tankCapacityL),
    fuelEconomyKmPerL: String(fuelEconomyKmPerL),
    reserveLiters: String(reserveLiters),
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setFormState({
        bikeModel,
        tankCapacityL: String(tankCapacityL),
        fuelEconomyKmPerL: String(fuelEconomyKmPerL),
        reserveLiters: String(reserveLiters),
    });
  }, [bikeModel, tankCapacityL, fuelEconomyKmPerL, reserveLiters]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
    setIsSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    actions.setSettings({
        bikeModel: formState.bikeModel,
        tankCapacityL: parseFloat(formState.tankCapacityL),
        fuelEconomyKmPerL: parseFloat(formState.fuelEconomyKmPerL),
        reserveLiters: parseFloat(formState.reserveLiters),
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="bikeModel" className="block text-sm font-medium text-gray-300">Bike Model</label>
        <input type="text" name="bikeModel" id="bikeModel" value={formState.bikeModel} onChange={handleChange} className="mt-1 block w-full bg-background border border-border rounded-md px-3 py-2"/>
      </div>
      <div>
        <label htmlFor="tankCapacityL" className="block text-sm font-medium text-gray-300">Tank Capacity (Liters)</label>
        <input type="number" name="tankCapacityL" id="tankCapacityL" value={formState.tankCapacityL} onChange={handleChange} className="mt-1 block w-full bg-background border border-border rounded-md px-3 py-2"/>
      </div>
      <div>
        <label htmlFor="fuelEconomyKmPerL" className="block text-sm font-medium text-gray-300">Fuel Economy (km/L)</label>
        <input type="number" name="fuelEconomyKmPerL" id="fuelEconomyKmPerL" value={formState.fuelEconomyKmPerL} onChange={handleChange} className="mt-1 block w-full bg-background border border-border rounded-md px-3 py-2"/>
      </div>
      <div>
        <label htmlFor="reserveLiters" className="block text-sm font-medium text-gray-300">Reserve Fuel (Liters)</label>
        <input type="number" name="reserveLiters" id="reserveLiters" value={formState.reserveLiters} onChange={handleChange} className="mt-1 block w-full bg-background border border-border rounded-md px-3 py-2"/>
      </div>
      <div className="flex justify-end items-center">
        {isSaved && <p className="text-primary text-sm mr-4">Settings Saved!</p>}
        <button type="submit" className="px-4 py-2 bg-primary text-background font-bold rounded-md hover:bg-primary/80 transition-colors">
          Save Settings
        </button>
      </div>
    </form>
  );
};

export default SettingsForm;
