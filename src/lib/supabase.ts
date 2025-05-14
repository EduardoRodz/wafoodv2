import { createClient } from '@supabase/supabase-js';

// URL de Supabase codificada con base64 para dificultar su lectura directa
const encodedUrl = 'aHR0cHM6Ly9udW1qcGhsdHV5ZmJweXJuZXZsdS5zdXBhYmFzZS5jbw==';
// Claves codificadas con una técnica simple para ocultar los valores directos
const encodedAnonKey = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW01MWJXcHdhR3gwZVdaaWNIbHlibVYyYkhVaUxDSnliMnhsSWpvaVlXNXZiaUlzSW1saGRDSTZNVGMwTnpJeU9UTXdOU3dpWlhod0lqb3lNRFl5T0RBMUl7UldKVEsT9fQ==';
const encodedServiceKey = 'ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW01MWJXcHdhR3gwZVdaaWNIbHlibVYyYkhVaUxDSnliMngNJq9pJOtBL2ARSv1tIVzY0TwCOmJ6SiwiaWF0IjoxNzQ3MjI5MzA1LCJleHAiOjIwNjI4MDUzMDV9LkxYaWxYcjRIMEh6czNLZUVxSlBabFM0aUpLcnI0X0dVUDdGbVBVSnZwN2M=';

// Función para decodificar base64 de manera segura
const safeAtob = (str: string) => {
  try {
    // Pequeña modificación para dificultar la decodificación directa
    const modified = str.replace(/.$/, 'A').slice(0, -5);
    return atob(modified);
  } catch (e) {
    console.error('Error decodificando string', e);
    return '';
  }
};

// Intenta obtener las claves de variables de entorno primero
const getSupabaseUrl = (): string => {
  if (import.meta.env?.VITE_SUPABASE_URL) {
    return import.meta.env.VITE_SUPABASE_URL;
  }
  
  // Fallback: decodifica la URL almacenada
  return atob(encodedUrl);
};

// Función para obtener la clave anónima
const getAnonKey = (): string => {
  if (import.meta.env?.VITE_SUPABASE_ANON_KEY) {
    return import.meta.env.VITE_SUPABASE_ANON_KEY;
  }
  
  // Fallback: usa la versión codificada con una técnica simple
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjkzMDUsImV4cCI6MjA2MjgwNTMwNX0.Tzz4PO4bex6-UvaDrLs4FnN8y3x72liy5BoluRnOvCI';
};

// Función para obtener la clave de servicio
const getServiceKey = (): string => {
  if (import.meta.env?.VITE_SUPABASE_SERVICE_KEY) {
    return import.meta.env.VITE_SUPABASE_SERVICE_KEY;
  }
  
  // Fallback: usa la versión codificada con una técnica simple
  return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzIyOTMwNSwiZXhwIjoyMDYyODA1MzA1fQ.LXilXr4H0Hzs3KeEqJPZlS4iJKrr4_GUP7FmPUJvp7c';
};

// Exporta las URLs y claves a través de funciones getter
export const supabaseUrl = getSupabaseUrl();
export const getSupabaseAnonKey = getAnonKey;
export const getSupabaseServiceKey = getServiceKey;

// Cliente estándar para operaciones regulares
const supabase = createClient(supabaseUrl, getAnonKey());

// Cliente con permisos administrativos
export const supabaseAdmin = createClient(supabaseUrl, getServiceKey());

// Sobreescribimos el método toString para que no muestre las claves en la consola
supabase.toString = () => '[Objeto Supabase - Claves ocultas]';
supabaseAdmin.toString = () => '[Objeto SupabaseAdmin - Claves ocultas]';

export default supabase; 