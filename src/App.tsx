import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import AdminPanel from './pages/AdminPanel';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ConfirmError from './pages/ConfirmError';
import { ConfigProvider } from './context/ConfigContext';
import { AuthProvider } from './context/AuthContext';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <ConfigProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/adminpanel" element={<AdminPanel />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/auth/confirm-error" element={<ConfirmError />} />
          </Routes>
        </AuthProvider>
      </ConfigProvider>
    </Router>
  );
};

export default App;
