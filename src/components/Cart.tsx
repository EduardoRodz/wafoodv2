
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart, Pencil, Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '../utils/formatCurrency';
import { Button } from './ui/button';
import { useToast } from '../hooks/use-toast';
import OrderForm from './OrderForm';

const Cart: React.FC = () => {
  const { items, totalAmount, clearCart, addToCart, removeFromCart, removeItemCompletely } = useCart();
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editedNote, setEditedNote] = useState<string>('');
  const [showOrderForm, setShowOrderForm] = useState(false);
  const { toast } = useToast();
  
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center gap-2 text-gray-500 py-8">
          <ShoppingCart size={24} />
          <p>Tu carrito está vacío</p>
        </div>
      </div>
    );
  }

  const handleEditNote = (itemId: string, currentNote: string = '') => {
    setEditingItemId(itemId);
    setEditedNote(currentNote);
  };

  const handleSaveNote = (itemId: string) => {
    // Find the item and update its note
    const item = items.find(i => i.id === itemId);
    if (item) {
      // Remove old item
      removeItemCompletely(itemId);
      // Add updated item with new note and PRESERVE the original quantity
      for (let i = 0; i < item.quantity; i++) {
        addToCart({...item, note: editedNote});
      }
    }
    setEditingItemId(null);
    setEditedNote('');
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditedNote('');
  };

  const handleContinueOrder = () => {
    console.log('Continuing with order');
    
    // Show success toast
    toast({
      title: "¡Perfecto!",
      description: "Continuando con tu pedido...",
    });
    
    // Show order form
    setShowOrderForm(true);
  };

  const handleBackToCart = () => {
    setShowOrderForm(false);
  };

  if (showOrderForm) {
    return (
      <div className="space-y-4">
        <OrderForm />
        <Button 
          variant="outline" 
          onClick={handleBackToCart}
          className="w-full border border-gray-300 hover:bg-gray-50"
        >
          Volver al carrito
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg mb-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id + item.note} className="py-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-base font-medium">{item.name}</h3>
              <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-3 py-1">{item.quantity}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <button 
                onClick={() => removeItemCompletely(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
              {editingItemId === item.id ? (
                <div className="w-full">
                  <textarea
                    value={editedNote}
                    onChange={(e) => setEditedNote(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-sm mb-2"
                    placeholder="Agregar notas"
                    rows={2}
                  />
                  <div className="flex justify-end gap-2">
                    <button 
                      className="text-gray-500 text-sm"
                      onClick={handleCancelEdit}
                    >
                      Cancelar
                    </button>
                    <button 
                      className="text-primary text-sm font-medium"
                      onClick={() => handleSaveNote(item.id)}
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <span>{item.note ? item.note : "Sin notas"}</span>
                  <button 
                    className="flex items-center gap-1 text-gray-700"
                    onClick={() => handleEditNote(item.id, item.note)}
                  >
                    <Pencil size={14} /> Editar notas
                  </button>
                </>
              )}
            </div>
            
            <div className="mt-4 border-b border-gray-200"></div>
          </div>
        ))}
      </div>
      
      <div className="py-4 flex justify-between items-center font-medium">
        <span className="text-lg">Total:</span>
        <span className="text-lg">{formatCurrency(totalAmount)}</span>
      </div>
      
      <Button 
        className="w-full bg-primary hover:bg-accent text-white font-medium py-6 flex items-center justify-center gap-2 mb-4"
        onClick={handleContinueOrder}
      >
        <ShoppingCart size={20} /> Continuar con el pedido
      </Button>
      
      <Button
        variant="outline"
        onClick={clearCart}
        className="w-full border border-gray-300 hover:bg-gray-50"
      >
        Cerrar
      </Button>
    </div>
  );
};

export default Cart;
