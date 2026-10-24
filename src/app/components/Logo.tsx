import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-5 h-5', lock: 'w-2 h-2', text: 'text-base' },
    md: { container: 'w-10 h-10', icon: 'w-6 h-6', lock: 'w-2.5 h-2.5', text: 'text-lg' },
    lg: { container: 'w-12 h-12', icon: 'w-7 h-7', lock: 'w-3 h-3', text: 'text-xl' }
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <div className={`${s.container} bg-blue-500/10 rounded-lg flex items-center justify-center border border-blue-500/20`}>
          <Shield className={`${s.icon} text-blue-600`} strokeWidth={1.5} />
        </div>
        <div className={`absolute -top-0.5 -right-0.5 ${s.lock} bg-slate-800 rounded-sm border border-blue-500/30`}></div>
      </div>
      {showText && (
        <span className={`${s.text} text-slate-800 tracking-tight`}>TraceVault</span>
      )}
    </div>
  );
}
