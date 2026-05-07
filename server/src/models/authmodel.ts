import { supabase } from '../config/supabase.js';
import type { AuthResponse } from '@supabase/supabase-js';

// The model handles all direct interactions with Supabase
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};