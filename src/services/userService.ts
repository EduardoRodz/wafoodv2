import supabase from '../lib/supabase';

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'staff';
  created_at: string;
  last_sign_in_at: string | null;
}

export interface CreateUserData {
  email: string;
  password: string;
  role: 'admin' | 'staff';
}

export interface UpdateUserData {
  id: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'staff';
}

// Obtener todos los usuarios
export const getUsers = async (): Promise<User[]> => {
  try {
    // Primero consultamos la tabla de autenticación para obtener todos los usuarios
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      throw authError;
    }
    
    if (!authUsers || !authUsers.users) {
      return [];
    }
    
    // Consultamos la tabla personalizada de roles de usuario
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('*');
    
    if (roleError) {
      console.error('Error al obtener roles de usuario:', roleError);
    }
    
    // Creamos un mapa de ID de usuario a rol
    const userRoles: Record<string, string> = {};
    if (roleData) {
      roleData.forEach((record: any) => {
        userRoles[record.user_id] = record.role;
      });
    }
    
    // Combinamos los datos
    return authUsers.users.map(user => ({
      id: user.id,
      email: user.email || '',
      role: (userRoles[user.id] as 'admin' | 'staff') || 'staff',
      created_at: user.created_at,
      last_sign_in_at: user.last_sign_in_at
    }));
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    return [];
  }
};

// Crear un nuevo usuario
export const createUser = async (userData: CreateUserData): Promise<{ user: User | null; error: Error | null }> => {
  try {
    // Crear usuario en autenticación
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true
    });
    
    if (authError) {
      throw authError;
    }
    
    if (!authData || !authData.user) {
      throw new Error('No se pudo crear el usuario');
    }
    
    // Guardar rol en tabla personalizada
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert([{
        user_id: authData.user.id,
        role: userData.role
      }]);
    
    if (roleError) {
      console.error('Error al guardar rol del usuario:', roleError);
      // No lanzamos error aquí para no bloquear la creación del usuario
    }
    
    return {
      user: {
        id: authData.user.id,
        email: authData.user.email || '',
        role: userData.role,
        created_at: authData.user.created_at,
        last_sign_in_at: null
      },
      error: null
    };
  } catch (error) {
    console.error('Error al crear usuario:', error);
    return { user: null, error: error as Error };
  }
};

// Actualizar un usuario existente
export const updateUser = async (userData: UpdateUserData): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // Actualizar datos de autenticación si es necesario
    if (userData.email || userData.password) {
      const updateData: any = {};
      if (userData.email) updateData.email = userData.email;
      if (userData.password) updateData.password = userData.password;
      
      const { error: authError } = await supabase.auth.admin.updateUserById(
        userData.id,
        updateData
      );
      
      if (authError) {
        throw authError;
      }
    }
    
    // Actualizar rol si es necesario
    if (userData.role) {
      // Verificar si ya existe un registro para este usuario
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userData.id)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') { // PGRST116 es "no se encontró registro"
        console.error('Error al verificar rol existente:', checkError);
      }
      
      if (existingRole) {
        // Actualizar rol existente
        const { error: updateRoleError } = await supabase
          .from('user_roles')
          .update({ role: userData.role })
          .eq('user_id', userData.id);
        
        if (updateRoleError) {
          console.error('Error al actualizar rol:', updateRoleError);
        }
      } else {
        // Crear nuevo registro de rol
        const { error: insertRoleError } = await supabase
          .from('user_roles')
          .insert([{ user_id: userData.id, role: userData.role }]);
        
        if (insertRoleError) {
          console.error('Error al insertar rol:', insertRoleError);
        }
      }
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    return { success: false, error: error as Error };
  }
};

// Eliminar un usuario
export const deleteUser = async (userId: string): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // Eliminar usuario de autenticación
    const { error: authError } = await supabase.auth.admin.deleteUser(userId);
    
    if (authError) {
      throw authError;
    }
    
    // Eliminar registro de rol
    const { error: roleError } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId);
    
    if (roleError) {
      console.error('Error al eliminar rol:', roleError);
      // No bloqueamos el proceso por error al eliminar el rol
    }
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    return { success: false, error: error as Error };
  }
};

// Obtener el rol del usuario actual
export const getCurrentUserRole = async (): Promise<string> => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw authError || new Error('No se encontró usuario autenticado');
    }
    
    // Si el usuario es eduardorweb@gmail.com, siempre retornar 'admin'
    if (user.email === 'eduardorweb@gmail.com') {
      console.log('Usuario admin predeterminado detectado:', user.email);
      return 'admin';
    }
    
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();
    
    if (roleError) {
      console.error('Error al obtener rol:', roleError);
      return 'staff'; // Por defecto, asumimos rol de staff
    }
    
    return roleData?.role || 'staff';
  } catch (error) {
    console.error('Error al obtener rol del usuario actual:', error);
    return 'staff'; // Por defecto, asumimos rol de staff
  }
}; 