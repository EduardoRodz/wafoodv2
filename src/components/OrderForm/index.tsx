
import React from 'react';
import { CustomerDetails } from './CustomerDetails';
import { DeliveryDetails } from './DeliveryDetails';
import { PaymentMethod } from './PaymentMethod';
import { CashPayment } from './CashPayment';
import { AdditionalComments } from './AdditionalComments';
import { SubmitButton } from './SubmitButton';
import { useCart } from '../../context/CartContext';
import { config } from '../../config';
import { formatCurrency } from '../../utils/formatCurrency';
import { useOrderForm } from './useOrderForm';

const OrderForm: React.FC = () => {
  const { items, totalAmount } = useCart();
  const { 
    name, setName,
    orderType, setOrderType,
    phone, setPhone,
    address, setAddress,
    paymentMethod, setPaymentMethod,
    cashAmount, setCashAmount,
    comments, setComments,
    handleSubmit
  } = useOrderForm();

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-bold text-lg mb-4">Información del pedido</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <CustomerDetails 
            name={name} 
            setName={setName} 
            orderType={orderType} 
            setOrderType={setOrderType} 
          />
          
          {orderType === 'delivery' && (
            <DeliveryDetails 
              phone={phone} 
              setPhone={setPhone} 
              address={address} 
              setAddress={setAddress} 
            />
          )}
          
          <PaymentMethod 
            paymentMethod={paymentMethod} 
            setPaymentMethod={setPaymentMethod} 
          />
          
          {paymentMethod === 'cash' && (
            <CashPayment 
              cashAmount={cashAmount} 
              setCashAmount={setCashAmount} 
            />
          )}
          
          {orderType === 'delivery' && (
            <AdditionalComments 
              comments={comments} 
              setComments={setComments} 
            />
          )}
          
          <SubmitButton />
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
