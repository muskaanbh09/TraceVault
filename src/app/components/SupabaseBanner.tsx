import { Database, X } from 'lucide-react';
import { useState } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';

export function SupabaseBanner() {
  const [dismissed, setDismissed] = useState(false);

  // Don't show if Supabase is configured or if dismissed
  if (isSupabaseConfigured || dismissed) return null;

  return (
    <div className="bg-blue-600 text-white">
      <div className="px-5 py-3 flex items-start gap-3">
        <Database className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="text-sm mb-1">Using Demo Data</div>
          <div className="text-xs opacity-90">
            Connect Supabase to enable real database storage and live updates
          </div>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
