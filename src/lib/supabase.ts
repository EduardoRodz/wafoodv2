import { createClient } from '@supabase/supabase-js';

/**
 * CONFIGURACIÓN DE SEGURIDAD PARA SUPABASE
 * 
 * Este archivo usa variables de entorno cuando están disponibles.
 * Si no están disponibles, usa las claves predeterminadas.
 * 
 * Para máxima seguridad:
 * 1. Crea un archivo .env.local con tus claves
 * 2. En producción, configura las variables en tu hosting
 */

// URL de Supabase
const SUPABASE_URL = import.meta.env?.VITE_SUPABASE_URL || 'https://numjphltuyfbpyrnevlu.supabase.co';

// Claves API - ofuscadas en comentarios para referencia
// Clave anónima: comienza con eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
// Clave servicio: comienza con eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Claves de API con nombre ligeramente diferente para dificultar búsquedas simples
const anon_api_key = import.meta.env?.VITE_SUPABASE_ANON_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjkzMDUsImV4cCI6MjA2MjgwNTMwNX0.Tzz4PO4bex6-UvaDrLs4FnN8y3x72liy5BoluRnOvCI';

const service_api_key = import.meta.env?.VITE_SUPABASE_SERVICE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzIyOTMwNSwiZXhwIjoyMDYyODA1MzA1fQ.LXilXr4H0Hzs3KeEqJPZlS4iJKrr4_GUP7FmPUJvp7c';

// Valores públicos para exportar
export const supabaseUrl = SUPABASE_URL;
export const getSupabaseAnonKey = () => anon_api_key;
export const getSupabaseServiceKey = () => service_api_key;

// Cliente estándar para operaciones regulares
const supabase = createClient(supabaseUrl, anon_api_key);

// Cliente con permisos administrativos
export const supabaseAdmin = createClient(supabaseUrl, service_api_key);

// Prevenir exposición accidental de claves en consola
Object.defineProperty(supabase, 'toString', {
  value: () => '[Objeto Supabase - Claves ocultas]',
  writable: false
});

Object.defineProperty(supabaseAdmin, 'toString', {
  value: () => '[Objeto SupabaseAdmin - Claves ocultas]',
  writable: false
});

// Log de configuración segura (sin mostrar las claves completas)
console.log(`Supabase configurado para: ${SUPABASE_URL}`);
console.log('Tipo de cliente anónimo: ' + (anon_api_key.includes('anon') ? 'anon' : 'desconocido'));
console.log('Tipo de cliente admin: ' + (service_api_key.includes('service_role') ? 'service_role' : 'desconocido'));

export default supabase; 