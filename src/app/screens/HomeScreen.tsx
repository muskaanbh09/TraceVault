import { Shield, Search, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router';
import { apps } from '../data/mockData';
import { TrustScoreBadge } from '../components/TrustScoreBadge';

export function HomeScreen() {
  const riskyApps = apps.filter(app => app.riskLevel === 'Avoid' || app.riskLevel === 'Caution');
  
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-6 pt-12 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8" />
          <h1 className="text-2xl">TraceVault</h1>
        </div>
        
        {/* Stats */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4">
          <div className="text-sm opacity-90 mb-1">Overall Privacy Score</div>
          <div className="text-4xl">6.2<span className="text-xl opacity-75">/10</span></div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">{apps.length}</div>
            <div className="text-xs opacity-90">Apps Tracked</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">{riskyApps.length}</div>
            <div className="text-xs opacity-90">At Risk</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <div className="text-2xl mb-1">47</div>
            <div className="text-xs opacity-90">Today's Scans</div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-6 -mt-6 mb-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search apps..."
            className="flex-1 outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Risky Apps Alert */}
      {riskyApps.length > 0 && (
        <div className="px-6 mb-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-red-900 mb-1">High Risk Apps Detected</div>
              <div className="text-sm text-red-700">
                {riskyApps.length} apps require your attention
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Apps List */}
      <div className="px-6">
        <h2 className="text-lg text-gray-900 mb-4">Installed Apps</h2>
        
        <div className="space-y-3">
          {apps.map((app) => (
            <Link
              key={app.id}
              to={`/app/${app.id}`}
              className="block bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                {/* App Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                  {app.icon}
                </div>
                
                {/* App Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-gray-900 mb-1">{app.name}</div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        app.riskLevel === 'Safe'
                          ? 'bg-green-100 text-green-700'
                          : app.riskLevel === 'Caution'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {app.riskLevel}
                    </span>
                    <span className="text-xs text-gray-500">
                      {app.permissions.length} permissions
                    </span>
                  </div>
                </div>
                
                {/* Trust Score */}
                <TrustScoreBadge score={app.trustScore} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
