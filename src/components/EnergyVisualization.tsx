import React from 'react';
import { TrendingUp, TrendingDown, Zap, Leaf } from 'lucide-react';

interface EnergyVisualizationProps {
  activePower: number;
  totalDailyUsage: number;
  efficiency: number;
}

export const EnergyVisualization: React.FC<EnergyVisualizationProps> = ({
  activePower,
  totalDailyUsage,
  efficiency
}) => {
  const powerLevel = Math.min((activePower / 1000) * 100, 100);
  const usageLevel = Math.min((totalDailyUsage / 50) * 100, 100);
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-800">Energy Flow Visualization</h3>
        <div className="flex items-center space-x-2 text-green-600">
          <Leaf className="w-5 h-5" />
          <span className="text-sm font-medium">Eco Mode Active</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Power Consumption Gauge */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-700">Power Draw</h4>
            <Zap className="w-5 h-5 text-blue-600" />
          </div>
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#e2e8f0"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="url(#powerGradient)"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(powerLevel * 314) / 100} 314`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="powerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-800">{activePower}W</div>
                <div className="text-xs text-slate-500">Current</div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              {powerLevel > 50 ? (
                <TrendingUp className="w-4 h-4 text-red-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-green-500" />
              )}
              <span className="text-sm text-slate-600">
                {powerLevel > 50 ? 'High Usage' : 'Optimal Usage'}
              </span>
            </div>
          </div>
        </div>

        {/* Daily Usage Bar Chart */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-700">Daily Progress</h4>
            <div className="text-sm text-green-600 font-medium">{totalDailyUsage.toFixed(1)} kWh</div>
          </div>
          <div className="space-y-3">
            {['Morning', 'Afternoon', 'Evening', 'Night'].map((period, index) => {
              const usage = [25, 45, 35, 15][index];
              const isActive = index === 2; // Evening is currently active
              return (
                <div key={period} className="flex items-center space-x-3">
                  <div className="w-16 text-sm text-slate-600">{period}</div>
                  <div className="flex-1 bg-white rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        isActive 
                          ? 'bg-gradient-to-r from-green-400 to-green-600 animate-pulse' 
                          : 'bg-gradient-to-r from-green-300 to-green-500'
                      }`}
                      style={{ width: `${usage}%` }}
                    />
                  </div>
                  <div className="w-8 text-xs text-slate-500">{usage}%</div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center">
            <div className="text-xs text-slate-500">Peak usage: 6-9 PM</div>
          </div>
        </div>

        {/* Efficiency Meter */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-700">Efficiency Score</h4>
            <div className="text-sm text-purple-600 font-medium">{efficiency}%</div>
          </div>
          <div className="relative">
            <div className="w-full bg-white rounded-full h-4 overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${efficiency}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-slate-500">
              <div className="text-center">Poor</div>
              <div className="text-center">Good</div>
              <div className="text-center">Excellent</div>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Smart scheduling</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Peak avoidance</span>
              <span className="text-green-600 font-medium">Enabled</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-600">Energy savings</span>
              <span className="text-blue-600 font-medium">$23.40/mo</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
