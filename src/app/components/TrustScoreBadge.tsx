interface TrustScoreBadgeProps {
  score: number;
  size?: 'sm' | 'lg';
}

export function TrustScoreBadge({ score, size = 'sm' }: TrustScoreBadgeProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    if (score >= 5) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
  };

  const colors = getScoreColor(score);
  const isLarge = size === 'lg';

  return (
    <div
      className={`${colors.bg} ${colors.text} ${colors.border} border rounded-lg flex items-center justify-center ${
        isLarge ? 'w-20 h-20' : 'w-14 h-14'
      }`}
    >
      <div className="text-center">
        <div className={isLarge ? 'text-2xl' : 'text-base'}>{score.toFixed(1)}</div>
        {isLarge && <div className="text-xs opacity-60">/ 10</div>}
      </div>
    </div>
  );
}