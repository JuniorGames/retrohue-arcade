import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { consoles } from '@/data/consoles';
import ConsoleCard from './ConsoleCard';

interface ConsoleGridProps {
  selectedCategory: string;
}

const ConsoleGrid = ({ selectedCategory }: ConsoleGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  const filteredConsoles = useMemo(() => {
    return consoles.filter((console) => {
      if (console.id === 'webrcade-huehue') {
        return selectedCategory === 'all';
      }
      return selectedCategory === 'all' || console.category === selectedCategory;
    });
  }, [selectedCategory]);

  // Triple the items for infinite loop illusion
  const tripled = useMemo(() => [...filteredConsoles, ...filteredConsoles, ...filteredConsoles], [filteredConsoles]);

  const scrollToCenter = useCallback(() => {
    const el = scrollRef.current;
    if (!el || filteredConsoles.length === 0) return;
    // Scroll to the middle set (second copy)
    const singleSetWidth = el.scrollWidth / 3;
    el.scrollLeft = singleSetWidth;
  }, [filteredConsoles.length]);

  useEffect(() => {
    scrollToCenter();
    const el = scrollRef.current;
    if (el) {
      setCanScroll(el.scrollWidth > el.clientWidth);
    }
  }, [scrollToCenter, selectedCategory]);

  // Handle infinite scroll looping
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const singleSetWidth = el.scrollWidth / 3;
    if (el.scrollLeft <= 0) {
      el.scrollLeft = singleSetWidth;
    } else if (el.scrollLeft >= singleSetWidth * 2) {
      el.scrollLeft = singleSetWidth;
    }
  }, []);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 220;
    el.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
  }, []);

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
    <div className="relative group/carousel">
      {/* Left Arrow */}
      {canScroll && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-card/90 border border-primary/30 hover:border-primary hover:shadow-neon rounded-full p-2 text-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Rolar para esquerda"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-10 py-2 scroll-smooth"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {tripled.map((console, index) => (
          <div key={`${console.id}-${index}`} className="flex-shrink-0 w-[160px] md:w-[180px]">
            <ConsoleCard console={console} index={index % filteredConsoles.length} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      {canScroll && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-card/90 border border-primary/30 hover:border-primary hover:shadow-neon rounded-full p-2 text-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100"
          aria-label="Rolar para direita"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ConsoleGrid;
