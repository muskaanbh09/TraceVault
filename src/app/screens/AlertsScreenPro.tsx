import { Bell, AlertTriangle, Info, Filter, Loader2 } from 'lucide-react';
import { useAlerts } from '../../hooks/useAlerts';

export function AlertsScreenPro() {
  const { alerts, loading, error } = useAlerts();

  const getSeverityConfig = (severity: string) => {
    if (severity === 'high') {
      return {
        icon: AlertTriangle,
        dot: 'bg-rose-500',
        bg: 'bg-rose-50',
        border: 'border-rose-200',
        text: 'text-rose-900',
        subtext: 'text-rose-700'
      };
    }
    if (severity === 'medium') {
      return {
        icon: AlertTriangle,
        dot: 'bg-amber-500',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        text: 'text-amber-900',
        subtext: 'text-amber-700'
      };
    }
    return {
      icon: Info,
      dot: 'bg-blue-500',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      text: 'text-blue-900',
      subtext: 'text-blue-700'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <div className="text-sm text-slate-600">Loading alerts...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 max-w-md">
          <div className="text-sm text-rose-900 mb-2">Failed to load alerts</div>
          <div className="text-xs text-rose-700">{error}</div>
        </div>
      </div>
    );
  }

  const highAlerts = alerts.filter(a => a.severity === 'high').length;
  const mediumAlerts = alerts.filter(a => a.severity === 'medium').length;
  const lowAlerts = alerts.filter(a => a.severity === 'low').length;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-5 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl text-slate-800">Security Alerts</h1>
          </div>
          <p className="text-sm text-slate-500">Privacy threat notifications</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 py-5">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-rose-600 mb-1">{highAlerts}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Critical</div>
            </div>
            <div className="border-x border-slate-200">
              <div className="text-2xl text-amber-600 mb-1">{mediumAlerts}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Warning</div>
            </div>
            <div>
              <div className="text-2xl text-slate-400 mb-1">{lowAlerts}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Info</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-3.5 h-3.5" />
            All Alerts
          </button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-500 hover:bg-slate-50 transition-colors">
            Today
          </button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-500 hover:bg-slate-50 transition-colors">
            This Week
          </button>
        </div>
      </div>

      {/* Alerts List */}
      <div className="px-5">
        <div className="text-xs text-slate-600 uppercase tracking-wide mb-3">Recent Activity</div>
        
        <div className="space-y-2">
          {alerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            const Icon = config.icon;
            
            return (
              <div
                key={alert.id}
                className={`bg-white border ${config.border} rounded-lg p-4 hover:border-blue-300 transition-colors`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className={`w-8 h-8 ${config.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-4 h-4 ${config.subtext}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`text-sm ${config.text}`}>
                        {alert.title}
                      </h3>
                      <span className="text-xs text-slate-500 flex-shrink-0">
                        {alert.time}
                      </span>
                    </div>
                    
                    <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                      {alert.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 ${config.dot} rounded-full`}></div>
                        <span className="text-xs text-slate-600">{alert.app_name}</span>
                      </div>
                      
                      <button className="text-xs text-blue-600 hover:text-blue-700">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 text-center">
          <button className="text-sm text-slate-600 hover:text-slate-800">
            Mark all as read
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mt-6">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <h3 className="text-sm text-slate-800 uppercase tracking-wide mb-4">Notification Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="text-sm text-slate-800 mb-0.5">Critical alerts</div>
                <div className="text-xs text-slate-500">Immediate security threats</div>
              </div>
              <div className="w-11 h-6 bg-rose-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="text-sm text-slate-800 mb-0.5">Warning alerts</div>
                <div className="text-xs text-slate-500">Suspicious activity detected</div>
              </div>
              <div className="w-11 h-6 bg-amber-500 rounded-full relative cursor-pointer">
                <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-800 mb-0.5">Info alerts</div>
                <div className="text-xs text-slate-500">General notifications</div>
              </div>
              <div className="w-11 h-6 bg-slate-300 rounded-full relative cursor-pointer">
                <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}