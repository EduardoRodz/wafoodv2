import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import supabase from '../lib/supabase';
import { useConfig } from '../context/ConfigContext';

const ResetPassword: React.FC = () => {
  const { config } = useConfig();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  // Extraer el token de acceso del hash de la URL
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.replace('#', ''));
      const token = params.get('access_token');
      setAccessToken(token);
    }
  }, [location]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage({ text: 'Las contraseñas no coinciden', type: 'error' });
      return;
    }
    
    if (password.length < 6) {
      setMessage({ text: 'La contraseña debe tener al menos 6 caracteres', type: 'error' });
      return;
    }
    
    setLoading(true);
    setMessage(null);
    
    try {
      // Si tenemos un token de acceso, establecer la sesión primero
      if (accessToken) {
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: '',
        });
        
        if (sessionError) {
          throw new Error(`Error al establecer la sesión: ${sessionError.message}`);
        }
      }
      
      // Actualizar la contraseña
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      
      if (error) {
        throw error;
      }
      
      setMessage({ 
        text: 'Contraseña actualizada correctamente. Serás redirigido al panel de administración...', 
        type: 'success' 
      });
      
      // Redirigir después de unos segundos
      setTimeout(() => {
        navigate('/adminpanel');
      }, 3000);
      
    } catch (error: any) {
      setMessage({ 
        text: `Error al actualizar la contraseña: ${error.message}`, 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: config.theme.backgroundColor }}>
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: config.theme.primaryColor }}>
          Restablecer Contraseña
        </h1>
        
        {!accessToken && (
          <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 rounded">
            <p>No se ha detectado un token de acceso válido en la URL. Si llegaste aquí desde un enlace de restablecimiento de contraseña, asegúrate de usar el enlace completo del correo electrónico.</p>
          </div>
        )}
        
        <form onSubmit={handleResetPassword}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nueva Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={loading}
              />
            </div>
            
            {message && (
              <div className={`p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.text}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full py-2 px-4 text-white font-medium rounded"
              style={{ backgroundColor: config.theme.primaryColor }}
              disabled={loading || !accessToken}
            >
              {loading ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
            
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={() => navigate('/adminpanel')}
                className="text-sm text-gray-600 hover:underline"
              >
                Volver al panel de administración
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword; 