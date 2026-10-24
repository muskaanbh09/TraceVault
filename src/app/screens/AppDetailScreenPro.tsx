import { useParams, Link } from 'react-router';
import { ChevronLeft, Shield, AlertCircle, CheckCircle2, Info, ExternalLink, Loader2 } from 'lucide-react';
import { useApps } from '../../hooks/useApps';
import { TrustScoreBadge } from '../components/TrustScoreBadge';

export function AppDetailScreenPro() {
  const { id } = useParams();
  const { apps, loading, error } = useApps();
  const app = apps.find(a => a.id === id);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <div className="text-sm text-slate-600">Loading app details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5">
        <div className="bg-rose-50 border border-rose-200 rounded-lg p-6 max-w-md">
          <div className="text-sm text-rose-900 mb-2">Failed to load app details</div>
          <div className="text-xs text-rose-700">{error}</div>
          <Link to="/home" className="text-xs text-blue-600 hover:text-blue-700 mt-3 inline-block">
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="text-slate-500 mb-2">Application not found</div>
          <Link to="/home" className="text-blue-600 hover:text-blue-700 text-sm">
            Return to dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="px-5 py-4 flex items-center gap-3">
          <Link to="/home" className="text-slate-600 hover:text-slate-800">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base text-slate-800">Application Details</h1>
            <p className="text-xs text-slate-500">Privacy Analysis Report</p>
          </div>
        </div>
      </div>

      {/* App Header */}
      <div className="px-5 py-6 bg-white border-b border-slate-200">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-2xl border border-slate-200 flex-shrink-0">
            {app.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-xl text-slate-800 mb-1">{app.name}</h2>
            <div className="text-sm text-slate-500">{app.permissions.length} active permissions</div>
          </div>
        </div>

        {/* Trust Score */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <div className="grid grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Trust Score</div>
              <div className="flex justify-center">
                <TrustScoreBadge score={app.trustScore} size="lg" />
              </div>
            </div>
            
            <div className="text-center border-l border-slate-200 pl-6">
              <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Risk Level</div>
              <div
                className={`inline-block px-4 py-2 rounded-lg text-sm border ${
                  app.riskLevel === 'Safe'
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : app.riskLevel === 'Caution'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}
              >
                {app.riskLevel}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="px-5 py-5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm text-slate-800 uppercase tracking-wide">Permissions</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          {app.permissions.map((permission, index) => (
            <div
              key={index}
              className="bg-slate-50 border border-slate-200 rounded px-3 py-2 flex items-center gap-2"
            >
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
              <span className="text-xs text-slate-700">{permission}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security History */}
      <div className="px-5 py-5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm text-slate-800 uppercase tracking-wide">Security History</h3>
        </div>
        
        {app.breaches.length === 0 ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <div className="text-sm text-emerald-900 mb-1">No breaches detected</div>
              <div className="text-xs text-emerald-700">Clean security record</div>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {app.breaches.map((breach, index) => (
              <div
                key={index}
                className="bg-rose-50 border border-rose-200 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-xs text-rose-900 mb-1">{breach.date}</div>
                    <div className="text-sm text-rose-700">{breach.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Analysis */}
      <div className="px-5 py-5 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <Info className="w-4 h-4 text-slate-600" />
          <h3 className="text-sm text-slate-800 uppercase tracking-wide">Privacy Analysis</h3>
        </div>
        
        <div className="space-y-4">
          <div className="border-l-2 border-blue-500 pl-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Data Sharing</div>
            <div className="text-sm text-slate-700 leading-relaxed">
              {app.privacyInsights.dataSharing}
            </div>
          </div>

          <div className="border-l-2 border-blue-500 pl-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Third-Party</div>
            <div className="text-sm text-slate-700 leading-relaxed">
              {app.privacyInsights.thirdParty}
            </div>
          </div>

          <div className="border-l-2 border-blue-500 pl-4">
            <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">User Control</div>
            <div className="text-sm text-slate-700 leading-relaxed">
              {app.privacyInsights.userControl}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="px-5 py-5">
        <Link
          to="/data-box"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="text-sm">View Activity Logs</span>
        </Link>
      </div>

      {/* Recommendations */}
      {app.riskLevel !== 'Safe' && (
        <div className="px-5 py-5 bg-white">
          <h3 className="text-sm text-slate-800 uppercase tracking-wide mb-4">Recommendations</h3>
          
          <div className="space-y-2">
            {app.riskLevel === 'Avoid' && (
              <>
                <div className="flex items-start gap-3 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                  <div className="w-1 h-1 bg-rose-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-rose-900">
                    Consider uninstalling or finding a privacy-focused alternative
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="w-1 h-1 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-amber-900">
                    Revoke unnecessary permissions in system settings
                  </div>
                </div>
              </>
            )}
            
            {app.riskLevel === 'Caution' && (
              <>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="w-1 h-1 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-amber-900">
                    Review privacy settings and limit data sharing
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="w-1 h-1 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="text-sm text-blue-900">
                    Monitor activity regularly for unusual behavior
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}