
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { config } from '../../config';
import { formatCurrency } from '../../utils/formatCurrency';

export const useOrderForm = () => {
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

  return {
    name,
    setName,
    orderType,
    setOrderType,
    phone,
    setPhone,
    address,
    setAddress,
    paymentMethod,
    setPaymentMethod,
    cashAmount,
    setCashAmount,
    comments,
    setComments,
    handleSubmit
  };
};
