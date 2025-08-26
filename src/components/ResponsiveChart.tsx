import React from 'react';
import { BarChart3, Activity, Clock } from 'lucide-react';

export const ResponsiveChart: React.FC = () => {
  const hourlyData = [
    { hour: '00', usage: 15, cost: 0.8 },
    { hour: '03', usage: 12, cost: 0.6 },
    { hour: '06', usage: 25, cost: 1.5 },
    { hour: '09', usage: 35, cost: 2.1 },
    { hour: '12', usage: 45, cost: 2.7 },
    { hour: '15', usage: 40, cost: 2.4 },
    { hour: '18', usage: 65, cost: 3.9 },
    { hour: '21', usage: 55, cost: 3.3 }
  ];

  const maxUsage = Math.max(...hourlyData.map(d => d.usage));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 sm:mb-0">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">24-Hour Usage Pattern</h3>
            <p className="text-slate-500 text-sm">Real-time energy consumption tracking</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-green-500" />
            <span className="text-sm text-slate-600">Live Data</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-slate-600">Updated 2m ago</span>
          </div>
        </div>
      </div>

      {/* Responsive Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="flex items-end justify-between h-48 bg-gradient-to-t from-slate-50 to-transparent p-4 rounded-xl border border-slate-100">
            {hourlyData.map((data, index) => {
              const height = (data.usage / maxUsage) * 100;
              const isCurrentHour = index === 6; // 18:00 is current
              
              return (
                <div key={data.hour} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="relative w-full max-w-8">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-1000 ease-out ${
                        isCurrentHour
                          ? 'bg-gradient-to-t from-indigo-500 to-indigo-400 animate-pulse'
                          : 'bg-gradient-to-t from-indigo-400 to-indigo-300'
                      }`}
                      style={{ height: `${height}%` }}
                    />
                    {isCurrentHour && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                          Now
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{data.hour}:00</div>
                  <div className="text-xs text-slate-400">{data.usage}kW</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Peak Hour</span>
              <span className="text-xs text-amber-600 bg-amber-200 px-2 py-1 rounded-full">
                6-9 PM
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800">65 kW</div>
            <div className="text-xs text-slate-500">+23% from yesterday</div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Off-Peak</span>
              <span className="text-xs text-emerald-600 bg-emerald-200 px-2 py-1 rounded-full">
                12-6 AM
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800">12 kW</div>
            <div className="text-xs text-slate-500">-15% from yesterday</div>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-rose-100 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Daily Cost</span>
              <span className="text-xs text-rose-600 bg-rose-200 px-2 py-1 rounded-full">
                Today
              </span>
            </div>
            <div className="text-2xl font-bold text-slate-800">$18.30</div>
            <div className="text-xs text-slate-500">$2.40 saved</div>
          </div>
        </div>
      </div>
    </div>
  );
};
