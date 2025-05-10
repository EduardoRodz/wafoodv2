
import React from 'react';
import { config } from '../config';

const Header: React.FC = () => {
  return (
    <header className="bg-primary text-white text-center py-4 sticky top-0 z-10">
      <h1 className="text-2xl font-bold">{config.restaurantName}</h1>
      <p className="text-sm">
        <span className="inline-block mr-1">🕒</span>
        Abierto ahora • Horario: {config.openingHours}
      </p>
    </header>
  );
};

export default Header;
