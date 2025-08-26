export interface Device {
  id: string;
  name: string;
  room: string;
  type: string;
  isOnline: boolean;
  isActive: boolean;
  currentPower: number; // watts
  dailyUsage: number; // kWh
  monthlyUsage: number; // kWh
  costPerHour: number; // dollars
  icon: string;
  lastUpdated: Date;
}

export interface Room {
  id: string;
  name: string;
  deviceCount: number;
  totalPower: number;
  icon: string;
}

export interface EnergyStats {
  totalDailyUsage: number;
  totalMonthlyCost: number;
  activePower: number;
  devicesOnline: number;
  totalDevices: number;
}
