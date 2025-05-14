# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/6ce2a4be-89c0-4163-8ac8-4266c1f0cacf

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6ce2a4be-89c0-4163-8ac8-4266c1f0cacf) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6ce2a4be-89c0-4163-8ac8-4266c1f0cacf) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Autenticación con Supabase

Este proyecto utiliza Supabase para la autenticación del panel de administración:

### Configuración

- La autenticación está configurada con Supabase en `src/lib/supabase.ts`
- El contexto de autenticación se encuentra en `src/context/AuthContext.tsx`
- Los servicios de autenticación están en `src/services/authService.ts`

### Seguridad de Claves API

Para proteger las claves API de Supabase, hemos implementado varias medidas de seguridad:

1. **Ofuscación de claves:** Las claves están codificadas en el código fuente
2. **Soporte para variables de entorno:** Configura las siguientes variables en un archivo `.env.local`:
   ```
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-anon
   VITE_SUPABASE_SERVICE_KEY=tu-clave-service
   ```
3. **Documentación detallada:** Consulta el archivo `SECURITY.md` para más información sobre las medidas de seguridad implementadas

### Crear un usuario administrador

Para crear un usuario administrador, ejecuta el siguiente comando:

```sh
node scripts/create-admin-user.js
```

Este script creará un usuario con las siguientes credenciales por defecto:
- Email: eduardorweb@gmail.com
- Contraseña: admin123

Puedes modificar estas credenciales editando el archivo `scripts/create-admin-user.js`.

> ⚠️ **IMPORTANTE:** Cambia la contraseña por defecto después del primer inicio de sesión para mayor seguridad.

### Acceso al panel de administración

Una vez creado el usuario, puedes acceder al panel de administración en la ruta `/adminpanel` e iniciar sesión con las credenciales configuradas.

### Roles y permisos

El sistema implementa dos roles de usuario:
- **Admin:** Acceso completo a todas las secciones del panel (configuración general, apariencia, usuarios, menú y categorías)
- **Staff:** Acceso limitado solo a las secciones de menú y categorías

El usuario eduardorweb@gmail.com siempre tiene rol de administrador por configuración.
