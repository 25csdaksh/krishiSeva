-- =========================
-- ENUMS
-- =========================
CREATE TYPE public.listing_status AS ENUM ('active', 'sold', 'expired');
CREATE TYPE public.season_type AS ENUM ('kharif', 'rabi', 'zaid', 'summer', 'winter');
CREATE TYPE public.soil_type AS ENUM ('alluvial', 'black', 'red', 'laterite', 'desert', 'mountain', 'peaty', 'saline', 'unknown');

-- =========================
-- UPDATED_AT TRIGGER FN
-- =========================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =========================
-- FARMER PROFILES
-- =========================
CREATE TABLE public.farmer_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  district TEXT,
  state TEXT,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  land_size_hectares NUMERIC(10,4),
  current_season public.season_type,
  soil_type public.soil_type DEFAULT 'unknown',
  primary_crops TEXT[] DEFAULT '{}',
  preferred_language TEXT DEFAULT 'en',
  onboarding_completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.farmer_profiles TO authenticated;
GRANT ALL ON public.farmer_profiles TO service_role;
ALTER TABLE public.farmer_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "farmers read own profile" ON public.farmer_profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "farmers insert own profile" ON public.farmer_profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "farmers update own profile" ON public.farmer_profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "farmers delete own profile" ON public.farmer_profiles
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER trg_farmer_profiles_updated_at
  BEFORE UPDATE ON public.farmer_profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile on new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.farmer_profiles (user_id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.phone
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================
-- MARKET LISTINGS
-- =========================
CREATE TABLE public.market_listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop_name TEXT NOT NULL,
  variety TEXT,
  quantity NUMERIC(12,3) NOT NULL CHECK (quantity > 0),
  unit TEXT NOT NULL DEFAULT 'kg',
  price_per_unit NUMERIC(12,2) NOT NULL CHECK (price_per_unit >= 0),
  description TEXT,
  image_url TEXT,
  district TEXT,
  state TEXT,
  status public.listing_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_market_listings_status ON public.market_listings(status);
CREATE INDEX idx_market_listings_user ON public.market_listings(user_id);
CREATE INDEX idx_market_listings_crop ON public.market_listings(crop_name);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.market_listings TO authenticated;
GRANT ALL ON public.market_listings TO service_role;
ALTER TABLE public.market_listings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "authenticated read active listings" ON public.market_listings
  FOR SELECT TO authenticated USING (status = 'active' OR user_id = auth.uid());
CREATE POLICY "farmers insert own listings" ON public.market_listings
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "farmers update own listings" ON public.market_listings
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "farmers delete own listings" ON public.market_listings
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER trg_market_listings_updated_at
  BEFORE UPDATE ON public.market_listings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =========================
-- SCHEMES
-- =========================
CREATE TABLE public.schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT,
  eligibility TEXT,
  benefits TEXT,
  application_link TEXT,
  ministry TEXT,
  state TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_schemes_state ON public.schemes(state);
CREATE INDEX idx_schemes_active ON public.schemes(is_active);

GRANT SELECT ON public.schemes TO authenticated, anon;
GRANT ALL ON public.schemes TO service_role;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone reads active schemes" ON public.schemes
  FOR SELECT USING (is_active = TRUE);

CREATE TRIGGER trg_schemes_updated_at
  BEFORE UPDATE ON public.schemes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Seed central government schemes
INSERT INTO public.schemes (title, slug, description, category, eligibility, benefits, application_link, ministry, state) VALUES
('PM-KISAN Samman Nidhi', 'pm-kisan', 'Income support of ₹6000 per year to all landholding farmer families in three equal installments.', 'Income Support', 'All landholding farmer families with cultivable land, subject to exclusion criteria.', '₹6,000 per year in 3 equal installments of ₹2,000 credited directly to bank account.', 'https://pmkisan.gov.in/', 'Ministry of Agriculture & Farmers Welfare', NULL),
('Pradhan Mantri Fasal Bima Yojana', 'pmfby', 'Crop insurance scheme providing financial support to farmers suffering crop loss due to unforeseen events.', 'Insurance', 'All farmers including sharecroppers and tenant farmers growing notified crops in notified areas.', 'Comprehensive risk cover from pre-sowing to post-harvest at low premium (2% Kharif, 1.5% Rabi, 5% commercial crops).', 'https://pmfby.gov.in/', 'Ministry of Agriculture & Farmers Welfare', NULL),
('Kisan Credit Card', 'kcc', 'Provides adequate and timely credit support to farmers for their cultivation and other needs.', 'Credit', 'All farmers - individual/joint borrowers who are owner cultivators, tenant farmers, oral lessees & sharecroppers.', 'Short-term crop loans up to ₹3 lakh at 7% interest with 3% prompt repayment incentive (effective 4%).', 'https://www.pmkisan.gov.in/Documents/Kcc.pdf', 'Ministry of Agriculture & Farmers Welfare', NULL),
('Soil Health Card Scheme', 'soil-health-card', 'Provides soil health cards to farmers with crop-wise recommendations of nutrients and fertilisers.', 'Advisory', 'All farmers across India.', 'Free soil testing and personalized recommendations for nutrients and fertilizers every 3 years.', 'https://soilhealth.dac.gov.in/', 'Ministry of Agriculture & Farmers Welfare', NULL),
('PM Krishi Sinchayee Yojana', 'pmksy', 'Aims to expand cultivated area with assured irrigation and improve water use efficiency.', 'Irrigation', 'All farmers, with priority to small and marginal farmers.', 'Subsidy on micro-irrigation (drip/sprinkler): 55% for small/marginal farmers, 45% for others.', 'https://pmksy.gov.in/', 'Ministry of Jal Shakti', NULL),
('Paramparagat Krishi Vikas Yojana', 'pkvy', 'Promotes organic farming through adoption of organic villages by cluster approach and PGS certification.', 'Organic Farming', 'Farmers forming clusters of 50 acres for organic farming.', '₹50,000 per hectare over 3 years including ₹31,000 for inputs and ₹8,800 for value addition and marketing.', 'https://pgsindia-ncof.gov.in/pkvy/index.aspx', 'Ministry of Agriculture & Farmers Welfare', NULL),
('National Mission on Sustainable Agriculture', 'nmsa', 'Enhances agricultural productivity in rainfed areas focusing on integrated farming and soil health.', 'Sustainability', 'Farmers in rainfed and dryland areas.', 'Support for water use efficiency, soil health management, and rainfed area development.', 'https://nmsa.dac.gov.in/', 'Ministry of Agriculture & Farmers Welfare', NULL),
('Agriculture Infrastructure Fund', 'aif', 'Medium-long term debt financing facility for investment in post-harvest infrastructure and community farming assets.', 'Infrastructure', 'Farmers, FPOs, PACS, agri-entrepreneurs, startups, and marketing cooperative societies.', 'Loans up to ₹2 crore with 3% interest subvention for 7 years and credit guarantee coverage.', 'https://agriinfra.dac.gov.in/', 'Ministry of Agriculture & Farmers Welfare', NULL);

-- =========================
-- LEAF DISEASE SCANS
-- =========================
CREATE TABLE public.leaf_disease_scans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  crop_name TEXT,
  detected_disease TEXT,
  confidence NUMERIC(5,4),
  remedy TEXT,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_leaf_scans_user ON public.leaf_disease_scans(user_id, created_at DESC);

GRANT SELECT, INSERT, DELETE ON public.leaf_disease_scans TO authenticated;
GRANT ALL ON public.leaf_disease_scans TO service_role;
ALTER TABLE public.leaf_disease_scans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "farmers read own scans" ON public.leaf_disease_scans
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "farmers insert own scans" ON public.leaf_disease_scans
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "farmers delete own scans" ON public.leaf_disease_scans
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- =========================
-- CROP RECOMMENDATIONS
-- =========================
CREATE TABLE public.crop_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  input_snapshot JSONB NOT NULL,
  recommended_crops JSONB NOT NULL,
  raw_response JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_crop_recs_user ON public.crop_recommendations(user_id, created_at DESC);

GRANT SELECT, INSERT, DELETE ON public.crop_recommendations TO authenticated;
GRANT ALL ON public.crop_recommendations TO service_role;
ALTER TABLE public.crop_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "farmers read own recs" ON public.crop_recommendations
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "farmers insert own recs" ON public.crop_recommendations
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "farmers delete own recs" ON public.crop_recommendations
  FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- =========================
-- STORAGE OBJECT POLICIES (bucket created via storage tool)
-- =========================
CREATE POLICY "users read own uploads" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'krishi-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "users upload to own folder" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'krishi-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "users update own uploads" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'krishi-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "users delete own uploads" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'krishi-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);