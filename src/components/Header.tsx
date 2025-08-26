import React from 'react';
import { Zap, Wifi, WifiOff } from 'lucide-react';
import { EnergyStats } from '../types';

interface HeaderProps {
  stats: EnergyStats;
}

export const Header: React.FC<HeaderProps> = ({ stats }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-xl mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-500 rounded-xl">
            <Zap className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">EnergyFlow</h1>
            <p className="text-slate-300">Smart Home Energy Management</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-slate-800 px-4 py-2 rounded-xl">
          {stats.devicesOnline === stats.totalDevices ? (
            <Wifi className="w-5 h-5 text-green-400" />
          ) : (
            <WifiOff className="w-5 h-5 text-red-400" />
          )}
          <span className="text-sm">
            {stats.devicesOnline}/{stats.totalDevices} devices online
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Active Power</p>
              <p className="text-2xl font-bold">{stats.activePower.toLocaleString()}W</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Daily Usage</p>
              <p className="text-2xl font-bold">{stats.totalDailyUsage.toFixed(1)} kWh</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <span className="text-amber-400 font-bold text-lg">$</span>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Monthly Cost</p>
              <p className="text-2xl font-bold">${stats.totalMonthlyCost.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
            </div>
            <div>
              <p className="text-slate-400 text-sm">Efficiency</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
