-- TraceVault Database Schema (Full-Stack Version)
-- Run this in your Supabase SQL Editor

-- ============================================
-- CORE TABLES
-- ============================================

-- Apps table
CREATE TABLE IF NOT EXISTS apps (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  trust_score DECIMAL(3,1) NOT NULL CHECK (trust_score >= 0 AND trust_score <= 10),
  risk_level TEXT NOT NULL CHECK (risk_level IN ('Safe', 'Caution', 'Avoid')),
  permissions TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Privacy insights table
CREATE TABLE IF NOT EXISTS privacy_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  data_sharing TEXT NOT NULL,
  third_party TEXT NOT NULL,
  user_control TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Breaches table
CREATE TABLE IF NOT EXISTS breaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Data access logs table
CREATE TABLE IF NOT EXISTS data_access_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  time TEXT NOT NULL,
  data_accessed TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('Allowed', 'Warning', 'Blocked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Alerts table (updated with is_read column)
CREATE TABLE IF NOT EXISTS alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  app_name TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high')),
  time TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- NEW FEATURE TABLES
-- ============================================

-- Score history table (Privacy Score Trends Feature)
CREATE TABLE IF NOT EXISTS score_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  app_id TEXT NOT NULL REFERENCES apps(id) ON DELETE CASCADE,
  score DECIMAL(3,1) NOT NULL CHECK (score >= 0 AND score <= 10),
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User settings table (User Settings & Profile Feature)
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  notifications_critical BOOLEAN DEFAULT TRUE,
  notifications_warning BOOLEAN DEFAULT TRUE,
  notifications_info BOOLEAN DEFAULT FALSE,
  scan_frequency TEXT DEFAULT 'daily' CHECK (scan_frequency IN ('hourly', 'daily', 'weekly')),
  data_retention_days INTEGER DEFAULT 30,
  auto_block_risky BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE privacy_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE breaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_access_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE score_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Public read policies for app data
CREATE POLICY "Allow public read access" ON apps FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON privacy_insights FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON breaches FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON data_access_logs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON alerts FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON score_history FOR SELECT USING (true);

-- User settings: users can only access their own settings
CREATE POLICY "Users can read own settings" ON user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own settings" ON user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON user_settings FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_privacy_insights_app_id ON privacy_insights(app_id);
CREATE INDEX IF NOT EXISTS idx_breaches_app_id ON breaches(app_id);
CREATE INDEX IF NOT EXISTS idx_data_access_logs_app_id ON data_access_logs(app_id);
CREATE INDEX IF NOT EXISTS idx_data_access_logs_created_at ON data_access_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_app_id ON alerts(app_id);
CREATE INDEX IF NOT EXISTS idx_alerts_severity ON alerts(severity);
CREATE INDEX IF NOT EXISTS idx_alerts_created_at ON alerts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_score_history_app_id ON score_history(app_id);
CREATE INDEX IF NOT EXISTS idx_score_history_recorded_at ON score_history(recorded_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);

-- ============================================
-- SAMPLE DATA
-- ============================================

INSERT INTO apps (id, name, icon, trust_score, risk_level, permissions) VALUES
  ('1', 'Instagram', '📷', 4.5, 'Caution', ARRAY['Camera', 'Microphone', 'Location', 'Contacts', 'Storage', 'Photos']),
  ('2', 'WhatsApp', '💬', 7.2, 'Safe', ARRAY['Contacts', 'Camera', 'Microphone', 'Storage']),
  ('3', 'TikTok', '🎵', 3.1, 'Avoid', ARRAY['Camera', 'Microphone', 'Location', 'Contacts', 'Storage', 'Phone', 'Calendar']),
  ('4', 'Signal', '🔒', 9.5, 'Safe', ARRAY['Contacts', 'Camera', 'Microphone']),
  ('5', 'Facebook', '👥', 3.8, 'Avoid', ARRAY['Camera', 'Microphone', 'Location', 'Contacts', 'Storage', 'Calendar', 'Phone']),
  ('6', 'Uber', '🚗', 6.2, 'Caution', ARRAY['Location', 'Phone', 'Camera', 'Contacts']),
  ('7', 'Spotify', '🎧', 7.8, 'Safe', ARRAY['Storage', 'Microphone', 'Location']),
  ('8', 'Gmail', '📧', 6.8, 'Caution', ARRAY['Contacts', 'Storage', 'Camera'])
ON CONFLICT (id) DO NOTHING;

-- Privacy insights
INSERT INTO privacy_insights (app_id, data_sharing, third_party, user_control) VALUES
  ('1', 'Shares data with 127 third-party advertisers', 'Meta family of apps, advertising networks, analytics providers', 'Limited control over data deletion. Can download data archive.'),
  ('2', 'End-to-end encrypted. Shares metadata with Meta', 'Meta Platforms Inc. for infrastructure and analytics', 'Can delete account and request data deletion'),
  ('3', 'Extensive data collection and sharing with parent company', 'ByteDance, multiple advertising partners, unknown third parties', 'Minimal control. Data retention unclear.'),
  ('4', 'No data sharing. Open source and independently audited', 'None. Minimal metadata collection', 'Full control. Can delete account anytime. No data retention.'),
  ('5', 'Extensive tracking across web and apps. Shares with 200+ partners', 'Meta platforms, advertisers, data brokers, political entities', 'Complex privacy settings. Limited real control.'),
  ('6', 'Location tracking even when not in use. Shares with partners', 'Payment processors, mapping services, marketing partners', 'Can request data deletion within 30 days'),
  ('7', 'Collects listening data for recommendations. Limited third-party sharing', 'Analytics providers, advertising partners (with consent)', 'Can download all data. Clear privacy controls.'),
  ('8', 'Scans emails for ad targeting. Integrates with Google services', 'Google ecosystem, third-party apps with account access', 'Can export data. Integrated with Google Account controls.')
ON CONFLICT DO NOTHING;

-- Breaches
INSERT INTO breaches (app_id, date, description) VALUES
  ('1', 'March 2024', 'Data leak affecting 5M users'),
  ('1', 'June 2023', 'Unauthorized API access'),
  ('3', 'January 2024', 'Clipboard data collection without consent'),
  ('5', 'September 2023', 'Cambridge Analytica-style data misuse'),
  ('5', 'April 2023', '533M user records leaked'),
  ('6', 'November 2023', 'Driver and rider data exposed')
ON CONFLICT DO NOTHING;

-- Data access logs
INSERT INTO data_access_logs (app_id, app_name, time, data_accessed, status) VALUES
  ('1', 'Instagram', '2:34 PM', ARRAY['Camera', 'Location'], 'Allowed'),
  ('3', 'TikTok', '2:15 PM', ARRAY['Microphone', 'Location', 'Contacts'], 'Warning'),
  ('2', 'WhatsApp', '1:52 PM', ARRAY['Camera'], 'Allowed'),
  ('5', 'Facebook', '1:20 PM', ARRAY['Location', 'Camera', 'Microphone'], 'Warning'),
  ('6', 'Uber', '12:45 PM', ARRAY['Location'], 'Allowed'),
  ('1', 'Instagram', '11:30 AM', ARRAY['Contacts', 'Storage'], 'Blocked'),
  ('7', 'Spotify', '10:15 AM', ARRAY['Storage'], 'Allowed'),
  ('8', 'Gmail', '9:05 AM', ARRAY['Contacts'], 'Allowed'),
  ('3', 'TikTok', '8:42 AM', ARRAY['Camera', 'Microphone'], 'Warning')
ON CONFLICT DO NOTHING;

-- Alerts
INSERT INTO alerts (app_id, app_name, title, description, severity, time) VALUES
  ('1', 'Instagram', 'Camera accessed in background', 'Instagram accessed your camera while app was in background', 'high', '15 min ago'),
  ('3', 'TikTok', 'High-risk permission detected', 'TikTok requested access to your clipboard data', 'high', '1 hour ago'),
  ('5', 'Facebook', 'Unusual location tracking', 'Facebook accessed location 47 times in the last hour', 'medium', '2 hours ago'),
  ('1', 'Instagram', 'Third-party data sharing detected', 'Instagram shared data with 12 advertising partners', 'medium', '3 hours ago'),
  ('3', 'TikTok', 'Microphone accessed unexpectedly', 'TikTok accessed microphone without user interaction', 'high', '5 hours ago'),
  ('6', 'Uber', 'Contact list accessed', 'Uber scanned your entire contact list', 'low', '6 hours ago'),
  ('2', 'WhatsApp', 'Privacy policy updated', 'WhatsApp updated its privacy policy. Review recommended.', 'low', '1 day ago')
ON CONFLICT DO NOTHING;

-- Score history sample data (last 30 days for each app)
DO $$
DECLARE
  app RECORD;
  i INTEGER;
  base_score DECIMAL;
  variance DECIMAL;
  calc_score DECIMAL;
BEGIN
  FOR app IN SELECT id, trust_score FROM apps LOOP
    base_score := app.trust_score;
    FOR i IN 0..29 LOOP
      variance := (random() - 0.5) * 1.5;
      calc_score := GREATEST(1, LEAST(10, base_score + variance));
      INSERT INTO score_history (app_id, score, recorded_at)
      VALUES (app.id, ROUND(calc_score::NUMERIC, 1), NOW() - (i || ' days')::INTERVAL);
    END LOOP;
  END LOOP;
END $$;
