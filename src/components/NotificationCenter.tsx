import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const NotificationCenter: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showPanel, setShowPanel] = useState(false);
  const { requestNotificationPermission, sendNotification } = usePWA();

  useEffect(() => {
    // Simulate energy-related notifications
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'warning',
        title: 'High Energy Usage',
        message: 'Living Room AC is consuming 450W - 23% above normal',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        read: false
      },
      {
        id: '2',
        type: 'info',
        title: 'Peak Hours Starting',
        message: 'Energy rates increase at 6 PM. Consider reducing usage.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false
      },
      {
        id: '3',
        type: 'success',
        title: 'Energy Goal Achieved',
        message: 'You saved 15% energy today compared to yesterday!',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        read: true
      }
    ];

    setNotifications(mockNotifications);

    // Request notification permission on mount
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="relative p-2 text-slate-600 hover:text-slate-800 transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {showPanel && (
        <div className="absolute top-16 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-800">Notifications</h3>
              <button
                onClick={() => setShowPanel(false)}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-slate-500">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {getIcon(notification.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-slate-800 truncate">
                          {notification.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeNotification(notification.id);
                          }}
                          className="p-1 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        {formatTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};
