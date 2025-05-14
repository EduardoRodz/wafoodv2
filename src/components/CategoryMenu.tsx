import React from 'react';
import { config } from '../config';
import { useIsMobile } from '../hooks/use-mobile';

const CategoryMenu: React.FC = () => {
  const isMobile = useIsMobile();

  const handleCategoryClick = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      // Ajustamos el scroll para considerar el menú fijo
      const menuHeight = document.querySelector('.category-menu')?.clientHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - menuHeight - 16, // 16px de margen adicional
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="sticky top-0 overflow-x-auto mb-2 bg-background pb-2 pt-2 category-menu z-10"
    >
      <div className={`flex gap-2 ${isMobile ? 'px-1' : ''}`}>
        {config.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="whitespace-nowrap px-3 py-2 bg-white hover:bg-gray-100 rounded-full shadow-sm flex items-center gap-1 transition-colors text-sm"
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryMenu;
