import React from 'react';
import { 
  Power, 
  Wifi, 
  WifiOff, 
  Tv, 
  Monitor, 
  Lightbulb, 
  Snowflake, 
  Gamepad2,
  MoreHorizontal
} from 'lucide-react';
import { Device } from '../types';

interface DeviceCardProps {
  device: Device;
  onToggle: (deviceId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  tv: <Tv className="w-6 h-6" />,
  refrigerator: <div className="w-6 h-6 bg-gradient-to-b from-slate-400 to-slate-600 rounded-sm"></div>,
  snowflake: <Snowflake className="w-6 h-6" />,
  monitor: <Monitor className="w-6 h-6" />,
  microwave: <div className="w-6 h-6 bg-slate-400 rounded border-2 border-slate-500"></div>,
  lightbulb: <Lightbulb className="w-6 h-6" />,
  'washing-machine': <div className="w-6 h-6 bg-gradient-to-br from-slate-300 to-slate-500 rounded-full border-2 border-slate-400"></div>,
  'gamepad-2': <Gamepad2 className="w-6 h-6" />
};

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onToggle }) => {
  const getPowerColor = (power: number) => {
    if (power === 0) return 'text-slate-400';
    if (power < 50) return 'text-green-500';
    if (power < 150) return 'text-amber-500';
    return 'text-red-500';
  };

  const getPowerBgColor = (power: number) => {
    if (power === 0) return 'bg-slate-100';
    if (power < 50) return 'bg-green-100';
    if (power < 150) return 'bg-amber-100';
    return 'bg-red-100';
  };

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:transform hover:scale-[1.02] ${
      device.isActive ? 'border-blue-200' : 'border-slate-200'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            device.isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-500'
          }`}>
            {iconMap[device.icon] || <MoreHorizontal className="w-6 h-6" />}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">{device.name}</h3>
            <p className="text-sm text-slate-500">{device.room} • {device.type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {device.isOnline ? (
              <Wifi className="w-4 h-4 text-green-500" />
            ) : (
              <WifiOff className="w-4 h-4 text-red-500" />
            )}
          </div>
          <button
            onClick={() => onToggle(device.id)}
            disabled={!device.isOnline}
            className={`p-2 rounded-xl transition-all duration-200 ${
              device.isActive && device.isOnline
                ? 'bg-green-500 text-white hover:bg-green-600 shadow-lg'
                : device.isOnline
                ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-50'
            }`}
          >
            <Power className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className={`p-4 rounded-xl ${getPowerBgColor(device.currentPower)}`}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Current Power</span>
            <span className={`text-2xl font-bold ${getPowerColor(device.currentPower)}`}>
              {device.currentPower}W
            </span>
          </div>
          {device.isActive && (
            <div className="mt-2 bg-white/50 rounded-lg p-2">
              <div className="flex justify-between text-xs text-slate-600">
                <span>Cost/hour: ${device.costPerHour.toFixed(3)}</span>
                <span>Last updated: {device.lastUpdated.toLocaleTimeString()}</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Daily Usage</p>
            <p className="text-lg font-semibold text-slate-800">{device.dailyUsage} kWh</p>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl">
            <p className="text-xs text-slate-500 mb-1">Monthly Usage</p>
            <p className="text-lg font-semibold text-slate-800">{device.monthlyUsage} kWh</p>
          </div>
        </div>

        {device.isActive && (
          <div className="flex items-center justify-center">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
