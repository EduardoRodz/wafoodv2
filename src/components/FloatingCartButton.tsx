
import React from 'react';
import { Button } from './ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
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
      <SheetContent className="w-full sm:w-[540px] p-0 overflow-y-auto" side="right">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Tu Pedido</h2>
          <p className="text-gray-500">Revisa tu pedido antes de enviarlo</p>
          
          <div className="space-y-4">
            <Cart />
            <OrderForm />
          </div>
          
          <div className="pt-4 flex justify-end">
            <SheetClose asChild>
              <Button variant="outline" className="mr-2">
                Cerrar
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FloatingCartButton;
