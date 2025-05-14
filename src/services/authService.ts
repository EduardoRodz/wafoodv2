import supabase from '../lib/supabase';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: any | null;
  error: Error | null;
}

export const login = async ({ email, password }: LoginCredentials): Promise<AuthResponse> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw error;
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Error en login:', error);
    return { user: null, error: error as Error };
  }
};

export const logout = async (): Promise<{ error: Error | null }> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    return { error: null };
  } catch (error) {
    console.error('Error en logout:', error);
    return { error: error as Error };
  }
};

export const getCurrentUser = async (): Promise<{ user: any | null, error: Error | null }> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw error;
    }
    
    return { user, error: null };
  } catch (error) {
    console.error('Error obteniendo usuario actual:', error);
    return { user: null, error: error as Error };
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const { user, error } = await getCurrentUser();
  return !error && user !== null;
}; 