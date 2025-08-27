import { Device, Room } from '../types';

export const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Living Room TV',
    room: 'Living Room',
    type: 'Entertainment',
    isOnline: true,
    isActive: true,
    currentPower: 120,
    dailyUsage: 2.4,
    monthlyUsage: 72,
    costPerHour: 0.015,
    icon: 'tv',
    lastUpdated: new Date()
  },
  {
    id: '2',
    name: 'Kitchen Refrigerator',
    room: 'Kitchen',
    type: 'Appliance',
    isOnline: true,
    isActive: true,
    currentPower: 150,
    dailyUsage: 3.6,
    monthlyUsage: 108,
    costPerHour: 0.018,
    icon: 'refrigerator',
    lastUpdated: new Date()
  },
  {
    id: '3',
    name: 'Bedroom AC',
    room: 'Bedroom',
    type: 'Climate',
    isOnline: true,
    isActive: false,
    currentPower: 0,
    dailyUsage: 1.2,
    monthlyUsage: 36,
    costPerHour: 0.45,
    icon: 'snowflake',
    lastUpdated: new Date()
  },
  {
    id: '4',
    name: 'Office Computer',
    room: 'Office',
    type: 'Electronics',
    isOnline: true,
    isActive: true,
    currentPower: 85,
    dailyUsage: 6.8,
    monthlyUsage: 204,
    costPerHour: 0.010,
    icon: 'monitor',
    lastUpdated: new Date()
  },
  {
    id: '5',
    name: 'Kitchen Microwave',
    room: 'Kitchen',
    type: 'Appliance',
    isOnline: true,
    isActive: false,
    currentPower: 0,
    dailyUsage: 0.5,
    monthlyUsage: 15,
    costPerHour: 0.12,
    icon: 'microwave',
    lastUpdated: new Date()
  },
  {
    id: '6',
    name: 'Living Room Lights',
    room: 'Living Room',
    type: 'Lighting',
    isOnline: true,
    isActive: true,
    currentPower: 45,
    dailyUsage: 2.7,
    monthlyUsage: 81,
    costPerHour: 0.005,
    icon: 'lightbulb',
    lastUpdated: new Date()
  },
  {
    id: '7',
    name: 'Washer',
    room: 'Laundry',
    type: 'Appliance',
    isOnline: true,
    isActive: false,
    currentPower: 0,
    dailyUsage: 1.8,
    monthlyUsage: 54,
    costPerHour: 0.22,
    icon: 'washing-machine',
    lastUpdated: new Date()
  },
  {
    id: '8',
    name: 'Gaming Console',
    room: 'Living Room',
    type: 'Entertainment',
    isOnline: false,
    isActive: false,
    currentPower: 0,
    dailyUsage: 1.5,
    monthlyUsage: 45,
    costPerHour: 0.018,
    icon: 'gamepad-2',
    lastUpdated: new Date()
  }
];

export const rooms: Room[] = [
  { id: 'all', name: 'All Rooms', deviceCount: 8, totalPower: 400, icon: 'home' },
  { id: 'living-room', name: 'Living Room', deviceCount: 3, totalPower: 165, icon: 'sofa' },
  { id: 'kitchen', name: 'Kitchen', deviceCount: 2, totalPower: 150, icon: 'chef-hat' },
  { id: 'bedroom', name: 'Bedroom', deviceCount: 1, totalPower: 0, icon: 'bed' },
  { id: 'office', name: 'Office', deviceCount: 1, totalPower: 85, icon: 'briefcase' },
  { id: 'laundry', name: 'Laundry', deviceCount: 1, totalPower: 0, icon: 'shirt' }
];
