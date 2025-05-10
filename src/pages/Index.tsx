
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CategoryMenu from '../components/CategoryMenu';
import CategorySection from '../components/CategorySection';
import FloatingCartButton from '../components/FloatingCartButton';
import { config } from '../config';
import { CartProvider } from '../context/CartContext';

const Index = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow mx-auto w-full px-2 sm:px-4 py-2 sm:py-6">
          <CategoryMenu />
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              {config.categories.map((category) => (
                <CategorySection key={category.id} category={category} />
              ))}
            </div>
          </div>
        </main>
        
        <Footer />
        <FloatingCartButton />
      </div>
    </CartProvider>
  );
};

export default Index;
