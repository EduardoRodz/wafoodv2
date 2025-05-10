
import React from 'react';
import { config } from '../config';

const CategoryMenu: React.FC = () => {
  const handleCategoryClick = (categoryId: string) => {
    const element = document.getElementById(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-x-auto mb-4">
      <div className="flex gap-2 pb-2">
        {config.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className="whitespace-nowrap px-4 py-2 bg-white hover:bg-gray-100 rounded-full shadow-sm flex items-center gap-1 transition-colors"
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
