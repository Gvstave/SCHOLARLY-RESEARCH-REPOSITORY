import { isSupabaseConfigured, supabase } from '../lib/supabase';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200';

function createProfile(user, clerkUser) {
  const email = (user.email || '').toLowerCase();
  const metadata = user.user_metadata || {};
  return {
    id: user.id,
    email,
    full_name: metadata.full_name || email || 'Researcher',
    institution: metadata.institution || 'Independent / Other',
    specialty: 'Academic Research',
    avatar_url: clerkUser?.imageUrl || DEFAULT_AVATAR,
    about_author: 'A researcher on The Curated Archive.',
    metadata: [],
    created_at: clerkUser?.createdAt?.toISOString?.() || new Date().toISOString(),
  };
}

export async function loadOrCreateProfile(user, clerkUser) {
  if (!isSupabaseConfigured || !supabase) throw new Error('Supabase is not configured.');
  const profile = createProfile(user, clerkUser);

  const { data: existing, error: readError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  if (readError) throw readError;
  if (existing) return { ...profile, ...existing };

  const { data: created, error: insertError } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      display_name: profile.full_name,
      username: clerkUser?.username || `researcher_${user.id.slice(-8)}`,
      email: profile.email,
      full_name: profile.full_name,
      institution: profile.institution,
      specialty: profile.specialty,
      avatar_url: profile.avatar_url,
      about_author: profile.about_author,
      metadata: profile.metadata,
      role: 'researcher',
    })
    .select()
    .single();

  if (insertError) throw insertError;
  return { ...profile, ...created };
}
