# Guía de Seguridad para Claves API

## Protección de Claves API de Supabase

Para mejorar la seguridad de nuestra aplicación, hemos implementado varias medidas para proteger las claves API de Supabase:

### Medidas implementadas

1. **Ofuscación de claves en el código fuente**:
   - Las claves API están codificadas en el código fuente para dificultar la lectura directa.
   - Esta es una medida básica para evitar la copia directa, pero no es 100% segura.

2. **Soporte para variables de entorno**:
   - La aplicación está configurada para usar variables de entorno cuando están disponibles.
   - Esto permite configurar las claves de forma segura en entornos de producción.

### Configuración para Desarrollo

Para desarrollar localmente sin exponer claves API en el código:

1. Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon
VITE_SUPABASE_SERVICE_KEY=tu-clave-service
```

2. Asegúrate de que `.env.local` esté en tu `.gitignore` para no subirlo al repositorio.

### Configuración para Producción

En entornos de producción (Netlify, Vercel, etc.):

1. Configura las variables de entorno en el panel de administración de tu proveedor.
2. Nunca incluyas claves API en el código que se despliega.
3. Considera usar claves API con permisos limitados solo a lo necesario.

### Medidas adicionales recomendadas

1. **Rotación periódica de claves**:
   - Cambia las claves API periódicamente como buena práctica de seguridad.
   
2. **Uso de políticas de Row Level Security (RLS) en Supabase**:
   - Configura políticas RLS en tus tablas para limitar el acceso incluso si las claves se vieran comprometidas.

3. **Validación en el servidor**:
   - Implementa validaciones adicionales en el servidor para operaciones críticas.

Recuerda que la seguridad es un proceso continuo. Estas medidas reducen el riesgo, pero no eliminan completamente la posibilidad de una exposición. Siempre mantén buenas prácticas de seguridad en tu desarrollo. 