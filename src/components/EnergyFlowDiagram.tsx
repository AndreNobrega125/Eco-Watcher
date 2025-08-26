import React from 'react';
import { Home, Zap, Leaf, ArrowRight, ArrowDown } from 'lucide-react';

export const EnergyFlowDiagram: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Leaf className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">Energy Flow Overview</h3>
          <p className="text-slate-500 text-sm">Smart grid integration and renewable sources</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Energy Sources */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-700 text-center">Energy Sources</h4>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-xl border-2 border-yellow-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-yellow-800 text-lg">☀️</span>
              </div>
              <div>
                <div className="font-medium text-slate-800">Solar Panels</div>
                <div className="text-sm text-slate-600">4.2 kW generating</div>
              </div>
            </div>
            <div className="w-full bg-yellow-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <div className="text-xs text-slate-500 mt-1">75% capacity</div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border-2 border-blue-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-blue-800" />
              </div>
              <div>
                <div className="font-medium text-slate-800">Grid Power</div>
                <div className="text-sm text-slate-600">2.1 kW backup</div>
              </div>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-1/3"></div>
            </div>
            <div className="text-xs text-slate-500 mt-1">33% usage</div>
          </div>
        </div>

        {/* Flow Arrows - Hidden on mobile */}
        <div className="hidden md:flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-2">
            <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
            <div className="text-sm text-slate-600">6.3 kW</div>
            <ArrowRight className="w-6 h-6 text-green-500 animate-pulse" />
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-2">
              <Home className="w-8 h-8 text-white" />
            </div>
            <div className="text-sm font-medium text-slate-700">Smart Home</div>
            <div className="text-xs text-slate-500">Energy Hub</div>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowDown className="w-6 h-6 text-blue-500 animate-pulse" />
            <div className="text-sm text-slate-600">4.8 kW</div>
            <ArrowDown className="w-6 h-6 text-blue-500 animate-pulse" />
          </div>
        </div>

        {/* Energy Consumption */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-700 text-center">Energy Usage</h4>
          
          <div className="space-y-3">
            {[
              { name: 'HVAC System', usage: 45, color: 'red' },
              { name: 'Kitchen Appliances', usage: 25, color: 'orange' },
              { name: 'Electronics', usage: 20, color: 'blue' },
              { name: 'Lighting', usage: 10, color: 'green' }
            ].map((item, index) => (
              <div key={item.name} className={`bg-gradient-to-br from-${item.color}-50 to-${item.color}-100 p-3 rounded-lg border border-${item.color}-200`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                  <span className="text-sm text-slate-600">{item.usage}%</span>
                </div>
                <div className={`w-full bg-${item.color}-200 rounded-full h-2`}>
                  <div 
                    className={`bg-${item.color}-500 h-2 rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${item.usage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border-2 border-purple-200 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-700">1.5 kW</div>
              <div className="text-sm text-purple-600">Excess to Battery</div>
              <div className="text-xs text-slate-500 mt-1">Storing for later use</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
