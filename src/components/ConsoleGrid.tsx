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
const COPIES = 20; // Many copies for seamless looping

const ConsoleGrid = ({ selectedCategory }: ConsoleGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [centerIndex, setCenterIndex] = useState(-1);
  const isRepositioning = useRef(false);
  const itemWidth = useResponsiveItemWidth();
  const step = itemWidth + GAP;

  const filteredConsoles = useMemo(() => {
    return consoles.filter((c) => {
      if (c.id === 'webrcade-huehue') return selectedCategory === 'all';
      return selectedCategory === 'all' || c.category === selectedCategory;
    });
  }, [selectedCategory]);

  const count = filteredConsoles.length;

  const repeated = useMemo(() => {
    if (count === 0) return [];
    const arr = [];
    for (let i = 0; i < COPIES; i++) {
      arr.push(...filteredConsoles);
    }
    return arr;
  }, [filteredConsoles, count]);

  const singleSetWidth = count * step;
  const middleCopy = Math.floor(COPIES / 2);

  const updateCenter = useCallback(() => {
    const el = scrollRef.current;
    if (!el || count === 0) return;
    const containerCenter = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round((containerCenter - itemWidth / 2) / step);
    setCenterIndex(Math.max(0, Math.min(idx, repeated.length - 1)));
  }, [count, repeated.length, itemWidth, step]);

  // Position scroll to the middle set
  const scrollToMiddle = useCallback(() => {
    const el = scrollRef.current;
    if (!el || count === 0) return;
    const middleStart = middleCopy * count;
    el.scrollLeft = middleStart * step - el.clientWidth / 2 + itemWidth / 2;
  }, [count, step, itemWidth, middleCopy]);

  // Initialize position on category change
  useEffect(() => {
    isRepositioning.current = true;
    requestAnimationFrame(() => {
      scrollToMiddle();
      requestAnimationFrame(() => {
        updateCenter();
        isRepositioning.current = false;
      });
    });
  }, [scrollToMiddle, updateCenter, selectedCategory]);

  // Recenter on resize
  useEffect(() => {
    const onResize = () => {
      isRepositioning.current = true;
      scrollToMiddle();
      requestAnimationFrame(() => {
        updateCenter();
        isRepositioning.current = false;
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [scrollToMiddle, updateCenter]);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el || count === 0 || isRepositioning.current) return;

    updateCenter();

    // Seamless repositioning: when user scrolls too far from center,
    // jump by exactly one set width (invisible since content repeats)
    const currentPos = el.scrollLeft;
    const centerPos = middleCopy * singleSetWidth;
    const threshold = singleSetWidth * 3; // Allow 3 sets of drift before repositioning

    if (Math.abs(currentPos - centerPos) > threshold) {
      isRepositioning.current = true;
      // Calculate how many full sets we've drifted
      const drift = currentPos - centerPos;
      const setsToCorrect = Math.round(drift / singleSetWidth);
      el.scrollLeft = currentPos - setsToCorrect * singleSetWidth;
      requestAnimationFrame(() => {
        updateCenter();
        isRepositioning.current = false;
      });
    }
  }, [count, singleSetWidth, middleCopy, updateCenter]);

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
              <ConsoleCard console={console} index={index % count} />
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
