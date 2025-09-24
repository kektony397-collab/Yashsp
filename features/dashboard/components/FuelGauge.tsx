
import React from 'react';
import { useAppStore } from '../../../store';
import { Card } from '../../../components/Card';
import { Fuel } from 'lucide-react';

const FuelGauge: React.FC = () => {
  const { currentFuelL, tankCapacityL, fuelEconomyKmPerL } = useAppStore();
  const fuelPercentage = tankCapacityL > 0 ? (currentFuelL / tankCapacityL) * 100 : 0;
  const estimatedRange = currentFuelL * fuelEconomyKmPerL;

  return (
    <Card>
        <div className="flex items-center mb-4">
            <Fuel className="w-6 h-6 text-secondary mr-3"/>
            <h3 className="text-xl font-bold text-secondary font-mono uppercase">Fuel Status</h3>
        </div>
      
        <div className="w-full bg-gray-700 rounded-full h-4 my-2 border border-secondary/50">
            <div
            className="bg-secondary h-full rounded-full transition-all duration-500"
            style={{ width: `${fuelPercentage}%`, boxShadow: '0 0 10px #f72585' }}
            ></div>
        </div>

        <div className="flex justify-between items-end mt-4">
            <div>
                <p className="text-3xl font-mono font-bold text-foreground">
                    {currentFuelL.toFixed(2)}
                    <span className="text-lg text-gray-400 ml-1">L</span>
                </p>
                <p className="text-sm text-gray-400 font-mono">Current Fuel</p>
            </div>
            <div>
                <p className="text-3xl font-mono font-bold text-foreground">
                    {Math.round(estimatedRange)}
                    <span className="text-lg text-gray-400 ml-1">km</span>
                </p>
                <p className="text-sm text-gray-400 font-mono">Est. Range</p>
            </div>
        </div>
    </Card>
  );
};

export default FuelGauge;
