import { useParams, Link } from 'react-router';
import { ChevronLeft, Shield, AlertTriangle, History, FileText, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { apps } from '../data/mockData';
import { TrustScoreBadge } from '../components/TrustScoreBadge';

export function AppDetailScreen() {
  const { id } = useParams();
  const app = apps.find(a => a.id === id);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-gray-500 mb-2">App not found</div>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  const getRiskColor = () => {
    if (app.riskLevel === 'Safe') return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
    if (app.riskLevel === 'Caution') return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
    return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  };

  const riskColor = getRiskColor();

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg text-gray-900">App Details</h1>
        </div>
      </div>

      {/* App Header */}
      <div className="px-6 py-8 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
            {app.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl text-gray-900 mb-1">{app.name}</h2>
            <div className="text-sm text-gray-500">{app.permissions.length} active permissions</div>
          </div>
        </div>

        {/* Trust Score Display */}
        <div className="flex items-center justify-center gap-8 py-6">
          <div className="text-center">
            <div className="text-sm text-gray-500 mb-3">Trust Score</div>
            <TrustScoreBadge score={app.trustScore} size="lg" />
          </div>
          
          <div className={`px-6 py-4 rounded-2xl border-2 ${riskColor.bg} ${riskColor.border}`}>
            <div className="text-sm opacity-70 mb-1">Risk Level</div>
            <div className={`text-2xl ${riskColor.text}`}>{app.riskLevel}</div>
          </div>
        </div>
      </div>

      {/* Permissions Section */}
      <div className="px-6 py-6 bg-white mb-3">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg text-gray-900">Permissions Used</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {app.permissions.map((permission, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl px-4 py-3 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-700">{permission}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Breach History */}
      <div className="px-6 py-6 bg-white mb-3">
        <div className="flex items-center gap-2 mb-4">
          <History className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg text-gray-900">Breach History</h3>
        </div>
        
        {app.breaches.length === 0 ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <div>
              <div className="text-green-900">No breaches detected</div>
              <div className="text-sm text-green-700">This app has a clean security record</div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {app.breaches.map((breach, index) => (
              <div
                key={index}
                className="bg-red-50 border border-red-200 rounded-xl p-4"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="text-red-900 mb-1">{breach.date}</div>
                    <div className="text-sm text-red-700">{breach.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Policy Insights */}
      <div className="px-6 py-6 bg-white mb-3">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg text-gray-900">Privacy Policy Insights</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <div className="text-sm text-gray-900">Data Sharing Practices</div>
            </div>
            <div className="text-sm text-gray-600 pl-3.5">
              {app.privacyInsights.dataSharing}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <div className="text-sm text-gray-900">Third-Party Involvement</div>
            </div>
            <div className="text-sm text-gray-600 pl-3.5">
              {app.privacyInsights.thirdParty}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
              <div className="text-sm text-gray-900">User Control</div>
            </div>
            <div className="text-sm text-gray-600 pl-3.5">
              {app.privacyInsights.userControl}
            </div>
          </div>
        </div>
      </div>

      {/* Action Recommendations */}
      {app.riskLevel !== 'Safe' && (
        <div className="px-6 py-6 bg-white">
          <h3 className="text-lg text-gray-900 mb-4">Recommended Actions</h3>
          
          <div className="space-y-3">
            {app.riskLevel === 'Avoid' && (
              <>
                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-red-900">
                    Consider uninstalling this app or finding a privacy-focused alternative
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-900">
                    Review and revoke unnecessary permissions in app settings
                  </div>
                </div>
              </>
            )}
            
            {app.riskLevel === 'Caution' && (
              <>
                <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-900">
                    Review privacy settings and limit data sharing where possible
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    Monitor this app's behavior regularly for unusual activity
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
