import React from 'react';
import { QuoteCategory } from '../types/quote';

interface CategoryFilterProps {
  categories: QuoteCategory[];
  selectedCategory: QuoteCategory;
  onSelectCategory: (category: QuoteCategory) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 
            ${selectedCategory === category 
              ? 'bg-purple-700 text-white shadow-md' 
              : 'bg-white/10 text-white/80 hover:bg-white/20 backdrop-blur-sm'
            }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;