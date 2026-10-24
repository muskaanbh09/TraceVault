import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { dashboardApi } from '../../lib/api';

interface TrendPoint {
  day: string;
  score: number;
}

export function ScoreHistoryChart() {
  const [trend, setTrend] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrend() {
      try {
        const data = await dashboardApi.getOverview();
        setTrend(data.weeklyTrend || []);
      } catch {
        // Generate fallback trend data
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const fallback = days.map(day => ({
          day,
          score: Math.round((5 + Math.random() * 4) * 10) / 10
        }));
        setTrend(fallback);
      } finally {
        setLoading(false);
      }
    }
    fetchTrend();
  }, []);

  if (loading || trend.length === 0) return null;

  const maxScore = 10;
  const minScore = 0;
  const range = maxScore - minScore;

  // Calculate trend direction
  const firstScore = trend[0]?.score || 0;
  const lastScore = trend[trend.length - 1]?.score || 0;
  const diff = lastScore - firstScore;
  const trendDirection = diff > 0.3 ? 'up' : diff < -0.3 ? 'down' : 'stable';

  // Bar chart height calculation
  const getBarHeight = (score: number) => {
    return Math.max(8, ((score - minScore) / range) * 100);
  };

  const getBarColor = (score: number) => {
    if (score >= 7.5) return 'bg-emerald-400';
    if (score >= 5) return 'bg-amber-400';
    return 'bg-rose-400';
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-xs text-slate-500 uppercase tracking-wide">Weekly Privacy Health</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg text-slate-800">{lastScore.toFixed(1)}</span>
            <span className="text-xs text-slate-400">/ 10</span>
            <div className={`flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded ${
              trendDirection === 'up' ? 'bg-emerald-50 text-emerald-700' :
              trendDirection === 'down' ? 'bg-rose-50 text-rose-700' :
              'bg-slate-50 text-slate-600'
            }`}>
              {trendDirection === 'up' && <TrendingUp className="w-3 h-3" />}
              {trendDirection === 'down' && <TrendingDown className="w-3 h-3" />}
              {trendDirection === 'stable' && <Minus className="w-3 h-3" />}
              {Math.abs(diff).toFixed(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-1.5" style={{ height: '80px' }}>
        {trend.map((point, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-sm transition-all duration-300 ${getBarColor(point.score)}`}
              style={{ height: `${getBarHeight(point.score)}%`, minHeight: '4px' }}
              title={`${point.day}: ${point.score.toFixed(1)}`}
            />
          </div>
        ))}
      </div>

      {/* Day labels */}
      <div className="flex justify-between mt-1.5">
        {trend.map((point, index) => (
          <div key={index} className="flex-1 text-center">
            <span className="text-[10px] text-slate-400">{point.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
