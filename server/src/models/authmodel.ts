import { supabase } from '../config/supabase.js';
import type { AuthResponse } from '@supabase/supabase-js';

// The model handles all direct interactions with Supabase
export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// 2. Register a new user using Supabase Auth
export const registerUser = async (email: string, password: string): Promise<AuthResponse> => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

// 3. Automatically create a 'customer' profile in the database
export const createCustomerProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert([{ user_id: userId, role: 'customer', permissions: [] }])
    .select()
    .single();

  if (error) {
    throw new Error(`Database Error: ${error.message}`);
  }

  return data;
};


export const resetPasswordForEmail = async (email: string) => {
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password`,
  });
};





