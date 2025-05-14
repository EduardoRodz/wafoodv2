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
    const value = e.target.value;
    // Only allow digits
    const numericValue = value.replace(/\D/g, '');
    setPhone(numericValue);
    
    if (numericValue) {
      if (numericValue.length !== 10) {
        setPhoneError('El número debe tener exactamente 10 dígitos');
      } else {
        setPhoneError('');
      }
    } else {
      setPhoneError('Por favor ingresa tu número de teléfono');
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
    } else if (phone.length !== 10) {
      setPhoneError('El número debe tener exactamente 10 dígitos');
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
      <div className="space-y-1 mb-3">
        <Label htmlFor="phone" className="block text-sm font-medium">Teléfono <span className="text-red-500">*</span></Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
          placeholder="Tu número de teléfono (10 dígitos)"
          className={`w-full ${phoneError ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300'}`}
          aria-invalid={!!phoneError}
          maxLength={10}
        />
        {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
      </div>
      
      <div className="space-y-1">
        <Label htmlFor="address" className="block text-sm font-medium">Dirección <span className="text-red-500">*</span></Label>
        <Textarea
          id="address"
          value={address}
          onChange={handleAddressChange}
          onBlur={handleAddressBlur}
          placeholder="Tu dirección completa (obligatorio)"
          className={`w-full ${addressError ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-300'}`}
          rows={2}
          aria-invalid={!!addressError}
          required
        />
        {addressError && <p className="text-red-500 text-xs mt-1">{addressError}</p>}
      </div>
    </>
  );
};
