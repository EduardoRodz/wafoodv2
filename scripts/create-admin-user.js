// Script para crear un usuario administrador en Supabase
// Para ejecutar: node scripts/create-admin-user.js

const { createClient } = require('@supabase/supabase-js');

// Configuración de Supabase
const SUPABASE_URL = 'https://numjphltuyfbpyrnevlu.supabase.co';
// Utilizamos la clave de servicio para tener permisos administrativos
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzIyOTMwNSwiZXhwIjoyMDYyODA1MzA1fQ.LXilXr4H0Hzs3KeEqJPZlS4iJKrr4_GUP7FmPUJvp7c';

// Datos del usuario administrador
const ADMIN_EMAIL = 'eduardorweb@gmail.com';
const ADMIN_PASSWORD = 'admin123'; // Cambiar por una contraseña segura en producción

async function createAdminUser() {
  try {
    console.log('Iniciando creación de usuario administrador...');
    
    // Crear cliente con permisos administrativos
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    // Usar createUser del admin API para mayor control
    const { data, error } = await supabase.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true // Auto-confirmar el email
    });
    
    if (error) {
      throw error;
    }
    
    console.log('Usuario administrador creado exitosamente');
    console.log('Email:', ADMIN_EMAIL);
    console.log('Contraseña:', ADMIN_PASSWORD);
    
    // Asignar rol de administrador en la tabla user_roles
    if (data.user) {
      console.log('Asignando rol de administrador...');
      
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
    console.log('¡Usuario administrador creado con éxito!');
    console.log('Usuario: ' + ADMIN_EMAIL);
    console.log('Este usuario tiene acceso completo al panel de administración.');
    
  } catch (error) {
    console.error('Error al crear el usuario administrador:', error.message);
  }
}

// Ejecutar la función
createAdminUser()
  .then(() => console.log('Script finalizado'))
  .catch(err => console.error('Error no capturado:', err)); 