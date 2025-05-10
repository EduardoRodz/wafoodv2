
import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const FloatingCartButton = () => {
  const { totalItems } = useCart();
  
  const scrollToCart = () => {
    const cartElement = document.querySelector('[data-cart-section]');
    if (cartElement) {
      cartElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Button
      onClick={scrollToCart}
      className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg flex items-center justify-center p-0 animate-fade-in z-50"
      variant="default"
      aria-label="Ver carrito"
    >
      <ShoppingCart className="h-6 w-6" />
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  );
};

export default FloatingCartButton;
