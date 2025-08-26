import React from 'react';
import { 
  Home, 
  Sofa, 
  ChefHat, 
  Bed, 
  Briefcase, 
  Shirt,
  Zap
} from 'lucide-react';
import { Room } from '../types';

interface RoomFilterProps {
  rooms: Room[];
  selectedRoom: string;
  onRoomSelect: (roomId: string) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  home: <Home className="w-5 h-5" />,
  sofa: <Sofa className="w-5 h-5" />,
  'chef-hat': <ChefHat className="w-5 h-5" />,
  bed: <Bed className="w-5 h-5" />,
  briefcase: <Briefcase className="w-5 h-5" />,
  shirt: <Shirt className="w-5 h-5" />
};

export const RoomFilter: React.FC<RoomFilterProps> = ({ 
  rooms, 
  selectedRoom, 
  onRoomSelect 
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Filter by Room</h2>
      <div className="flex flex-wrap gap-3">
        {rooms.map((room) => (
          <button
            key={room.id}
            onClick={() => onRoomSelect(room.id)}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              selectedRoom === room.id
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md hover:shadow-lg border border-slate-200'
            }`}
          >
            <div className={`p-2 rounded-lg ${
              selectedRoom === room.id 
                ? 'bg-blue-400/20 text-blue-100' 
                : 'bg-slate-100 text-slate-600'
            }`}>
              {iconMap[room.icon]}
            </div>
            <div className="text-left">
              <p className="font-medium">{room.name}</p>
              <div className="flex items-center space-x-2 text-sm opacity-75">
                <span>{room.deviceCount} devices</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>{room.totalPower}W</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
