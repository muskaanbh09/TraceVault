import { useState, useEffect } from 'react';
import { alertsApi } from '../lib/api';

interface Alert {
  id: string;
  app_id: string;
  app_name: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  time: string;
}

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const data = await alertsApi.getAll();
        setAlerts(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    }

    fetchAlerts();

    // Import supabase client for realtime subscription
    import('../lib/supabase').then(({ supabase, isSupabaseConfigured }) => {
      if (!isSupabaseConfigured) return; // Fallback for demo mode

      const channel = supabase
        .channel('alerts_changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'alerts' },
          (payload) => {
            setAlerts((current) => [payload.new as Alert, ...current]);
          }
        )
        .subscribe();

      // Clean up subscription on unmount
      return () => {
        supabase.removeChannel(channel);
      };
    });
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await alertsApi.markAsRead(id);
    } catch { /* silently fail */ }
  };

  const markAllAsRead = async () => {
    try {
      await alertsApi.markAllAsRead();
    } catch { /* silently fail */ }
  };

  return { alerts, loading, error, markAsRead, markAllAsRead };
}