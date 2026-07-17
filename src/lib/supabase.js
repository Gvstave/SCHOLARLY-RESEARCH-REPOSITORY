import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Dynamically check if Supabase is configured with valid credentials
export let isSupabaseConfigured = !!(
  supabaseUrl && 
  supabaseUrl.trim() !== '' && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your_supabase_url') &&
  !supabaseUrl.includes('YOUR_SUPABASE_URL') &&
  !supabaseUrl.includes('your-supabase-url') &&
  supabaseAnonKey && 
  supabaseAnonKey.trim() !== '' &&
  !supabaseAnonKey.includes('your_supabase_anon_key') &&
  !supabaseAnonKey.includes('YOUR_SUPABASE_ANON_KEY') &&
  !supabaseAnonKey.includes('your-supabase-anon-key')
);

export function disableSupabase() {
  isSupabaseConfigured = false;
}

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

