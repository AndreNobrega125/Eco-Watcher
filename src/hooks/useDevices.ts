import { useState, useEffect } from 'react';
import { Device, EnergyStats } from '../types';
import { mockDevices } from '../data/mockData';

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);

  const toggleDevice = (deviceId: string) => {
    setDevices(prevDevices =>
      prevDevices.map(device =>
        device.id === deviceId
          ? {
              ...device,
              isActive: !device.isActive,
              currentPower: !device.isActive ? getRandomPower(device.type) : 0,
              lastUpdated: new Date()
            }
          : device
      )
    );
  };

  const getRandomPower = (type: string): number => {
    const powerRanges: Record<string, [number, number]> = {
      'Entertainment': [80, 150],
      'Appliance': [100, 200],
      'Climate': [300, 500],
      'Electronics': [60, 120],
      'Lighting': [20, 60]
    };
    
    const [min, max] = powerRanges[type] || [50, 100];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getEnergyStats = (): EnergyStats => {
    const activePower = devices
      .filter(d => d.isActive)
      .reduce((sum, d) => sum + d.currentPower, 0);
    
    const totalDailyUsage = devices.reduce((sum, d) => sum + d.dailyUsage, 0);
    const totalMonthlyCost = devices.reduce((sum, d) => sum + (d.monthlyUsage * 0.12), 0);
    const devicesOnline = devices.filter(d => d.isOnline).length;
    const totalDevices = devices.length;

    return {
      activePower,
      totalDailyUsage,
      totalMonthlyCost,
      devicesOnline,
      totalDevices
    };
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prevDevices =>
        prevDevices.map(device => {
          if (device.isActive && device.isOnline) {
            const variation = (Math.random() - 0.5) * 20; // ±10W variation
            const newPower = Math.max(0, device.currentPower + variation);
            return {
              ...device,
              currentPower: Math.round(newPower),
              lastUpdated: new Date()
            };
          }
          return device;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return {
    devices,
    toggleDevice,
    energyStats: getEnergyStats()
  };
};
