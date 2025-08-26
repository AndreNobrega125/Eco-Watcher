import React, { useState } from 'react';
import { Header } from './components/Header';
import { RoomFilter } from './components/RoomFilter';
import { DeviceCard } from './components/DeviceCard';
import { EnergyVisualization } from './components/EnergyVisualization';
import { ResponsiveChart } from './components/ResponsiveChart';
import { EnergyFlowDiagram } from './components/EnergyFlowDiagram';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { OfflineIndicator } from './components/OfflineIndicator';
import { MobileNavigation } from './components/MobileNavigation';
import { NotificationCenter } from './components/NotificationCenter';
import { useDevices } from './hooks/useDevices';
import { usePWA } from './hooks/usePWA';
import { rooms } from './data/mockData';

function App() {
  const { devices, toggleDevice, energyStats } = useDevices();
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [activeTab, setActiveTab] = useState('home');
  const { isInstalled } = usePWA();

  // Register service worker
  React.useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  const filteredDevices = selectedRoom === 'all' 
    ? devices 
    : devices.filter(device => 
        device.room.toLowerCase().replace(' ', '-') === selectedRoom
      );

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ${isInstalled ? 'pb-0' : 'pb-20 md:pb-0'}`}>
      <PWAInstallPrompt />
      <OfflineIndicator />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex-1">
            <Header stats={energyStats} />
          </div>
          <div className="relative">
            <NotificationCenter />
          </div>
        </div>
        
        {(activeTab === 'home' || activeTab === 'analytics') && (
          <>
            <EnergyVisualization 
              activePower={energyStats.activePower}
              totalDailyUsage={energyStats.totalDailyUsage}
              efficiency={92}
            />

            <ResponsiveChart />

            <EnergyFlowDiagram />
          </>
        )}
        
        {(activeTab === 'home' || activeTab === 'devices') && (
          <>
            <RoomFilter 
              rooms={rooms}
              selectedRoom={selectedRoom}
              onRoomSelect={setSelectedRoom}
            />

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {selectedRoom === 'all' ? 'All Devices' : rooms.find(r => r.id === selectedRoom)?.name + ' Devices'}
                </h2>
                <p className="text-slate-600 mt-1">
                  {filteredDevices.length} device{filteredDevices.length !== 1 ? 's' : ''} found
                </p>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-slate-500">Real-time monitoring</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Live Updates</span>
                </div>
              </div>
            </div>

            {filteredDevices.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-slate-400">🏠</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-600 mb-2">No devices found</h3>
                <p className="text-slate-500">Try selecting a different room or check your device connections.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDevices.map((device) => (
                  <DeviceCard
                    key={device.id}
                    device={device}
                    onToggle={toggleDevice}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <h3 className="font-medium text-slate-800">Push Notifications</h3>
                  <p className="text-sm text-slate-600">Get alerts for high energy usage</p>
                </div>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                <div>
                  <h3 className="font-medium text-slate-800">Auto-optimization</h3>
                  <p className="text-sm text-slate-600">Automatically optimize energy usage</p>
                </div>
                <button className="w-12 h-6 bg-slate-300 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="text-center text-slate-500">
            <p className="mb-2">EnergyFlow Smart Home Management</p>
            <p className="text-sm">Monitor • Control • Save Energy</p>
          </div>
        </footer>
      </div>
      
      {!isInstalled && (
        <MobileNavigation 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
      )}
    </div>
  );
}

export default App;
