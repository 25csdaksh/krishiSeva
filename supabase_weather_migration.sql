-- ============================================================
-- KrishiSeva — Weather Intelligence Migration
-- Run this in the Supabase SQL Editor
-- Created: 2026-08-02
-- ============================================================
-- IMPORTANT: farmer_profiles already has latitude/longitude.
-- No new location table is needed. These 2 tables are the
-- only additions required.
-- ============================================================

-- 1. weather_cache
-- Purpose: Cache Open-Meteo API responses to avoid redundant
--          calls. Each row belongs to one farmer.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.weather_cache (
  id              UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id       UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  latitude        DOUBLE PRECISION NOT NULL,
  longitude       DOUBLE PRECISION NOT NULL,
  forecast_date   DATE         NOT NULL DEFAULT CURRENT_DATE,
  cache_type      TEXT         NOT NULL DEFAULT 'current',
  -- Possible values: current | forecast_7 | forecast_10 | forecast_16 |
  --                  historical_1d | historical_7d | historical_15d | historical_30d
  payload         JSONB        NOT NULL,
  expires_at      TIMESTAMPTZ  NOT NULL,
  created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  -- One cache entry per (farmer, type, date)
  CONSTRAINT weather_cache_farmer_type_date_uniq
    UNIQUE (farmer_id, cache_type, forecast_date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_weather_cache_farmer_id
  ON public.weather_cache (farmer_id);

CREATE INDEX IF NOT EXISTS idx_weather_cache_expires
  ON public.weather_cache (expires_at);

CREATE INDEX IF NOT EXISTS idx_weather_cache_lookup
  ON public.weather_cache (farmer_id, cache_type, forecast_date);

-- Row-level security
ALTER TABLE public.weather_cache ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access own weather cache" ON public.weather_cache;
CREATE POLICY "Users can access own weather cache"
  ON public.weather_cache
  FOR ALL
  USING (auth.uid() = farmer_id);

-- Auto-update updated_at on change
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_weather_cache_updated_at ON public.weather_cache;
CREATE TRIGGER trg_weather_cache_updated_at
  BEFORE UPDATE ON public.weather_cache
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- 2. weather_ai_analysis
-- Purpose: Cache Gemini AI farming analyses to avoid repeated
--          expensive AI calls.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.weather_ai_analysis (
  id                UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  farmer_id         UUID         NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  analysis_date     DATE         NOT NULL DEFAULT CURRENT_DATE,
  analysis_type     TEXT         NOT NULL,
  -- Possible values: today | weekly | monthly

  farming_score     INTEGER,     -- 0-100 overall suitability score
  summary           TEXT,        -- human-readable weather summary
  recommendations   JSONB,       -- scoreLabel, today recommendations, activities, advice
  risk_analysis     JSONB,       -- disease/pest/heat/flood/drought/wind risks
  crop_recommendations JSONB,   -- per-crop activity recommendations
  action_plan       JSONB,       -- priority action checklist
  weather_snapshot  JSONB,       -- snapshot of weather data used for analysis

  created_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  -- One analysis per (farmer, type, date)
  CONSTRAINT weather_ai_analysis_farmer_type_date_uniq
    UNIQUE (farmer_id, analysis_type, analysis_date)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_weather_ai_farmer_id
  ON public.weather_ai_analysis (farmer_id);

CREATE INDEX IF NOT EXISTS idx_weather_ai_lookup
  ON public.weather_ai_analysis (farmer_id, analysis_type, analysis_date);

CREATE INDEX IF NOT EXISTS idx_weather_ai_date
  ON public.weather_ai_analysis (analysis_date);

-- Row-level security
ALTER TABLE public.weather_ai_analysis ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can access own weather analyses" ON public.weather_ai_analysis;
CREATE POLICY "Users can access own weather analyses"
  ON public.weather_ai_analysis
  FOR ALL
  USING (auth.uid() = farmer_id);

DROP TRIGGER IF EXISTS trg_weather_ai_updated_at ON public.weather_ai_analysis;
CREATE TRIGGER trg_weather_ai_updated_at
  BEFORE UPDATE ON public.weather_ai_analysis
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- ============================================================
-- Verification queries (uncomment to check after running)
-- ============================================================
-- SELECT table_name, column_name, data_type
-- FROM information_schema.columns
-- WHERE table_name IN ('weather_cache', 'weather_ai_analysis')
-- ORDER BY table_name, ordinal_position;

-- SELECT tablename, policyname FROM pg_policies
-- WHERE tablename IN ('weather_cache', 'weather_ai_analysis');
