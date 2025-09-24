
import React from 'react';
import SettingsForm from './components/SettingsForm';
import { Card } from '../../components/Card';

const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card title="Bike Configuration">
        <SettingsForm />
      </Card>
    </div>
  );
};

export default SettingsPage;
