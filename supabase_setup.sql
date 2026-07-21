-- ====================================================================
-- SUPABASE ARCHIVE DATABASE SCHEMA SETUP
-- Run this script in the Supabase SQL Editor to provision the backend
-- ====================================================================

-- 1. PROFILES TABLE (Syncs with Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  institution TEXT NOT NULL,
  specialty TEXT NOT NULL DEFAULT 'Academic Research',
  role TEXT NOT NULL CHECK (role IN ('admin', 'researcher')),
  avatar_url TEXT,
  about_author TEXT,
  metadata TEXT[] DEFAULT '{}'::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Allow public read access to profiles" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Allow service/users to insert or update their own profile" 
ON public.profiles FOR ALL USING (auth.uid() = id);


-- 2. PAPERS MANUSCRIPT TABLE
CREATE TABLE IF NOT EXISTS public.papers (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  abstract TEXT NOT NULL,
  introduction TEXT,
  conclusion TEXT,
  category TEXT NOT NULL CHECK (category IN ('Physics', 'Engineering', 'Medicine', 'Social Sciences', 'Mathematics', 'Humanities', 'Computer Science', 'Biology', 'Chemistry', 'Economics', 'Education')),
  cover_image TEXT,
  file_url TEXT NOT NULL,
  citations INTEGER DEFAULT 0 NOT NULL,
  downloads INTEGER DEFAULT 0 NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  year INTEGER NOT NULL,
  date_posted TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on papers
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;

-- Papers Policies
CREATE POLICY "Allow public read access to papers" 
ON public.papers FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create papers" 
ON public.papers FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Allow authors or admins to update papers" 
ON public.papers FOR UPDATE USING (
  auth.uid() = author_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE public.profiles.id = auth.uid() AND public.profiles.role = 'admin'
  )
);

CREATE POLICY "Allow authors or admins to delete papers" 
ON public.papers FOR DELETE USING (
  auth.uid() = author_id OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE public.profiles.id = auth.uid() AND public.profiles.role = 'admin'
  )
);


-- 3. COLLABORATORS TABLE
CREATE TABLE IF NOT EXISTS public.collaborators (
  id BIGSERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  institution TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on collaborators
ALTER TABLE public.collaborators ENABLE ROW LEVEL SECURITY;

-- Collaborators Policies
CREATE POLICY "Allow public read access to collaborators" 
ON public.collaborators FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert collaborators" 
ON public.collaborators FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- 4. PAPER_COLLABORATORS JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.paper_collaborators (
  paper_id BIGINT REFERENCES public.papers(id) ON DELETE CASCADE,
  collaborator_id BIGINT REFERENCES public.collaborators(id) ON DELETE CASCADE,
  PRIMARY KEY (paper_id, collaborator_id)
);

-- Enable RLS on paper_collaborators
ALTER TABLE public.paper_collaborators ENABLE ROW LEVEL SECURITY;

-- paper_collaborators Policies
CREATE POLICY "Allow open select access" 
ON public.paper_collaborators FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert" 
ON public.paper_collaborators FOR INSERT WITH CHECK (auth.role() = 'authenticated');


-- 5. DOWNLOADS TRACKING TABLE
CREATE TABLE IF NOT EXISTS public.downloads (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  paper_id BIGINT REFERENCES public.papers(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on downloads
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

-- downloads policies
CREATE POLICY "Allow public insert to downloads" 
ON public.downloads FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select access to download logs for owners/admins" 
ON public.downloads FOR SELECT USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE public.profiles.id = auth.uid() AND public.profiles.role = 'admin'
  )
);


-- 6. RPC STORED PROCEDURE FOR INCREMENTING DOWNLOADS safely
CREATE OR REPLACE FUNCTION public.increment_downloads(row_id BIGINT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.papers
  SET downloads = downloads + 1
  WHERE id = row_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- 7. REAL-TIME TRIGGER TO AUTOMATICALLY CREATE A PROFILE ON USER SIGN UP
-- This prevents the potential race conditions between sign-up and client profile creation!
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_role TEXT;
  v_full_name TEXT;
  v_institution TEXT;
BEGIN
  -- Determine role based on specific rules or metadata params
  IF NEW.email = 'ilungagustave73@gmail.com' THEN
    v_role := 'admin';
  ELSE
    v_role := COALESCE(NEW.raw_user_meta_data->>'role', 'researcher');
  END IF;

  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'fullName', 'Scholar ' || NEW.id);
  v_institution := COALESCE(NEW.raw_user_meta_data->>'institution', 'Academic Circle');

  INSERT INTO public.profiles (id, full_name, institution, specialty, role, avatar_url, about_author, metadata)
  VALUES (
    NEW.id,
    v_full_name,
    v_institution,
    'Academic Research',
    v_role,
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    'A scholar registered on The Curated Archive.',
    '{}'::TEXT[]
  ) ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind the sign-up trigger to auth.users table
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ====================================================================
-- 8. STORAGE BUCKET CONFIGURATION INSTRUCTIONS
-- ====================================================================
-- Note: Run the following in Subabase Dashboard under Storage -> New Bucket
-- Ensure the following buckets are created with Public access enabled:
-- 1. research-papers
-- 2. covers
-- 3. avatars
--
-- Alternatively, if your Supabase instance allows direct creation via SQL:
--
-- INSERT INTO storage.buckets (id, name, public) VALUES ('research-papers', 'research-papers', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('covers', 'covers', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true) ON CONFLICT DO NOTHING;
-- ====================================================================
