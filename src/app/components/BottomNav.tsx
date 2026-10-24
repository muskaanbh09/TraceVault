import { Home, Database, FileSearch, Bell, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/data-box', icon: Database, label: 'Logs' },
    { path: '/analyzer', icon: FileSearch, label: 'Analyzer' },
    { path: '/alerts', icon: Bell, label: 'Alerts' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 safe-bottom">
      <div className="max-w-md mx-auto px-2 py-1">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-1 py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon className="w-5 h-5" strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}