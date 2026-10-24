import { Outlet, useLocation } from 'react-router';
import { BottomNav } from './BottomNav';

export function Layout() {
  const location = useLocation();
  
  // Show bottom nav only on main screens, not on app detail
  const showBottomNav = !location.pathname.startsWith('/app/');

  return (
    <div className="min-h-screen bg-slate-50">
      <Outlet />
      {showBottomNav && <BottomNav />}
    </div>
  );
}