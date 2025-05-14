import React from 'react';

interface PaymentMethodProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  paymentMethod,
  setPaymentMethod
}) => {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium">Método de pago</label>
      <div className="flex gap-4">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="cash"
            checked={paymentMethod === 'cash'}
            onChange={() => setPaymentMethod('cash')}
            className="h-4 w-4"
          />
          <span>Efectivo</span>
        </label>
        
        <label className="flex items-center gap-1">
          <input
            type="radio"
            value="transfer"
            checked={paymentMethod === 'transfer'}
            onChange={() => setPaymentMethod('transfer')}
            className="h-4 w-4"
          />
          <span>Transferencia</span>
        </label>
      </div>
    </div>
  );
};
