import { DEFAULT_PROFILES } from '../constants/seedData';
import { resolveRole } from '../constants/constants';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorageHelper';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200';

export function loadOrCreateProfile(user, clerkUser) {
  const profiles = getStorageItem('profiles', DEFAULT_PROFILES);
  const stored = profiles.find((profile) => profile.id === user.id);
  const email = (user.email || '').toLowerCase();
  const metadata = user.user_metadata || {};
  const profile = {
    ...stored,
    id: user.id,
    full_name: metadata.full_name || email || 'Researcher',
    institution: metadata.institution || 'Independent / Other',
    specialty: 'Academic Research',
    avatar_url: clerkUser?.imageUrl || DEFAULT_AVATAR,
    about_author: 'A researcher on The Curated Archive.',
    metadata: [],
    created_at: clerkUser?.createdAt?.toISOString?.() || new Date().toISOString(),
    // Never trust locally editable storage for authorization decisions.
    role: resolveRole(email, metadata.role),
  };

  if (!stored) setStorageItem('profiles', [...profiles, profile]);
  setStorageItem('profile', profile);
  return profile;
}

export function clearActiveProfile() {
  removeStorageItem('profile');
}
