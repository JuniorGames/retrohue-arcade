import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { consoles } from '@/data/consoles';
import ConsoleCard from './ConsoleCard';

interface ConsoleGridProps {
  selectedCategory: string;
}

const ConsoleGrid = ({ selectedCategory }: ConsoleGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(-1);
  const itemWidth = 180;
  const gap = 16;

  const filteredConsoles = useMemo(() => {
    return consoles.filter((console) => {
      if (console.id === 'webrcade-huehue') {
        return selectedCategory === 'all';
      }
      return selectedCategory === 'all' || console.category === selectedCategory;
    });
  }, [selectedCategory]);

  // 5x copies for seamless infinite scroll
  const repeated = useMemo(() => {
    const copies = [];
    for (let i = 0; i < 5; i++) copies.push(...filteredConsoles);
    return copies;
  }, [filteredConsoles]);

  const scrollToMiddle = useCallback(() => {
    const el = scrollRef.current;
    if (!el || filteredConsoles.length === 0) return;
    const middleStart = filteredConsoles.length * 2;
    const scrollPos = middleStart * (itemWidth + gap) - el.clientWidth / 2 + itemWidth / 2;
    el.scrollLeft = scrollPos;
  }, [filteredConsoles.length]);

  useEffect(() => {
    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      scrollToMiddle();
      updateCenter();
    });
  }, [scrollToMiddle, selectedCategory]);

  const updateCenter = useCallback(() => {
    const el = scrollRef.current;
    if (!el || filteredConsoles.length === 0) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round(containerCenter / (itemWidth + gap));
    setCenterIndex(idx);
  }, [filteredConsoles.length]);

  // Seamless infinite loop: when reaching edges, jump to middle copy
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || filteredConsoles.length === 0) return;

    const singleSetWidth = filteredConsoles.length * (itemWidth + gap);
    const minBound = singleSetWidth;
    const maxBound = singleSetWidth * 4;

    if (el.scrollLeft < minBound) {
      el.scrollLeft += singleSetWidth * 2;
    } else if (el.scrollLeft > maxBound) {
      el.scrollLeft -= singleSetWidth * 2;
    }

    updateCenter();
  }, [filteredConsoles.length, updateCenter]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -(itemWidth + gap) : (itemWidth + gap), behavior: 'smooth' });
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
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 border border-primary/30 hover:border-primary hover:shadow-neon rounded-full p-2 text-primary transition-all duration-300 opacity-70 hover:opacity-100"
        aria-label="Rolar para esquerda"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-scroll px-10 py-6"
        style={{
          gap: `${gap}px`,
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {repeated.map((console, index) => {
          const isCenter = index === centerIndex;
          return (
            <div
              key={`${console.id}-${index}`}
              className="flex-shrink-0 transition-transform duration-300 ease-out"
              style={{
                width: `${itemWidth}px`,
                transform: isCenter ? 'scale(1.18)' : 'scale(0.92)',
                zIndex: isCenter ? 10 : 1,
                opacity: isCenter ? 1 : 0.7,
              }}
            >
              <ConsoleCard console={console} index={index % filteredConsoles.length} />
            </div>
          );
        })}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 border border-primary/30 hover:border-primary hover:shadow-neon rounded-full p-2 text-primary transition-all duration-300 opacity-70 hover:opacity-100"
        aria-label="Rolar para direita"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ConsoleGrid;
