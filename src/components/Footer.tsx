import React from 'react';
import { useConfig } from '../context/ConfigContext';

const Footer: React.FC = () => {
  const { config } = useConfig();
  
  return (
    <footer className="bg-gray-100 text-center py-4 text-gray-600 text-sm">
      {config.footerText}
    </footer>
  );
};

export default Footer;
