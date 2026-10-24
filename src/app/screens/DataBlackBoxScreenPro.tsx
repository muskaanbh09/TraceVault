import { Database, Download, Calendar, Loader2 } from 'lucide-react';
import { useDataAccessLogs } from '../../hooks/useDataAccessLogs';

export function DataBlackBoxScreenPro() {
  const { logs, loading, error } = useDataAccessLogs();

  const getStatusConfig = (status: string) => {
    if (status === 'Allowed') return { 
      dot: 'bg-emerald-500', 
      text: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    };
    if (status === 'Warning') return { 
      dot: 'bg-amber-500', 
      text: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    };
    return { 
      dot: 'bg-rose-500', 
      text: 'text-rose-700',
      bg: 'bg-rose-50',
      border: 'border-rose-200'
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <div className="text-sm text-slate-600">Loading activity logs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 max-w-md">
          <div className="text-sm text-rose-900 mb-2">Failed to load logs</div>
          <div className="text-xs text-rose-700">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-5 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Database className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl text-slate-800">Activity Monitor</h1>
          </div>
          <p className="text-sm text-slate-500">Real-time data access tracking</p>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 py-5">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-slate-800 mb-1">{logs.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Total</div>
            </div>
            <div className="border-x border-slate-200">
              <div className="text-2xl text-amber-600 mb-1">
                {logs.filter(log => log.status === 'Warning').length}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Warnings</div>
            </div>
            <div>
              <div className="text-2xl text-rose-600 mb-1">
                {logs.filter(log => log.status === 'Blocked').length}
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Blocked</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 mb-5">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-700 hover:bg-slate-50 transition-colors">
            <Calendar className="w-3.5 h-3.5" />
            Today
          </button>
          <button className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-500 hover:bg-slate-50 transition-colors">
            All Apps
          </button>
          <button className="ml-auto p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="px-5">
        <div className="text-xs text-slate-600 uppercase tracking-wide mb-3">Activity Timeline</div>
        
        <div className="space-y-2">
          {logs.map((log) => {
            const config = getStatusConfig(log.status);
            
            return (
              <div
                key={log.id}
                className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-sm text-slate-800 mb-1">{log.app_name}</div>
                    <div className="text-xs text-slate-500">{log.time}</div>
                  </div>
                  
                  <div className={`px-2.5 py-1 rounded text-xs border ${config.bg} ${config.text} ${config.border} flex items-center gap-1.5`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`}></div>
                    {log.status}
                  </div>
                </div>
                
                {/* Data Accessed */}
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs text-slate-500 uppercase tracking-wide mb-2">Data Accessed</div>
                  <div className="flex flex-wrap gap-1.5">
                    {log.data_accessed.map((data, index) => (
                      <span
                        key={index}
                        className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded border border-slate-200"
                      >
                        {data}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="px-5 mt-6">
        <div className="bg-white border border-slate-200 rounded-lg p-4">
          <div className="text-xs text-slate-600 uppercase tracking-wide mb-3">Status Legend</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Allowed — Normal activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Warning — Suspicious behavior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
              <span className="text-xs text-slate-600">Blocked — Access denied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}