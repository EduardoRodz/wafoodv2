import { useConfig } from '../context/ConfigContext';
import { useEffect, useState, useRef } from 'react';

interface CategoryMenuProps {}

const CategoryMenu: React.FC<CategoryMenuProps> = () => {
  const { config } = useConfig();
  const [activeCategory, setActiveCategory] = useState<string>('');
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Lógica para manejar el scroll
      const scrollPosition = window.scrollY;
      
      const sections = document.querySelectorAll<HTMLElement>('[data-category-id]');
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop - 100;
        
        if (scrollPosition >= sectionTop) {
          const categoryId = section.getAttribute('data-category-id') || '';
          if (activeCategory !== categoryId) {
            setActiveCategory(categoryId);
          }
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeCategory]);

  const scrollToCategory = (categoryId: string) => {
    const element = document.querySelector(`[data-category-id="${categoryId}"]`);
    if (element) {
      const yOffset = -60; // Ajustado para compensar el menú fijo
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div 
      ref={menuRef}
      className="sticky top-0 pt-3 pb-1 bg-white z-20 mb-3 overflow-auto whitespace-nowrap"
      style={{ 
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: '0 2px 3px -2px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div className="relative">
        <div className="flex space-x-2 px-2 pb-2">
          {config.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => scrollToCategory(category.id)}
              className="px-4 py-2 text-sm rounded-full transition flex items-center bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        {/* Sombras de desvanecimiento en los bordes */}
        <div className="absolute top-0 left-0 h-full w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default CategoryMenu;
