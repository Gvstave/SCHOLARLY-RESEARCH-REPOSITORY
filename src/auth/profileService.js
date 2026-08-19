import { DEFAULT_PROFILES } from '../constants/seedData';
import { resolveRole } from '../constants/constants';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorageHelper';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200';

function createProfile(user, clerkUser, stored) {
  const email = (user.email || '').toLowerCase();
  const metadata = user.user_metadata || {};
  return {
    ...stored,
    id: user.id,
    email,
    full_name: metadata.full_name || email || 'Researcher',
    institution: metadata.institution || 'Independent / Other',
    specialty: 'Academic Research',
    avatar_url: clerkUser?.imageUrl || DEFAULT_AVATAR,
    about_author: 'A researcher on The Curated Archive.',
    metadata: [],
    created_at: clerkUser?.createdAt?.toISOString?.() || new Date().toISOString(),
    role: resolveRole(email, metadata.role),
  };
}

export async function loadOrCreateProfile(user, clerkUser) {
  const profiles = getStorageItem('profiles', DEFAULT_PROFILES);
  const stored = profiles.find((profile) => profile.id === user.id);
  const profile = createProfile(user, clerkUser, stored);

  if (isSupabaseConfigured && supabase) {
    const { data: existing, error: readError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (!readError && existing) {
      const databaseProfile = { ...profile, ...existing };
      setStorageItem('profile', databaseProfile);
      return databaseProfile;
    }

    if (!readError) {
      const { data: created, error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          display_name: profile.full_name,
          username: clerkUser?.username || `researcher_${user.id.slice(-8)}`,
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

      if (!insertError && created) {
        const databaseProfile = { ...profile, ...created };
        setStorageItem('profile', databaseProfile);
        return databaseProfile;
      }
    }
  }

  if (!stored) setStorageItem('profiles', [...profiles, profile]);
  setStorageItem('profile', profile);
  return profile;
}

export function clearActiveProfile() {
  removeStorageItem('profile');
}
