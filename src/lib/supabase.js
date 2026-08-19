import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

let getAccessToken = async () => null;

export function setSupabaseAccessTokenProvider(provider) {
  getAccessToken = provider ?? (async () => null);
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      accessToken: () => getAccessToken(),
    })
  : null;

