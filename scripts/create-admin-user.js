// Script para crear un usuario administrador en Supabase
// Para ejecutar: node scripts/create-admin-user.js

import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_URL = 'https://numjphltuyfbpyrnevlu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjkzMDUsImV4cCI6MjA2MjgwNTMwNX0.Tzz4PO4bex6-UvaDrLs4FnN8y3x72liy5BoluRnOvCI';

// Datos del usuario administrador
const ADMIN_EMAIL = 'eduardorweb@gmail.com';
const ADMIN_PASSWORD = 'admin123'; // Cambiar por una contraseña segura en producción

async function createAdminUser() {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Intentar crear el usuario
    const { data, error } = await supabase.auth.signUp({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });
    
    if (error) {
      throw error;
    }
    
    console.log('Usuario administrador creado exitosamente:', data.user);
    console.log('Email:', ADMIN_EMAIL);
    console.log('Contraseña:', ADMIN_PASSWORD);
    
    // Asignar rol de administrador en la tabla user_roles
    if (data.user) {
      const { error: roleError } = await supabase
        .from('user_roles')
        .upsert([
          { 
            user_id: data.user.id, 
            role: 'admin' 
          }
        ], { 
          onConflict: 'user_id'
        });
      
      if (roleError) {
        console.error('Error al asignar rol de administrador:', roleError);
      } else {
        console.log('Rol de administrador asignado correctamente en la tabla user_roles');
      }
    }
    
    console.log('---------------------------------------');
    console.log('Importante: Revisa tu email para confirmar tu cuenta si la confirmación por email está activada en Supabase');
    
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error.message);
  }
}

createAdminUser(); 