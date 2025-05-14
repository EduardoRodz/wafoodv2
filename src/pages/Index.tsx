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
        
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 py-2 sm:py-6">
          <CategoryMenu />
          
          <div className="grid grid-cols-1 gap-6">
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
