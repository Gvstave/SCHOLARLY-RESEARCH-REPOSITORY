import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';
import { AuthContext } from './AuthContext';
import { adaptClerkUser } from './clerkUserAdapter';
import { loadOrCreateProfile, clearActiveProfile } from './profileService';
import { clearUserData } from './accountDeletionService';

export function AuthProvider({ children }) {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const clerk = useClerk();
  const user = useMemo(
    () => adaptClerkUser(isSignedIn ? clerkUser : null),
    [isSignedIn, clerkUser]
  );
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchProfile = useCallback(async (_userId = user?.id, currentUser = user) => {
    if (!currentUser) {
      setProfile(null);
      return null;
    }

    setProfileLoading(true);
    try {
      const nextProfile = loadOrCreateProfile(currentUser, clerkUser);
      setProfile(nextProfile);
      return nextProfile;
    } finally {
      setProfileLoading(false);
    }
  }, [user, clerkUser]);

  useEffect(() => {
    if (!isLoaded) return;
    if (user) fetchProfile(user.id, user);
    else {
      clearActiveProfile();
      setProfile(null);
    }
  }, [isLoaded, user?.id, fetchProfile]);

  const signOut = useCallback(async () => {
    clearActiveProfile();
    await clerk.signOut();
  }, [clerk]);

  const deleteAccount = useCallback(async () => {
    if (!clerkUser) return;
    const userId = clerkUser.id;
    await clerkUser.delete();
    clearUserData(userId);
  }, [clerkUser]);

  const value = {
    session: user ? { user } : null,
    user,
    profile,
    fetchProfile,
    loading: !isLoaded || profileLoading,
    signOut,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
