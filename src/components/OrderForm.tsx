
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { config } from '../config';
import { formatCurrency } from '../utils/formatCurrency';

const OrderForm: React.FC = () => {
  const { items, totalAmount } = useCart();
  const [name, setName] = useState('');
  const [orderType, setOrderType] = useState('pickup'); // pickup or delivery
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // cash or transfer
  const [cashAmount, setCashAmount] = useState(config.cashDenominations[0].value);
  const [comments, setComments] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert('Agrega productos a tu carrito antes de ordenar');
      return;
    }
    
    if (!name) {
      alert('Por favor ingresa tu nombre');
      return;
    }
    
    if (orderType === 'delivery' && (!phone || !address)) {
      alert('Para delivery, ingresa tu teléfono y dirección');
      return;
    }
    
    // Prepare WhatsApp message
    let message = '‼️ NUEVO PEDIDO ‼️\n\n';
    message += `🧑 *Cliente:* ${name}\n`;
    message += `🛵 *Tipo:* ${orderType === 'pickup' ? 'Para recoger' : 'Delivery'}\n`;
    
    if (orderType === 'delivery') {
      message += `📞 *Teléfono:* ${phone}\n`;
      message += `📍 *Dirección:* ${address}\n`;
    }
    
    message += `💰 *Pago:* ${paymentMethod === 'cash' ? 'Efectivo' : 'Transferencia'}\n`;
    
    if (paymentMethod === 'cash') {
      message += `💵 *Paga con:* ${formatCurrency(cashAmount)}\n`;
    }
    
    if (comments) {
      message += `\nComentarios: ${comments}\n`;
    }
    
    message += '\n🛒 *DETALLE DEL PEDIDO*\n';
    
    items.forEach(item => {
      message += `• ${item.quantity}x ${item.name} - ${formatCurrency(item.price * item.quantity)}\n`;
      if (item.note) {
        message += `   _Nota: ${item.note}_\n`;
      }
    });
    
    message += `\n🧾 *Total:* ${formatCurrency(totalAmount)}\n\n`;
    message += '¡Gracias por tu pedido! Lo estaremos preparando pronto.';
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-bold text-lg mb-4">Información del pedido</h3>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
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
                  value="pickup"
                  checked={orderType === 'pickup'}
                  onChange={() => setOrderType('pickup')}
                  className="h-4 w-4"
                />
                <span>Para recoger</span>
              </label>
              
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
            </div>
          </div>
          
          {orderType === 'delivery' && (
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
          )}
          
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
          
          {paymentMethod === 'cash' && (
            <div>
              <label className="block mb-1 text-sm font-medium">Paga con</label>
              <select
                value={cashAmount}
                onChange={(e) => setCashAmount(Number(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded"
              >
                {config.cashDenominations.map((denom) => (
                  <option key={denom.value} value={denom.value}>
                    {denom.label}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {orderType === 'delivery' && (
            <div>
              <label className="block mb-1 text-sm font-medium">Comentarios adicionales</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Instrucciones especiales, llamar al llegar, etc."
                className="w-full p-2 border border-gray-300 rounded"
                rows={2}
              />
            </div>
          )}
          
          <button
            type="submit"
            className="w-full py-3 bg-primary hover:bg-accent text-white font-bold rounded transition-colors"
          >
            Enviar pedido por WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
