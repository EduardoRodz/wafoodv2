// Script para probar el restablecimiento de contraseña
import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
const SUPABASE_URL = 'https://numjphltuyfbpyrnevlu.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjkzMDUsImV4cCI6MjA2MjgwNTMwNX0.Tzz4PO4bex6-UvaDrLs4FnN8y3x72liy5BoluRnOvCI';

// Correo del usuario administrador
const ADMIN_EMAIL = 'eduardorweb@gmail.com';

// URL base del sitio
const SITE_URL = 'https://wafoodv2.netlify.app';

async function testPasswordReset() {
  try {
    console.log('Iniciando prueba de restablecimiento de contraseña...');
    
    // Crear cliente de Supabase
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    
    // Solicitar restablecimiento de contraseña
    console.log(`1. Enviando correo de restablecimiento a ${ADMIN_EMAIL}...`);
    const { data, error } = await supabase.auth.resetPasswordForEmail(ADMIN_EMAIL, {
      redirectTo: `${SITE_URL}/reset-password`,
    });
    
    if (error) {
      throw new Error(`Error al solicitar restablecimiento: ${error.message}`);
    }
    
    console.log('✅ Correo de restablecimiento enviado correctamente');
    console.log('\nInstrucciones:');
    console.log('1. Revisa tu bandeja de entrada y carpeta de spam para encontrar el email');
    console.log('2. Haz clic en el enlace de restablecimiento que te llevará a la aplicación');
    console.log('3. En la página de restablecimiento, ingresa tu nueva contraseña');
    console.log('4. Una vez cambiada, podrás iniciar sesión con la nueva contraseña');
    console.log('\nURL de redirección configurada:', `${SITE_URL}/reset-password`);
    
  } catch (error) {
    console.error('\n❌ Error en la prueba:', error.message);
  }
}

testPasswordReset(); 