
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS full_name text,
  ADD COLUMN IF NOT EXISTS institution text,
  ADD COLUMN IF NOT EXISTS specialty text,
  ADD COLUMN IF NOT EXISTS about_author text,
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '[]'::jsonb;

UPDATE public.profiles SET full_name = COALESCE(full_name, display_name);

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

GRANT SELECT ON public.profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = _user_id AND role = _role);
$$;

CREATE TABLE IF NOT EXISTS public.papers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  abstract text, introduction text, conclusion text,
  category text, cover_image text, file_url text,
  year integer, date_posted text,
  citations integer NOT NULL DEFAULT 0,
  downloads integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  reviewed_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.papers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.papers TO authenticated;
GRANT ALL ON public.papers TO service_role;
ALTER TABLE public.papers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Approved papers viewable" ON public.papers;
CREATE POLICY "Approved papers viewable" ON public.papers FOR SELECT
  USING (status = 'approved' OR auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "Authors submit papers" ON public.papers;
CREATE POLICY "Authors submit papers" ON public.papers FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
DROP POLICY IF EXISTS "Authors admins update papers" ON public.papers;
CREATE POLICY "Authors admins update papers" ON public.papers FOR UPDATE TO authenticated
  USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));
DROP POLICY IF EXISTS "Authors admins delete papers" ON public.papers;
CREATE POLICY "Authors admins delete papers" ON public.papers FOR DELETE TO authenticated
  USING (auth.uid() = author_id OR public.has_role(auth.uid(),'admin'));

DROP TRIGGER IF EXISTS papers_set_updated_at ON public.papers;
CREATE TRIGGER papers_set_updated_at BEFORE UPDATE ON public.papers
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE IF NOT EXISTS public.collaborators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL, institution text, email text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.collaborators TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.collaborators TO authenticated;
GRANT ALL ON public.collaborators TO service_role;
ALTER TABLE public.collaborators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Collaborators viewable" ON public.collaborators;
CREATE POLICY "Collaborators viewable" ON public.collaborators FOR SELECT USING (true);
DROP POLICY IF EXISTS "Signed-in add collaborators" ON public.collaborators;
CREATE POLICY "Signed-in add collaborators" ON public.collaborators FOR INSERT TO authenticated WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.paper_collaborators (
  paper_id uuid REFERENCES public.papers(id) ON DELETE CASCADE,
  collaborator_id uuid REFERENCES public.collaborators(id) ON DELETE CASCADE,
  PRIMARY KEY (paper_id, collaborator_id)
);
GRANT SELECT ON public.paper_collaborators TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.paper_collaborators TO authenticated;
GRANT ALL ON public.paper_collaborators TO service_role;
ALTER TABLE public.paper_collaborators ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Paper collabs viewable" ON public.paper_collaborators;
CREATE POLICY "Paper collabs viewable" ON public.paper_collaborators FOR SELECT USING (true);
DROP POLICY IF EXISTS "Authors manage paper collabs" ON public.paper_collaborators;
CREATE POLICY "Authors manage paper collabs" ON public.paper_collaborators FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.papers p WHERE p.id = paper_id AND (p.author_id = auth.uid() OR public.has_role(auth.uid(),'admin'))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.papers p WHERE p.id = paper_id AND (p.author_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

CREATE TABLE IF NOT EXISTS public.downloads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  paper_id uuid REFERENCES public.papers(id) ON DELETE CASCADE,
  downloaded_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.downloads TO anon;
GRANT SELECT, INSERT ON public.downloads TO authenticated;
GRANT ALL ON public.downloads TO service_role;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone log a download" ON public.downloads;
CREATE POLICY "Anyone log a download" ON public.downloads FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Admins view downloads" ON public.downloads;
CREATE POLICY "Admins view downloads" ON public.downloads FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.increment_downloads(row_id uuid)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.papers SET downloads = downloads + 1 WHERE id = row_id;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE v_full_name text; v_institution text; v_role text;
BEGIN
  v_full_name := COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'fullName', split_part(NEW.email,'@',1));
  v_institution := COALESCE(NEW.raw_user_meta_data->>'institution', 'Academic Circle');
  v_role := CASE WHEN lower(NEW.email) = 'ilungagustave73@gmail.com' THEN 'admin' ELSE 'researcher' END;
  INSERT INTO public.profiles (id, display_name, username, avatar_url, full_name, institution, specialty, about_author, role, metadata)
  VALUES (NEW.id, v_full_name,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email,'@',1) || '_' || substr(NEW.id::text,1,6)),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url','https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'),
    v_full_name, v_institution, 'Academic Research',
    'A scholar registered on The Curated Archive.', v_role, '[]'::jsonb)
  ON CONFLICT (id) DO UPDATE SET
    full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
    institution = COALESCE(public.profiles.institution, EXCLUDED.institution);
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO public.profiles (id, display_name, username, full_name, institution, specialty, about_author, role, metadata, avatar_url)
SELECT u.id,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email,'@',1)),
  COALESCE(u.raw_user_meta_data->>'username', split_part(u.email,'@',1) || '_' || substr(u.id::text,1,6)),
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email,'@',1)),
  COALESCE(u.raw_user_meta_data->>'institution','Academic Circle'),
  'Academic Research',
  'A scholar registered on The Curated Archive.',
  (CASE WHEN lower(u.email) = 'ilungagustave73@gmail.com' THEN 'admin' ELSE 'researcher' END),
  '[]'::jsonb,
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200'
FROM auth.users u
ON CONFLICT (id) DO UPDATE SET
  full_name = COALESCE(public.profiles.full_name, EXCLUDED.full_name),
  institution = COALESCE(public.profiles.institution, EXCLUDED.institution);

DROP POLICY IF EXISTS "Public read archive files" ON storage.objects;
CREATE POLICY "Public read archive files" ON storage.objects FOR SELECT
  USING (bucket_id IN ('research-papers','covers','avatars','article-images'));
DROP POLICY IF EXISTS "Signed-in upload archive files" ON storage.objects;
CREATE POLICY "Signed-in upload archive files" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id IN ('research-papers','covers','avatars','article-images'));
DROP POLICY IF EXISTS "Signed-in update own archive files" ON storage.objects;
CREATE POLICY "Signed-in update own archive files" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id IN ('research-papers','covers','avatars','article-images') AND owner = auth.uid());
