import { useState, useEffect } from 'react';
import { logsApi } from '../lib/api';

interface DataAccessLog {
  id: string;
  app_id: string;
  app_name: string;
  time: string;
  data_accessed: string[];
  status: 'Allowed' | 'Warning' | 'Blocked';
}

export function useDataAccessLogs() {
  const [logs, setLogs] = useState<DataAccessLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const data = await logsApi.getAll();
        setLogs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();

    // Import supabase client for realtime subscription
    let channel: any = null;
    import('../lib/supabase').then(({ supabase, isSupabaseConfigured }) => {
      if (!isSupabaseConfigured) return;

      channel = supabase
        .channel('logs_changes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'data_access_logs' },
          (payload) => {
            setLogs((current) => [payload.new as DataAccessLog, ...current]);
          }
        )
        .subscribe();
    });

    return () => {
      if (channel) {
        import('../lib/supabase').then(({ supabase }) => {
          supabase.removeChannel(channel);
        });
      }
    };
  }, []);

  return { logs, loading, error };
}