
import React, { useState } from 'react';
import { MenuItem } from '../config';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

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
    if (quantity === 0) {
      setNote('');
      setShowNote(false);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(item.id);
    if (quantity === 1) {
      setNote('');
      setShowNote(false);
    }
  };

  return (
    <div className="card-item">
      <div className="w-full h-48 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="item-info">
        <div>
          <h3 className="font-bold text-lg">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{item.description}</p>
          <p className="font-bold text-lg mb-2">RD${item.price.toFixed(2)}</p>
        </div>

        <div>
          <div className="quantity-selector">
            <button 
              onClick={handleRemoveFromCart} 
              disabled={quantity === 0}
              className="quantity-button bg-primary hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={16} />
            </button>
            
            <span className="font-bold">{quantity}</span>
            
            <button 
              onClick={handleAddToCart} 
              className="quantity-button bg-primary hover:bg-accent"
            >
              <Plus size={16} />
            </button>
          </div>

          {quantity > 0 && (
            <div className="mt-2">
              <button 
                onClick={() => setShowNote(!showNote)}
                className="text-sm text-primary font-medium hover:underline w-full text-center"
              >
                {showNote ? 'Ocultar nota' : note ? 'Editar nota' : 'Agregar nota'}
              </button>
              
              {showNote && (
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Ej: Sin tomate, extra queso"
                  className="w-full mt-2 p-2 border border-gray-300 rounded text-sm"
                  rows={2}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
