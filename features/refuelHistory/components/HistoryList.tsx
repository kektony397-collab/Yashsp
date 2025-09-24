
import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../../../services/db';
import { FixedSizeList as List } from 'react-window';
import { RefuelRecord } from '../../../types';
import { Fuel } from 'lucide-react';

const HistoryList: React.FC = () => {
  const refuelRecords = useLiveQuery(() => 
    db.refuelRecords.orderBy('timestamp').reverse().toArray()
  );

  if (!refuelRecords) {
    return <div className="text-center text-gray-400 animate-pulse">Loading history...</div>;
  }

  if (refuelRecords.length === 0) {
    return <div className="text-center text-gray-400">No refuel records yet.</div>;
  }

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const record = refuelRecords[index];
    const date = new Date(record.timestamp).toLocaleDateString();
    
    // Calculate economy for this leg
    const prevRecord = refuelRecords[index + 1];
    let economy = 'N/A';
    if(prevRecord) {
        const distance = record.totalOdometerKm - prevRecord.totalOdometerKm;
        const fuelUsed = prevRecord.litersAdded; // Fuel used was the amount from the previous fill-up
        if(distance > 0 && fuelUsed > 0) {
            economy = (distance / fuelUsed).toFixed(2) + ' km/L';
        }
    }

    return (
      <div style={style} className="flex items-center p-2 border-b border-border">
        <div className="p-2 bg-secondary/20 rounded-full mr-4">
            <Fuel className="w-6 h-6 text-secondary"/>
        </div>
        <div className="flex-grow">
          <p className="font-bold text-foreground">{record.litersAdded.toFixed(2)} Liters</p>
          <p className="text-sm text-gray-400">{date} at {record.totalOdometerKm.toFixed(0)} km</p>
        </div>
        <div className="text-right">
            <p className="font-mono text-lg text-primary">{economy}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="h-64">
        <List
            height={256}
            itemCount={refuelRecords.length}
            itemSize={70}
            width="100%"
        >
            {Row}
        </List>
    </div>
  );
};

export default HistoryList;
