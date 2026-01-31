import { useMemo } from 'react';
import { consoles } from '@/data/consoles';
import ConsoleCard from './ConsoleCard';
import { Gamepad2 } from 'lucide-react';

interface ConsoleGridProps {
  searchQuery: string;
  selectedCategory: string;
}

const ConsoleGrid = ({ searchQuery, selectedCategory }: ConsoleGridProps) => {
  const filteredConsoles = useMemo(() => {
    return consoles.filter((console) => {
      const matchesSearch = console.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || console.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  if (filteredConsoles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Gamepad2 className="w-16 h-16 text-muted-foreground mb-4" />
        <h3 className="font-arcade text-xl text-foreground mb-2">Nenhum console encontrado</h3>
        <p className="text-muted-foreground">
          Tente buscar por outro termo ou selecione outra categoria
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {filteredConsoles.map((console, index) => (
        <ConsoleCard key={console.id} console={console} index={index} />
      ))}
    </div>
  );
};

export default ConsoleGrid;
