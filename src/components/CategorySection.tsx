
import React from 'react';
import OrderItem from './OrderItem';
import { Category } from '../config';

interface CategorySectionProps {
  category: Category;
}

const CategorySection: React.FC<CategorySectionProps> = ({ category }) => {
  return (
    <section id={category.id}>
      <div className="category-title">
        <span>{category.icon}</span>
        <h2>{category.name}</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {category.items.map((item) => (
          <OrderItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
