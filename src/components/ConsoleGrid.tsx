import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { consoles } from '@/data/consoles';
import ConsoleCard from './ConsoleCard';

interface ConsoleGridProps {
  selectedCategory: string;
}

const useResponsiveItemWidth = () => {
  const [itemWidth, setItemWidth] = useState(160);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 400) setItemWidth(130);
      else if (w < 640) setItemWidth(145);
      else if (w < 768) setItemWidth(155);
      else if (w < 1024) setItemWidth(165);
      else setItemWidth(180);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return itemWidth;
};

const GAP = 16;

const ConsoleGrid = ({ selectedCategory }: ConsoleGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(-1);
  const itemWidth = useResponsiveItemWidth();
  const step = itemWidth + GAP;

  const filteredConsoles = useMemo(() => {
    return consoles.filter((c) => {
      if (c.id === 'webrcade-huehue') return selectedCategory === 'all';
      return selectedCategory === 'all' || c.category === selectedCategory;
    });
  }, [selectedCategory]);

  const repeated = useMemo(() => {
    if (filteredConsoles.length === 0) return [];
    // Ensure we have enough items to fill the screen many times over
    const minItems = Math.max(50, filteredConsoles.length * 5);
    const copies = [];
    while (copies.length < minItems) {
      copies.push(...filteredConsoles);
    }
    return copies;
  }, [filteredConsoles]);

  const updateCenter = useCallback(() => {
    const el = scrollRef.current;
    if (!el || filteredConsoles.length === 0) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round((containerCenter - itemWidth / 2) / step);
    setCenterIndex(Math.max(0, Math.min(idx, repeated.length - 1)));
  }, [filteredConsoles.length, repeated.length, itemWidth, step]);

  const scrollToMiddle = useCallback(() => {
    const el = scrollRef.current;
    if (!el || filteredConsoles.length === 0) return;
    const middleStart = filteredConsoles.length * 2;
    el.scrollLeft = middleStart * step - el.clientWidth / 2 + itemWidth / 2;
  }, [filteredConsoles.length, step, itemWidth]);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollToMiddle();
      requestAnimationFrame(updateCenter);
    });
  }, [scrollToMiddle, updateCenter, selectedCategory]);

  // Also recenter on resize
  useEffect(() => {
    const onResize = () => {
      scrollToMiddle();
      requestAnimationFrame(updateCenter);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scrollToMiddle, updateCenter]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || filteredConsoles.length === 0) return;

    const singleSetWidth = filteredConsoles.length * step;

    if (el.scrollLeft < singleSetWidth) {
      el.scrollLeft += singleSetWidth * 2;
    } else if (el.scrollLeft > singleSetWidth * 4) {
      el.scrollLeft -= singleSetWidth * 2;
    }

    updateCenter();
  }, [filteredConsoles.length, step, updateCenter]);

  const scroll = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  }, [step]);

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
        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 border border-primary/30 hover:border-primary hover:shadow-neon rounded-full p-1.5 md:p-2 text-primary transition-all duration-300 opacity-70 hover:opacity-100"
        aria-label="Rolar para esquerda"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Carousel */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-scroll py-6 px-6 md:px-10"
        style={{
          gap: `${GAP}px`,
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
              className="flex-shrink-0 transition-all duration-300 ease-out"
              style={{
                width: `${itemWidth}px`,
                transform: isCenter ? 'scale(1.15)' : 'scale(0.9)',
                zIndex: isCenter ? 10 : 1,
                opacity: isCenter ? 1 : 0.6,
                filter: isCenter ? 'drop-shadow(0 0 12px hsl(142 76% 46% / 0.4))' : 'none',
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
        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 border border-primary/30 hover:border-primary hover:shadow-neon rounded-full p-1.5 md:p-2 text-primary transition-all duration-300 opacity-70 hover:opacity-100"
        aria-label="Rolar para direita"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default ConsoleGrid;
