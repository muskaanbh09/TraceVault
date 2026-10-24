import { Database, Filter, Download } from 'lucide-react';
import { dataAccessLogs } from '../data/mockData';

export function DataBlackBoxScreen() {
  const getStatusColor = (status: string) => {
    if (status === 'Allowed') return { bg: 'bg-green-100', text: 'text-green-700' };
    if (status === 'Warning') return { bg: 'bg-yellow-100', text: 'text-yellow-700' };
    return { bg: 'bg-red-100', text: 'text-red-700' };
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-8 h-8" />
          <h1 className="text-2xl">Data Black Box</h1>
        </div>
        <p className="text-sm opacity-90">
          Real-time monitoring of app data access
        </p>
      </div>

      {/* Filter Bar */}
      <div className="px-6 -mt-4 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-700">
              <Filter className="w-5 h-5" />
              <span className="text-sm">Today's Activity</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl text-gray-900 mb-1">
              {dataAccessLogs.length}
            </div>
            <div className="text-xs text-gray-500">Total Access</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl text-yellow-600 mb-1">
              {dataAccessLogs.filter(log => log.status === 'Warning').length}
            </div>
            <div className="text-xs text-gray-500">Warnings</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl text-red-600 mb-1">
              {dataAccessLogs.filter(log => log.status === 'Blocked').length}
            </div>
            <div className="text-xs text-gray-500">Blocked</div>
          </div>
        </div>
      </div>

      {/* Data Access Table */}
      <div className="px-6">
        <h2 className="text-lg text-gray-900 mb-4">Access Log</h2>
        
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="grid grid-cols-12 gap-4 text-xs text-gray-600">
              <div className="col-span-2">Time</div>
              <div className="col-span-3">App</div>
              <div className="col-span-5">Data Accessed</div>
              <div className="col-span-2">Status</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {dataAccessLogs.map((log) => {
              const statusColor = getStatusColor(log.status);
              
              return (
                <div key={log.id} className="px-4 py-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Time */}
                    <div className="col-span-2 text-sm text-gray-600">
                      {log.time}
                    </div>
                    
                    {/* App Name */}
                    <div className="col-span-3 text-sm text-gray-900">
                      {log.appName}
                    </div>
                    
                    {/* Data Accessed */}
                    <div className="col-span-5">
                      <div className="flex flex-wrap gap-1">
                        {log.dataAccessed.map((data, index) => (
                          <span
                            key={index}
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md"
                          >
                            {data}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Status */}
                    <div className="col-span-2">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${statusColor.bg} ${statusColor.text}`}
                      >
                        {log.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-2xl p-4 shadow-sm">
          <div className="text-sm text-gray-700 mb-3">Status Legend</div>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Allowed - Normal access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Warning - Suspicious activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-xs text-gray-600">Blocked - Access denied</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
