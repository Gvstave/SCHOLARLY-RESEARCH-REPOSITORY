import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured, disableSupabase } from '../lib/supabase';
import { getProfile, DEFAULT_PROFILES } from '../services/api';
import { resolveRole } from '../constants/constants';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorageHelper';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => getStorageItem('session'));
  const [user, setUser] = useState(() => getStorageItem('session')?.user);
  const [profile, setProfile] = useState(() => getStorageItem('profile'));
  const [loading, setLoading] = useState(() => !getStorageItem('session'));

  const fetchProfile = async (userId, currentUser) => {
    try {
      const activeUser = currentUser || user;
      const email = (activeUser?.email || '').toLowerCase();

      const data = await getProfile(userId);

      const dbRole = data?.role;
      const metaRole = activeUser?.user_metadata?.role;
      const resolvedRole = resolveRole(email, dbRole || metaRole);

      if (data) {
        const updatedProfile = { ...data, role: resolvedRole };
        setProfile(updatedProfile);
        setStorageItem('profile', updatedProfile);
      } else {
        // Create a fallback profile if one is missing.
        const meta = activeUser?.user_metadata || {};
        const fallbackName = meta.full_name || meta.fullName || activeUser?.email || 'New Researcher';
        const fallbackInst = meta.institution || 'Independent / Other';

        const fallbackProfile = {
          id: userId,
          full_name: fallbackName,
          institution: fallbackInst,
          specialty: 'Academic Research',
          role: resolvedRole,
          avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
          about_author: 'A researcher on The Curated Archive.',
          metadata: [],
          created_at: new Date().toISOString(),
        };

        if (isSupabaseConfigured && supabase) {
          try {
            const { data: inserted, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: userId,
                full_name: fallbackName,
                institution: fallbackInst,
                specialty: 'Academic Research',
                role: resolvedRole,
                avatar_url: fallbackProfile.avatar_url,
                about_author: fallbackProfile.about_author,
                metadata: fallbackProfile.metadata,
                created_at: fallbackProfile.created_at,
              })
              .select()
              .single();
            if (!insertError && inserted) {
              const p = { ...inserted, role: resolvedRole };
              setProfile(p);
              setStorageItem('profile', p);
              return;
            }
          } catch (e) {
            console.error('Failed to create missing profile:', e);
          }
        } else {
          const localProfiles = getStorageItem('profiles', DEFAULT_PROFILES);
          if (!localProfiles.some((p) => p.id === userId)) {
            localProfiles.push(fallbackProfile);
            setStorageItem('profiles', localProfiles);
          }
        }
        setProfile(fallbackProfile);
        setStorageItem('profile', fallbackProfile);
      }
    } catch (err) {
      console.error('Error fetching profile:', err.message);
      const activeUser = currentUser || user;
      const email = (activeUser?.email || '').toLowerCase();
      const meta = activeUser?.user_metadata || {};
      const resolvedRole = resolveRole(email, meta.role);

      const fallbackProf = {
        id: userId,
        full_name: meta.full_name || meta.fullName || 'New Researcher',
        institution: meta.institution || 'Independent / Other',
        specialty: 'Academic Research',
        role: resolvedRole,
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        about_author: 'A researcher on The Curated Archive.',
        metadata: [],
        created_at: new Date().toISOString(),
      };
      setProfile(fallbackProf);
      setStorageItem('profile', fallbackProf);
    }
  };

  useEffect(() => {
    let active = true;
    let subscription = null;

    const initializeAuth = async () => {
      let useSupabase = isSupabaseConfigured && supabase;

      if (useSupabase) {
        try {
          const controller = new AbortController();
          const id = setTimeout(() => controller.abort(), 1200);
          await fetch(import.meta.env.VITE_SUPABASE_URL, {
            method: 'GET',
            mode: 'no-cors',
            signal: controller.signal
          });
          clearTimeout(id);
        } catch (err) {
          console.warn('Supabase service is unreachable, disabling and using local storage mode.', err);
          disableSupabase();
          useSupabase = false;
        }
      }

      if (!active) return;

      if (useSupabase) {
        try {
          const { data: { session: initialSession }, error } = await supabase.auth.getSession();
          if (error) throw error;

          if (!active) return;

          if (initialSession) {
            setStorageItem('session', initialSession);
            setSession(initialSession);
            setUser(initialSession.user);
            fetchProfile(initialSession.user.id, initialSession.user).finally(() => {
              if (active) setLoading(false);
            });
          } else {
            const savedSession = getStorageItem('session');
            if (savedSession) {
              setSession(savedSession);
              setUser(savedSession.user);
              fetchProfile(savedSession.user.id, savedSession.user).finally(() => {
                if (active) setLoading(false);
              });
              return;
            }
            setSession(null);
            setUser(null);
            setProfile(null);
            setLoading(false);
          }
        } catch (err) {
          console.warn('Supabase auth getSession error:', err);
          if (!active) return;

          const savedSession = getStorageItem('session');
          if (savedSession) {
            setSession(savedSession);
            setUser(savedSession.user);
            fetchProfile(savedSession.user.id, savedSession.user).finally(() => {
              if (active) setLoading(false);
            });
            return;
          }
          setLoading(false);
        }

        if (!active) return;

        try {
          const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            if (!active) return;

            if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
              removeStorageItem('session');
              removeStorageItem('profile');
              setSession(null);
              setUser(null);
              setProfile(null);
              setLoading(false);
              return;
            }

            if (newSession) {
              setStorageItem('session', newSession);
            } else {
              removeStorageItem('session');
              removeStorageItem('profile');
            }

            setSession(newSession);
            setUser(newSession?.user ?? null);
            if (newSession?.user) {
              setLoading(true);
              await fetchProfile(newSession.user.id, newSession.user);
              if (active) setLoading(false);
            } else {
              setProfile(null);
              if (active) setLoading(false);
            }
          });
          subscription = sub;
        } catch (authChangeErr) {
          console.warn('Failed to subscribe to auth state changes:', authChangeErr);
        }

      } else {
        const savedSession = getStorageItem('session');
        if (savedSession) {
          setSession(savedSession);
          setUser(savedSession.user);
          fetchProfile(savedSession.user.id, savedSession.user).finally(() => {
            if (active) setLoading(false);
          });
          return;
        }
        setSession(null);
        setUser(null);
        setProfile(null);
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      active = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const signUp = async (email, password, metadata) => {
    if (isSupabaseConfigured && supabase) {
      const resolvedRole = resolveRole(email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: metadata.fullName,
            institution: metadata.institution,
            role: resolvedRole,
          },
        },
      });
      if (error) throw error;

      if (data?.user) {
        try {
          await supabase.from('profiles').insert({
            id: data.user.id,
            full_name: metadata.fullName,
            institution: metadata.institution,
            specialty: 'Academic Research',
            role: resolvedRole,
            avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
            about_author: 'A researcher on The Curated Archive.',
            metadata: [],
            created_at: new Date().toISOString(),
          });
        } catch (dbErr) {
          console.error('Profile row insert failed; will be recreated on next fetch:', dbErr);
        }
      }
      return data;
    } else {
      setLoading(true);
      const newUserId = 'user-' + Date.now();

      const localUsers = getStorageItem('users', []);

      if (localUsers.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        setLoading(false);
        throw new Error('An account with this email already exists.');
      }

      const resolvedRole = resolveRole(email);

      const newUser = {
        id: newUserId,
        email,
        password,
        fullName: metadata.fullName,
        institution: metadata.institution,
        role: resolvedRole,
      };
      localUsers.push(newUser);
      setStorageItem('users', localUsers);

      const localProfiles = getStorageItem('profiles', DEFAULT_PROFILES);

      const newProf = {
        id: newUserId,
        full_name: metadata.fullName,
        institution: metadata.institution,
        specialty: 'Academic Research',
        role: resolvedRole,
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
        about_author: 'A researcher on The Curated Archive.',
        metadata: [],
        created_at: new Date().toISOString(),
      };

      localProfiles.push(newProf);
      setStorageItem('profiles', localProfiles);

      const localSession = {
        user: {
          id: newUserId,
          email,
          user_metadata: {
            full_name: metadata.fullName,
            institution: metadata.institution,
            role: resolvedRole,
          },
        },
      };

      setStorageItem('session', localSession);
      setSession(localSession);
      setUser(localSession.user);
      setProfile(newProf);
      setLoading(false);
      return localSession;
    }
  };

  const signIn = async (email, password) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } else {
      setLoading(true);
      let localUsers = getStorageItem('users', []);

      // Seed the default admin in local mode if it does not exist
      const adminEmail = 'ilungagustave73@gmail.com';
      if (!localUsers.some((u) => u.email.toLowerCase() === adminEmail.toLowerCase())) {
        localUsers.push({
          id: 'admin-default',
          email: adminEmail,
          password: 'password',
          fullName: 'Archive Admin',
          institution: 'The Curated Archive',
          role: 'admin',
        });
        setStorageItem('users', localUsers);
      }

      const matchedUser = localUsers.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!matchedUser) {
        setLoading(false);
        throw new Error('Invalid email or password.');
      }

      const resolvedRole = resolveRole(matchedUser.email, matchedUser.role);

      const localSession = {
        user: {
          id: matchedUser.id,
          email: matchedUser.email,
          user_metadata: {
            full_name: matchedUser.fullName,
            institution: matchedUser.institution,
            role: resolvedRole,
          },
        },
      };

      setStorageItem('session', localSession);
      setSession(localSession);
      setUser(localSession.user);
      await fetchProfile(matchedUser.id, localSession.user);
      setLoading(false);
      return localSession;
    }
  };

  const signOut = async () => {
    removeStorageItem('session');
    removeStorageItem('profile');
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signout failed, continuing local clear:', err);
      }
    }
    setSession(null);
    setUser(null);
    setProfile(null);
  };

  const deleteAccount = async () => {
    if (!user) return;
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from('profiles').delete().eq('id', user.id);
        if (error) console.error('Profile deletion failed:', error);
        await supabase.auth.signOut();
      } else {
        const currentUserId = user.id;

        // Remove from local users, profiles and any papers this user owns.
        for (const key of ['users', 'profiles', 'papers']) {
          const list = getStorageItem(key);
          if (!list) continue;
          const filtered = list.filter((item) =>
            key === 'papers' ? item.author_id !== currentUserId : item.id !== currentUserId
          );
          setStorageItem(key, filtered);
        }

        removeStorageItem('session');
        setSession(null);
        setUser(null);
        setProfile(null);
      }
    } catch (err) {
      console.error('Failed to delete account:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, profile, fetchProfile, loading, signIn, signUp, signOut, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }
  return context;
};
