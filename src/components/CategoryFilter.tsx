import { categories } from '@/data/consoles';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="overflow-x-auto pb-4 scrollbar-hide">
      <div className="flex gap-2 md:gap-3 min-w-max px-4 md:px-0 justify-center">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300",
              "border whitespace-nowrap",
              selectedCategory === category.id
                ? "bg-primary text-primary-foreground border-primary shadow-neon"
                : "bg-card border-border hover:border-primary/50 hover:bg-card/80 text-foreground"
            )}
          >
            <span className="text-lg">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
