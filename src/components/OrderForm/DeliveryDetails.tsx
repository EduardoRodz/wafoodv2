
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

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
  const [phoneError, setPhoneError] = useState('');
  const [addressError, setAddressError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (e.target.value.trim()) {
      setPhoneError('');
    }
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAddress(e.target.value);
    if (e.target.value.trim()) {
      setAddressError('');
    }
  };

  const handlePhoneBlur = () => {
    if (!phone.trim()) {
      setPhoneError('Por favor ingresa tu número de teléfono');
    } else {
      setPhoneError('');
    }
  };

  const handleAddressBlur = () => {
    if (!address.trim()) {
      setAddressError('Por favor ingresa tu dirección');
    } else {
      setAddressError('');
    }
  };

  return (
    <>
      <div className="space-y-1">
        <Label htmlFor="phone" className="block text-sm font-medium">Teléfono</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder="Tu número de teléfono"
          className={`w-full ${phoneError ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300'}`}
          aria-invalid={!!phoneError}
        />
        {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="address" className="block text-sm font-medium">Dirección</Label>
        <Textarea
          id="address"
          value={address}
          onChange={handleAddressChange}
          onBlur={handleAddressBlur}
          placeholder="Tu dirección completa"
          className={`w-full ${addressError ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300'}`}
          rows={2}
          aria-invalid={!!addressError}
        />
        {addressError && <p className="text-red-500 text-xs mt-1">{addressError}</p>}
      </div>
    </>
  );
};
