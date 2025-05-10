
import React from 'react';
import { config } from '../config';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white text-center py-4 mt-8">
      <p className="text-sm">{config.footerText}</p>
    </footer>
  );
};

export default Footer;
