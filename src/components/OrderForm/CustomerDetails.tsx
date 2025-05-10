
import React from 'react';

interface CustomerDetailsProps {
  name: string;
  setName: (name: string) => void;
  orderType: string;
  setOrderType: (orderType: string) => void;
}

export const CustomerDetails: React.FC<CustomerDetailsProps> = ({
  name,
  setName,
  orderType,
  setOrderType
}) => {
  return (
    <>
      <div>
        <label className="block mb-1 text-sm font-medium">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label className="block mb-1 text-sm font-medium">Tipo de orden</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="delivery"
              checked={orderType === 'delivery'}
              onChange={() => setOrderType('delivery')}
              className="h-4 w-4"
            />
            <span>Delivery</span>
          </label>
          
          <label className="flex items-center gap-1">
            <input
              type="radio"
              value="pickup"
              checked={orderType === 'pickup'}
              onChange={() => setOrderType('pickup')}
              className="h-4 w-4"
            />
            <span>Para recoger</span>
          </label>
        </div>
      </div>
    </>
  );
};
