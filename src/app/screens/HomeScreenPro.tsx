import { Search, ChevronRight, TrendingDown, Shield, Activity, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { useApps } from '../../hooks/useApps';
import { TrustScoreBadge } from '../components/TrustScoreBadge';
import { Logo } from '../components/Logo';
import { ScoreHistoryChart } from '../components/ScoreHistoryChart';

export function HomeScreenPro() {
  const { apps, loading, error } = useApps();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <div className="text-sm text-slate-600">Loading applications...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 max-w-md">
          <div className="text-sm text-rose-900 mb-2">Failed to load apps</div>
          <div className="text-xs text-rose-700">{error}</div>
          <div className="text-xs text-rose-600 mt-3">
            Please connect your Supabase database and run the setup SQL script.
          </div>
        </div>
      </div>
    );
  }

  const riskyApps = apps.filter(app => app.riskLevel === 'Avoid' || app.riskLevel === 'Caution');
  const avgScore = apps.length > 0 ? (apps.reduce((sum, app) => sum + app.trustScore, 0) / apps.length).toFixed(1) : '0.0';
  
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-5 pt-12 pb-6">
          <Logo size="md" />
          <p className="text-slate-500 text-sm mt-2">Privacy Monitoring Dashboard</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="px-5 py-6">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl text-slate-800 mb-1">{avgScore}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Avg Score</div>
            </div>
            <div className="text-center border-x border-slate-200">
              <div className="text-2xl text-slate-800 mb-1">{apps.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">Apps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-rose-600 mb-1">{riskyApps.length}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">At Risk</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Privacy Score Trend (NEW FEATURE) */}
      <div className="px-5 mb-5">
        <ScoreHistoryChart />
      </div>

      {/* Search */}
      <div className="px-5 mb-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Risk Alert */}
      {riskyApps.length > 0 && (
        <div className="px-5 mb-5">
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3.5 flex items-start gap-3">
            <TrendingDown className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-rose-900 mb-0.5">High-risk applications detected</div>
              <div className="text-xs text-rose-700">{riskyApps.length} apps require immediate attention</div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-2 gap-3">
          <Link
            to="/data-box"
            className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col items-start hover:border-blue-300 transition-colors"
          >
            <Activity className="w-5 h-5 text-blue-600 mb-2" />
            <div className="text-sm text-slate-800">Activity Logs</div>
            <div className="text-xs text-slate-500">View data access</div>
          </Link>
          <Link
            to="/analyzer"
            className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col items-start hover:border-blue-300 transition-colors"
          >
            <Shield className="w-5 h-5 text-blue-600 mb-2" />
            <div className="text-sm text-slate-800">Policy Analyzer</div>
            <div className="text-xs text-slate-500">AI-powered scan</div>
          </Link>
        </div>
      </div>

      {/* Apps List */}
      <div className="px-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-slate-600 uppercase tracking-wide">Monitored Applications</h2>
          <button className="text-xs text-blue-600 hover:text-blue-700">View All</button>
        </div>
        
        <div className="space-y-2">
          {apps.map((app) => (
            <Link
              key={app.id}
              to={`/app/${app.id}`}
              className="block bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* App Icon */}
                <div className="w-11 h-11 bg-slate-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0 border border-slate-200">
                  {app.icon}
                </div>
                
                {/* App Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-800 mb-1">{app.name}</div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        app.riskLevel === 'Safe'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : app.riskLevel === 'Caution'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {app.riskLevel}
                    </span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs text-slate-500">
                      {app.permissions.length} permissions
                    </span>
                  </div>
                </div>
                
                {/* Trust Score */}
                <div className="flex items-center gap-2">
                  <TrustScoreBadge score={app.trustScore} />
                  <ChevronRight className="w-4 h-4 text-slate-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}