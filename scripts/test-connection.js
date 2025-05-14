// Script para probar la conexión con Supabase
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_URL = 'https://numjphltuyfbpyrnevlu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjkzMDUsImV4cCI6MjA2MjgwNTMwNX0.Tzz4PO4bex6-UvaDrLs4FnN8y3x72liy5BoluRnOvCI';

async function testSupabaseConnection() {
  try {
    console.log('Iniciando prueba de conexión con Supabase...');
    
    // Crear cliente de Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Probar conexión con el servicio de autenticación
    console.log('1. Probando servicio de autenticación...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      throw new Error(`Error en servicio de autenticación: ${authError.message}`);
    }
    
    console.log('✓ Servicio de autenticación funcionando correctamente.');
    
    // Probar inicio de sesión con el usuario creado
    console.log('\n2. Probando inicio de sesión con el usuario creado...');
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'eduardorweb@gmail.com',
      password: 'admin123',
    });
    
    if (loginError) {
      console.log(`✗ Error en inicio de sesión: ${loginError.message}`);
      console.log('  Posibles causas:');
      console.log('  - El usuario no ha confirmado su correo electrónico');
      console.log('  - La contraseña es incorrecta');
      console.log('  - El usuario no existe');
    } else {
      console.log('✓ Inicio de sesión exitoso.');
      console.log(`  Usuario: ${loginData.user.email}`);
      console.log(`  Sesión válida: ${!!loginData.session}`);
    }
    
    // Cerrar sesión
    if (loginData?.session) {
      console.log('\n3. Probando cierre de sesión...');
      const { error: signOutError } = await supabase.auth.signOut();
      
      if (signOutError) {
        throw new Error(`Error en cierre de sesión: ${signOutError.message}`);
      }
      
      console.log('✓ Cierre de sesión exitoso.');
    }
    
    console.log('\n✅ Prueba de conexión completada con éxito.');
    
  } catch (error) {
    console.error('\n❌ Error en la prueba de conexión:', error.message);
  }
}

testSupabaseConnection(); 