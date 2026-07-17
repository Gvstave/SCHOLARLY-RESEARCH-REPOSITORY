
ALTER TABLE public.profiles ALTER COLUMN role DROP DEFAULT;
ALTER TABLE public.profiles ALTER COLUMN role TYPE text USING role::text;
ALTER TABLE public.profiles ALTER COLUMN role SET DEFAULT 'researcher';
UPDATE public.profiles SET role = 'researcher' WHERE role NOT IN ('admin','researcher') OR role IS NULL;
UPDATE public.profiles SET role = 'admin'
  WHERE id IN (SELECT id FROM auth.users WHERE lower(email) = 'ilungagustave73@gmail.com');
