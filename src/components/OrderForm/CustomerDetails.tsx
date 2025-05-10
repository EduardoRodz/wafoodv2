
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

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
  const [nameError, setNameError] = useState('');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.trim()) {
      setNameError('');
    }
  };

  const handleBlur = () => {
    if (!name.trim()) {
      setNameError('Por favor ingresa tu nombre');
    } else {
      setNameError('');
    }
  };

  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="name" className="block text-sm font-medium">Nombre</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={handleBlur}
          placeholder="Tu nombre"
          className={`w-full ${nameError ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300'}`}
          aria-invalid={!!nameError}
        />
        {nameError && <p className="text-red-500 text-xs mt-1">{nameError}</p>}
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
