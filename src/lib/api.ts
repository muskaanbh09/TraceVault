/**
 * API Client — centralized HTTP client for the TraceVault backend.
 * Replaces direct Supabase calls with backend API calls.
 */

const API_BASE = 'http://localhost:3001/api';

function getAuthHeaders(): Record<string, string> {
  const token = localStorage.getItem('tracevault_token');
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

// ─── Apps ────────────────────────────────────────────
export const appsApi = {
  getAll: () => request<any[]>('/apps'),
  getById: (id: string) => request<any>(`/apps/${id}`),
  getScoreHistory: (id: string) => request<any[]>(`/apps/${id}/score-history`),
};

// ─── Alerts ──────────────────────────────────────────
export const alertsApi = {
  getAll: () => request<any[]>('/alerts'),
  markAsRead: (id: string) => request<any>(`/alerts/${id}/read`, { method: 'POST' }),
  markAllAsRead: () => request<any>('/alerts/read-all', { method: 'POST' }),
};

// ─── Data Access Logs ────────────────────────────────
export const logsApi = {
  getAll: () => request<any[]>('/logs'),
  getStats: () => request<any>('/logs/stats'),
};

// ─── Auth ────────────────────────────────────────────
export const authApi = {
  login: (email: string, password: string) =>
    request<any>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  signup: (email: string, password: string, name?: string) =>
    request<any>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),
  logout: () => request<any>('/auth/logout', { method: 'POST' }),
  getMe: () => request<any>('/auth/me'),
};

// ─── Settings ────────────────────────────────────────
export const settingsApi = {
  get: () => request<any>('/settings'),
  update: (settings: any) =>
    request<any>('/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    }),
};

// ─── Dashboard ───────────────────────────────────────
export const dashboardApi = {
  getOverview: () => request<any>('/dashboard/overview'),
};

// ─── Health ──────────────────────────────────────────
export const healthApi = {
  check: () => request<any>('/health'),
};

// ─── AI Policy Analyzer ──────────────────────────────
export const aiApi = {
  analyzePolicy: (text: string) => 
    request<any>('/ai/analyze-policy', {
      method: 'POST',
      body: JSON.stringify({ text }),
    }),
};
