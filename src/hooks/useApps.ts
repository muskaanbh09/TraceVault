import { useState, useEffect } from 'react';
import { appsApi } from '../lib/api';

interface AppWithDetails {
  id: string;
  name: string;
  icon: string;
  trustScore: number;
  riskLevel: 'Safe' | 'Caution' | 'Avoid';
  permissions: string[];
  breaches: Array<{
    id: string;
    date: string;
    description: string;
  }>;
  privacyInsights: {
    dataSharing: string;
    thirdParty: string;
    userControl: string;
  };
}

export function useApps() {
  const [apps, setApps] = useState<AppWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApps() {
      try {
        const data = await appsApi.getAll();
        
        // Normalize data — backend may use snake_case or camelCase
        const normalized = data.map((app: any) => ({
          id: app.id,
          name: app.name,
          icon: app.icon,
          trustScore: app.trustScore ?? app.trust_score ?? 0,
          riskLevel: app.riskLevel ?? app.risk_level ?? 'Caution',
          permissions: app.permissions || [],
          breaches: app.breaches || [],
          privacyInsights: app.privacyInsights || {
            dataSharing: app.privacy_insights?.data_sharing || '',
            thirdParty: app.privacy_insights?.third_party || '',
            userControl: app.privacy_insights?.user_control || '',
          }
        }));
        
        setApps(normalized);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch apps');
      } finally {
        setLoading(false);
      }
    }

    fetchApps();
  }, []);

  return { apps, loading, error };
}