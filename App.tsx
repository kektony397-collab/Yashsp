
import React, { useState, Suspense, lazy } from 'react';
import { Gauge, Fuel, Wrench, Settings, History, LayoutDashboard } from 'lucide-react';

const DashboardPage = lazy(() => import('./features/dashboard/DashboardPage'));
const RefuelHistoryPage = lazy(() => import('./features/refuelHistory/RefuelHistoryPage'));
const SettingsPage = lazy(() => import('./features/settings/SettingsPage'));

type Page = 'dashboard' | 'history' | 'settings';

const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${
      isActive ? 'text-primary' : 'text-gray-400 hover:text-primary'
    }`}
  >
    <Icon className="w-6 h-6 mb-1" />
    <span className="text-xs font-mono">{label}</span>
  </button>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'history':
        return <RefuelHistoryPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };
  
  const loadingFallback = (
    <div className="flex items-center justify-center h-full">
      <div className="text-primary font-mono text-xl animate-pulse">LOADING INTERFACE...</div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen bg-background font-sans">
      <header className="flex-shrink-0 bg-card border-b-2 border-primary/50 shadow-glow-primary p-4">
        <h1 className="text-2xl font-bold text-center text-primary uppercase tracking-widest">
          Smart Bike Dashboard
        </h1>
      </header>
      
      <main className="flex-grow overflow-y-auto p-4">
        <Suspense fallback={loadingFallback}>
          {renderPage()}
        </Suspense>
      </main>

      <footer className="flex-shrink-0 bg-card border-t-2 border-primary/50">
        <nav className="flex justify-around items-center h-16">
          <NavItem icon={LayoutDashboard} label="Dashboard" isActive={currentPage === 'dashboard'} onClick={() => setCurrentPage('dashboard')} />
          <NavItem icon={History} label="History" isActive={currentPage === 'history'} onClick={() => setCurrentPage('history')} />
          <NavItem icon={Settings} label="Settings" isActive={currentPage === 'settings'} onClick={() => setCurrentPage('settings')} />
        </nav>
      </footer>
    </div>
  );
}

export default App;
