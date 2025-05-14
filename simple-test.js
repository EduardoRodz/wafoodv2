// Script simple para probar la ejecución de Node.js
console.log('Hola mundo');
console.log('Este es un script de prueba');
console.log('Fecha actual:', new Date().toISOString());

// Intentar requerir supabase
try {
  const { createClient } = require('@supabase/supabase-js');
  console.log('Módulo de Supabase cargado correctamente');
} catch (error) {
  console.error('Error al cargar el módulo de Supabase:', error);
} 