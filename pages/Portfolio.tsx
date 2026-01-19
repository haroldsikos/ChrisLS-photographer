import React from 'react';
import { CATEGORIES } from '../constants/categories';
import CategoryHero from '../components/CategoryHero';

// This page now serves as the main entry point for Photography, listing all categories vertically.
const Portfolio: React.FC = () => {
  return (
    <div className="fade-in w-full pt-36">
      {/* Full width vertical stack of categories */}
      <div className="flex flex-col w-full gap-[10px]">
        {CATEGORIES.map((category) => (
          <CategoryHero key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Portfolio;