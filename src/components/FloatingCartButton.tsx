
import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import Cart from './Cart';
import OrderForm from './OrderForm';

const FloatingCartButton = () => {
  const { totalItems } = useCart();
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
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
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[400px] p-0 overflow-y-auto font-sans" side="right">
        <SheetHeader className="p-6 pb-2 text-left">
          <SheetTitle className="text-xl font-semibold">Tu Pedido</SheetTitle>
          <SheetDescription className="text-base text-gray-600">Revisa tu pedido antes de enviarlo</SheetDescription>
        </SheetHeader>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <Cart />
            {/* Temporarily hiding the order form to match the image design */}
            {/* <OrderForm /> */}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FloatingCartButton;
