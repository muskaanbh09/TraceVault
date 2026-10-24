import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Shield, Mail, Lock, User, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export function LoginScreen() {
  const navigate = useNavigate();
  const { login, signup, error, clearError } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();

    try {
      if (isSignup) {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/home');
    } catch {
      // error is set in auth context
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await login('demo@tracevault.app', 'demo-password');
      navigate('/home');
    } catch {
      // Still navigate in demo mode
      navigate('/home');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex items-center justify-center px-5 pt-16 pb-8">
        <div className="text-center">
          <div className="relative mb-6 inline-block">
            <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-blue-400/30">
              <Shield className="w-12 h-12 text-blue-400" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-slate-800 rounded-lg border border-blue-400/50 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-blue-400 rounded-sm"></div>
            </div>
          </div>
          <h1 className="text-2xl text-white mb-2 tracking-tight">TraceVault</h1>
          <p className="text-blue-300 text-sm">Your Digital Privacy Guardian</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-t-3xl px-6 pt-8 pb-10">
        <h2 className="text-xl text-slate-800 mb-1">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          {isSignup ? 'Start protecting your privacy' : 'Sign in to your dashboard'}
        </p>

        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 mb-4">
            <div className="text-sm text-rose-700">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full pl-10 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {isSignup ? 'Creating Account...' : 'Signing In...'}
              </>
            ) : (
              <>
                {isSignup ? 'Create Account' : 'Sign In'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-slate-200"></div>
          <span className="text-xs text-slate-400">or</span>
          <div className="flex-1 h-px bg-slate-200"></div>
        </div>

        {/* Demo Login */}
        <button
          onClick={handleDemoLogin}
          disabled={isLoading}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl text-sm flex items-center justify-center gap-2 transition-colors border border-slate-200"
        >
          <Shield className="w-4 h-4 text-blue-600" />
          Continue with Demo Mode
        </button>

        {/* Toggle */}
        <div className="text-center mt-5">
          <button
            onClick={() => { setIsSignup(!isSignup); clearError(); }}
            className="text-sm text-blue-600 hover:text-blue-700"
          >
            {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
}
