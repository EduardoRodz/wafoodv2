
import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';

const Cart: React.FC = () => {
  const { items, totalAmount, clearCart } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex items-center justify-center gap-2 text-gray-500 py-8">
          <ShoppingCart size={24} />
          <p>Tu carrito está vacío</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="font-bold text-lg mb-4">Resumen del pedido</h3>
      
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id + item.note} className="flex justify-between text-sm">
            <div>
              <span className="font-medium">{item.quantity}x {item.name}</span>
              {item.note && (
                <p className="text-xs text-gray-500">Nota: {item.note}</p>
              )}
            </div>
            <span>{formatCurrency(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-3 flex justify-between">
        <span className="font-bold">Total:</span>
        <span className="font-bold">{formatCurrency(totalAmount)}</span>
      </div>
      
      <button
        onClick={clearCart}
        className="mt-4 text-sm text-red-500 hover:text-red-700 transition-colors"
      >
        Vaciar carrito
      </button>
    </div>
  );
};

export default Cart;
