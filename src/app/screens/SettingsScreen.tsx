import { useState, useEffect } from 'react';
import { Settings, User, Bell, Shield, Clock, Trash2, LogOut, ChevronRight, Loader2, Check } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { settingsApi } from '../../lib/api';
import { useNavigate } from 'react-router';

interface UserSettings {
  notifications_critical: boolean;
  notifications_warning: boolean;
  notifications_info: boolean;
  scan_frequency: string;
  data_retention_days: number;
  auto_block_risky: boolean;
  display_name: string;
  email: string;
}

export function SettingsScreen() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const data = await settingsApi.get();
        setSettings({
          ...data,
          display_name: data.display_name || user?.display_name || 'User',
          email: data.email || user?.email || ''
        });
      } catch {
        // Use defaults
        setSettings({
          notifications_critical: true,
          notifications_warning: true,
          notifications_info: false,
          scan_frequency: 'daily',
          data_retention_days: 30,
          auto_block_risky: false,
          display_name: user?.display_name || 'User',
          email: user?.email || ''
        });
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, [user]);

  const updateSetting = async (key: keyof UserSettings, value: any) => {
    if (!settings) return;
    const updated = { ...settings, [key]: value };
    setSettings(updated);

    setSaving(true);
    try {
      await settingsApi.update(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // revert on error
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <div className="text-sm text-slate-600">Loading settings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="px-5 pt-12 pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl text-slate-800">Settings</h1>
          </div>
          <p className="text-sm text-slate-500">Manage your preferences</p>
        </div>
      </div>

      {/* Save Indicator */}
      {(saving || saved) && (
        <div className={`mx-5 mt-4 px-4 py-2 rounded-lg text-xs flex items-center gap-2 transition-all ${
          saved ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-blue-50 border border-blue-200 text-blue-700'
        }`}>
          {saved ? <Check className="w-3.5 h-3.5" /> : <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {saved ? 'Settings saved' : 'Saving...'}
        </div>
      )}

      {/* Profile Section */}
      <div className="px-5 py-5">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm text-slate-800 uppercase tracking-wide">Profile</h3>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center border-2 border-blue-200">
              <span className="text-xl text-blue-600">
                {(settings?.display_name || 'U')[0].toUpperCase()}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm text-slate-800 mb-0.5">{settings?.display_name || 'User'}</div>
              <div className="text-xs text-slate-500">{settings?.email || 'Not set'}</div>
              <div className="text-xs text-blue-600 mt-1">
                {user?.role === 'demo' ? '🟡 Demo Mode' : '🟢 Authenticated'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="px-5 pb-3">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm text-slate-800 uppercase tracking-wide">Notifications</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="text-sm text-slate-800 mb-0.5">Critical alerts</div>
                <div className="text-xs text-slate-500">Immediate security threats</div>
              </div>
              <button
                onClick={() => updateSetting('notifications_critical', !settings?.notifications_critical)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  settings?.notifications_critical ? 'bg-rose-500' : 'bg-slate-300'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  settings?.notifications_critical ? 'right-0.5' : 'left-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="text-sm text-slate-800 mb-0.5">Warning alerts</div>
                <div className="text-xs text-slate-500">Suspicious activity detected</div>
              </div>
              <button
                onClick={() => updateSetting('notifications_warning', !settings?.notifications_warning)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  settings?.notifications_warning ? 'bg-amber-500' : 'bg-slate-300'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  settings?.notifications_warning ? 'right-0.5' : 'left-0.5'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-800 mb-0.5">Info alerts</div>
                <div className="text-xs text-slate-500">General notifications</div>
              </div>
              <button
                onClick={() => updateSetting('notifications_info', !settings?.notifications_info)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  settings?.notifications_info ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  settings?.notifications_info ? 'right-0.5' : 'left-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="px-5 pb-3">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm text-slate-800 uppercase tracking-wide">Privacy</h3>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="text-sm text-slate-800">Scan Frequency</div>
                  <div className="text-xs text-slate-500">How often to check apps</div>
                </div>
              </div>
              <select
                value={settings?.scan_frequency || 'daily'}
                onChange={(e) => updateSetting('scan_frequency', e.target.value)}
                className="text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Trash2 className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="text-sm text-slate-800">Data Retention</div>
                  <div className="text-xs text-slate-500">Keep logs for</div>
                </div>
              </div>
              <select
                value={settings?.data_retention_days || 30}
                onChange={(e) => updateSetting('data_retention_days', parseInt(e.target.value))}
                className="text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={7}>7 days</option>
                <option value={30}>30 days</option>
                <option value={90}>90 days</option>
                <option value={365}>1 year</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Shield className="w-4 h-4 text-slate-500" />
                <div>
                  <div className="text-sm text-slate-800">Auto-block Risky Apps</div>
                  <div className="text-xs text-slate-500">Block flagged access automatically</div>
                </div>
              </div>
              <button
                onClick={() => updateSetting('auto_block_risky', !settings?.auto_block_risky)}
                className={`w-11 h-6 rounded-full relative transition-colors ${
                  settings?.auto_block_risky ? 'bg-blue-500' : 'bg-slate-300'
                }`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${
                  settings?.auto_block_risky ? 'right-0.5' : 'left-0.5'
                }`}></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About & Logout */}
      <div className="px-5 pb-5">
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="text-sm text-slate-800">About TraceVault</div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">v1.0.0</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full p-4 flex items-center gap-3 text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
