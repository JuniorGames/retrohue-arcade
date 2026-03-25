import { useMemo } from 'react';
import { consoles } from '@/data/consoles';
import ConsoleCard from './ConsoleCard';

interface ConsoleGridProps {
  selectedCategory: string;
}

const ConsoleGrid = ({ selectedCategory }: ConsoleGridProps) => {
  const filteredConsoles = useMemo(() => {
    return consoles.filter((console) => {
      if (console.id === 'webrcade-huehue') {
        return selectedCategory === 'all';
      }
      return selectedCategory === 'all' || console.category === selectedCategory;
    });
  }, [selectedCategory]);

  if (filteredConsoles.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <span className="text-5xl mb-4">🎮</span>
        <h3 className="font-arcade text-xl text-foreground mb-2">Nenhum console encontrado</h3>
        <p className="text-muted-foreground">Selecione outra categoria</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
      {filteredConsoles.map((console, index) => (
        <ConsoleCard key={console.id} console={console} index={index} />
      ))}
    </div>
  );
};

export default ConsoleGrid;
