import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useClerk, useSession, useUser } from '@clerk/clerk-react';
import { AuthContext } from './AuthContext';
import { adaptClerkUser } from './clerkUserAdapter';
import { loadOrCreateProfile } from './profileService';
import { setSupabaseAccessTokenProvider } from '../lib/supabase';

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { isLoaded: isSessionLoaded, session } = useSession();
  const clerk = useClerk();
  const user = useMemo(
    () => adaptClerkUser(isSignedIn ? clerkUser : null),
    [isSignedIn, clerkUser]
  );
  const [profile, setProfile] = useState(null);
  const [resolvedProfileUserId, setResolvedProfileUserId] = useState(null);

  useEffect(() => {
    setSupabaseAccessTokenProvider(() => session?.getToken() ?? null);
    return () => setSupabaseAccessTokenProvider(null);
  }, [session]);

  const fetchProfile = useCallback(async (_userId = user?.id, currentUser = user) => {
    if (!currentUser) {
      setProfile(null);
      return null;
    }

    setProfile((currentProfile) => (
      currentProfile?.id === currentUser.id ? currentProfile : null
    ));
    try {
      const nextProfile = await loadOrCreateProfile(currentUser, clerkUser);
      setProfile(nextProfile);
      return nextProfile;
    } finally {
      setResolvedProfileUserId(currentUser.id);
    }
  }, [user, clerkUser]);

  useEffect(() => {
    if (!isLoaded || !isSessionLoaded) return;
    if (user && session) fetchProfile(user.id, user);
    else {
      setProfile(null);
      setResolvedProfileUserId(null);
    }
  }, [isLoaded, isSessionLoaded, session?.id, user?.id, fetchProfile]);

  const signOut = useCallback(async () => {
    await clerk.signOut();
    setProfile(null);
    setResolvedProfileUserId(null);
  }, [clerk]);

  const deleteAccount = useCallback(async () => {
    if (!clerkUser) return;
    await clerkUser.delete();
    setProfile(null);
    setResolvedProfileUserId(null);
  }, [clerkUser]);

  const value = {
    session: user ? { user } : null,
    user,
    profile,
    fetchProfile,
    loading: !isLoaded
      || !isSessionLoaded
      || Boolean(user && resolvedProfileUserId !== user.id),
    signOut,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
