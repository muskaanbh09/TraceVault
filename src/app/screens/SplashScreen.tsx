import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Shield } from 'lucide-react';

export function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="relative mb-8 inline-block">
          {/* Shield background */}
          <div className="w-24 h-24 bg-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
            <Shield className="w-14 h-14 text-blue-400" strokeWidth={1.5} />
          </div>
          {/* Lock indicator */}
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-slate-800 rounded-lg border border-blue-400/50 flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
          </div>
        </div>

        {/* App name */}
        <h1 className="text-3xl text-white mb-3 tracking-tight">TraceVault</h1>
        
        {/* Tagline */}
        <p className="text-blue-300 text-sm tracking-wide">Your Digital Privacy Guardian</p>

        {/* Loading indicator */}
        <div className="mt-12 flex justify-center">
          <div className="w-32 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-400 animate-[loading_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 50%; margin-left: 25%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
