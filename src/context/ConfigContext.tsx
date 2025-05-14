import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { config as initialConfig, saveConfig as saveConfigToStorage } from '../config';

// Tipo de contexto
interface ConfigContextType {
  config: typeof initialConfig;
  saveConfig: (newConfig: typeof initialConfig) => boolean;
  isLoading: boolean;
}

// Crear el contexto
const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// Hook personalizado para usar el contexto
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig debe ser usado dentro de un ConfigProvider');
  }
  return context;
};

// Proveedor del contexto
interface ConfigProviderProps {
  children: ReactNode;
}

export const ConfigProvider: React.FC<ConfigProviderProps> = ({ children }) => {
  const [currentConfig, setCurrentConfig] = useState(initialConfig);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar la configuración desde localStorage
  const loadConfigFromStorage = () => {
    try {
      const savedConfig = localStorage.getItem('siteConfig');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        setCurrentConfig(parsedConfig);
        console.log('Configuración cargada del almacenamiento local');
      }
    } catch (error) {
      console.error('Error cargando configuración guardada:', error);
    }
    
    setIsLoading(false);
  };

  // Cargar la configuración inicial
  useEffect(() => {
    loadConfigFromStorage();
    
    // Escuchar cambios en el localStorage para actualizar en tiempo real
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'siteConfig' && event.newValue) {
        try {
          const newConfig = JSON.parse(event.newValue);
          setCurrentConfig(newConfig);
          console.log('Configuración actualizada desde otra pestaña');
        } catch (error) {
          console.error('Error al procesar los cambios de configuración:', error);
        }
      }
    };
    
    // Escuchar el evento personalizado configSaved
    const handleConfigSaved = (event: CustomEvent<any>) => {
      try {
        const newConfig = event.detail;
        setCurrentConfig(newConfig);
        console.log('Configuración actualizada desde evento personalizado');
      } catch (error) {
        console.error('Error al procesar el evento configSaved:', error);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('configSaved', handleConfigSaved as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('configSaved', handleConfigSaved as EventListener);
    };
  }, []);

  // Función para guardar la configuración
  const saveConfig = (newConfig: typeof initialConfig) => {
    try {
      // Guardar en localStorage
      localStorage.setItem('siteConfig', JSON.stringify(newConfig));
      
      // Actualizar el estado local
      setCurrentConfig(newConfig);
      
      // Disparar el evento personalizado para otras instancias de la aplicación
      const event = new CustomEvent('configSaved', { detail: newConfig });
      window.dispatchEvent(event);
      
      return true;
    } catch (error) {
      console.error('Error guardando configuración:', error);
      return false;
    }
  };

  return (
    <ConfigContext.Provider value={{ config: currentConfig, saveConfig, isLoading }}>
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContext; 