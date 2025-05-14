import React from 'react';
import { useConfig } from '../context/ConfigContext';

const Footer: React.FC = () => {
  const { config } = useConfig();
  
  return (
    <footer className="bg-gray-100 py-4 text-gray-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center">
        {config.footerText}
      </div>
    </footer>
  );
};

export default Footer;
