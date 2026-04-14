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
const COPIES = 20;

const ConsoleGrid = ({ selectedCategory }: ConsoleGridProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0); // index within filteredConsoles
  const isAnimating = useRef(false);
  const itemWidth = useResponsiveItemWidth();
  const step = itemWidth + GAP;
  const touchStartX = useRef<number | null>(null);

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

  const middleCopy = Math.floor(COPIES / 2);

  // Get the absolute index in the repeated array for the current selection
  const getAbsoluteIndex = useCallback((relIndex: number) => {
    return middleCopy * count + relIndex;
  }, [middleCopy, count]);

  // Scroll to position an absolute index at center
  const scrollToIndex = useCallback((absIdx: number, smooth = true) => {
    const el = scrollRef.current;
    if (!el || count === 0) return;
    const targetScroll = absIdx * step - el.clientWidth / 2 + itemWidth / 2;
    if (smooth) {
      el.scrollTo({ left: targetScroll, behavior: 'smooth' });
    } else {
      el.scrollLeft = targetScroll;
    }
  }, [count, step, itemWidth]);

  // Navigate by direction
  const navigate = useCallback((direction: number) => {
    if (isAnimating.current || count === 0) return;
    isAnimating.current = true;

    setCurrentIndex(prev => {
      const next = ((prev + direction) % count + count) % count;
      const absIdx = getAbsoluteIndex(next);
      scrollToIndex(absIdx, true);
      return next;
    });

    setTimeout(() => {
      isAnimating.current = false;
    }, 400);
  }, [count, getAbsoluteIndex, scrollToIndex]);

  // Initialize on category change
  useEffect(() => {
    setCurrentIndex(0);
    requestAnimationFrame(() => {
      const absIdx = middleCopy * count;
      scrollToIndex(absIdx, false);
    });
  }, [selectedCategory, count, middleCopy, scrollToIndex]);

  // Recenter on resize
  useEffect(() => {
    const onResize = () => {
      const absIdx = getAbsoluteIndex(currentIndex);
      scrollToIndex(absIdx, false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [currentIndex, getAbsoluteIndex, scrollToIndex]);

  // Mouse wheel → step navigation
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      navigate(e.deltaY > 0 ? 1 : -1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [navigate]);

  // Touch swipe → step navigation (disable free scroll)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // prevent free scroll
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchStartX.current === null) return;
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      touchStartX.current = null;
      if (Math.abs(diff) > 30) {
        navigate(diff > 0 ? 1 : -1);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [navigate]);

  // Prevent native scroll completely
  const handleScroll = useCallback(() => {
    // Do nothing - all navigation is controlled via navigate()
  }, []);

  // The center absolute index
  const centerAbsIndex = getAbsoluteIndex(currentIndex);

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
      <button
        onClick={() => navigate(-1)}
        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 border border-primary/30 hover:border-primary hover:shadow-neon rounded-full p-1.5 md:p-2 text-primary transition-all duration-300 opacity-70 hover:opacity-100"
        aria-label="Rolar para esquerda"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-hidden py-6 px-6 md:px-10"
        style={{
          gap: `${GAP}px`,
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {repeated.map((console, index) => {
          const isCenter = index === centerAbsIndex;
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
                pointerEvents: isCenter ? 'auto' : 'none',
              }}
            >
              <ConsoleCard console={console} index={index % count} />
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate(1)}
        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 border border-primary/30 hover:border-primary hover:shadow-neon rounded-full p-1.5 md:p-2 text-primary transition-all duration-300 opacity-70 hover:opacity-100"
        aria-label="Rolar para direita"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>
    </div>
  );
};

export default ConsoleGrid;
