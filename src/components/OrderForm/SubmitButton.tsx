
import React from 'react';

export const SubmitButton: React.FC = () => {
  return (
    <button
      type="submit"
      className="w-full py-3 bg-primary hover:bg-accent text-white font-bold rounded transition-colors"
    >
      Enviar pedido por WhatsApp
    </button>
  );
};
