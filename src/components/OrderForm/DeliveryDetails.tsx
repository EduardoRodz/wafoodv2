
import React from 'react';

interface DeliveryDetailsProps {
  phone: string;
  setPhone: (phone: string) => void;
  address: string;
  setAddress: (address: string) => void;
}

export const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({
  phone,
  setPhone,
  address,
  setAddress
}) => {
  return (
    <>
      <div>
        <label className="block mb-1 text-sm font-medium">Teléfono</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Tu número de teléfono"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label className="block mb-1 text-sm font-medium">Dirección</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Tu dirección completa"
          className="w-full p-2 border border-gray-300 rounded"
          rows={2}
          required
        />
      </div>
    </>
  );
};
