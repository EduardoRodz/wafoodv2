import React, { useState, useEffect } from 'react';
import { config as defaultConfig } from '../config';
import { ColorPicker, CategoryEditor, MenuItemEditor, GeneralSettings } from '../components/admin';
import { X, Save, LogOut } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';

// Tipo para nuestro archivo de configuración editable
interface EditableConfig {
  restaurantName: string;
  whatsappNumber: string;
  currency: string;
  openingHours: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    textColor: string;
    backgroundColor: string;
    cartButtonColor: string;
    floatingCartButtonColor: string;
  };
  cashDenominations: {
    value: number;
    label: string;
  }[];
  categories: {
    id: string;
    name: string;
    icon: string;
    items: {
      id: string;
      name: string;
      description: string;
      price: number;
      image: string;
    }[];
  }[];
  footerText: string;
}

const AdminPanel: React.FC = () => {
  const { config, saveConfig } = useConfig();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editableConfig, setEditableConfig] = useState<EditableConfig>(JSON.parse(JSON.stringify(config)));
  const [activeTab, setActiveTab] = useState('general');
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Credenciales de demostración (en una app real, esto estaría en el backend)
  const DEMO_USERNAME = 'admin';
  const DEMO_PASSWORD = 'admin123';

  // Actualizar la copia editable cuando cambia la configuración
  useEffect(() => {
    setEditableConfig(JSON.parse(JSON.stringify(config)));
  }, [config]);

  // Autenticar usuario
  const handleLogin = () => {
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
      // Guardar estado de autenticación en localStorage (para mantener la sesión)
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      setLoginError('Usuario o contraseña incorrectos');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  // Verificar si ya está autenticado al cargar
  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  // Actualizar la configuración
  const handleConfigChange = (newConfig: EditableConfig) => {
    setEditableConfig(newConfig);
    setHasChanges(true);
  };

  // Actualizar una sección específica
  const updateConfigSection = (section: keyof EditableConfig, value: any) => {
    const newConfig = { ...editableConfig, [section]: value };
    handleConfigChange(newConfig);
  };

  // Guardar cambios
  const handleSaveChanges = () => {
    // Usar el contexto para guardar la configuración
    const success = saveConfig(editableConfig);
    
    if (success) {
      // Guardar también en localStorage para persistencia
      localStorage.setItem('siteConfig', JSON.stringify(editableConfig));
      
      // Notificar al usuario
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setHasChanges(false);
      
      // Enviar un evento para que otras pestañas/ventanas actualicen su estado
      const saveEvent = new CustomEvent('configSaved', { detail: editableConfig });
      window.dispatchEvent(saveEvent);
    } else {
      alert('Hubo un error al guardar la configuración. Por favor, intenta de nuevo.');
    }
  };

  // Mover categoría arriba o abajo
  const moveCategory = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === editableConfig.categories.length - 1)
    ) {
      return; // No hacer nada si está al principio o al final
    }

    const newCategories = [...editableConfig.categories];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    [newCategories[index], newCategories[swapIndex]] = [newCategories[swapIndex], newCategories[index]];
    
    updateConfigSection('categories', newCategories);
  };

  // Página de login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: config.theme.backgroundColor }}>
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: config.theme.primaryColor }}>
            Panel de Administración
          </h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            
            <button
              onClick={handleLogin}
              className="w-full py-2 px-4 text-white font-medium rounded"
              style={{ backgroundColor: config.theme.primaryColor }}
            >
              Iniciar Sesión
            </button>
          </div>
          
          <div className="mt-4 text-center text-sm text-gray-500">
            <p>Demo: Usuario: admin, Contraseña: admin123</p>
          </div>
        </div>
      </div>
    );
  }

  // Panel principal de administración
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: config.theme.backgroundColor }}>
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold" style={{ color: config.theme.primaryColor }}>
          Panel de Administración - {editableConfig.restaurantName}
        </h1>
        
        <div className="flex items-center gap-4">
          {hasChanges && (
            <button
              onClick={handleSaveChanges}
              className="flex items-center gap-1 py-2 px-4 text-white font-medium rounded"
              style={{ backgroundColor: config.theme.primaryColor }}
            >
              <Save size={18} /> Guardar Cambios
            </button>
          )}
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 py-2 px-4 bg-gray-200 text-gray-800 font-medium rounded hover:bg-gray-300"
          >
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Toast de éxito */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg flex items-center justify-between z-50">
          <span>¡Cambios guardados correctamente!</span>
          <button onClick={() => setSaveSuccess(false)} className="ml-2">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Contenido principal */}
      <div className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Tabs de navegación */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'general'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ borderColor: activeTab === 'general' ? config.theme.primaryColor : 'transparent',
                         color: activeTab === 'general' ? config.theme.primaryColor : '' }}
              >
                Configuración General
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'appearance'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ borderColor: activeTab === 'appearance' ? config.theme.primaryColor : 'transparent',
                         color: activeTab === 'appearance' ? config.theme.primaryColor : '' }}
              >
                Apariencia
              </button>
              <button
                onClick={() => setActiveTab('categories')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'categories'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ borderColor: activeTab === 'categories' ? config.theme.primaryColor : 'transparent',
                         color: activeTab === 'categories' ? config.theme.primaryColor : '' }}
              >
                Categorías
              </button>
              <button
                onClick={() => setActiveTab('menu')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'menu'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                style={{ borderColor: activeTab === 'menu' ? config.theme.primaryColor : 'transparent',
                         color: activeTab === 'menu' ? config.theme.primaryColor : '' }}
              >
                Menú
              </button>
            </nav>
          </div>

          {/* Contenido de los tabs */}
          <div className="bg-white rounded-lg shadow p-6">
            {activeTab === 'general' && (
              <GeneralSettings 
                config={editableConfig} 
                onChange={(newGeneralSettings) => {
                  const updatedConfig = {...editableConfig, ...newGeneralSettings};
                  handleConfigChange(updatedConfig);
                }}
              />
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Colores del Sitio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ColorPicker
                    label="Color Primario"
                    value={editableConfig.theme.primaryColor}
                    onChange={(color) => {
                      const newTheme = {...editableConfig.theme, primaryColor: color};
                      updateConfigSection('theme', newTheme);
                    }}
                  />
                  
                  <ColorPicker
                    label="Color de Acento"
                    value={editableConfig.theme.accentColor}
                    onChange={(color) => {
                      const newTheme = {...editableConfig.theme, accentColor: color};
                      updateConfigSection('theme', newTheme);
                    }}
                  />
                  
                  <ColorPicker
                    label="Color de Texto"
                    value={editableConfig.theme.textColor}
                    onChange={(color) => {
                      const newTheme = {...editableConfig.theme, textColor: color};
                      updateConfigSection('theme', newTheme);
                    }}
                  />
                  
                  <ColorPicker
                    label="Color de Fondo"
                    value={editableConfig.theme.backgroundColor}
                    onChange={(color) => {
                      const newTheme = {...editableConfig.theme, backgroundColor: color};
                      updateConfigSection('theme', newTheme);
                    }}
                  />
                  
                  <ColorPicker
                    label="Color del Botón del Carrito"
                    value={editableConfig.theme.cartButtonColor}
                    onChange={(color) => {
                      const newTheme = {...editableConfig.theme, cartButtonColor: color};
                      updateConfigSection('theme', newTheme);
                    }}
                  />
                  
                  <ColorPicker
                    label="Color del Botón Flotante"
                    value={editableConfig.theme.floatingCartButtonColor}
                    onChange={(color) => {
                      const newTheme = {...editableConfig.theme, floatingCartButtonColor: color};
                      updateConfigSection('theme', newTheme);
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === 'categories' && (
              <CategoryEditor 
                categories={editableConfig.categories}
                onChange={(categories) => updateConfigSection('categories', categories)}
                onMove={moveCategory}
              />
            )}

            {activeTab === 'menu' && (
              <MenuItemEditor 
                categories={editableConfig.categories}
                onChange={(categories) => updateConfigSection('categories', categories)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 