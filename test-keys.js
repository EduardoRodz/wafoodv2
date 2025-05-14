// Script para probar la decodificación de claves JWT
console.log("Script de prueba de claves JWT");

// Claves API
console.log("Definiendo claves...");
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyMjkzMDUsImV4cCI6MjA2MjgwNTMwNX0.Tzz4PO4bex6-UvaDrLs4FnN8y3x72liy5BoluRnOvCI';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51bWpwaGx0dXlmYnB5cm5ldmx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzIyOTMwNSwiZXhwIjoyMDYyODA1MzA1fQ.LXilXr4H0Hzs3KeEqJPZlS4iJKrr4_GUP7FmPUJvp7c';
console.log("Claves definidas.");

// Función para decodificar base64url
function base64UrlDecode(str) {
    console.log("Intentando decodificar:", str.substring(0, 10) + "...");
    
    try {
        // Convertir base64url a base64 estándar
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        console.log("Después de reemplazar caracteres:", str.substring(0, 10) + "...");
        
        // Añadir padding si es necesario
        while (str.length % 4) {
            str += '=';
        }
        console.log("Después de añadir padding:", str.substring(0, 10) + "...");
        
        // Usar directamente Buffer en Node.js
        console.log("Usando Buffer para decodificar...");
        return Buffer.from(str, 'base64').toString();
    } catch (e) {
        console.error("Error completo decodificando:", e);
        return null;
    }
}

// Función para verificar un token JWT
function validateKey(key, expectedRole) {
    console.log(`\nIniciando validación para rol "${expectedRole}"...`);
    try {
        console.log("Dividiendo token en partes...");
        const parts = key.split('.');
        console.log(`Token tiene ${parts.length} partes`);
        
        if (parts.length !== 3) {
            console.error("El token no tiene 3 partes");
            return false;
        }
        
        console.log("Parte 1 (header):", parts[0].substring(0, 10) + "...");
        console.log("Parte 2 (payload):", parts[1].substring(0, 10) + "...");
        console.log("Parte 3 (signature):", parts[2].substring(0, 10) + "...");
        
        console.log("Decodificando payload...");
        const decodedPayload = base64UrlDecode(parts[1]);
        
        if (!decodedPayload) {
            console.error("No se pudo decodificar el payload");
            return false;
        }
        
        console.log("Payload decodificado:", decodedPayload);
        
        console.log("Parseando JSON...");
        const payload = JSON.parse(decodedPayload);
        
        console.log("Payload parseado:", JSON.stringify(payload));
        console.log("Rol en el token:", payload.role);
        console.log("Rol esperado:", expectedRole);
        
        return payload.role === expectedRole;
    } catch (e) {
        console.error("Error completo validando clave:", e);
        return false;
    }
}

// Probar las claves
console.log("\n--- Prueba de ANON_KEY ---");
try {
    const anonValid = validateKey(ANON_KEY, 'anon');
    console.log("ANON_KEY válida:", anonValid);
} catch (e) {
    console.error("Error al validar ANON_KEY:", e);
}

console.log("\n--- Prueba de SERVICE_KEY ---");
try {
    const serviceValid = validateKey(SERVICE_KEY, 'service_role');
    console.log("SERVICE_KEY válida:", serviceValid);
} catch (e) {
    console.error("Error al validar SERVICE_KEY:", e);
} 