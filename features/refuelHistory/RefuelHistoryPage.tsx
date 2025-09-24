
import React from 'react';
import RefuelForm from './components/RefuelForm';
import HistoryList from './components/HistoryList';
import EconomyAnalysis from './components/EconomyAnalysis';
import { Card } from '../../components/Card';

const RefuelHistoryPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card title="Log Refuel">
        <RefuelForm />
      </Card>
      <Card title="AI Economy Analysis">
        <EconomyAnalysis />
      </Card>
      <Card title="Refuel Log">
        <HistoryList />
      </Card>
    </div>
  );
};

export default RefuelHistoryPage;
