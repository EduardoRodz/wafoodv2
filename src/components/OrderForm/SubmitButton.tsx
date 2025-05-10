
import React from 'react';
import { config } from '../../config';

export const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="w-full py-3 text-white font-bold rounded transition-colors hover:opacity-90"
      style={{ backgroundColor: config.theme.cartButtonColor }}
    >
      Enviar pedido por WhatsApp
    </button>
  );
};
