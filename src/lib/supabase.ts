import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create client with placeholder values if not configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

// Database Types
export interface App {
  id: string;
  name: string;
  icon: string;
  trust_score: number;
  risk_level: 'Safe' | 'Caution' | 'Avoid';
  permissions: string[];
  created_at?: string;
  updated_at?: string;
}

export interface DataAccessLog {
  id: string;
  app_id: string;
  app_name: string;
  time: string;
  data_accessed: string[];
  status: 'Allowed' | 'Warning' | 'Blocked';
  created_at?: string;
}

export interface Alert {
  id: string;
  app_id: string;
  app_name: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  time: string;
  created_at?: string;
}

export interface Breach {
  id: string;
  app_id: string;
  date: string;
  description: string;
  created_at?: string;
}

export interface PrivacyInsight {
  id: string;
  app_id: string;
  data_sharing: string;
  third_party: string;
  user_control: string;
  created_at?: string;
}