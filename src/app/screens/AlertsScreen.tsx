import { Bell, AlertTriangle, Info, CheckCircle2, Filter } from 'lucide-react';
import { alerts } from '../data/mockData';

export function AlertsScreen() {
  const getSeverityConfig = (severity: string) => {
    if (severity === 'high') {
      return {
        icon: AlertTriangle,
        bg: 'bg-red-50',
        border: 'border-red-200',
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        textColor: 'text-red-900'
      };
    }
    if (severity === 'medium') {
      return {
        icon: Info,
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        iconBg: 'bg-yellow-100',
        iconColor: 'text-yellow-600',
        textColor: 'text-yellow-900'
      };
    }
    return {
      icon: CheckCircle2,
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      textColor: 'text-blue-900'
    };
  };

  const highAlerts = alerts.filter(a => a.severity === 'high').length;
  const mediumAlerts = alerts.filter(a => a.severity === 'medium').length;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-600 to-red-800 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Bell className="w-8 h-8" />
          <h1 className="text-2xl">Privacy Alerts</h1>
        </div>
        <p className="text-sm opacity-90">
          Real-time notifications about privacy concerns
        </p>
      </div>

      {/* Stats */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-red-600 mb-1">{highAlerts}</div>
              <div className="text-xs text-gray-600">High Risk</div>
            </div>
            <div>
              <div className="text-2xl text-yellow-600 mb-1">{mediumAlerts}</div>
              <div className="text-xs text-gray-600">Medium Risk</div>
            </div>
            <div>
              <div className="text-2xl text-gray-400 mb-1">{alerts.length - highAlerts - mediumAlerts}</div>
              <div className="text-xs text-gray-600">Low Risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="px-6 mb-6">
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            All Alerts
          </button>
          <button className="px-4 py-2 bg-white rounded-xl shadow-sm text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            Today
          </button>
          <button className="px-4 py-2 bg-white rounded-xl shadow-sm text-sm text-gray-500 hover:bg-gray-50 transition-colors">
            This Week
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="px-6">
        <div className="space-y-3">
          {alerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className={`${config.bg} border ${config.border} rounded-2xl p-4 hover:shadow-md transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-10 h-10 ${config.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.iconColor}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className={`${config.textColor}`}>
                        {alert.title}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {alert.time}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-2">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs bg-white/50 px-2 py-1 rounded-lg text-gray-700">
                        {alert.appName}
                      </span>
                      
                      <button className={`text-xs ${config.iconColor} hover:underline`}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear All */}
        <div className="mt-6 text-center">
          <button className="text-sm text-gray-600 hover:text-gray-800 underline">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Alert Settings */}
      <div className="px-6 mt-8">
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg text-gray-900 mb-4">Alert Preferences</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-900">High-risk alerts</div>
                <div className="text-xs text-gray-500">Critical privacy violations</div>
              </div>
              <div className="w-12 h-7 bg-red-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-900">Medium-risk alerts</div>
                <div className="text-xs text-gray-500">Suspicious activities</div>
              </div>
              <div className="w-12 h-7 bg-yellow-500 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-900">Low-risk alerts</div>
                <div className="text-xs text-gray-500">Informational updates</div>
              </div>
              <div className="w-12 h-7 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
