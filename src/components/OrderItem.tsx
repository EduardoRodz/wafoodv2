
import React, { useState } from 'react';
import { MenuItem } from '../config';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { formatCurrency } from '../utils/formatCurrency';

interface OrderItemProps {
  item: MenuItem;
}

const OrderItem: React.FC<OrderItemProps> = ({ item }) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const [note, setNote] = useState('');
  const quantity = getItemQuantity(item.id);
  const [showNote, setShowNote] = useState(false);

  const handleAddToCart = () => {
    addToCart({ ...item, note });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
    if (quantity === 1) {
      setNote('');
      setShowNote(false);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg text-left">{item.name}</h3>
        <p className="text-gray-600 text-sm text-left">{item.description}</p>
        
        <div className="flex justify-between items-center">
          <p className="font-bold text-lg text-green-800">{formatCurrency(item.price)}</p>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleRemoveFromCart}
              className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              disabled={quantity === 0}
            >
              <Minus size={16} />
            </button>
            
            <span className="font-medium text-lg w-4 text-center">{quantity}</span>
            
            <button 
              onClick={() => addToCart({ ...item, note })}
              className="rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        
        {quantity > 0 ? (
          <div className="space-y-2">
            <button 
              onClick={() => setShowNote(!showNote)}
              className="text-sm text-gray-500 hover:text-primary font-medium mx-auto block"
            >
              {showNote ? 'Ocultar notas' : note ? 'Editar notas' : 'Agregar notas'}
            </button>
            
            {showNote && (
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ej: Sin tomate, extra queso"
                className="w-full p-2 border border-gray-300 rounded text-sm"
                rows={2}
              />
            )}
            
            <Button 
              onClick={handleAddToCart} 
              className="w-full bg-green-800 hover:bg-green-900 text-white flex items-center justify-center gap-2"
            >
              <Plus size={16} /> Agregar al pedido
            </Button>
          </div>
        ) : (
          <Button 
            onClick={handleAddToCart} 
            className="w-full bg-green-800 hover:bg-green-900 text-white flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Agregar al pedido
          </Button>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
